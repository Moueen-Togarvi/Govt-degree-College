import { fail } from '@sveltejs/kit';
import { getAllUsers, createUser, updateUser, deleteUser } from '$lib/server/database/users';
import { getAllDepartments } from '$lib/server/database/departments';
import { createFacultyProfile } from '$lib/server/database/faculty';
import { createStudentProfile } from '$lib/server/database/students';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const [users, departments] = await Promise.all([getAllUsers(), getAllDepartments()]);
	return { users, departments };
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		if (!locals.user || locals.user.role !== 'super_admin') return fail(403, { error: 'Unauthorized' });

		const data = await request.formData();
		const name = (data.get('name') as string)?.trim();
		const email = (data.get('email') as string)?.trim();
		const password = (data.get('password') as string);
		const role = data.get('role') as string;
		const department_id = data.get('department_id') ? Number(data.get('department_id')) : undefined;
		const roll_number = (data.get('roll_number') as string)?.trim();
		const semester = data.get('semester') ? Number(data.get('semester')) : 1;
		const session = (data.get('session') as string)?.trim();
		const designation = (data.get('designation') as string)?.trim();

		if (!name || !email || !password || !role) {
			return fail(400, { error: 'Name, email, password, and role are required.' });
		}

		if (password.length < 6) {
			return fail(400, { error: 'Password must be at least 6 characters.' });
		}

		try {
			const user = await createUser({ name, email, password, role: role as any });

			// Create profile based on role
			if (role === 'faculty' && department_id) {
				await createFacultyProfile({
					user_id: user.id,
					department_id,
					designation: designation || 'Lecturer'
				});
			} else if (role === 'student' && department_id && roll_number && session) {
				await createStudentProfile({
					user_id: user.id,
					department_id,
					roll_number,
					semester,
					session
				});
			}

			return { success: true, action: 'create' };
		} catch (e: any) {
			if (e?.message?.includes('unique') || e?.message?.includes('duplicate')) {
				return fail(409, { error: 'A user with this email already exists.' });
			}
			return fail(500, { error: 'Failed to create user: ' + e?.message });
		}
	},

	toggle_active: async ({ request, locals }) => {
		if (!locals.user || locals.user.role !== 'super_admin') return fail(403, { error: 'Unauthorized' });
		const data = await request.formData();
		const id = Number(data.get('id'));
		const is_active = data.get('is_active') === 'true';
		await updateUser(id, { is_active: !is_active });
		return { success: true, action: 'toggle' };
	},

	delete: async ({ request, locals }) => {
		if (!locals.user || locals.user.role !== 'super_admin') return fail(403, { error: 'Unauthorized' });
		const data = await request.formData();
		const id = Number(data.get('id'));
		if (id === locals.user.id) return fail(400, { error: 'Cannot delete your own account.' });
		try {
			await deleteUser(id);
			return { success: true, action: 'delete' };
		} catch {
			return fail(500, { error: 'Failed to delete user.' });
		}
	}
};
