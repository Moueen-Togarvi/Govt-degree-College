import { listExamResults } from '$lib/server/database/content';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const search = url.searchParams.get('q')?.trim() ?? '';
	return json(await listExamResults({ search }));
};
