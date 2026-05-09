import { a as logDatabaseLoadError } from "../../../../chunks/faculty-fallback.js";
import { n as fallbackEvents } from "../../../../chunks/fallback.js";
import { f as listEvents } from "../../../../chunks/content.js";
//#region src/routes/news/events/+page.server.ts
var load = async () => {
	try {
		return {
			events: await listEvents(),
			databaseConnected: true
		};
	} catch (error) {
		logDatabaseLoadError("Events page load", error);
		return {
			events: fallbackEvents,
			databaseConnected: false
		};
	}
};
//#endregion
export { load };
