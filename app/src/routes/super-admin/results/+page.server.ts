import { fail } from '@sveltejs/kit';
import {
	listExamResults,
	createExamResult,
	updateExamResult,
	deleteExamResult
} from '$lib/server/database/content';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
	const results = await listExamResults({ limit: 100 });
	return { results };
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		if (!locals.user || locals.user.role !== 'super_admin')
			return fail(403, { error: 'Unauthorized' });
		const data = await request.formData();
		const title = (data.get('title') as string)?.trim();
		const publishDate = (data.get('publish_date') as string)?.trim();
		const resultType = (data.get('result_type') as string)?.trim() || 'Annual';
		const fileUrl = (data.get('file_url') as string)?.trim() || null;

		if (!title || !publishDate) return fail(400, { error: 'Title and publish date are required.' });

		try {
			await createExamResult({ title, publishDate, resultType, fileUrl });
			return { success: true, action: 'create' };
		} catch (e: any) {
			return fail(500, { error: 'Failed to create result: ' + (e?.message ?? '') });
		}
	},

	update: async ({ request, locals }) => {
		if (!locals.user || locals.user.role !== 'super_admin')
			return fail(403, { error: 'Unauthorized' });
		const data = await request.formData();
		const id = Number(data.get('id'));
		const title = (data.get('title') as string)?.trim();
		const publishDate = (data.get('publish_date') as string)?.trim();
		const resultType = (data.get('result_type') as string)?.trim() || 'Annual';
		const fileUrl = (data.get('file_url') as string)?.trim() || null;

		if (!id || !title || !publishDate)
			return fail(400, { error: 'ID, title and publish date are required.' });

		try {
			await updateExamResult({ id, title, publishDate, resultType, fileUrl });
			return { success: true, action: 'update' };
		} catch (e: any) {
			return fail(500, { error: 'Failed to update result: ' + (e?.message ?? '') });
		}
	},

	delete: async ({ request, locals }) => {
		if (!locals.user || locals.user.role !== 'super_admin')
			return fail(403, { error: 'Unauthorized' });
		const data = await request.formData();
		const id = Number(data.get('id'));
		if (!id) return fail(400, { error: 'ID required.' });
		try {
			await deleteExamResult(id);
			return { success: true, action: 'delete' };
		} catch {
			return fail(500, { error: 'Failed to delete result.' });
		}
	}
};
