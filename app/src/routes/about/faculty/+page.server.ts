import { fallbackFacultyDepartments } from '$lib/content/faculty-fallback';
import { listFacultyDirectory } from '$lib/server/database/faculty';
import { logDatabaseLoadError } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		const departments = await listFacultyDirectory();

		return {
			departments,
			databaseConnected: true
		};
	} catch (error) {
		logDatabaseLoadError('Faculty page load', error);

		return {
			departments: fallbackFacultyDepartments,
			databaseConnected: false
		};
	}
};
