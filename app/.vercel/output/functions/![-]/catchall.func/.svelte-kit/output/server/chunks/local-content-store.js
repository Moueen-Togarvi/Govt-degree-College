import { n as fallbackFacultyDepartments } from "./faculty-fallback.js";
import { a as fallbackResults, i as fallbackQuickLinks, n as fallbackEvents, o as fallbackTickerAnnouncements, r as fallbackNoticeBoardItems, t as fallbackAnnouncements } from "./fallback.js";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
var content_store_default = {
	announcements: [{
		"id": 1,
		"date": "May 08, 2026",
		"isoDate": "2026-05-08T00:00:00.000Z",
		"title": "Admissions Open for 11th Class Session 2026",
		"description": "Admissions are now open for 11th class. Students can submit their documents and application forms through the college admission office.",
		"category": "Admissions"
	}, {
		"id": 3,
		"date": "May 03, 2026",
		"isoDate": "2026-05-03T00:00:00.000Z",
		"title": "Important Notice for Intermediate Applicants",
		"description": "Applicants for 11th and 12th classes should bring their previous academic documents and passport-size photographs at the time of submission.",
		"category": "Notice"
	}],
	noticeBoardItems: [{
		"id": 1,
		"title": "11th Admissions Open",
		"message": "Admissions for 11th class are now open. Submit your documents at the college admission office.",
		"tag": "Admissions",
		"date": "May 08, 2026",
		"isoDate": "2026-05-08T00:00:00.000Z",
		"sortOrder": 1,
		"expiryDate": null,
		"expiryIsoDate": null
	}, {
		"id": 3,
		"title": "Bring Required Documents",
		"message": "Intermediate applicants should bring previous result cards, photographs, and B-Form copy during admission.",
		"tag": "Important",
		"date": "May 03, 2026",
		"isoDate": "2026-05-03T00:00:00.000Z",
		"sortOrder": 3,
		"expiryDate": null,
		"expiryIsoDate": null
	}],
	latestNewsItems: [{
		"id": 1,
		"title": "11th Class admissions are now open",
		"href": "/news/announcements",
		"sortOrder": 1
	}, {
		"id": 3,
		"title": "Intermediate applicants should submit required documents",
		"href": "/news/announcements",
		"sortOrder": 3
	}],
	events: [{
		"id": 1,
		"title": "Annual Prize Distribution 2026",
		"date": "Nov 25, 2026",
		"isoDate": "2026-11-25T00:00:00.000Z",
		"time": "10:00 AM",
		"location": "College Main Auditorium",
		"imageUrl": "/images/gallery/491999992_1166947772110194_8921941246071863873_n.jpg",
		"status": "Upcoming"
	}, {
		"id": 2,
		"title": "Seminar on Artificial Intelligence",
		"date": "Dec 05, 2026",
		"isoDate": "2026-12-05T00:00:00.000Z",
		"time": "11:30 AM",
		"location": "CS Department Seminar Hall",
		"imageUrl": "/images/gallery/488504405_1150873360384302_7113898617720777839_n.jpg",
		"status": "Upcoming"
	}],
	results: [],
	quickLinks: [
		{
			"id": 1,
			"title": "Scholarship Facility",
			"description": "We offer merit-based and government scholarships to support bright students.",
			"href": "/admissions/scholarships",
			"iconName": "graduation-cap"
		},
		{
			"id": 2,
			"title": "Skilled Lecturers",
			"description": "Our faculty consists of highly qualified professors dedicated to your success.",
			"href": "/about/faculty",
			"iconName": "users"
		},
		{
			"id": 3,
			"title": "Book Library Facility",
			"description": "Access thousands of books, journals, and digital resources in our central library.",
			"href": "/resources",
			"iconName": "library"
		},
		{
			"id": 4,
			"title": "Affordable Education",
			"description": "High-quality government-standard education at the most affordable fee structure.",
			"href": "/admissions/fee-structure",
			"iconName": "banknote"
		}
	],
	departments: [
		{
			"id": 1,
			"name": "Computer Science",
			"slug": "computer-science",
			"urduName": "کمپیوٹر سائنس"
		},
		{
			"id": 4,
			"name": "Mathematics",
			"slug": "mathematics",
			"urduName": "ریاضی"
		},
		{
			"id": 5,
			"name": "Chemistry",
			"slug": "chemistry",
			"urduName": "Chemistry"
		},
		{
			"id": 6,
			"name": "Physics",
			"slug": "physics",
			"urduName": "Physics"
		},
		{
			"id": 7,
			"name": "Zoology",
			"slug": "zoology",
			"urduName": "Zoology"
		},
		{
			"id": 8,
			"name": "Islamiyat",
			"slug": "islamiyat",
			"urduName": "Islamiyat"
		}
	],
	facultyMembers: [
		{
			"id": 7,
			"departmentId": 1,
			"departmentName": "Computer Science",
			"departmentSlug": "computer-science",
			"name": "Muhammad Jabbar Joyia",
			"education": "BS Computer Science",
			"subject": "Computer Science",
			"imageUrl": "/images/staff/jabbar4k.png",
			"isHod": false,
			"isCoordinator": false,
			"isTeachingStaff": true
		},
		{
			"id": 8,
			"departmentId": 4,
			"departmentName": "Mathematics",
			"departmentSlug": "mathematics",
			"name": "Muhammad Mushahid Hussain",
			"education": "MPhil Mathematics",
			"subject": "Mathematics",
			"imageUrl": "/images/staff/mushaid hussain 4k.png",
			"isHod": false,
			"isCoordinator": false,
			"isTeachingStaff": true
		},
		{
			"id": 9,
			"departmentId": 1,
			"departmentName": "Computer Science",
			"departmentSlug": "computer-science",
			"name": "Saeed Bhutta",
			"education": "BS Computer Science",
			"subject": "Computer Science",
			"imageUrl": "/images/staff/saed4k.png",
			"isHod": false,
			"isCoordinator": true,
			"isTeachingStaff": true
		}
	]
};
//#endregion
//#region src/lib/server/local-content-store.ts
var sourceStorePath = resolve(fileURLToPath(new URL("../../../data/content-store.json", import.meta.url)));
var storePath = isServerlessRuntime() ? resolve(tmpdir(), "gpgc-runtime", "content-store.json") : sourceStorePath;
var storeDirectory = dirname(storePath);
var writeQueue = Promise.resolve();
var inMemoryStore = null;
function clone(value) {
	return JSON.parse(JSON.stringify(value));
}
function isServerlessRuntime() {
	return Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.LAMBDA_TASK_ROOT);
}
function createFallbackStore() {
	const departments = fallbackFacultyDepartments.map((department) => ({
		id: department.databaseId,
		name: department.name,
		slug: department.id,
		urduName: department.urduName
	}));
	const departmentLookup = new Map(departments.map((department) => [department.slug, department]));
	const facultyMembers = fallbackFacultyDepartments.flatMap((department) => department.staff.map((member) => {
		const localDepartment = departmentLookup.get(department.id);
		return {
			id: member.id,
			departmentId: localDepartment?.id ?? department.databaseId,
			departmentName: department.name,
			departmentSlug: department.id,
			name: member.name,
			education: member.qualification,
			subject: member.subject,
			imageUrl: member.photo,
			isHod: member.isHod,
			isCoordinator: member.isCoordinator,
			isTeachingStaff: member.isTeachingStaff
		};
	}));
	return {
		announcements: clone(fallbackAnnouncements),
		noticeBoardItems: clone(fallbackNoticeBoardItems),
		latestNewsItems: clone(fallbackTickerAnnouncements),
		events: clone(fallbackEvents),
		results: clone(fallbackResults),
		quickLinks: clone(fallbackQuickLinks),
		departments,
		facultyMembers
	};
}
function normalizeStore(input, defaults = createFallbackStore()) {
	return {
		announcements: input?.announcements ?? defaults.announcements,
		noticeBoardItems: input?.noticeBoardItems ?? defaults.noticeBoardItems,
		latestNewsItems: input?.latestNewsItems ?? defaults.latestNewsItems,
		events: input?.events ?? defaults.events,
		results: input?.results ?? defaults.results,
		quickLinks: input?.quickLinks ?? defaults.quickLinks,
		departments: input?.departments ?? defaults.departments,
		facultyMembers: input?.facultyMembers ?? defaults.facultyMembers
	};
}
function createDefaultStore() {
	return normalizeStore(clone(content_store_default));
}
function getErrorCode(error) {
	return typeof error === "object" && error !== null && "code" in error && typeof error.code === "string" ? error.code : "";
}
function logContentStoreWarning(message, error) {
	const code = getErrorCode(error);
	const suffix = code ? ` (${code})` : "";
	console.warn(`[content-store] ${message}${suffix}`);
}
async function ensureStoreFile() {
	await mkdir(storeDirectory, { recursive: true });
	try {
		await readFile(storePath, "utf8");
	} catch {
		const store = createDefaultStore();
		await writeFile(storePath, JSON.stringify(store, null, 2));
	}
}
async function writeStore(store) {
	await mkdir(storeDirectory, { recursive: true });
	await writeFile(storePath, JSON.stringify(store, null, 2));
}
async function readLocalContentStore() {
	try {
		await ensureStoreFile();
		const content = await readFile(storePath, "utf8");
		const store = normalizeStore(JSON.parse(content), createDefaultStore());
		inMemoryStore = clone(store);
		return store;
	} catch (error) {
		logContentStoreWarning("Falling back to bundled content store", error);
		return clone(inMemoryStore ?? createDefaultStore());
	}
}
async function updateLocalContentStore(updater) {
	const resultPromise = writeQueue.then(async () => {
		const store = await readLocalContentStore();
		const result = await updater(store);
		inMemoryStore = clone(store);
		try {
			await writeStore(store);
		} catch (error) {
			logContentStoreWarning("Persisting content store failed; using in-memory state for this instance", error);
		}
		return result;
	});
	writeQueue = resultPromise.then(() => void 0, () => void 0);
	return resultPromise;
}
//#endregion
export { updateLocalContentStore as n, readLocalContentStore as t };
