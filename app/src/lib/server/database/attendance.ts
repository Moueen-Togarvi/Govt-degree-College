/**
 * database/attendance.ts — Attendance marking & retrieval
 */
import { getSql } from '../db';

export interface AttendanceRecord {
	id: number;
	student_id: number;
	course_offering_id: number;
	date: string;
	status: 'present' | 'absent' | 'late' | 'leave';
	marked_by: number | null;
	created_at: string;
	// Joined
	student_name?: string;
	roll_number?: string;
}

export interface AttendanceSummary {
	student_id: number;
	student_name: string;
	roll_number: string;
	total: number;
	present: number;
	absent: number;
	late: number;
	percentage: number;
}

type Row = Record<string, unknown>;

/** Mark or update attendance for a list of students on a specific date */
export async function markAttendance(records: {
	student_id: number;
	course_offering_id: number;
	date: string;
	status: string;
	marked_by: number;
}[]): Promise<void> {
	if (!records.length) return;
	const sql = getSql();

	for (const r of records) {
		await sql`
			INSERT INTO attendance (student_id, course_offering_id, date, status, marked_by)
			VALUES (${r.student_id}, ${r.course_offering_id}, ${r.date}, ${r.status}, ${r.marked_by})
			ON CONFLICT (student_id, course_offering_id, date)
			DO UPDATE SET status = EXCLUDED.status, marked_by = EXCLUDED.marked_by
		`;
	}
}

/** Get attendance for an offering on a specific date */
export async function getAttendanceByDate(
	courseOfferingId: number,
	date: string
): Promise<AttendanceRecord[]> {
	const sql = getSql();
	const rows = await sql`
		SELECT a.*, u.name AS student_name, sp.roll_number
		FROM attendance a
		JOIN student_profiles sp ON sp.id = a.student_id
		JOIN users u ON u.id = sp.user_id
		WHERE a.course_offering_id = ${courseOfferingId}
		  AND a.date = ${date}
		ORDER BY sp.roll_number ASC
	`;
	return rows as unknown as AttendanceRecord[];
}

/** Get attendance summary per student for an offering */
export async function getAttendanceSummary(
	courseOfferingId: number
): Promise<AttendanceSummary[]> {
	const sql = getSql();
	const rows = (await sql`
		SELECT
			sp.id AS student_id,
			u.name AS student_name,
			sp.roll_number,
			COUNT(*) AS total,
			COUNT(*) FILTER (WHERE a.status = 'present') AS present,
			COUNT(*) FILTER (WHERE a.status = 'absent') AS absent,
			COUNT(*) FILTER (WHERE a.status = 'late') AS late
		FROM attendance a
		JOIN student_profiles sp ON sp.id = a.student_id
		JOIN users u ON u.id = sp.user_id
		WHERE a.course_offering_id = ${courseOfferingId}
		GROUP BY sp.id, u.name, sp.roll_number
		ORDER BY sp.roll_number ASC
	`) as Row[];

	return rows.map((r) => {
		const total = Number(r.total ?? 0);
		const present = Number(r.present ?? 0);
		return {
			student_id: r.student_id as number,
			student_name: r.student_name as string,
			roll_number: r.roll_number as string,
			total,
			present,
			absent: Number(r.absent ?? 0),
			late: Number(r.late ?? 0),
			percentage: total > 0 ? Math.round((present / total) * 100) : 0
		};
	});
}

/** Get attendance for a specific student across all offerings */
export async function getStudentAttendance(studentId: number): Promise<{
	course_title: string;
	course_code: string;
	total: number;
	present: number;
	absent: number;
	late: number;
	percentage: number;
}[]> {
	const sql = getSql();
	const rows = (await sql`
		SELECT
			c.title AS course_title,
			c.code AS course_code,
			COUNT(*) AS total,
			COUNT(*) FILTER (WHERE a.status = 'present') AS present,
			COUNT(*) FILTER (WHERE a.status = 'absent') AS absent,
			COUNT(*) FILTER (WHERE a.status = 'late') AS late
		FROM attendance a
		JOIN course_offerings co ON co.id = a.course_offering_id
		JOIN courses c ON c.id = co.course_id
		WHERE a.student_id = ${studentId}
		GROUP BY c.title, c.code
		ORDER BY c.title ASC
	`) as Row[];

	return rows.map((r) => {
		const total = Number(r.total ?? 0);
		const present = Number(r.present ?? 0);
		return {
			course_title: r.course_title as string,
			course_code: r.course_code as string,
			total,
			present,
			absent: Number(r.absent ?? 0),
			late: Number(r.late ?? 0),
			percentage: total > 0 ? Math.round((present / total) * 100) : 0
		};
	});
}
