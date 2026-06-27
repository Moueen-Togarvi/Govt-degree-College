// Student Documents Server
import { getStudentByUserId } from '$lib/server/database/students';
import { getSql } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const profile = await getStudentByUserId(locals.user!.id);
	if (!profile) return { profile: null, documents: [] };

	const sql = getSql();

	// Students see general department documents OR documents tied to courses they are enrolled in
	const documents = await sql`
		SELECT d.*, u.name AS uploaded_by_name,
		       co.semester, c.code AS course_code, c.title AS course_title
		FROM documents d
		LEFT JOIN users u ON u.id = d.uploaded_by
		LEFT JOIN course_offerings co ON co.id = d.course_offering_id
		LEFT JOIN courses c ON c.id = co.course_id
		WHERE d.department_id = ${profile.department_id}
		  AND (
			d.course_offering_id IS NULL
			OR d.course_offering_id IN (
				SELECT course_offering_id FROM enrollments WHERE student_id = ${profile.id}
			)
		  )
		ORDER BY d.created_at DESC
	`;

	return { profile, documents: documents as unknown as any[] };
};
