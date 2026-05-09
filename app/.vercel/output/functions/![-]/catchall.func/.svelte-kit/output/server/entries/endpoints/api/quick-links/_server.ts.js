import { g as listQuickLinks } from "../../../../chunks/content.js";
import { json } from "@sveltejs/kit";
//#region src/routes/api/quick-links/+server.ts
var GET = async () => {
	return json(await listQuickLinks(4));
};
//#endregion
export { GET };
