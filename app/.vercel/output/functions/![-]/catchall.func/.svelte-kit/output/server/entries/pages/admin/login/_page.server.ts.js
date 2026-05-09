import { a as verifyAdminPassword, i as isAdminConfigured, n as createAdminSession } from "../../../../chunks/admin-auth.js";
import { fail, redirect } from "@sveltejs/kit";
//#region src/routes/admin/login/+page.server.ts
var load = async ({ url }) => ({
	configured: isAdminConfigured(),
	setupMode: url.searchParams.get("setup") === "1"
});
var actions = { login: async ({ request, cookies }) => {
	const formData = await request.formData();
	const password = String(formData.get("password") ?? "").trim();
	if (!isAdminConfigured()) return fail(500, { error: "ADMIN_PASSWORD env variable set nahi hai. Pehle usay configure karein." });
	if (!password) return fail(400, { error: "Password required hai." });
	if (!verifyAdminPassword(password)) return fail(401, { error: "Password ghalat hai." });
	createAdminSession(cookies);
	throw redirect(302, "/admin");
} };
//#endregion
export { actions, load };
