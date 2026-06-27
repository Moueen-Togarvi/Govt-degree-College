// Coordinator — Faculty Management
import { fail } from '@sveltejs/kit';
import { getDepartmentByCoordinatorId } from '$lib/server/database/departments';
import {
	getFacultyByDepartment,
	createFacultyProfile,
	updateFacultyProfile,
	deleteFacultyProfile
} from '$lib/server/database/faculty';
import { hashPassword } from '$lib/server/auth';
import { getSql } from '$lib/server/db';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const dept = await getDepartmentByCoordinatorId(locals.user!.id);
	const faculty = dept ? await getFacultyByDepartment(dept.id) : [];
	return { department: dept, faculty };
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const dept = await getDepartmentByCoordinatorId(locals.user!.id);
		if (!dept) return fail(403, { error: 'No department assigned' });

		const fd = await request.formData();
		const name = fd.get('name')?.toString().trim();
		const email = fd.get('email')?.toString().trim().toLowerCase();
		const password = fd.get('password')?.toString();
		const designation = fd.get('designation')?.toString() || 'Lecturer';
		const education = fd.get('education')?.toString() || '';
		const phone = fd.get('phone')?.toString() || null;
		const is_hod = fd.get('is_hod') === 'on';

		if (!name || !email || !password)
			return fail(400, { error: 'Name, email, and password are required' });

		const sql = getSql();
		try {
			// Create user
			const userRows = (await sql`
				INSERT INTO users (name, email, password_hash, role)
				VALUES (${name}, ${email}, ${hashPassword(password)}, 'faculty')
				RETURNING id
			`) as Record<string, unknown>[];
			const userId = userRows[0].id as number;

			// Create faculty profile
			await createFacultyProfile({
				user_id: userId,
				department_id: dept.id,
				designation,
				education,
				phone: phone ?? undefined,
				is_hod
			});

			return { success: true, message: `${name} has been added as faculty.` };
		} catch (err: unknown) {
			const msg = (err as Error).message ?? '';
			if (msg.includes('unique') || msg.includes('duplicate')) {
				return fail(400, { error: 'Email already exists.' });
			}
			return fail(500, { error: 'Server error: ' + msg });
		}
	},

	update: async ({ request, locals }) => {
		const dept = await getDepartmentByCoordinatorId(locals.user!.id);
		if (!dept) return fail(403, { error: 'No department assigned' });

		const fd = await request.formData();
		const profileId = parseInt(fd.get('profile_id')?.toString() ?? '0');
		const name = fd.get('name')?.toString().trim();
		const designation = fd.get('designation')?.toString();
		const education = fd.get('education')?.toString();
		const phone = fd.get('phone')?.toString() || null;
		const is_hod = fd.get('is_hod') === 'on';
		const userId = parseInt(fd.get('user_id')?.toString() ?? '0');

		if (!profileId || !userId) return fail(400, { error: 'Invalid faculty ID' });

		const sql = getSql();
		try {
			if (name) await sql`UPDATE users SET name = ${name} WHERE id = ${userId}`;
			await updateFacultyProfile(profileId, {
				designation,
				education,
				phone: phone ?? undefined,
				is_hod
			});

			// If marking as HOD, clear other HODs in same department
			if (is_hod) {
				await sql`
					UPDATE faculty_profiles SET is_hod = FALSE
					WHERE department_id = ${dept.id} AND id != ${profileId}
				`;
			}

			return { success: true, message: 'Faculty updated successfully.' };
		} catch (err: unknown) {
			return fail(500, { error: 'Server error: ' + (err as Error).message });
		}
	},

	delete: async ({ request, locals }) => {
		await getDepartmentByCoordinatorId(locals.user!.id);
		const fd = await request.formData();
		const profileId = parseInt(fd.get('profile_id')?.toString() ?? '0');
		if (!profileId) return fail(400, { error: 'Invalid ID' });

		try {
			await deleteFacultyProfile(profileId);
			return { success: true, message: 'Faculty member removed.' };
		} catch (err: unknown) {
			return fail(500, { error: 'Server error: ' + (err as Error).message });
		}
	}
};
