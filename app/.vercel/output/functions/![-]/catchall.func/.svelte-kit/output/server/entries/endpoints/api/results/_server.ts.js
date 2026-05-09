import { p as listExamResults } from "../../../../chunks/content.js";
import { json } from "@sveltejs/kit";
//#region src/routes/api/results/+server.ts
var GET = async ({ url }) => {
	return json(await listExamResults({ search: url.searchParams.get("q")?.trim() ?? "" }));
};
//#endregion
export { GET };
