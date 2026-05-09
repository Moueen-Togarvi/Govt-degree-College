import { n as private_env } from "./shared-server.js";
import { createHash, timingSafeEqual } from "node:crypto";
//#region src/lib/server/admin-auth.ts
var ADMIN_COOKIE_NAME = "gpgc_admin_session";
function getAdminPassword() {
	return private_env.ADMIN_PASSWORD ?? "";
}
function toBuffer(value) {
	return Buffer.from(value, "utf8");
}
function safeEqual(left, right) {
	const leftBuffer = toBuffer(left);
	const rightBuffer = toBuffer(right);
	if (leftBuffer.length !== rightBuffer.length) return false;
	return timingSafeEqual(leftBuffer, rightBuffer);
}
function getSessionValue() {
	const adminPassword = getAdminPassword();
	if (!adminPassword) return "";
	return createHash("sha256").update(`gpgc-admin:${adminPassword}`).digest("hex");
}
function isAdminConfigured() {
	return Boolean(getAdminPassword());
}
function verifyAdminPassword(password) {
	const adminPassword = getAdminPassword();
	if (!adminPassword) return false;
	return safeEqual(password, adminPassword);
}
function isAdminAuthenticated(cookies) {
	const current = cookies.get(ADMIN_COOKIE_NAME);
	const expected = getSessionValue();
	if (!current || !expected) return false;
	return safeEqual(current, expected);
}
function createAdminSession(cookies) {
	cookies.set(ADMIN_COOKIE_NAME, getSessionValue(), {
		path: "/",
		httpOnly: true,
		sameSite: "strict",
		secure: private_env.NODE_ENV === "production",
		maxAge: 3600 * 12
	});
}
function clearAdminSession(cookies) {
	cookies.delete(ADMIN_COOKIE_NAME, { path: "/" });
}
//#endregion
export { verifyAdminPassword as a, isAdminConfigured as i, createAdminSession as n, isAdminAuthenticated as r, clearAdminSession as t };
