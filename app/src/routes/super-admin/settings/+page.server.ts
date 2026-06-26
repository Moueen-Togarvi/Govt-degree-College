import { fail } from '@sveltejs/kit';
import { isDatabaseConfigured } from '$lib/server/db';
import { initializeDatabase } from '$lib/server/database/setup';
import { countUsersByRole } from '$lib/server/database/users';
import { getAllDepartments } from '$lib/server/database/departments';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { user } = await parent();
	let dbReady = false;
	let counts: Record<string, number> = {};
	let deptCount = 0;
	try {
		dbReady = true;
		[counts, deptCount] = await Promise.all([
			countUsersByRole(),
			getAllDepartments().then((d) => d.length)
		]);
	} catch {
		dbReady = false;
	}
	return { user, dbConfigured: isDatabaseConfigured(), dbReady, counts, deptCount };
};

export const actions: Actions = {
	seed: async ({ locals }) => {
		if (!locals.user || locals.user.role !== 'super_admin')
			return fail(403, { error: 'Unauthorized' });
		try {
			await initializeDatabase({ seed: true });
			return { success: true, message: 'Content tables ensured and empty tables seeded.' };
		} catch (e: any) {
			return fail(500, { error: 'Re-seed failed: ' + (e?.message ?? '') });
		}
	}
};
