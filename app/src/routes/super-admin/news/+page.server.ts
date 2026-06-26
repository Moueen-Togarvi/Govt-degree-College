import { fail } from '@sveltejs/kit';
import {
	listLatestNewsItems,
	createLatestNewsItem,
	updateLatestNewsItem,
	deleteLatestNewsItem
} from '$lib/server/database/content';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
	const items = await listLatestNewsItems(100);
	return { items };
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		if (!locals.user || locals.user.role !== 'super_admin')
			return fail(403, { error: 'Unauthorized' });
		const data = await request.formData();
		const title = (data.get('title') as string)?.trim();
		const sortOrder = Number(data.get('sort_order') ?? 0) || 0;
		if (!title) return fail(400, { error: 'Title is required.' });
		try {
			await createLatestNewsItem({ title, sortOrder });
			return { success: true, action: 'create' };
		} catch (e: any) {
			return fail(500, { error: 'Failed to create item: ' + (e?.message ?? '') });
		}
	},

	update: async ({ request, locals }) => {
		if (!locals.user || locals.user.role !== 'super_admin')
			return fail(403, { error: 'Unauthorized' });
		const data = await request.formData();
		const id = Number(data.get('id'));
		const title = (data.get('title') as string)?.trim();
		const sortOrder = Number(data.get('sort_order') ?? 0) || 0;
		if (!id || !title) return fail(400, { error: 'ID and title are required.' });
		try {
			await updateLatestNewsItem({ id, title, sortOrder });
			return { success: true, action: 'update' };
		} catch (e: any) {
			return fail(500, { error: 'Failed to update item: ' + (e?.message ?? '') });
		}
	},

	delete: async ({ request, locals }) => {
		if (!locals.user || locals.user.role !== 'super_admin')
			return fail(403, { error: 'Unauthorized' });
		const data = await request.formData();
		const id = Number(data.get('id'));
		if (!id) return fail(400, { error: 'ID required.' });
		try {
			await deleteLatestNewsItem(id);
			return { success: true, action: 'delete' };
		} catch {
			return fail(500, { error: 'Failed to delete item.' });
		}
	}
};
