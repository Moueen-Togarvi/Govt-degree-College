import { createAdminSession, isAdminConfigured, verifyAdminPassword } from '$lib/server/admin-auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => ({
	configured: isAdminConfigured(),
	setupMode: url.searchParams.get('setup') === '1'
});

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		const password = String(formData.get('password') ?? '').trim();

		if (!isAdminConfigured()) {
			return fail(500, {
				error: 'ADMIN_PASSWORD env variable set nahi hai. Pehle usay configure karein.'
			});
		}

		if (!password) {
			return fail(400, {
				error: 'Password required hai.'
			});
		}

		if (!verifyAdminPassword(password)) {
			return fail(401, {
				error: 'Password ghalat hai.'
			});
		}

		createAdminSession(cookies);
		throw redirect(302, '/admin');
	}
};
