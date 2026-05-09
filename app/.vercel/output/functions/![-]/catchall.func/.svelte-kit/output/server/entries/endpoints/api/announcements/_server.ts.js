import { r as getSql } from "../../../../chunks/faculty-fallback.js";
import { d as listAnnouncements } from "../../../../chunks/content.js";
import { json } from "@sveltejs/kit";
//#region src/routes/api/announcements/+server.ts
var GET = async () => {
	return json(await listAnnouncements());
};
var POST = async ({ request }) => {
	const sql = getSql();
	const { title, description, category } = await request.json();
	if (!title || !description || !category) return json({ error: "Missing fields" }, { status: 400 });
	return json((await sql`
		INSERT INTO announcements (title, description, category)
		VALUES (${title}, ${description}, ${category})
		RETURNING *
	`)[0], { status: 201 });
};
var DELETE = async ({ url }) => {
	const sql = getSql();
	const id = url.searchParams.get("id");
	if (!id) return json({ error: "Missing id" }, { status: 400 });
	await sql`DELETE FROM announcements WHERE id = ${id}`;
	return json({ success: true });
};
//#endregion
export { DELETE, GET, POST };
