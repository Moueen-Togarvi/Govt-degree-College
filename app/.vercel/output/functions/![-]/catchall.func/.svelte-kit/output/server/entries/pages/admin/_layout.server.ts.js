import { i as isAdminConfigured, r as isAdminAuthenticated } from "../../../chunks/admin-auth.js";
import { redirect } from "@sveltejs/kit";
//#region src/routes/admin/+layout.server.ts
var load = async ({ cookies, url }) => {
	const authenticated = isAdminAuthenticated(cookies);
	const configured = isAdminConfigured();
	const isLoginPage = url.pathname === "/admin/login";
	if (!configured && !isLoginPage) throw redirect(302, "/admin/login?setup=1");
	if (!authenticated && !isLoginPage) throw redirect(302, "/admin/login");
	if (authenticated && isLoginPage) throw redirect(302, "/admin");
	return {
		authenticated,
		configured
	};
};
//#endregion
export { load };
