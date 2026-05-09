import { neon } from "@neondatabase/serverless";
//#region \0virtual:env/static/private
/** @type {import('$env/static/private').DATABASE_URL} */
var DATABASE_URL = "postgresql://neondb_owner:npg_ArzE2VbRyKp6@ep-winter-forest-apdfrq8z-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
//#endregion
//#region src/lib/server/db.ts
var DATABASE_CONFIG_ERROR = "DATABASE_URL is not defined. Add your Neon connection string to app/.env.";
var DATABASE_RETRY_COOLDOWN_MS = 3e4;
var sqlClient = null;
var databaseRetryAfter = 0;
var lastDatabaseWarning = "";
function getSql() {
	if (!sqlClient) sqlClient = neon(DATABASE_URL);
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
var fallbackFacultyDepartments = [
	{
		id: "computer-science",
		databaseId: 1,
		name: "Computer Science",
		urduName: "کمپیوٹر سائنس",
		coordinator: {
			id: 2,
			name: "Dr. Ahmed Hassan",
			urduName: "Dr. Ahmed Hassan",
			role: "Department Coordinator",
			urduRole: "Department Coordinator",
			qualification: "PhD AI",
			urduQualification: "PhD AI",
			photo: "/images/gallery/474603631_1113700027116416_3753317337439731517_n.jpg",
			subject: "Artificial Intelligence",
			isHod: false,
			isCoordinator: true,
			isTeachingStaff: true
		},
		staff: [{
			id: 1,
			name: "Prof. Muhammad Zahid",
			urduName: "Prof. Muhammad Zahid",
			role: "HOD",
			urduRole: "HOD",
			qualification: "MS Computer Science",
			urduQualification: "MS Computer Science",
			photo: "/images/gallery/488504405_1150873360384302_7113898617720777839_n.jpg",
			subject: "Computer Science",
			isHod: true,
			isCoordinator: false,
			isTeachingStaff: true
		}, {
			id: 2,
			name: "Dr. Ahmed Hassan",
			urduName: "Dr. Ahmed Hassan",
			role: "Department Coordinator",
			urduRole: "Department Coordinator",
			qualification: "PhD AI",
			urduQualification: "PhD AI",
			photo: "/images/gallery/474603631_1113700027116416_3753317337439731517_n.jpg",
			subject: "Artificial Intelligence",
			isHod: false,
			isCoordinator: true,
			isTeachingStaff: true
		}]
	},
	{
		id: "english",
		databaseId: 2,
		name: "English",
		urduName: "انگلش",
		coordinator: {
			id: 4,
			name: "Ms. Amna Bibi",
			urduName: "Ms. Amna Bibi",
			role: "Department Coordinator",
			urduRole: "Department Coordinator",
			qualification: "M.Phil Linguistics",
			urduQualification: "M.Phil Linguistics",
			photo: "/images/gallery/491999992_1166947772110194_8921941246071863873_n.jpg",
			subject: "English",
			isHod: false,
			isCoordinator: true,
			isTeachingStaff: true
		},
		staff: [{
			id: 3,
			name: "Prof. Sajjad Haider",
			urduName: "Prof. Sajjad Haider",
			role: "HOD",
			urduRole: "HOD",
			qualification: "MA English Literature",
			urduQualification: "MA English Literature",
			photo: "/images/gallery/497498149_1184322940372677_5964474392879878424_n.jpg",
			subject: "English Literature",
			isHod: true,
			isCoordinator: false,
			isTeachingStaff: true
		}, {
			id: 4,
			name: "Ms. Amna Bibi",
			urduName: "Ms. Amna Bibi",
			role: "Department Coordinator",
			urduRole: "Department Coordinator",
			qualification: "M.Phil Linguistics",
			urduQualification: "M.Phil Linguistics",
			photo: "/images/gallery/491999992_1166947772110194_8921941246071863873_n.jpg",
			subject: "English",
			isHod: false,
			isCoordinator: true,
			isTeachingStaff: true
		}]
	},
	{
		id: "urdu",
		databaseId: 3,
		name: "Urdu",
		urduName: "اردو",
		coordinator: {
			id: 6,
			name: "Ms. Naila Ashraf",
			urduName: "Ms. Naila Ashraf",
			role: "Department Coordinator",
			urduRole: "Department Coordinator",
			qualification: "M.Phil Urdu",
			urduQualification: "M.Phil Urdu",
			photo: "/images/gallery/488936577_1152937786844526_8441555087243500544_n.jpg",
			subject: "Urdu",
			isHod: false,
			isCoordinator: true,
			isTeachingStaff: true
		},
		staff: [{
			id: 5,
			name: "Prof. Khalid Mahmood",
			urduName: "Prof. Khalid Mahmood",
			role: "HOD",
			urduRole: "HOD",
			qualification: "MA Urdu",
			urduQualification: "MA Urdu",
			photo: "/images/gallery/547755271_1299324492205854_5011253499358894922_n.jpg",
			subject: "Urdu",
			isHod: true,
			isCoordinator: false,
			isTeachingStaff: true
		}, {
			id: 6,
			name: "Ms. Naila Ashraf",
			urduName: "Ms. Naila Ashraf",
			role: "Department Coordinator",
			urduRole: "Department Coordinator",
			qualification: "M.Phil Urdu",
			urduQualification: "M.Phil Urdu",
			photo: "/images/gallery/488936577_1152937786844526_8441555087243500544_n.jpg",
			subject: "Urdu",
			isHod: false,
			isCoordinator: true,
			isTeachingStaff: true
		}]
	}
];
//#endregion
export { logDatabaseLoadError as a, isExpectedDatabaseError as i, fallbackFacultyDepartments as n, withDatabase as o, getSql as r, defaultFacultyImage as t };
