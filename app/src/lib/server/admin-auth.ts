import { env } from '$env/dynamic/private';
import { createHash, timingSafeEqual } from 'node:crypto';
import type { Cookies } from '@sveltejs/kit';

export const ADMIN_COOKIE_NAME = 'gpgc_admin_session';

function getAdminPassword() {
	return env.ADMIN_PASSWORD ?? '';
}

function toBuffer(value: string) {
	return Buffer.from(value, 'utf8');
}

function safeEqual(left: string, right: string) {
	const leftBuffer = toBuffer(left);
	const rightBuffer = toBuffer(right);

	if (leftBuffer.length !== rightBuffer.length) {
		return false;
	}

	return timingSafeEqual(leftBuffer, rightBuffer);
}

function getSessionValue() {
	const adminPassword = getAdminPassword();
	if (!adminPassword) return '';
	return createHash('sha256').update(`gpgc-admin:${adminPassword}`).digest('hex');
}

export function isAdminConfigured() {
	return Boolean(getAdminPassword());
}

export function verifyAdminPassword(password: string) {
	const adminPassword = getAdminPassword();
	if (!adminPassword) return false;
	return safeEqual(password, adminPassword);
}

export function isAdminAuthenticated(cookies: Cookies) {
	const current = cookies.get(ADMIN_COOKIE_NAME);
	const expected = getSessionValue();
	if (!current || !expected) return false;
	return safeEqual(current, expected);
}

export function createAdminSession(cookies: Cookies) {
	cookies.set(ADMIN_COOKIE_NAME, getSessionValue(), {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 12
	});
}

export function clearAdminSession(cookies: Cookies) {
	cookies.delete(ADMIN_COOKIE_NAME, { path: '/' });
}
