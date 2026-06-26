/**
 * database/faculty.ts — Faculty profile CRUD operations
 */
import { getSql } from '../db';
import type { FacultyDirectoryDepartment, FacultyDirectoryMember } from '../../types/faculty';
import { getAllDepartments } from './departments';
import { defaultFacultyImage } from '../../content/faculty-fallback';

export interface FacultyProfile {
	id: number;
	user_id: number;
	department_id: number;
	designation: string;
	phone: string | null;
	image_url: string | null;
	office_hours: string | null;
	is_hod: boolean;
	education: string | null;
	created_at: string;
	// Joined
	name?: string;
	email?: string;
	department_name?: string;
}

type Row = Record<string, unknown>;

export async function getFacultyByDepartment(departmentId: number): Promise<FacultyProfile[]> {
	const sql = getSql();
	const rows = await sql`
		SELECT fp.*, u.name, u.email, d.name AS department_name
		FROM faculty_profiles fp
		JOIN users u ON u.id = fp.user_id
		JOIN departments d ON d.id = fp.department_id
		WHERE fp.department_id = ${departmentId}
		ORDER BY fp.is_hod DESC, u.name ASC
	`;
	return rows as unknown as FacultyProfile[];
}

export async function getAllFaculty(): Promise<FacultyProfile[]> {
	const sql = getSql();
	const rows = await sql`
		SELECT fp.*, u.name, u.email, d.name AS department_name
		FROM faculty_profiles fp
		JOIN users u ON u.id = fp.user_id
		JOIN departments d ON d.id = fp.department_id
		ORDER BY d.name ASC, fp.is_hod DESC, u.name ASC
	`;
	return rows as unknown as FacultyProfile[];
}

export async function getFacultyByUserId(userId: number): Promise<FacultyProfile | null> {
	const sql = getSql();
	const rows = (await sql`
		SELECT fp.*, u.name, u.email, d.name AS department_name
		FROM faculty_profiles fp
		JOIN users u ON u.id = fp.user_id
		JOIN departments d ON d.id = fp.department_id
		WHERE fp.user_id = ${userId} LIMIT 1
	`) as Row[];
	return (rows[0] as unknown as FacultyProfile) ?? null;
}

export async function createFacultyProfile(data: {
	user_id: number;
	department_id: number;
	designation?: string;
	phone?: string;
	image_url?: string;
	office_hours?: string;
	is_hod?: boolean;
	education?: string;
}): Promise<FacultyProfile> {
	const sql = getSql();
	const rows = (await sql`
		INSERT INTO faculty_profiles (user_id, department_id, designation, phone, image_url, office_hours, is_hod, education)
		VALUES (
			${data.user_id},
			${data.department_id},
			${data.designation ?? 'Lecturer'},
			${data.phone ?? null},
			${data.image_url ?? null},
			${data.office_hours ?? null},
			${data.is_hod ?? false},
			${data.education ?? null}
		)
		RETURNING *
	`) as Row[];
	return rows[0] as unknown as FacultyProfile;
}

export async function updateFacultyProfile(
	id: number,
	data: Partial<{
		designation: string;
		phone: string;
		image_url: string;
		office_hours: string;
		is_hod: boolean;
		education: string;
		department_id: number;
	}>
): Promise<FacultyProfile | null> {
	const sql = getSql();
	const rows = (await sql`
		UPDATE faculty_profiles
		SET
			designation = COALESCE(${data.designation ?? null}, designation),
			phone = COALESCE(${data.phone ?? null}, phone),
			image_url = COALESCE(${data.image_url ?? null}, image_url),
			office_hours = COALESCE(${data.office_hours ?? null}, office_hours),
			is_hod = COALESCE(${data.is_hod ?? null}, is_hod),
			education = COALESCE(${data.education ?? null}, education),
			department_id = COALESCE(${data.department_id ?? null}, department_id)
		WHERE id = ${id}
		RETURNING *
	`) as Row[];
	return (rows[0] as unknown as FacultyProfile) ?? null;
}

export async function deleteFacultyProfile(id: number): Promise<void> {
	const sql = getSql();
	const rows = (await sql`SELECT user_id FROM faculty_profiles WHERE id = ${id}`) as Row[];
	await sql`DELETE FROM faculty_profiles WHERE id = ${id}`;
	const userId = rows[0]?.user_id;
	if (userId) {
		await sql`DELETE FROM users WHERE id = ${userId}`;
	}
}

// ─── Support for public frontend /about/faculty ────────────────────────────────

export async function listFacultyDirectory(): Promise<FacultyDirectoryDepartment[]> {
	const [departments, facultyMembers] = await Promise.all([
		getAllDepartments(),
		getAllFaculty()
	]);

	return departments.map((department) => {
		const members = facultyMembers
			.filter((member) => member.department_id === department.id)
			.map((member): FacultyDirectoryMember => ({
				id: member.id,
				name: member.name || 'Unknown',
				urduName: member.name || 'Unknown',
				role: member.designation,
				urduRole: member.designation,
				qualification: member.education || 'N/A',
				urduQualification: member.education || 'N/A',
				photo: member.image_url || defaultFacultyImage,
				subject: department.name,
				isHod: member.is_hod,
				isCoordinator: false, // We will figure this out below
				isTeachingStaff: true
			}));

		let coordinator: FacultyDirectoryMember | null = null;
		
		if (department.coordinator_id) {
			const coordProfile = members.find((m) => m.name === department.coordinator_name);
			if (coordProfile) {
				coordProfile.isCoordinator = true;
				coordinator = coordProfile;
			} else {
				coordinator = {
					id: -1,
					name: department.coordinator_name || 'Coordinator',
					urduName: department.coordinator_name || 'Coordinator',
					role: 'Coordinator',
					urduRole: 'Coordinator',
					qualification: '',
					urduQualification: '',
					photo: defaultFacultyImage,
					subject: department.name,
					isHod: false,
					isCoordinator: true,
					isTeachingStaff: false
				};
			}
		}

		if (!coordinator) {
			coordinator = members.find((m) => m.isHod) ?? null;
		}

		return {
			id: department.slug,
			databaseId: department.id,
			name: department.name,
			urduName: department.urdu_name || department.name,
			coordinator,
			staff: members
		};
	});
}
