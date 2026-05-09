import { a as logDatabaseLoadError, n as fallbackFacultyDepartments } from "../../../../chunks/faculty-fallback.js";
import { s as listFacultyDirectory } from "../../../../chunks/faculty.js";
//#region src/routes/about/faculty/+page.server.ts
var load = async () => {
	try {
		return {
			departments: await listFacultyDirectory(),
			databaseConnected: true
		};
	} catch (error) {
		logDatabaseLoadError("Faculty page load", error);
		return {
			departments: fallbackFacultyDepartments,
			databaseConnected: false
		};
	}
};
//#endregion
export { load };
