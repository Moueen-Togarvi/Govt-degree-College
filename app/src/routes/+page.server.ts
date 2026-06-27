import { fallbackNoticeBoardItems, fallbackTickerAnnouncements } from '$lib/content/fallback';
import { listNoticeBoardItems, listTickerAnnouncements } from '$lib/server/database/content';
import { logDatabaseLoadError } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		const [tickerAnnouncements, noticeBoardItems] = await Promise.all([
			listTickerAnnouncements(),
			listNoticeBoardItems(3)
		]);

		const safeNoticeBoardItems =
			noticeBoardItems.length > 0 ? noticeBoardItems : fallbackNoticeBoardItems;
		const safeTickerAnnouncements =
			tickerAnnouncements.length > 0 ? tickerAnnouncements : fallbackTickerAnnouncements;

		return {
			tickerAnnouncements: safeTickerAnnouncements,
			noticeBoardItems: safeNoticeBoardItems,
			databaseConnected: true
		};
	} catch (error) {
		logDatabaseLoadError('Home page load', error);

		return {
			tickerAnnouncements: fallbackTickerAnnouncements,
			noticeBoardItems: fallbackNoticeBoardItems,
			databaseConnected: false
		};
	}
};
