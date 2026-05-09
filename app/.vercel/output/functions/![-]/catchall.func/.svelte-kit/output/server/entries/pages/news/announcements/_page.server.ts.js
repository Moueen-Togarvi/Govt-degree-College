import { a as logDatabaseLoadError } from "../../../../chunks/faculty-fallback.js";
import { t as fallbackAnnouncements } from "../../../../chunks/fallback.js";
import { d as listAnnouncements } from "../../../../chunks/content.js";
//#region src/routes/news/announcements/+page.server.ts
var load = async () => {
	try {
		return {
			announcements: await listAnnouncements(),
			databaseConnected: true
		};
	} catch (error) {
		logDatabaseLoadError("Announcements page load", error);
		return {
			announcements: fallbackAnnouncements,
			databaseConnected: false
		};
	}
};
//#endregion
export { load };
