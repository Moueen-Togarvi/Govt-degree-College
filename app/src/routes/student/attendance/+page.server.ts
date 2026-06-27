// Student — Attendance Detail Page
import { getStudentByUserId } from '$lib/server/database/students';
import { getStudentAttendance } from '$lib/server/database/attendance';
import { getSql } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const profile = await getStudentByUserId(locals.user!.id);
	if (!profile) return { profile: null, attendance: [], detail: [] };

	const attendance = await getStudentAttendance(profile.id);

	const sql = getSql();
	// Get recent 30 attendance entries
	const detail = await sql`
		SELECT a.date, a.status, c.title AS course_title, c.code AS course_code
		FROM attendance a
		JOIN course_offerings co ON co.id = a.course_offering_id
		JOIN courses c ON c.id = co.course_id
		WHERE a.student_id = ${profile.id}
		ORDER BY a.date DESC LIMIT 30
	`;

	return {
		profile,
		attendance,
		detail: detail as unknown as {
			date: string;
			status: string;
			course_title: string;
			course_code: string;
		}[]
	};
};
