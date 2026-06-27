/**
 * database/marks.ts — Marks entry and results retrieval
 */
import { getSql } from '../db';

export interface Mark {
	id: number;
	student_id: number;
	course_offering_id: number;
	midterm: number;
	finals: number;
	quizzes: number;
	assignments: number;
	practical: number;
	total: number;
	grade: string | null;
	gpa_points: number | null;
	is_published: boolean;
	// Joined
	student_name?: string;
	roll_number?: string;
	course_title?: string;
	course_code?: string;
}

type Row = Record<string, unknown>;

/** Get all marks for an offering (for faculty/coordinator view) */
export async function getMarksByOffering(courseOfferingId: number): Promise<Mark[]> {
	const sql = getSql();
	const rows = await sql`
		SELECT m.*, u.name AS student_name, sp.roll_number
		FROM marks m
		JOIN student_profiles sp ON sp.id = m.student_id
		JOIN users u ON u.id = sp.user_id
		WHERE m.course_offering_id = ${courseOfferingId}
		ORDER BY sp.roll_number ASC
	`;
	return rows as unknown as Mark[];
}

/** Upsert marks for a student in a course offering */
export async function upsertMark(data: {
	student_id: number;
	course_offering_id: number;
	midterm?: number;
	finals?: number;
	quizzes?: number;
	assignments?: number;
	practical?: number;
	grade?: string;
	gpa_points?: number;
}): Promise<Mark> {
	const sql = getSql();
	const rows = (await sql`
		INSERT INTO marks (student_id, course_offering_id, midterm, finals, quizzes, assignments, practical, grade, gpa_points)
		VALUES (
			${data.student_id}, ${data.course_offering_id},
			${data.midterm ?? 0}, ${data.finals ?? 0}, ${data.quizzes ?? 0},
			${data.assignments ?? 0}, ${data.practical ?? 0},
			${data.grade ?? null}, ${data.gpa_points ?? null}
		)
		ON CONFLICT (student_id, course_offering_id)
		DO UPDATE SET
			midterm = EXCLUDED.midterm,
			finals = EXCLUDED.finals,
			quizzes = EXCLUDED.quizzes,
			assignments = EXCLUDED.assignments,
			practical = EXCLUDED.practical,
			grade = COALESCE(EXCLUDED.grade, marks.grade),
			gpa_points = COALESCE(EXCLUDED.gpa_points, marks.gpa_points),
			updated_at = CURRENT_TIMESTAMP
		RETURNING *
	`) as Row[];
	return rows[0] as unknown as Mark;
}

/** Publish/unpublish results for a course offering */
export async function publishResults(courseOfferingId: number, publish: boolean): Promise<void> {
	const sql = getSql();
	await sql`
		UPDATE marks SET is_published = ${publish}
		WHERE course_offering_id = ${courseOfferingId}
	`;
}

/** Get published results for a student */
export async function getStudentResults(studentId: number): Promise<
	{
		course_title: string;
		course_code: string;
		credit_hours: number;
		midterm: number;
		finals: number;
		quizzes: number;
		assignments: number;
		practical: number;
		total: number;
		grade: string | null;
		gpa_points: number | null;
		is_published: boolean;
	}[]
> {
	const sql = getSql();
	const rows = await sql`
		SELECT m.*, c.title AS course_title, c.code AS course_code, c.credit_hours
		FROM marks m
		JOIN course_offerings co ON co.id = m.course_offering_id
		JOIN courses c ON c.id = co.course_id
		WHERE m.student_id = ${studentId}
		ORDER BY c.title ASC
	`;
	return rows as unknown as {
		course_title: string;
		course_code: string;
		credit_hours: number;
		midterm: number;
		finals: number;
		quizzes: number;
		assignments: number;
		practical: number;
		total: number;
		grade: string | null;
		gpa_points: number | null;
		is_published: boolean;
	}[];
}

/** Calculate grade from total marks (out of 100) */
export function calculateGrade(total: number): { grade: string; gpa: number } {
	if (total >= 90) return { grade: 'A+', gpa: 4.0 };
	if (total >= 85) return { grade: 'A', gpa: 4.0 };
	if (total >= 80) return { grade: 'A-', gpa: 3.7 };
	if (total >= 75) return { grade: 'B+', gpa: 3.3 };
	if (total >= 71) return { grade: 'B', gpa: 3.0 };
	if (total >= 68) return { grade: 'B-', gpa: 2.7 };
	if (total >= 64) return { grade: 'C+', gpa: 2.3 };
	if (total >= 61) return { grade: 'C', gpa: 2.0 };
	if (total >= 58) return { grade: 'C-', gpa: 1.7 };
	if (total >= 55) return { grade: 'D+', gpa: 1.3 };
	if (total >= 50) return { grade: 'D', gpa: 1.0 };
	return { grade: 'F', gpa: 0.0 };
}
