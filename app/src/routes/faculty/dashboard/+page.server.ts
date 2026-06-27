// Faculty Dashboard
import { getFacultyByUserId } from '$lib/server/database/faculty';
import { getSql } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const profile = await getFacultyByUserId(locals.user!.id);
	if (!profile)
		return { profile: null, offerings: [], stats: { students: 0, courses: 0, markedToday: 0 } };

	const sql = getSql();
	// Get assigned course offerings
	const offerings = await sql`
		SELECT co.*, c.title AS course_title, c.code AS course_code, c.credit_hours,
		       COUNT(DISTINCT e.student_id)::int AS student_count
		FROM course_offerings co
		JOIN courses c ON c.id = co.course_id
		LEFT JOIN enrollments e ON e.course_offering_id = co.id
		WHERE co.teacher_id = ${profile.id} AND co.is_active = TRUE
		GROUP BY co.id, c.title, c.code, c.credit_hours
		ORDER BY co.semester ASC, c.title ASC
	`;

	// Count today's attendance marked by this faculty
	const today = new Date().toISOString().split('T')[0];
	const markedRows = (await sql`
		SELECT COUNT(DISTINCT a.course_offering_id)::int AS count
		FROM attendance a
		WHERE a.marked_by = ${profile.id} AND a.date = ${today}
	`) as Record<string, unknown>[];

	const students = (await sql`
		SELECT COUNT(DISTINCT e.student_id)::int AS count
		FROM enrollments e
		JOIN course_offerings co ON co.id = e.course_offering_id
		WHERE co.teacher_id = ${profile.id}
	`) as Record<string, unknown>[];

	return {
		profile,
		offerings: offerings as unknown as {
			id: number;
			course_id: number;
			course_title: string;
			course_code: string;
			semester: number;
			session: string;
			student_count: number;
		}[],
		stats: {
			courses: (offerings as unknown[]).length,
			students: (students[0]?.count as number) ?? 0,
			markedToday: (markedRows[0]?.count as number) ?? 0
		}
	};
};
