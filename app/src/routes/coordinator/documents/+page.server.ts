// Coordinator Documents Server
import { fail } from '@sveltejs/kit';
import { getDepartmentByCoordinatorId } from '$lib/server/database/departments';
import { getOfferingsByDepartment } from '$lib/server/database/courses';
import { getSql } from '$lib/server/db';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const dept = await getDepartmentByCoordinatorId(locals.user!.id);
	if (!dept) return { department: null, documents: [], offerings: [] };

	const offerings = await getOfferingsByDepartment(dept.id);
	
	const sql = getSql();
	const documents = await sql`
		SELECT d.*, u.name AS uploaded_by_name,
		       co.semester, c.code AS course_code, c.title AS course_title
		FROM documents d
		LEFT JOIN users u ON u.id = d.uploaded_by
		LEFT JOIN course_offerings co ON co.id = d.course_offering_id
		LEFT JOIN courses c ON c.id = co.course_id
		WHERE d.department_id = ${dept.id}
		ORDER BY d.created_at DESC
	`;

	return { department: dept, documents: documents as unknown as any[], offerings };
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const dept = await getDepartmentByCoordinatorId(locals.user!.id);
		if (!dept) return fail(403, { error: 'No department assigned' });

		const fd = await request.formData();
		const title = fd.get('title')?.toString().trim();
		const file_url = fd.get('file_url')?.toString().trim(); // Note: In a real app, handle file uploads.
		const doc_type = fd.get('doc_type')?.toString();
		const course_offering_id = fd.get('course_offering_id')?.toString();

		if (!title || !file_url || !doc_type) {
			return fail(400, { error: 'Title, File URL, and Type are required.' });
		}

		try {
			const sql = getSql();
			await sql`
				INSERT INTO documents (department_id, course_offering_id, title, file_url, doc_type, uploaded_by)
				VALUES (
					${dept.id},
					${course_offering_id ? parseInt(course_offering_id) : null},
					${title},
					${file_url},
					${doc_type},
					${locals.user!.id}
				)
			`;
			return { success: true, message: 'Document added successfully.' };
		} catch (err: unknown) {
			return fail(500, { error: 'Failed to add document. ' + (err as Error).message });
		}
	},

	delete: async ({ request }) => {
		const fd = await request.formData();
		const id = parseInt(fd.get('id')?.toString() ?? '0');
		if (!id) return fail(400, { error: 'Invalid ID' });
		
		try {
			const sql = getSql();
			await sql`DELETE FROM documents WHERE id = ${id}`;
			return { success: true, message: 'Document deleted.' };
		} catch (err: unknown) {
			return fail(500, { error: (err as Error).message });
		}
	}
};
