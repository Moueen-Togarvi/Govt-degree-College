import { isAdminAuthenticated } from '$lib/server/admin-auth';
import { initializeDatabase } from '$lib/server/database/setup';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

async function handleInit(cookies: any) {
	if (!isAdminAuthenticated(cookies)) {
		throw error(401, 'Unauthorized');
	}

	try {
		const result = await initializeDatabase();
		return json({ success: true, message: 'Database initialized successfully', result });
	} catch (err) {
		console.error('DB Init Error:', err);
		throw error(500, String(err));
	}
}

export const GET: RequestHandler = async ({ cookies }) => handleInit(cookies);
export const POST: RequestHandler = async ({ cookies }) => handleInit(cookies);
