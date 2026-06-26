// FYP Database Module
import { getSql } from '../db';

export interface FypProject {
	id: number;
	department_id: number;
	title: string;
	description: string | null;
	supervisor_id: number | null;
	status: 'Proposed' | 'Approved' | 'InProgress' | 'Completed' | 'Cancelled';
	session: string;
	created_at: string;
	// Joined
	supervisor_name?: string;
	member_count?: number;
}

export interface FypMember {
	id: number;
	fyp_id: number;
	student_id: number;
	// Joined
	student_name?: string;
	roll_number?: string;
}

type Row = Record<string, unknown>;

export async function getProjectsByDepartment(departmentId: number): Promise<FypProject[]> {
	const sql = getSql();
	const rows = await sql`
		SELECT p.*, 
		       u.name AS supervisor_name,
		       (SELECT count(*) FROM fyp_members m WHERE m.fyp_id = p.id) AS member_count
		FROM fyp_projects p
		LEFT JOIN faculty_profiles fp ON fp.id = p.supervisor_id
		LEFT JOIN users u ON u.id = fp.user_id
		WHERE p.department_id = ${departmentId}
		ORDER BY p.created_at DESC
	`;
	return rows as unknown as FypProject[];
}

export async function createProject(data: {
	department_id: number;
	title: string;
	description?: string;
	supervisor_id?: number;
	session: string;
}): Promise<FypProject> {
	const sql = getSql();
	const rows = (await sql`
		INSERT INTO fyp_projects (department_id, title, description, supervisor_id, session)
		VALUES (
			${data.department_id}, 
			${data.title}, 
			${data.description ?? null}, 
			${data.supervisor_id ?? null}, 
			${data.session}
		)
		RETURNING *
	`) as Row[];
	return rows[0] as unknown as FypProject;
}

export async function updateProjectStatus(projectId: number, status: string): Promise<void> {
	const sql = getSql();
	await sql`UPDATE fyp_projects SET status = ${status} WHERE id = ${projectId}`;
}

export async function getProjectMembers(projectId: number): Promise<FypMember[]> {
	const sql = getSql();
	const rows = await sql`
		SELECT m.*, u.name AS student_name, sp.roll_number
		FROM fyp_members m
		JOIN student_profiles sp ON sp.id = m.student_id
		JOIN users u ON u.id = sp.user_id
		WHERE m.fyp_id = ${projectId}
		ORDER BY sp.roll_number ASC
	`;
	return rows as unknown as FypMember[];
}

export async function addProjectMember(projectId: number, studentId: number): Promise<void> {
	const sql = getSql();
	await sql`
		INSERT INTO fyp_members (fyp_id, student_id)
		VALUES (${projectId}, ${studentId})
		ON CONFLICT DO NOTHING
	`;
}

export async function removeProjectMember(projectId: number, studentId: number): Promise<void> {
	const sql = getSql();
	await sql`DELETE FROM fyp_members WHERE fyp_id = ${projectId} AND student_id = ${studentId}`;
}

export async function deleteProject(projectId: number): Promise<void> {
	const sql = getSql();
	await sql`DELETE FROM fyp_projects WHERE id = ${projectId}`;
}
