import { fallbackEvents } from '$lib/content/fallback';
import { listEvents } from '$lib/server/database/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		return {
			events: await listEvents(),
			databaseConnected: true
		};
	} catch (error) {
		console.error('Events Neon load failed:', error);

		return {
			events: fallbackEvents,
			databaseConnected: false
		};
	}
};
