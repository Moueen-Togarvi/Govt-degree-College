import { n as fallbackFacultyDepartments } from "./faculty-fallback.js";
import { a as fallbackResults, i as fallbackQuickLinks, n as fallbackEvents, o as fallbackTickerAnnouncements, r as fallbackNoticeBoardItems, t as fallbackAnnouncements } from "./fallback.js";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
//#region src/lib/server/local-content-store.ts
var storePath = resolve(fileURLToPath(new URL("../../../data/content-store.json", import.meta.url)));
var storeDirectory = dirname(storePath);
var writeQueue = Promise.resolve();
function clone(value) {
	return JSON.parse(JSON.stringify(value));
}
function createDefaultStore() {
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
function normalizeStore(input) {
	const defaults = createDefaultStore();
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
async function ensureStoreFile() {
	await mkdir(storeDirectory, { recursive: true });
	try {
		await readFile(storePath, "utf8");
	} catch (error) {
		const store = createDefaultStore();
		await writeFile(storePath, JSON.stringify(store, null, 2));
	}
}
async function writeStore(store) {
	await mkdir(storeDirectory, { recursive: true });
	await writeFile(storePath, JSON.stringify(store, null, 2));
}
async function readLocalContentStore() {
	await ensureStoreFile();
	const content = await readFile(storePath, "utf8");
	return normalizeStore(JSON.parse(content));
}
async function updateLocalContentStore(updater) {
	const resultPromise = writeQueue.then(async () => {
		const store = await readLocalContentStore();
		const result = await updater(store);
		await writeStore(store);
		return result;
	});
	writeQueue = resultPromise.then(() => void 0, () => void 0);
	return resultPromise;
}
//#endregion
export { updateLocalContentStore as n, readLocalContentStore as t };
