import { a as logDatabaseLoadError } from "../../../../chunks/faculty-fallback.js";
import { a as fallbackResults } from "../../../../chunks/fallback.js";
import { p as listExamResults } from "../../../../chunks/content.js";
//#region src/routes/news/results/+page.server.ts
function filterFallbackResults(search) {
	if (!search) return fallbackResults;
	const query = search.toLowerCase();
	return fallbackResults.filter((item) => item.title.toLowerCase().includes(query) || item.type.toLowerCase().includes(query));
}
var load = async ({ url }) => {
	const search = url.searchParams.get("q")?.trim() ?? "";
	try {
		return {
			results: await listExamResults({ search }),
			search,
			databaseConnected: true
		};
	} catch (error) {
		logDatabaseLoadError("Exam results page load", error);
		return {
			results: filterFallbackResults(search),
			search,
			databaseConnected: false
		};
	}
};
//#endregion
export { load };
