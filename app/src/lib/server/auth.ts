/**
 * auth.ts — Core authentication module
 * Uses Node.js crypto (no external deps) for password hashing
 * Sessions stored in DB table `sessions`, session ID in httpOnly cookie
 */
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { env } from '$env/dynamic/private';
import { getSql } from './db';
import type { Cookies } from '@sveltejs/kit';

export const SESSION_COOKIE = 'gpgc_session';
export const SESSION_DURATION_HOURS = 24 * 7; // 7 days

// ─── Password Hashing ─────────────────────────────────────────────────────────

export function hashPassword(password: string): string {
	const salt = randomBytes(16).toString('hex');
	const secret = env.JWT_SECRET ?? 'fallback-secret';
	const hash = createHash('sha256').update(`${salt}:${password}:${secret}`).digest('hex');
	return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
	const [salt, expectedHash] = storedHash.split(':');
	if (!salt || !expectedHash) {
		return false;
	}
	const secret = env.JWT_SECRET ?? 'fallback-secret';
	const actualHash = createHash('sha256').update(`${salt}:${password}:${secret}`).digest('hex');

	const expectedBuf = Buffer.from(expectedHash, 'hex');
	const actualBuf = Buffer.from(actualHash, 'hex');
	if (expectedBuf.length !== actualBuf.length) {
		return false;
	}

	try {
		return timingSafeEqual(actualBuf, expectedBuf);
	} catch {
		return false;
	}
}

// ─── Session Management ────────────────────────────────────────────────────────

/**
 * Neon serverless uses per-query HTTP fetches which can intermittently fail with
 * "fetch failed". Auth is critical, so retry transient connectivity errors a
 * couple of times before giving up.
 */
const MAX_DB_RETRIES = 2;
function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
function isTransientDbError(err: unknown): boolean {
	const msg = err instanceof Error ? err.message.toLowerCase() : String(err).toLowerCase();
	return (
		msg.includes('fetch failed') ||
		msg.includes('error connecting to database') ||
		msg.includes('network') ||
		msg.includes('terminated unexpectedly') ||
		msg.includes('timeout') ||
		msg.includes('econnreset') ||
		msg.includes('econnrefused') ||
		msg.includes('enotfound') ||
		msg.includes('eai_again')
	);
}
async function withRetry<T>(fn: () => Promise<T>): Promise<T> {
	let lastErr: unknown;
	for (let attempt = 0; attempt <= MAX_DB_RETRIES; attempt++) {
		try {
			return await fn();
		} catch (err) {
			lastErr = err;
			if (attempt < MAX_DB_RETRIES && isTransientDbError(err)) {
				await sleep(250 * (attempt + 1));
				continue;
			}
			throw err;
		}
	}
	throw lastErr;
}

export type UserRole = 'super_admin' | 'coordinator' | 'faculty' | 'student';

export interface AuthUser {
	id: number;
	name: string;
	email: string;
	role: UserRole;
	is_active: boolean;
	sessionId: string;
}

export async function createSession(userId: number, cookies: Cookies): Promise<string> {
	const sql = getSql();
	const expiresAt = new Date(Date.now() + SESSION_DURATION_HOURS * 60 * 60 * 1000);
	const sessionId = randomBytes(32).toString('hex');

	await withRetry(
		() =>
			sql`
			INSERT INTO sessions (id, user_id, expires_at)
			VALUES (${sessionId}, ${userId}, ${expiresAt.toISOString()})
		`
	);

	cookies.set(SESSION_COOKIE, sessionId, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: env.NODE_ENV === 'production',
		maxAge: SESSION_DURATION_HOURS * 60 * 60
	});

	return sessionId;
}

export async function getSessionUser(cookies: Cookies): Promise<AuthUser | null> {
	const sessionId = cookies.get(SESSION_COOKIE);
	if (!sessionId) return null;

	try {
		const sql = getSql();
		const rows = (await withRetry(
			() =>
				sql`
				SELECT u.id, u.name, u.email, u.role, u.is_active, s.id AS session_id
				FROM sessions s
				JOIN users u ON u.id = s.user_id
				WHERE s.id = ${sessionId}
				  AND s.expires_at > NOW()
				  AND u.is_active = TRUE
				LIMIT 1
			`
		)) as Record<string, unknown>[];

		if (!rows.length) return null;

		const row = rows[0];
		return {
			id: row.id as number,
			name: row.name as string,
			email: row.email as string,
			role: row.role as UserRole,
			is_active: row.is_active as boolean,
			sessionId: row.session_id as string
		};
	} catch {
		return null;
	}
}

export async function destroySession(cookies: Cookies): Promise<void> {
	const sessionId = cookies.get(SESSION_COOKIE);
	if (sessionId) {
		try {
			const sql = getSql();
			await withRetry(() => sql`DELETE FROM sessions WHERE id = ${sessionId}`);
		} catch {
			// ignore
		}
	}
	cookies.delete(SESSION_COOKIE, { path: '/' });
}

export async function login(
	email: string,
	password: string
): Promise<
	{ user: { id: number; role: UserRole; name: string; email: string } } | { error: string }
> {
	const sql = getSql();
	const rows = (await withRetry(
		() =>
			sql`
			SELECT id, name, email, password_hash, role, is_active
			FROM users
			WHERE email = ${email.toLowerCase().trim()}
			LIMIT 1
		`
	)) as Record<string, unknown>[];

	if (!rows.length) {
		return { error: 'Invalid email or password.' };
	}

	const user = rows[0];

	if (!user.is_active) {
		return { error: 'Your account has been deactivated. Contact the administrator.' };
	}

	const valid = verifyPassword(password, user.password_hash as string);
	if (!valid) {
		return { error: 'Invalid email or password.' };
	}

	return {
		user: {
			id: user.id as number,
			role: user.role as UserRole,
			name: user.name as string,
			email: user.email as string
		}
	};
}

// ─── Role-Based Redirect Paths ─────────────────────────────────────────────────

export function getDefaultRedirect(role: UserRole): string {
	switch (role) {
		case 'super_admin':
			return '/super-admin/dashboard';
		case 'coordinator':
			return '/coordinator/dashboard';
		case 'faculty':
			return '/faculty/dashboard';
		case 'student':
			return '/student/dashboard';
	}
}
