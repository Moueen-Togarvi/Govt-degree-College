import { redirect } from '@sveltejs/kit';
import { getDepartmentByCoordinatorId } from '$lib/server/database/departments';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user || (locals.user.role !== 'coordinator' && locals.user.role !== 'super_admin')) {
		redirect(303, '/login');
	}
	const department = await getDepartmentByCoordinatorId(locals.user.id);
	return { user: locals.user, department };
};
