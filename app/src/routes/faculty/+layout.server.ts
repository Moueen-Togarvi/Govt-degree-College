import { redirect } from '@sveltejs/kit';
import { getFacultyByUserId } from '$lib/server/database/faculty';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user || (locals.user.role !== 'faculty' && locals.user.role !== 'super_admin')) {
		redirect(303, '/login');
	}
	const profile = await getFacultyByUserId(locals.user.id);
	return { user: locals.user, profile };
};
