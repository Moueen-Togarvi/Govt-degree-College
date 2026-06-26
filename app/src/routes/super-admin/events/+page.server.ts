import { fail } from '@sveltejs/kit';
import { listEvents, createEvent, updateEvent, deleteEvent } from '$lib/server/database/content';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
	const events = await listEvents(100);
	return { events };
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		if (!locals.user || locals.user.role !== 'super_admin')
			return fail(403, { error: 'Unauthorized' });
		const data = await request.formData();
		const title = (data.get('title') as string)?.trim();
		const date = (data.get('date') as string)?.trim();
		const time = (data.get('time') as string)?.trim() || '09:00';
		const location = (data.get('location') as string)?.trim();
		const imageUrl = (data.get('image_url') as string)?.trim() || null;
		const status = (data.get('status') as string)?.trim() || 'Upcoming';

		if (!title || !date || !location)
			return fail(400, { error: 'Title, date and location are required.' });

		try {
			await createEvent({ title, date, time, location, imageUrl, status });
			return { success: true, action: 'create' };
		} catch (e: any) {
			return fail(500, { error: 'Failed to create event: ' + (e?.message ?? '') });
		}
	},

	update: async ({ request, locals }) => {
		if (!locals.user || locals.user.role !== 'super_admin')
			return fail(403, { error: 'Unauthorized' });
		const data = await request.formData();
		const id = Number(data.get('id'));
		const title = (data.get('title') as string)?.trim();
		const date = (data.get('date') as string)?.trim();
		const time = (data.get('time') as string)?.trim() || '09:00';
		const location = (data.get('location') as string)?.trim();
		const imageUrl = (data.get('image_url') as string)?.trim() || null;
		const status = (data.get('status') as string)?.trim() || 'Upcoming';

		if (!id || !title || !date || !location)
			return fail(400, { error: 'ID, title, date and location are required.' });

		try {
			await updateEvent({ id, title, date, time, location, imageUrl, status });
			return { success: true, action: 'update' };
		} catch (e: any) {
			return fail(500, { error: 'Failed to update event: ' + (e?.message ?? '') });
		}
	},

	delete: async ({ request, locals }) => {
		if (!locals.user || locals.user.role !== 'super_admin')
			return fail(403, { error: 'Unauthorized' });
		const data = await request.formData();
		const id = Number(data.get('id'));
		if (!id) return fail(400, { error: 'ID required.' });
		try {
			await deleteEvent(id);
			return { success: true, action: 'delete' };
		} catch {
			return fail(500, { error: 'Failed to delete event.' });
		}
	}
};
