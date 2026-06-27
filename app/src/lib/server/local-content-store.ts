import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
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
import seedContentStore from '../../../data/content-store.json';
import type {
	Announcement,
	CollegeEvent,
	ExamResult,
	LatestNewsItem,
	NoticeBoardItem,
	QuickLink
} from '$lib/types/content';
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

const sourceStorePath = resolve(
	fileURLToPath(new URL('../../../data/content-store.json', import.meta.url))
);
const storePath = isServerlessRuntime()
	? resolve(tmpdir(), 'gpgc-runtime', 'content-store.json')
	: sourceStorePath;
const storeDirectory = dirname(storePath);

let writeQueue = Promise.resolve();
let inMemoryStore: LocalContentStore | null = null;

function clone<T>(value: T): T {
	return JSON.parse(JSON.stringify(value)) as T;
}

function isServerlessRuntime() {
	return Boolean(
		process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.LAMBDA_TASK_ROOT
	);
}

function createFallbackStore(): LocalContentStore {
	const departments: Department[] = fallbackFacultyDepartments.map((department) => ({
		id: department.databaseId,
		name: department.name,
		slug: department.id,
		urduName: department.urduName
	}));

	const departmentLookup = new Map(departments.map((department) => [department.slug, department]));

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

function normalizeStore(
	input: Partial<LocalContentStore> | null | undefined,
	defaults = createFallbackStore()
): LocalContentStore {
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

function createDefaultStore(): LocalContentStore {
	return normalizeStore(clone(seedContentStore) as Partial<LocalContentStore>);
}

function getErrorCode(error: unknown) {
	return typeof error === 'object' &&
		error !== null &&
		'code' in error &&
		typeof error.code === 'string'
		? error.code
		: '';
}

function logContentStoreWarning(message: string, error: unknown) {
	const code = getErrorCode(error);
	const suffix = code ? ` (${code})` : '';
	console.warn(`[content-store] ${message}${suffix}`);
}

async function ensureStoreFile() {
	await mkdir(storeDirectory, { recursive: true });

	try {
		await readFile(storePath, 'utf8');
	} catch {
		const store = createDefaultStore();
		await writeFile(storePath, JSON.stringify(store, null, 2));
	}
}

async function writeStore(store: LocalContentStore) {
	await mkdir(storeDirectory, { recursive: true });
	await writeFile(storePath, JSON.stringify(store, null, 2));
}

export async function readLocalContentStore(): Promise<LocalContentStore> {
	try {
		await ensureStoreFile();
		const content = await readFile(storePath, 'utf8');
		const store = normalizeStore(
			JSON.parse(content) as Partial<LocalContentStore>,
			createDefaultStore()
		);
		inMemoryStore = clone(store);
		return store;
	} catch (error) {
		logContentStoreWarning('Falling back to bundled content store', error);
		return clone(inMemoryStore ?? createDefaultStore());
	}
}

export async function updateLocalContentStore<T>(
	updater: (store: LocalContentStore) => T | Promise<T>
): Promise<T> {
	const resultPromise = writeQueue.then(async () => {
		const store = await readLocalContentStore();
		const result = await updater(store);
		inMemoryStore = clone(store);

		try {
			await writeStore(store);
		} catch (error) {
			logContentStoreWarning(
				'Persisting content store failed; using in-memory state for this instance',
				error
			);
		}

		return result;
	});

	writeQueue = resultPromise.then(
		() => undefined,
		() => undefined
	);

	return resultPromise;
}
