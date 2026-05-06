import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '$env/static/private';

export const DATABASE_CONFIG_ERROR =
	'DATABASE_URL is not defined. Add your Neon connection string to app/.env.';

let sqlClient: ReturnType<typeof neon> | null = null;

export function isDatabaseConfigured() {
	return Boolean(DATABASE_URL);
}

export function getSql() {
	if (!DATABASE_URL) {
		throw new Error(DATABASE_CONFIG_ERROR);
	}

	if (!sqlClient) {
		sqlClient = neon(DATABASE_URL);
	}

	return sqlClient;
}
