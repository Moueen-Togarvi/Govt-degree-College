import { fail } from '@sveltejs/kit';
import {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser
} from '$lib/server/database/users';
import { getAllDepartments, assignCoordinatorToDepartment } from '$lib/server/database/departments';
import {
	createFacultyProfile,
	getFacultyByUserId,
	updateFacultyProfile
} from '$lib/server/database/faculty';
import {
	createStudentProfile,
	getStudentByUserId,
	updateStudentProfile
} from '$lib/server/database/students';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	let users: Awaited<ReturnType<typeof getAllUsers>> = [];
	let departments: Awaited<ReturnType<typeof getAllDepartments>> = [];
	try {
		[users, departments] = await Promise.all([getAllUsers(), getAllDepartments()]);
	} catch (e: any) {
		return { users, departments, dbError: true };
	}
	return { users, departments };
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		if (!locals.user || locals.user.role !== 'super_admin')
			return fail(403, { error: 'Unauthorized' });

		const data = await request.formData();
		const name = (data.get('name') as string)?.trim();
		const email = (data.get('email') as string)?.trim();
		const password = data.get('password') as string;
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

			// Create profile / department link based on role
			if (role === 'coordinator' && department_id) {
				await assignCoordinatorToDepartment(user.id, department_id);
			} else if (role === 'faculty' && department_id) {
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

	update: async ({ request, locals }) => {
		if (!locals.user || locals.user.role !== 'super_admin')
			return fail(403, { error: 'Unauthorized' });

		const data = await request.formData();
		const id = Number(data.get('id'));
		const name = (data.get('name') as string)?.trim();
		const email = (data.get('email') as string)?.trim();
		const role = data.get('role') as string;
		const password = (data.get('password') as string) ?? '';
		const department_id = data.get('department_id') ? Number(data.get('department_id')) : null;
		const designation = (data.get('designation') as string)?.trim();
		const roll_number = (data.get('roll_number') as string)?.trim();
		const semester = data.get('semester') ? Number(data.get('semester')) : undefined;
		const session = (data.get('session') as string)?.trim();

		if (!id || !name || !email || !role) {
			return fail(400, { error: 'ID, name, email, and role are required.' });
		}

		const existing = await getUserById(id);
		if (!existing) return fail(404, { error: 'User not found.' });
		if (existing.role === 'super_admin' && role && role !== 'super_admin') {
			return fail(400, { error: 'Super admin role cannot be changed.' });
		}

		try {
			await updateUser(id, {
				name,
				email,
				role: role as any,
				...(password ? { password } : {})
			});

			// Keep department link / profile in sync with the selected role.
			if (role === 'coordinator') {
				await assignCoordinatorToDepartment(id, department_id);
			} else if (role === 'faculty') {
				const profile = await getFacultyByUserId(id);
				if (profile) {
					await updateFacultyProfile(profile.id, {
						department_id: department_id ?? undefined,
						designation: designation || undefined
					});
				} else if (department_id) {
					await createFacultyProfile({
						user_id: id,
						department_id,
						designation: designation || 'Lecturer'
					});
				}
			} else if (role === 'student') {
				const profile = await getStudentByUserId(id);
				if (profile) {
					await updateStudentProfile(profile.id, {
						department_id: department_id ?? undefined,
						roll_number: roll_number || undefined,
						semester,
						session: session || undefined
					});
				} else if (department_id && roll_number && session) {
					await createStudentProfile({
						user_id: id,
						department_id,
						roll_number,
						semester: semester ?? 1,
						session
					});
				}
			}

			return { success: true, action: 'update' };
		} catch (e: any) {
			if (e?.message?.includes('unique') || e?.message?.includes('duplicate')) {
				return fail(409, { error: 'A user with this email already exists.' });
			}
			return fail(500, { error: 'Failed to update user: ' + e?.message });
		}
	},

	toggle_active: async ({ request, locals }) => {
		if (!locals.user || locals.user.role !== 'super_admin')
			return fail(403, { error: 'Unauthorized' });
		const data = await request.formData();
		const id = Number(data.get('id'));
		const is_active = data.get('is_active') === 'true';

		const target = await getUserById(id);
		if (target?.role === 'super_admin') {
			return fail(400, { error: 'Super admin accounts cannot be deactivated.' });
		}

		try {
			await updateUser(id, { is_active: !is_active });
			return { success: true, action: 'toggle' };
		} catch (e: any) {
			return fail(500, { error: e?.message ?? 'Failed to update user.' });
		}
	},

	delete: async ({ request, locals }) => {
		if (!locals.user || locals.user.role !== 'super_admin')
			return fail(403, { error: 'Unauthorized' });
		const data = await request.formData();
		const id = Number(data.get('id'));
		if (id === locals.user.id) return fail(400, { error: 'Cannot delete your own account.' });

		const target = await getUserById(id);
		if (target?.role === 'super_admin') {
			return fail(400, { error: 'Super admin accounts cannot be deleted.' });
		}

		try {
			await deleteUser(id);
			return { success: true, action: 'delete' };
		} catch (e: any) {
			return fail(500, { error: e?.message ?? 'Failed to delete user.' });
		}
	}
};
