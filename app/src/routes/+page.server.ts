import { fallbackQuickLinks, fallbackTickerAnnouncements } from '$lib/content/fallback';
import { listQuickLinks, listTickerAnnouncements } from '$lib/server/database/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		const [tickerAnnouncements, quickLinks] = await Promise.all([
			listTickerAnnouncements(),
			listQuickLinks(4)
		]);

		return {
			tickerAnnouncements,
			quickLinks,
			databaseConnected: true
		};
	} catch (error) {
		console.error('Home page Neon load failed:', error);

		return {
			tickerAnnouncements: fallbackTickerAnnouncements,
			quickLinks: fallbackQuickLinks,
			databaseConnected: false
		};
	}
};
