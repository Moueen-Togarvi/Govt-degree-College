import { r as isAdminAuthenticated } from "../../../../chunks/admin-auth.js";
import { r as getSql } from "../../../../chunks/faculty-fallback.js";
import { d as listAnnouncements } from "../../../../chunks/content.js";
import { error, json } from "@sveltejs/kit";
//#region src/routes/api/announcements/+server.ts
var GET = async () => {
	return json(await listAnnouncements());
};
var POST = async ({ request, cookies }) => {
	if (!isAdminAuthenticated(cookies)) throw error(401, "Unauthorized");
	const sql = getSql();
	const { title, description, category } = await request.json();
	if (!title || !description || !category) return json({ error: "Missing fields" }, { status: 400 });
	return json((await sql`
		INSERT INTO announcements (title, description, category)
		VALUES (${title}, ${description}, ${category})
		RETURNING *
	`)[0], { status: 201 });
};
var DELETE = async ({ url, cookies }) => {
	if (!isAdminAuthenticated(cookies)) throw error(401, "Unauthorized");
	const sql = getSql();
	const id = url.searchParams.get("id");
	if (!id) return json({ error: "Missing id" }, { status: 400 });
	await sql`DELETE FROM announcements WHERE id = ${id}`;
	return json({ success: true });
};
//#endregion
export { DELETE, GET, POST };
