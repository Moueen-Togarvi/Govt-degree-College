// Student — Profile Page
import { getStudentByUserId, updateStudentProfile } from '$lib/server/database/students';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const profile = await getStudentByUserId(locals.user!.id);
	return { profile };
};

export const actions: Actions = {
	update: async ({ request, locals }) => {
		const profile = await getStudentByUserId(locals.user!.id);
		if (!profile) return fail(403, { error: 'No profile found' });

		const fd = await request.formData();
		const phone = fd.get('phone')?.toString().trim();
		const address = fd.get('address')?.toString().trim();

		try {
			await updateStudentProfile(profile.id, {
				phone: phone || undefined,
				address: address || undefined
			});
			return { success: true, message: 'Profile updated successfully.' };
		} catch (err: unknown) {
			return fail(500, { error: 'Failed to update profile. ' + (err as Error).message });
		}
	}
};
