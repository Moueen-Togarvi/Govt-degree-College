import { listEvents } from '$lib/server/database/content';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	return json(await listEvents());
};
