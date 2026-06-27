import { redirect } from '@sveltejs/kit';
import { getStudentByUserId } from '$lib/server/database/students';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user || (locals.user.role !== 'student' && locals.user.role !== 'super_admin')) {
		redirect(303, '/portal');
	}
	const profile = await getStudentByUserId(locals.user.id);
	return { user: locals.user, profile };
};
