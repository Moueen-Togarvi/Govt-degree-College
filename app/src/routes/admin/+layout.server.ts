import { isAdminAuthenticated, isAdminConfigured } from '$lib/server/admin-auth';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
	const authenticated = isAdminAuthenticated(cookies);
	const configured = isAdminConfigured();
	const isLoginPage = url.pathname === '/admin/login';

	if (!configured && !isLoginPage) {
		throw redirect(302, '/admin/login?setup=1');
	}

	if (!authenticated && !isLoginPage) {
		throw redirect(302, '/admin/login');
	}

	if (authenticated && isLoginPage) {
		throw redirect(302, '/admin');
	}

	return {
		authenticated,
		configured
	};
};
