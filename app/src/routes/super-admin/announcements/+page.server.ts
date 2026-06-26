import { fail } from '@sveltejs/kit';
import {
	listAnnouncements,
	createAnnouncement,
	updateAnnouncement,
	deleteAnnouncement
} from '$lib/server/database/content';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
	const announcements = await listAnnouncements(100);
	return { announcements };
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		if (!locals.user || locals.user.role !== 'super_admin')
			return fail(403, { error: 'Unauthorized' });
		const data = await request.formData();
		const title = (data.get('title') as string)?.trim();
		const description = (data.get('description') as string)?.trim();
		const category = (data.get('category') as string)?.trim() || 'General';
		const date = (data.get('date') as string)?.trim() || undefined;

		if (!title || !description) return fail(400, { error: 'Title and description are required.' });

		try {
			await createAnnouncement({ title, description, category, date });
			return { success: true, action: 'create' };
		} catch (e: any) {
			return fail(500, { error: 'Failed to create announcement: ' + (e?.message ?? '') });
		}
	},

	update: async ({ request, locals }) => {
		if (!locals.user || locals.user.role !== 'super_admin')
			return fail(403, { error: 'Unauthorized' });
		const data = await request.formData();
		const id = Number(data.get('id'));
		const title = (data.get('title') as string)?.trim();
		const description = (data.get('description') as string)?.trim();
		const category = (data.get('category') as string)?.trim() || 'General';
		const date = (data.get('date') as string)?.trim() || new Date().toISOString();

		if (!id || !title || !description)
			return fail(400, { error: 'ID, title and description are required.' });

		try {
			await updateAnnouncement({ id, title, description, category, date });
			return { success: true, action: 'update' };
		} catch (e: any) {
			return fail(500, { error: 'Failed to update announcement: ' + (e?.message ?? '') });
		}
	},

	delete: async ({ request, locals }) => {
		if (!locals.user || locals.user.role !== 'super_admin')
			return fail(403, { error: 'Unauthorized' });
		const data = await request.formData();
		const id = Number(data.get('id'));
		if (!id) return fail(400, { error: 'ID required.' });
		try {
			await deleteAnnouncement(id);
			return { success: true, action: 'delete' };
		} catch {
			return fail(500, { error: 'Failed to delete announcement.' });
		}
	}
};
