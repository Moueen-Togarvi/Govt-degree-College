import { n as private_env } from "./shared-server.js";
import { neon } from "@neondatabase/serverless";
//#region src/lib/server/db.ts
var DATABASE_CONFIG_ERROR = "DATABASE_URL is not defined. Add your Neon connection string to app/.env.";
var DATABASE_RETRY_COOLDOWN_MS = 3e4;
var sqlClient = null;
var databaseRetryAfter = 0;
var lastDatabaseWarning = "";
function getDatabaseUrl() {
	return private_env.DATABASE_URL ?? "";
}
function getSql() {
	const databaseUrl = getDatabaseUrl();
	if (!databaseUrl) throw new Error(DATABASE_CONFIG_ERROR);
	if (!sqlClient) sqlClient = neon(databaseUrl);
	return sqlClient;
}
function collectErrorCodes(error) {
	const codes = /* @__PURE__ */ new Set();
	const queue = [error];
	while (queue.length > 0) {
		const current = queue.shift();
		if (!current || typeof current !== "object") continue;
		const code = "code" in current && typeof current.code === "string" ? current.code : null;
		if (code) codes.add(code);
		if ("cause" in current) queue.push(current.cause);
		if ("sourceError" in current) queue.push(current.sourceError);
		if ("errors" in current && Array.isArray(current.errors)) queue.push(...current.errors);
	}
	return [...codes];
}
function getErrorMessages(error) {
	const messages = /* @__PURE__ */ new Set();
	const queue = [error];
	while (queue.length > 0) {
		const current = queue.shift();
		if (!current) continue;
		if (current instanceof Error && current.message) messages.add(current.message);
		if (typeof current === "object") {
			if ("cause" in current) queue.push(current.cause);
			if ("sourceError" in current) queue.push(current.sourceError);
			if ("errors" in current && Array.isArray(current.errors)) queue.push(...current.errors);
		}
	}
	return [...messages];
}
function isConnectivityFailure(error) {
	const messages = getErrorMessages(error).join(" | ").toLowerCase();
	const codes = collectErrorCodes(error);
	return messages.includes("fetch failed") || messages.includes("error connecting to database") || messages.includes("timeout") || codes.some((code) => [
		"ETIMEDOUT",
		"ECONNRESET",
		"ECONNREFUSED",
		"ENOTFOUND",
		"EAI_AGAIN"
	].includes(code));
}
function isRetryCooldownActive() {
	return databaseRetryAfter > Date.now();
}
function formatRetryMessage() {
	return `Database temporarily unavailable. Retrying in ${Math.max(1, Math.ceil((databaseRetryAfter - Date.now()) / 1e3))}s.`;
}
function warnDatabaseOnce(message) {
	if (lastDatabaseWarning === message) return;
	lastDatabaseWarning = message;
	console.warn(`[db] ${message}`);
}
function resetDatabaseRetryState() {
	databaseRetryAfter = 0;
	lastDatabaseWarning = "";
}
function markDatabaseUnavailable(operation, error) {
	databaseRetryAfter = Date.now() + DATABASE_RETRY_COOLDOWN_MS;
	const codes = collectErrorCodes(error);
	warnDatabaseOnce(`${operation} failed because the Neon database is unreachable${codes.length > 0 ? ` (${codes.join(", ")})` : ""}. Falling back where supported.`);
}
function isExpectedDatabaseError(error) {
	if (error instanceof Error && error.message === "DATABASE_URL is not defined. Add your Neon connection string to app/.env.") return true;
	return isConnectivityFailure(error) || error instanceof Error && error.name === "DatabaseUnavailableError";
}
function logDatabaseLoadError(context, error) {
	if (error instanceof Error && error.message === "DATABASE_URL is not defined. Add your Neon connection string to app/.env.") {
		warnDatabaseOnce(`${context}: ${DATABASE_CONFIG_ERROR}`);
		return;
	}
	if (error instanceof Error && error.name === "DatabaseUnavailableError") {
		warnDatabaseOnce(`${context}: ${error.message}`);
		return;
	}
	if (isConnectivityFailure(error)) {
		const codes = collectErrorCodes(error);
		warnDatabaseOnce(`${context}: Neon database request failed${codes.length > 0 ? ` (${codes.join(", ")})` : ""}. Using fallback content.`);
		return;
	}
	console.error(`${context}:`, error);
}
async function withDatabase(operation, callback) {
	if (isRetryCooldownActive()) {
		const cooldownError = new Error(formatRetryMessage(), { cause: /* @__PURE__ */ new Error("retry-cooldown") });
		cooldownError.name = "DatabaseUnavailableError";
		throw cooldownError;
	}
	try {
		const result = await callback(getSql());
		resetDatabaseRetryState();
		return result;
	} catch (error) {
		if (error instanceof Error && error.message === "DATABASE_URL is not defined. Add your Neon connection string to app/.env.") throw error;
		if (isConnectivityFailure(error)) {
			markDatabaseUnavailable(operation, error);
			const wrapped = new Error(formatRetryMessage(), { cause: error instanceof Error ? error : void 0 });
			wrapped.name = "DatabaseUnavailableError";
			throw wrapped;
		}
		throw error;
	}
}
//#endregion
//#region src/lib/content/faculty-fallback.ts
var defaultFacultyImage = "/images/gallery/491999992_1166947772110194_8921941246071863873_n.jpg";
var fallbackFacultyDepartments = [{
	id: "computer-science",
	databaseId: 1,
	name: "Computer Science",
	urduName: "کمپیوٹر سائنس",
	coordinator: {
		id: 9,
		name: "Saeed Bhutta",
		urduName: "Saeed Bhutta",
		role: "Department Coordinator",
		urduRole: "Department Coordinator",
		qualification: "BS Computer Science",
		urduQualification: "BS Computer Science",
		photo: "/images/staff/saed4k.png",
		subject: "Computer Science",
		isHod: false,
		isCoordinator: true,
		isTeachingStaff: true
	},
	staff: [{
		id: 7,
		name: "Muhammad Jabbar Joyia",
		urduName: "Muhammad Jabbar Joyia",
		role: "Teaching Staff",
		urduRole: "Teaching Staff",
		qualification: "BS Computer Science",
		urduQualification: "BS Computer Science",
		photo: "/images/staff/jabbar4k.png",
		subject: "Computer Science",
		isHod: false,
		isCoordinator: false,
		isTeachingStaff: true
	}, {
		id: 9,
		name: "Saeed Bhutta",
		urduName: "Saeed Bhutta",
		role: "Department Coordinator",
		urduRole: "Department Coordinator",
		qualification: "BS Computer Science",
		urduQualification: "BS Computer Science",
		photo: "/images/staff/saed4k.png",
		subject: "Computer Science",
		isHod: false,
		isCoordinator: true,
		isTeachingStaff: true
	}]
}, {
	id: "mathematics",
	databaseId: 4,
	name: "Mathematics",
	urduName: "ریاضی",
	coordinator: null,
	staff: [{
		id: 8,
		name: "Muhammad Mushahid Hussain",
		urduName: "Muhammad Mushahid Hussain",
		role: "Teaching Staff",
		urduRole: "Teaching Staff",
		qualification: "MPhil Mathematics",
		urduQualification: "MPhil Mathematics",
		photo: "/images/staff/mushaid hussain 4k.png",
		subject: "Mathematics",
		isHod: false,
		isCoordinator: false,
		isTeachingStaff: true
	}]
}];
//#endregion
export { logDatabaseLoadError as a, isExpectedDatabaseError as i, fallbackFacultyDepartments as n, withDatabase as o, getSql as r, defaultFacultyImage as t };
