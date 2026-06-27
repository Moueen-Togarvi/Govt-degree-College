import { fail, redirect } from '@sveltejs/kit';
import {
	getAllDepartments,
	createDepartment,
	updateDepartment,
	deleteDepartment
} from '$lib/server/database/departments';
import { getAllUsers } from '$lib/server/database/users';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user || locals.user.role !== 'super_admin') {
		redirect(303, '/portal');
	}
	let departments: Awaited<ReturnType<typeof getAllDepartments>> = [];
	let coordinators: Awaited<ReturnType<typeof getAllUsers>> = [];
	try {
		[departments, coordinators] = await Promise.all([getAllDepartments(), getAllUsers()]);
		coordinators = coordinators.filter((u) => u.role === 'coordinator');
	} catch (e: any) {
		return { departments, coordinators, dbError: true };
	}
	return { departments, coordinators };
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		if (!locals.user || locals.user.role !== 'super_admin') {
			return fail(403, { error: 'Unauthorized' });
		}
		const data = await request.formData();
		const name = (data.get('name') as string)?.trim();
		const urdu_name = (data.get('urdu_name') as string)?.trim();
		const description = (data.get('description') as string)?.trim();
		const coordinator_id = data.get('coordinator_id')
			? Number(data.get('coordinator_id'))
			: undefined;

		if (!name) return fail(400, { error: 'Department name is required.' });

		const slug = name
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '');

		try {
			await createDepartment({ name, slug, urdu_name, description, coordinator_id });
			return { success: true, action: 'create' };
		} catch (e: any) {
			if (e?.message?.includes('unique')) {
				return fail(409, { error: 'A department with this name already exists.' });
			}
			return fail(500, { error: 'Failed to create department.' });
		}
	},

	update: async ({ request, locals }) => {
		if (!locals.user || locals.user.role !== 'super_admin') {
			return fail(403, { error: 'Unauthorized' });
		}
		const data = await request.formData();
		const id = Number(data.get('id'));
		const name = (data.get('name') as string)?.trim();
		const urdu_name = (data.get('urdu_name') as string)?.trim();
		const description = (data.get('description') as string)?.trim();
		const coordinator_id = data.get('coordinator_id')
			? Number(data.get('coordinator_id'))
			: undefined;

		if (!id || !name) return fail(400, { error: 'ID and name are required.' });

		const slug = name
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '');

		try {
			await updateDepartment(id, { name, slug, urdu_name, description, coordinator_id });
			return { success: true, action: 'update' };
		} catch {
			return fail(500, { error: 'Failed to update department.' });
		}
	},

	delete: async ({ request, locals }) => {
		if (!locals.user || locals.user.role !== 'super_admin') {
			return fail(403, { error: 'Unauthorized' });
		}
		const data = await request.formData();
		const id = Number(data.get('id'));
		if (!id) return fail(400, { error: 'Department ID required.' });

		try {
			await deleteDepartment(id);
			return { success: true, action: 'delete' };
		} catch (e: any) {
			return fail(500, { error: 'Cannot delete department — it may have linked data.' });
		}
	}
};
