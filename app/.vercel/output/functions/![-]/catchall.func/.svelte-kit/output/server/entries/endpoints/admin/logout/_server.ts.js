import { t as clearAdminSession } from "../../../../chunks/admin-auth.js";
import { redirect } from "@sveltejs/kit";
//#region src/routes/admin/logout/+server.ts
var POST = async ({ cookies }) => {
	clearAdminSession(cookies);
	throw redirect(302, "/admin/login");
};
//#endregion
export { POST };
