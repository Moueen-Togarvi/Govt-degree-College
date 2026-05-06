import { fallbackAnnouncements } from '$lib/content/fallback';
import { listAnnouncements } from '$lib/server/database/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		return {
			announcements: await listAnnouncements(),
			databaseConnected: true
		};
	} catch (error) {
		console.error('Announcements Neon load failed:', error);

		return {
			announcements: fallbackAnnouncements,
			databaseConnected: false
		};
	}
};
