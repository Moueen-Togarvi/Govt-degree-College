import {
	fallbackAnnouncements,
	fallbackEvents,
	fallbackTickerAnnouncements,
	fallbackNoticeBoardItems,
	fallbackQuickLinks,
	fallbackResults
} from '$lib/content/fallback';
import { getSql } from '$lib/server/db';

type DatabaseClient = ReturnType<typeof getSql>;

const schemaStatements = [
	`CREATE TABLE IF NOT EXISTS announcements (
		id SERIAL PRIMARY KEY,
		title TEXT NOT NULL,
		description TEXT NOT NULL,
		category TEXT NOT NULL,
		date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
		created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
	)`,
	`CREATE TABLE IF NOT EXISTS notice_board_items (
		id SERIAL PRIMARY KEY,
		title TEXT NOT NULL,
		message TEXT NOT NULL,
		tag TEXT NOT NULL,
		notice_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
		expiry_date TIMESTAMP WITH TIME ZONE,
		sort_order INTEGER DEFAULT 0,
		created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
	)`,
	`ALTER TABLE notice_board_items
		ADD COLUMN IF NOT EXISTS expiry_date TIMESTAMP WITH TIME ZONE`,
	`CREATE TABLE IF NOT EXISTS latest_news_items (
		id SERIAL PRIMARY KEY,
		title TEXT NOT NULL,
		href TEXT DEFAULT '/news/announcements',
		sort_order INTEGER DEFAULT 0,
		created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
	)`,
	`CREATE TABLE IF NOT EXISTS events (
		id SERIAL PRIMARY KEY,
		title TEXT NOT NULL,
		date DATE NOT NULL,
		time TEXT NOT NULL,
		location TEXT NOT NULL,
		image_url TEXT,
		status TEXT DEFAULT 'Upcoming',
		created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
	)`,
	`CREATE TABLE IF NOT EXISTS exam_results (
		id SERIAL PRIMARY KEY,
		title TEXT NOT NULL,
		publish_date DATE NOT NULL,
		result_type TEXT NOT NULL,
		file_url TEXT,
		created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
	)`,
	`CREATE TABLE IF NOT EXISTS quick_links (
		id SERIAL PRIMARY KEY,
		title TEXT NOT NULL,
		description TEXT NOT NULL,
		href TEXT NOT NULL,
		icon_name TEXT,
		created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
	)`
];

const announcementSeeds = fallbackAnnouncements.map((item) => [
	item.title,
	item.description,
	item.category,
	item.isoDate
]);

const eventSeeds = fallbackEvents.map((item) => [
	item.title,
	item.isoDate.slice(0, 10),
	item.time,
	item.location,
	item.imageUrl,
	item.status
]);

const noticeBoardSeeds = fallbackNoticeBoardItems.map((item) => [
	item.title,
	item.message,
	item.tag,
	item.isoDate,
	item.expiryIsoDate,
	item.sortOrder
]);

const latestNewsSeeds = fallbackTickerAnnouncements.map((item) => [
	item.title,
	item.href,
	item.sortOrder
]);

const resultSeeds = fallbackResults.map((item) => [
	item.title,
	item.isoDate.slice(0, 10),
	item.type,
	item.fileUrl
]);

const quickLinkSeeds = fallbackQuickLinks.map((item) => [
	item.title,
	item.description,
	item.href,
	item.iconName
]);

async function createTables(db: DatabaseClient) {
	for (const statement of schemaStatements) {
		await db.query(statement);
	}
}

async function seedAnnouncements(db: DatabaseClient) {
	const rows = (await db.query('SELECT COUNT(*)::int AS count FROM announcements')) as Array<{
		count: number | string;
	}>;
	const count = Number(rows[0]?.count ?? 0);

	if (count > 0) return 0;

	for (const [title, description, category, isoDate] of announcementSeeds) {
		await db.query(
			'INSERT INTO announcements (title, description, category, date) VALUES ($1, $2, $3, $4)',
			[title, description, category, isoDate]
		);
	}

	return announcementSeeds.length;
}

async function seedEvents(db: DatabaseClient) {
	const rows = (await db.query('SELECT COUNT(*)::int AS count FROM events')) as Array<{
		count: number | string;
	}>;
	const count = Number(rows[0]?.count ?? 0);

	if (count > 0) return 0;

	for (const [title, date, time, location, imageUrl, status] of eventSeeds) {
		await db.query(
			'INSERT INTO events (title, date, time, location, image_url, status) VALUES ($1, $2, $3, $4, $5, $6)',
			[title, date, time, location, imageUrl, status]
		);
	}

	return eventSeeds.length;
}

async function seedNoticeBoard(db: DatabaseClient) {
	const rows = (await db.query('SELECT COUNT(*)::int AS count FROM notice_board_items')) as Array<{
		count: number | string;
	}>;
	const count = Number(rows[0]?.count ?? 0);

	if (count > 0) return 0;

	for (const [title, message, tag, isoDate, expiryIsoDate, sortOrder] of noticeBoardSeeds) {
		await db.query(
			'INSERT INTO notice_board_items (title, message, tag, notice_date, expiry_date, sort_order) VALUES ($1, $2, $3, $4, $5, $6)',
			[title, message, tag, isoDate, expiryIsoDate, sortOrder]
		);
	}

	return noticeBoardSeeds.length;
}

async function seedLatestNews(db: DatabaseClient) {
	const rows = (await db.query('SELECT COUNT(*)::int AS count FROM latest_news_items')) as Array<{
		count: number | string;
	}>;
	const count = Number(rows[0]?.count ?? 0);

	if (count > 0) return 0;

	for (const [title, href, sortOrder] of latestNewsSeeds) {
		await db.query(
			'INSERT INTO latest_news_items (title, href, sort_order) VALUES ($1, $2, $3)',
			[title, href, sortOrder]
		);
	}

	return latestNewsSeeds.length;
}

async function seedResults(db: DatabaseClient) {
	const rows = (await db.query('SELECT COUNT(*)::int AS count FROM exam_results')) as Array<{
		count: number | string;
	}>;
	const count = Number(rows[0]?.count ?? 0);

	if (count > 0) return 0;

	for (const [title, publishDate, resultType, fileUrl] of resultSeeds) {
		await db.query(
			'INSERT INTO exam_results (title, publish_date, result_type, file_url) VALUES ($1, $2, $3, $4)',
			[title, publishDate, resultType, fileUrl]
		);
	}

	return resultSeeds.length;
}

async function seedQuickLinks(db: DatabaseClient) {
	const rows = (await db.query('SELECT COUNT(*)::int AS count FROM quick_links')) as Array<{
		count: number | string;
	}>;
	const count = Number(rows[0]?.count ?? 0);

	if (count > 0) return 0;

	for (const [title, description, href, iconName] of quickLinkSeeds) {
		await db.query(
			'INSERT INTO quick_links (title, description, href, icon_name) VALUES ($1, $2, $3, $4)',
			[title, description, href, iconName]
		);
	}

	return quickLinkSeeds.length;
}

export async function initializeDatabase({
	seed = true,
	db = getSql()
}: {
	seed?: boolean;
	db?: DatabaseClient;
} = {}) {
	await createTables(db);

	if (!seed) {
		return {
			tablesCreated: schemaStatements.length,
			seeded: {
				announcements: 0,
				events: 0,
				examResults: 0
			}
		};
	}

	const seededAnnouncements = await seedAnnouncements(db);
	const seededNoticeBoard = await seedNoticeBoard(db);
	const seededLatestNews = await seedLatestNews(db);
	const seededEvents = await seedEvents(db);
	const seededResults = await seedResults(db);
	const seededQuickLinks = await seedQuickLinks(db);

	return {
		tablesCreated: schemaStatements.length,
		seeded: {
			announcements: seededAnnouncements,
			noticeBoard: seededNoticeBoard,
			latestNews: seededLatestNews,
			events: seededEvents,
			examResults: seededResults,
			quickLinks: seededQuickLinks
		}
	};
}
