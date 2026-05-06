import { clearAdminSession } from '$lib/server/admin-auth';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
	clearAdminSession(cookies);
	throw redirect(302, '/admin/login');
};
