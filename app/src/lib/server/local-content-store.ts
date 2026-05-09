import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fallbackFacultyDepartments } from '$lib/content/faculty-fallback';
import {
	fallbackAnnouncements,
	fallbackEvents,
	fallbackNoticeBoardItems,
	fallbackQuickLinks,
	fallbackResults,
	fallbackTickerAnnouncements
} from '$lib/content/fallback';
import type { Announcement, CollegeEvent, ExamResult, LatestNewsItem, NoticeBoardItem, QuickLink } from '$lib/types/content';
import type { Department, FacultyMember } from '$lib/types/faculty';

export type LocalContentStore = {
	announcements: Announcement[];
	noticeBoardItems: NoticeBoardItem[];
	latestNewsItems: LatestNewsItem[];
	events: CollegeEvent[];
	results: ExamResult[];
	quickLinks: QuickLink[];
	departments: Department[];
	facultyMembers: FacultyMember[];
};

const storePath = resolve(fileURLToPath(new URL('../../../data/content-store.json', import.meta.url)));
const storeDirectory = dirname(storePath);

let writeQueue = Promise.resolve();

function clone<T>(value: T): T {
	return JSON.parse(JSON.stringify(value)) as T;
}

function createDefaultStore(): LocalContentStore {
	const departments: Department[] = fallbackFacultyDepartments.map((department) => ({
		id: department.databaseId,
		name: department.name,
		slug: department.id,
		urduName: department.urduName
	}));

	const departmentLookup = new Map(
		departments.map((department) => [department.slug, department])
	);

	const facultyMembers: FacultyMember[] = fallbackFacultyDepartments.flatMap((department) =>
		department.staff.map((member) => {
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
		})
	);

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

function normalizeStore(input: Partial<LocalContentStore> | null | undefined): LocalContentStore {
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
		await readFile(storePath, 'utf8');
	} catch (error) {
		const store = createDefaultStore();
		await writeFile(storePath, JSON.stringify(store, null, 2));
	}
}

async function writeStore(store: LocalContentStore) {
	await mkdir(storeDirectory, { recursive: true });
	await writeFile(storePath, JSON.stringify(store, null, 2));
}

export async function readLocalContentStore(): Promise<LocalContentStore> {
	await ensureStoreFile();
	const content = await readFile(storePath, 'utf8');
	return normalizeStore(JSON.parse(content) as Partial<LocalContentStore>);
}

export async function updateLocalContentStore<T>(
	updater: (store: LocalContentStore) => T | Promise<T>
): Promise<T> {
	const resultPromise = writeQueue.then(async () => {
		const store = await readLocalContentStore();
		const result = await updater(store);
		await writeStore(store);
		return result;
	});

	writeQueue = resultPromise.then(
		() => undefined,
		() => undefined
	);

	return resultPromise;
}
