import { fallbackEvents } from '$lib/content/fallback';
import { listEvents } from '$lib/server/database/content';
import { logDatabaseLoadError } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		return {
			events: await listEvents(),
			databaseConnected: true
		};
	} catch (error) {
		logDatabaseLoadError('Events page load', error);

		return {
			events: fallbackEvents,
			databaseConnected: false
		};
	}
};
