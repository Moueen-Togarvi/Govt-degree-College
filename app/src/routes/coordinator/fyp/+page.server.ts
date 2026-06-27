// Coordinator FYP Module Server
import { fail } from '@sveltejs/kit';
import { getDepartmentByCoordinatorId } from '$lib/server/database/departments';
import { getFacultyByDepartment } from '$lib/server/database/faculty';
import {
	getProjectsByDepartment,
	createProject,
	deleteProject,
	updateProjectStatus
} from '$lib/server/database/fyp';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const dept = await getDepartmentByCoordinatorId(locals.user!.id);
	if (!dept) return { department: null, projects: [], faculty: [] };

	const [projects, faculty] = await Promise.all([
		getProjectsByDepartment(dept.id),
		getFacultyByDepartment(dept.id)
	]);

	return { department: dept, projects, faculty };
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const dept = await getDepartmentByCoordinatorId(locals.user!.id);
		if (!dept) return fail(403, { error: 'No department assigned' });

		const fd = await request.formData();
		const title = fd.get('title')?.toString().trim();
		const description = fd.get('description')?.toString().trim();
		const supervisor_id = fd.get('supervisor_id')?.toString();
		const session = fd.get('session')?.toString().trim();

		if (!title || !session) return fail(400, { error: 'Title and Session are required.' });

		try {
			await createProject({
				department_id: dept.id,
				title,
				description,
				supervisor_id: supervisor_id ? parseInt(supervisor_id) : undefined,
				session
			});
			return { success: true, message: 'FYP Project created successfully.' };
		} catch (err: unknown) {
			return fail(500, { error: 'Failed to create project. ' + (err as Error).message });
		}
	},

	updateStatus: async ({ request }) => {
		const fd = await request.formData();
		const id = parseInt(fd.get('id')?.toString() ?? '0');
		const status = fd.get('status')?.toString();

		if (!id || !status) return fail(400, { error: 'Missing parameters.' });

		try {
			await updateProjectStatus(id, status);
			return { success: true, message: 'Project status updated.' };
		} catch (err: unknown) {
			return fail(500, { error: (err as Error).message });
		}
	},

	delete: async ({ request }) => {
		const fd = await request.formData();
		const id = parseInt(fd.get('id')?.toString() ?? '0');
		if (!id) return fail(400, { error: 'Invalid ID' });

		try {
			await deleteProject(id);
			return { success: true, message: 'Project deleted.' };
		} catch (err: unknown) {
			return fail(500, { error: (err as Error).message });
		}
	}
};
