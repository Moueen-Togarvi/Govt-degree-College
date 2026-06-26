import { redirect } from '@sveltejs/kit';
import { getAllDepartments } from '$lib/server/database/departments';
import { countUsersByRole } from '$lib/server/database/users';
import { logDatabaseLoadError } from '$lib/server/db';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user || locals.user.role !== 'super_admin') {
		redirect(303, '/login');
	}

	let departments: Awaited<ReturnType<typeof getAllDepartments>> = [];
	let userCounts: Record<string, number> = {};

	// The layout data is needed on every admin page, so a transient Neon hiccup
	// should never hard-crash the whole admin. Fall back to empty data on failure.
	try {
		[departments, userCounts] = await Promise.all([getAllDepartments(), countUsersByRole()]);
	} catch (error) {
		logDatabaseLoadError('super-admin layout', error);
	}

	return {
		user: locals.user,
		departments,
		userCounts
	};
};
