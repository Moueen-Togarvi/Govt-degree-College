import { fallbackAnnouncements } from '$lib/content/fallback';
import { listAnnouncements } from '$lib/server/database/content';
import { logDatabaseLoadError } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		return {
			announcements: await listAnnouncements(),
			databaseConnected: true
		};
	} catch (error) {
		logDatabaseLoadError('Announcements page load', error);

		return {
			announcements: fallbackAnnouncements,
			databaseConnected: false
		};
	}
};
