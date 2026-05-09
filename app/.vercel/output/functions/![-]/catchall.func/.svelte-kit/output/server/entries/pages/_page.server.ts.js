import { a as logDatabaseLoadError } from "../../chunks/faculty-fallback.js";
import { o as fallbackTickerAnnouncements, r as fallbackNoticeBoardItems } from "../../chunks/fallback.js";
import { _ as listTickerAnnouncements, h as listNoticeBoardItems } from "../../chunks/content.js";
//#region src/routes/+page.server.ts
var load = async () => {
	try {
		const [tickerAnnouncements, noticeBoardItems] = await Promise.all([listTickerAnnouncements(), listNoticeBoardItems(3)]);
		const safeNoticeBoardItems = noticeBoardItems.length > 0 ? noticeBoardItems : fallbackNoticeBoardItems;
		return {
			tickerAnnouncements: tickerAnnouncements.length > 0 ? tickerAnnouncements : fallbackTickerAnnouncements,
			noticeBoardItems: safeNoticeBoardItems,
			databaseConnected: true
		};
	} catch (error) {
		logDatabaseLoadError("Home page load", error);
		return {
			tickerAnnouncements: fallbackTickerAnnouncements,
			noticeBoardItems: fallbackNoticeBoardItems,
			databaseConnected: false
		};
	}
};
//#endregion
export { load };
