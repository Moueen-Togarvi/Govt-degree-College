import { neon } from '@neondatabase/serverless';
import { env } from '$env/dynamic/private';

export const DATABASE_CONFIG_ERROR =
	'DATABASE_URL is not defined. Add your Neon connection string to app/.env.';

const DATABASE_RETRY_COOLDOWN_MS = 8_000;

export type SqlClient = ReturnType<typeof neon>;

let sqlClient: SqlClient | null = null;
let databaseRetryAfter = 0;
let lastDatabaseWarning = '';

function getDatabaseUrl() {
	return env.DATABASE_URL ?? '';
}

export function isDatabaseConfigured() {
	return Boolean(getDatabaseUrl());
}

export function getSql() {
	const databaseUrl = getDatabaseUrl();

	if (!databaseUrl) {
		throw new Error(DATABASE_CONFIG_ERROR);
	}

	if (!sqlClient) {
		sqlClient = neon(databaseUrl);
	}

	return sqlClient;
}

function collectErrorCodes(error: unknown): string[] {
	const codes = new Set<string>();
	const queue: unknown[] = [error];

	while (queue.length > 0) {
		const current = queue.shift();
		if (!current || typeof current !== 'object') continue;

		const code = 'code' in current && typeof current.code === 'string' ? current.code : null;
		if (code) codes.add(code);

		if ('cause' in current) {
			queue.push(current.cause);
		}

		if ('sourceError' in current) {
			queue.push(current.sourceError);
		}

		if ('errors' in current && Array.isArray(current.errors)) {
			queue.push(...current.errors);
		}
	}

	return [...codes];
}

function getErrorMessages(error: unknown): string[] {
	const messages = new Set<string>();
	const queue: unknown[] = [error];

	while (queue.length > 0) {
		const current = queue.shift();
		if (!current) continue;

		if (current instanceof Error && current.message) {
			messages.add(current.message);
		}

		if (typeof current === 'object') {
			if ('cause' in current) {
				queue.push(current.cause);
			}

			if ('sourceError' in current) {
				queue.push(current.sourceError);
			}

			if ('errors' in current && Array.isArray(current.errors)) {
				queue.push(...current.errors);
			}
		}
	}

	return [...messages];
}

function isConnectivityFailure(error: unknown) {
	const messages = getErrorMessages(error).join(' | ').toLowerCase();
	const codes = collectErrorCodes(error);

	return (
		messages.includes('fetch failed') ||
		messages.includes('error connecting to database') ||
		messages.includes('network') ||
		messages.includes('socket') ||
		messages.includes('terminated unexpectedly') ||
		messages.includes('timeout') ||
		codes.some((code) =>
			['ETIMEDOUT', 'ECONNRESET', 'ECONNREFUSED', 'ENOTFOUND', 'EAI_AGAIN'].includes(code)
		)
	);
}

function isRetryCooldownActive() {
	return databaseRetryAfter > Date.now();
}

function formatRetryMessage() {
	const seconds = Math.max(1, Math.ceil((databaseRetryAfter - Date.now()) / 1000));
	return `Database temporarily unavailable. Retrying in ${seconds}s.`;
}

function warnDatabaseOnce(message: string) {
	if (lastDatabaseWarning === message) return;
	lastDatabaseWarning = message;
	console.warn(`[db] ${message}`);
}

function resetDatabaseRetryState() {
	databaseRetryAfter = 0;
	lastDatabaseWarning = '';
}

function markDatabaseUnavailable(operation: string, error: unknown) {
	databaseRetryAfter = Date.now() + DATABASE_RETRY_COOLDOWN_MS;
	const codes = collectErrorCodes(error);
	const codeSuffix = codes.length > 0 ? ` (${codes.join(', ')})` : '';
	warnDatabaseOnce(
		`${operation} failed because the Neon database is unreachable${codeSuffix}. Falling back where supported.`
	);
}

export function isExpectedDatabaseError(error: unknown) {
	if (error instanceof Error && error.message === DATABASE_CONFIG_ERROR) {
		return true;
	}

	return (
		isConnectivityFailure(error) ||
		(error instanceof Error && error.name === 'DatabaseUnavailableError')
	);
}

export function logDatabaseLoadError(context: string, error: unknown) {
	if (error instanceof Error && error.message === DATABASE_CONFIG_ERROR) {
		warnDatabaseOnce(`${context}: ${DATABASE_CONFIG_ERROR}`);
		return;
	}

	if (error instanceof Error && error.name === 'DatabaseUnavailableError') {
		warnDatabaseOnce(`${context}: ${error.message}`);
		return;
	}

	if (isConnectivityFailure(error)) {
		const codes = collectErrorCodes(error);
		const codeSuffix = codes.length > 0 ? ` (${codes.join(', ')})` : '';
		warnDatabaseOnce(
			`${context}: Neon database request failed${codeSuffix}. Using fallback content.`
		);
		return;
	}

	console.error(`${context}:`, error);
}

export async function withDatabase<T>(
	operation: string,
	callback: (sql: SqlClient) => Promise<T>
): Promise<T> {
	if (isRetryCooldownActive()) {
		const cooldownError = new Error(formatRetryMessage(), { cause: new Error('retry-cooldown') });
		cooldownError.name = 'DatabaseUnavailableError';
		throw cooldownError;
	}

	try {
		const result = await callback(getSql());
		resetDatabaseRetryState();
		return result;
	} catch (error) {
		if (error instanceof Error && error.message === DATABASE_CONFIG_ERROR) {
			throw error;
		}

		if (isConnectivityFailure(error)) {
			markDatabaseUnavailable(operation, error);
			const wrapped = new Error(formatRetryMessage(), {
				cause: error instanceof Error ? error : undefined
			});
			wrapped.name = 'DatabaseUnavailableError';
			throw wrapped;
		}

		throw error;
	}
}
