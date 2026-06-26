/**
 * database/students.ts — Student profile CRUD operations
 */
import { getSql } from '../db';

export interface StudentProfile {
	id: number;
	user_id: number;
	department_id: number;
	roll_number: string;
	semester: number;
	session: string;
	father_name: string | null;
	phone: string | null;
	address: string | null;
	created_at: string;
	// Joined
	name?: string;
	email?: string;
	department_name?: string;
}

type Row = Record<string, unknown>;

export async function getStudentsByDepartment(departmentId: number): Promise<StudentProfile[]> {
	const sql = getSql();
	const rows = await sql`
		SELECT sp.*, u.name, u.email, d.name AS department_name
		FROM student_profiles sp
		JOIN users u ON u.id = sp.user_id
		JOIN departments d ON d.id = sp.department_id
		WHERE sp.department_id = ${departmentId}
		ORDER BY sp.semester ASC, u.name ASC
	`;
	return rows as unknown as StudentProfile[];
}

export async function getStudentsByDepartmentAndSemester(
	departmentId: number,
	semester: number
): Promise<StudentProfile[]> {
	const sql = getSql();
	const rows = await sql`
		SELECT sp.*, u.name, u.email, d.name AS department_name
		FROM student_profiles sp
		JOIN users u ON u.id = sp.user_id
		JOIN departments d ON d.id = sp.department_id
		WHERE sp.department_id = ${departmentId} AND sp.semester = ${semester}
		ORDER BY sp.roll_number ASC
	`;
	return rows as unknown as StudentProfile[];
}

export async function getStudentByUserId(userId: number): Promise<StudentProfile | null> {
	const sql = getSql();
	const rows = (await sql`
		SELECT sp.*, u.name, u.email, d.name AS department_name
		FROM student_profiles sp
		JOIN users u ON u.id = sp.user_id
		JOIN departments d ON d.id = sp.department_id
		WHERE sp.user_id = ${userId} LIMIT 1
	`) as Row[];
	return (rows[0] as unknown as StudentProfile) ?? null;
}

export async function getStudentByRollNumber(rollNumber: string): Promise<StudentProfile | null> {
	const sql = getSql();
	const rows = (await sql`
		SELECT sp.*, u.name, u.email, d.name AS department_name
		FROM student_profiles sp
		JOIN users u ON u.id = sp.user_id
		JOIN departments d ON d.id = sp.department_id
		WHERE sp.roll_number = ${rollNumber} LIMIT 1
	`) as Row[];
	return (rows[0] as unknown as StudentProfile) ?? null;
}

export async function createStudentProfile(data: {
	user_id: number;
	department_id: number;
	roll_number: string;
	semester: number;
	session: string;
	father_name?: string;
	phone?: string;
	address?: string;
}): Promise<StudentProfile> {
	const sql = getSql();
	const rows = (await sql`
		INSERT INTO student_profiles (user_id, department_id, roll_number, semester, session, father_name, phone, address)
		VALUES (
			${data.user_id},
			${data.department_id},
			${data.roll_number},
			${data.semester},
			${data.session},
			${data.father_name ?? null},
			${data.phone ?? null},
			${data.address ?? null}
		)
		RETURNING *
	`) as Row[];
	return rows[0] as unknown as StudentProfile;
}

export async function updateStudentProfile(
	id: number,
	data: Partial<{
		semester: number;
		father_name: string;
		phone: string;
		address: string;
		session: string;
	}>
): Promise<StudentProfile | null> {
	const sql = getSql();
	const rows = (await sql`
		UPDATE student_profiles
		SET
			semester = COALESCE(${data.semester ?? null}, semester),
			father_name = COALESCE(${data.father_name ?? null}, father_name),
			phone = COALESCE(${data.phone ?? null}, phone),
			address = COALESCE(${data.address ?? null}, address),
			session = COALESCE(${data.session ?? null}, session)
		WHERE id = ${id}
		RETURNING *
	`) as Row[];
	return (rows[0] as unknown as StudentProfile) ?? null;
}

export async function deleteStudentProfile(id: number): Promise<void> {
	const sql = getSql();
	const rows = (await sql`SELECT user_id FROM student_profiles WHERE id = ${id}`) as Row[];
	await sql`DELETE FROM student_profiles WHERE id = ${id}`;
	const userId = rows[0]?.user_id;
	if (userId) {
		await sql`DELETE FROM users WHERE id = ${userId}`;
	}
}

export async function getTotalStudentCount(): Promise<number> {
	const sql = getSql();
	const rows = (await sql`SELECT COUNT(*)::int AS count FROM student_profiles`) as Row[];
	return (rows[0]?.count as number) ?? 0;
}
