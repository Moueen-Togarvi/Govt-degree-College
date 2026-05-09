import { isAdminAuthenticated } from '$lib/server/admin-auth';
import { listAnnouncements } from '$lib/server/database/content';
import { getSql } from '$lib/server/db';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	return json(await listAnnouncements());
};

export const POST: RequestHandler = async ({ request, cookies }) => {
	if (!isAdminAuthenticated(cookies)) {
		throw error(401, 'Unauthorized');
	}

	const sql = getSql();
	const { title, description, category } = await request.json();
	if (!title || !description || !category) {
		return json({ error: 'Missing fields' }, { status: 400 });
	}
	const rows = await sql`
		INSERT INTO announcements (title, description, category)
		VALUES (${title}, ${description}, ${category})
		RETURNING *
	`;
	return json((rows as Array<Record<string, unknown>>)[0], { status: 201 });
};

export const DELETE: RequestHandler = async ({ url, cookies }) => {
	if (!isAdminAuthenticated(cookies)) {
		throw error(401, 'Unauthorized');
	}

	const sql = getSql();
	const id = url.searchParams.get('id');
	if (!id) return json({ error: 'Missing id' }, { status: 400 });
	await sql`DELETE FROM announcements WHERE id = ${id}`;
	return json({ success: true });
};
