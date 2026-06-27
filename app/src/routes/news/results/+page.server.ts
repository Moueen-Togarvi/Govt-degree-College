import { fallbackResults } from '$lib/content/fallback';
import { listExamResults } from '$lib/server/database/content';
import { logDatabaseLoadError } from '$lib/server/db';
import type { PageServerLoad } from './$types';

function filterFallbackResults(search: string) {
	if (!search) return fallbackResults;

	const query = search.toLowerCase();
	return fallbackResults.filter(
		(item) => item.title.toLowerCase().includes(query) || item.type.toLowerCase().includes(query)
	);
}

export const load: PageServerLoad = async ({ url }) => {
	const search = url.searchParams.get('q')?.trim() ?? '';

	try {
		return {
			results: await listExamResults({ search }),
			search,
			databaseConnected: true
		};
	} catch (error) {
		logDatabaseLoadError('Exam results page load', error);

		return {
			results: filterFallbackResults(search),
			search,
			databaseConnected: false
		};
	}
};
