// Student — Courses Page
import { getStudentByUserId } from '$lib/server/database/students';
import { getSql } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const profile = await getStudentByUserId(locals.user!.id);
	if (!profile) return { profile: null, courses: [] };

	const sql = getSql();
	const courses = await sql`
		SELECT c.title, c.code, c.credit_hours, c.description, co.semester, u.name AS teacher_name, fp.designation
		FROM enrollments e
		JOIN course_offerings co ON co.id = e.course_offering_id
		JOIN courses c ON c.id = co.course_id
		JOIN faculty_profiles fp ON fp.id = co.teacher_id
		JOIN users u ON u.id = fp.user_id
		WHERE e.student_id = ${profile.id}
		ORDER BY c.title ASC
	`;

	return {
		profile,
		courses: courses as unknown as {
			title: string;
			code: string;
			credit_hours: number;
			description: string | null;
			semester: number;
			teacher_name: string;
			designation: string;
		}[]
	};
};
