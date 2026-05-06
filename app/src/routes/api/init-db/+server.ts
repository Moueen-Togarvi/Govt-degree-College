import { initializeDatabase } from '$lib/server/database/setup';
import type { RequestHandler } from './$types';

async function handleInit() {
	try {
		const result = await initializeDatabase();
		return new Response(JSON.stringify({ success: true, message: 'Database initialized successfully', result }), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('DB Init Error:', error);
		return new Response(JSON.stringify({ success: false, error: String(error) }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}

export const GET: RequestHandler = async () => handleInit();

export const POST: RequestHandler = async () => handleInit();
