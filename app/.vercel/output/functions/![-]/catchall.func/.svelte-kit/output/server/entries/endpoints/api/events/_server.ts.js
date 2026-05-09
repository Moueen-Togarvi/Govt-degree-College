import { f as listEvents } from "../../../../chunks/content.js";
import { json } from "@sveltejs/kit";
//#region src/routes/api/events/+server.ts
var GET = async () => {
	return json(await listEvents());
};
//#endregion
export { GET };
