/**
 * database/timetable.ts — Timetable CRUD and retrieval
 */
import { getSql } from '../db';

export interface TimetableEntry {
	id: number;
	course_offering_id: number;
	room: string | null;
	day: string;
	start_time: string;
	end_time: string;
	class_type: 'lecture' | 'lab';
	created_at: string;
	// Joined
	course_code?: string;
	course_title?: string;
	teacher_name?: string;
	semester?: number;
}

type Row = Record<string, unknown>;

export async function getTimetableByDepartment(departmentId: number): Promise<TimetableEntry[]> {
	const sql = getSql();
	const rows = await sql`
		SELECT t.*, c.code AS course_code, c.title AS course_title, u.name AS teacher_name, co.semester
		FROM timetable t
		JOIN course_offerings co ON co.id = t.course_offering_id
		JOIN courses c ON c.id = co.course_id
		JOIN faculty_profiles fp ON fp.id = co.teacher_id
		JOIN users u ON u.id = fp.user_id
		WHERE co.department_id = ${departmentId}
		ORDER BY
			CASE t.day
				WHEN 'Monday' THEN 1
				WHEN 'Tuesday' THEN 2
				WHEN 'Wednesday' THEN 3
				WHEN 'Thursday' THEN 4
				WHEN 'Friday' THEN 5
				WHEN 'Saturday' THEN 6
				ELSE 7
			END ASC,
			t.start_time ASC
	`;
	return rows as unknown as TimetableEntry[];
}

export async function getTimetableForStudent(studentId: number): Promise<TimetableEntry[]> {
	const sql = getSql();
	const rows = await sql`
		SELECT t.*, c.code AS course_code, c.title AS course_title, u.name AS teacher_name, co.semester
		FROM timetable t
		JOIN course_offerings co ON co.id = t.course_offering_id
		JOIN enrollments e ON e.course_offering_id = co.id
		JOIN courses c ON c.id = co.course_id
		JOIN faculty_profiles fp ON fp.id = co.teacher_id
		JOIN users u ON u.id = fp.user_id
		WHERE e.student_id = ${studentId}
		ORDER BY
			CASE t.day
				WHEN 'Monday' THEN 1
				WHEN 'Tuesday' THEN 2
				WHEN 'Wednesday' THEN 3
				WHEN 'Thursday' THEN 4
				WHEN 'Friday' THEN 5
				WHEN 'Saturday' THEN 6
				ELSE 7
			END ASC,
			t.start_time ASC
	`;
	return rows as unknown as TimetableEntry[];
}

export async function getTimetableForFaculty(facultyId: number): Promise<TimetableEntry[]> {
	const sql = getSql();
	const rows = await sql`
		SELECT t.*, c.code AS course_code, c.title AS course_title, co.semester
		FROM timetable t
		JOIN course_offerings co ON co.id = t.course_offering_id
		JOIN courses c ON c.id = co.course_id
		WHERE co.teacher_id = ${facultyId}
		ORDER BY
			CASE t.day
				WHEN 'Monday' THEN 1
				WHEN 'Tuesday' THEN 2
				WHEN 'Wednesday' THEN 3
				WHEN 'Thursday' THEN 4
				WHEN 'Friday' THEN 5
				WHEN 'Saturday' THEN 6
				ELSE 7
			END ASC,
			t.start_time ASC
	`;
	return rows as unknown as TimetableEntry[];
}

export async function createTimetableEntry(data: {
	course_offering_id: number;
	room?: string;
	day: string;
	start_time: string;
	end_time: string;
	class_type: string;
}): Promise<TimetableEntry> {
	const sql = getSql();
	const rows = (await sql`
		INSERT INTO timetable (course_offering_id, room, day, start_time, end_time, class_type)
		VALUES (
			${data.course_offering_id},
			${data.room ?? null},
			${data.day},
			${data.start_time},
			${data.end_time},
			${data.class_type}
		)
		RETURNING *
	`) as Row[];
	return rows[0] as unknown as TimetableEntry;
}

export async function deleteTimetableEntry(id: number): Promise<void> {
	const sql = getSql();
	await sql`DELETE FROM timetable WHERE id = ${id}`;
}
