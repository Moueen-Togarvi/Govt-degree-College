/**
 * database/courses.ts — Course & Course Offering CRUD
 */
import { getSql } from '../db';

export interface Course {
	id: number;
	code: string;
	title: string;
	credit_hours: number;
	department_id: number;
	description: string | null;
	course_outline: string | null;
	created_at: string;
}

export interface CourseOffering {
	id: number;
	course_id: number;
	teacher_id: number;
	semester: number;
	session: string;
	department_id: number;
	is_active: boolean;
	created_at: string;
	// Joined
	course_title?: string;
	course_code?: string;
	teacher_name?: string;
	credit_hours?: number;
}

type Row = Record<string, unknown>;

// ─── Courses ──────────────────────────────────────────────────────────────────

export async function getCoursesByDepartment(departmentId: number): Promise<Course[]> {
	const sql = getSql();
	const rows = await sql`
		SELECT * FROM courses WHERE department_id = ${departmentId} ORDER BY title ASC
	`;
	return rows as unknown as Course[];
}

export async function createCourse(data: {
	code: string;
	title: string;
	credit_hours: number;
	department_id: number;
	description?: string;
}): Promise<Course> {
	const sql = getSql();
	const rows = (await sql`
		INSERT INTO courses (code, title, credit_hours, department_id, description)
		VALUES (${data.code}, ${data.title}, ${data.credit_hours}, ${data.department_id}, ${data.description ?? null})
		RETURNING *
	`) as Row[];
	return rows[0] as unknown as Course;
}

export async function updateCourse(id: number, data: Partial<{
	code: string; title: string; credit_hours: number; description: string;
}>): Promise<Course | null> {
	const sql = getSql();
	const rows = (await sql`
		UPDATE courses SET
			code = COALESCE(${data.code ?? null}, code),
			title = COALESCE(${data.title ?? null}, title),
			credit_hours = COALESCE(${data.credit_hours ?? null}, credit_hours),
			description = COALESCE(${data.description ?? null}, description)
		WHERE id = ${id} RETURNING *
	`) as Row[];
	return (rows[0] as unknown as Course) ?? null;
}

export async function deleteCourse(id: number): Promise<void> {
	const sql = getSql();
	await sql`DELETE FROM courses WHERE id = ${id}`;
}

// ─── Course Offerings ─────────────────────────────────────────────────────────

export async function getOfferingsByDepartment(departmentId: number): Promise<CourseOffering[]> {
	const sql = getSql();
	const rows = await sql`
		SELECT co.*, c.title AS course_title, c.code AS course_code, c.credit_hours,
		       u.name AS teacher_name
		FROM course_offerings co
		JOIN courses c ON c.id = co.course_id
		JOIN faculty_profiles fp ON fp.id = co.teacher_id
		JOIN users u ON u.id = fp.user_id
		WHERE co.department_id = ${departmentId}
		ORDER BY co.semester ASC, c.title ASC
	`;
	return rows as unknown as CourseOffering[];
}

export async function createOffering(data: {
	course_id: number;
	teacher_id: number;
	semester: number;
	session: string;
	department_id: number;
}): Promise<CourseOffering> {
	const sql = getSql();
	const rows = (await sql`
		INSERT INTO course_offerings (course_id, teacher_id, semester, session, department_id)
		VALUES (${data.course_id}, ${data.teacher_id}, ${data.semester}, ${data.session}, ${data.department_id})
		RETURNING *
	`) as Row[];
	return rows[0] as unknown as CourseOffering;
}

export async function deleteOffering(id: number): Promise<void> {
	const sql = getSql();
	await sql`DELETE FROM course_offerings WHERE id = ${id}`;
}
