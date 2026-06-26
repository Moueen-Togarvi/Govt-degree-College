import { redirect } from '@sveltejs/kit';
import { getAllDepartments } from '$lib/server/database/departments';
import { countUsersByRole } from '$lib/server/database/users';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user || locals.user.role !== 'super_admin') {
		redirect(303, '/login');
	}

	const [departments, userCounts] = await Promise.all([
		getAllDepartments(),
		countUsersByRole()
	]);

	return {
		user: locals.user,
		departments,
		userCounts
	};
};
