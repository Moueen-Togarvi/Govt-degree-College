import type {
	Announcement,
	CollegeEvent,
	ExamResult,
	LatestNewsItem,
	NoticeBoardItem,
	QuickLink,
	TickerAnnouncement
} from '$lib/types/content';
import { withDatabase } from '$lib/server/db';

const defaultEventImage = '/images/gallery/491999992_1166947772110194_8921941246071863873_n.jpg';

type AnnouncementRow = {
	id: number | string;
	title: string;
	description: string;
	category: string;
	formatted_date: string;
	iso_date: string;
};

type EventRow = {
	id: number | string;
	title: string;
	formatted_date: string;
	iso_date: string;
	time: string;
	location: string;
	image_url: string | null;
	status: string;
};

type NoticeBoardRow = {
	id: number | string;
	title: string;
	message: string;
	tag: string;
	formatted_date: string;
	iso_date: string;
	formatted_expiry_date: string | null;
	iso_expiry_date: string | null;
	sort_order: number | string | null;
};

type LatestNewsRow = {
	id: number | string;
	title: string;
	href: string | null;
	sort_order: number | string | null;
};

type ResultRow = {
	id: number | string;
	title: string;
	formatted_date: string;
	iso_date: string;
	result_type: string;
	file_url: string | null;
};

type QuickLinkRow = {
	id: number | string;
	title: string;
	description: string;
	href: string;
	icon_name: string | null;
};

function mapAnnouncement(row: AnnouncementRow): Announcement {
	return {
		id: Number(row.id),
		title: row.title,
		description: row.description,
		category: row.category,
		date: row.formatted_date,
		isoDate: row.iso_date
	};
}

function mapEvent(row: EventRow): CollegeEvent {
	return {
		id: Number(row.id),
		title: row.title,
		date: row.formatted_date,
		isoDate: row.iso_date,
		time: row.time,
		location: row.location,
		imageUrl: row.image_url || defaultEventImage,
		status: row.status
	};
}

function mapNoticeBoardItem(row: NoticeBoardRow): NoticeBoardItem {
	return {
		id: Number(row.id),
		title: row.title,
		message: row.message,
		tag: row.tag,
		date: row.formatted_date,
		isoDate: row.iso_date,
		sortOrder: Number(row.sort_order ?? 0),
		expiryDate: row.formatted_expiry_date,
		expiryIsoDate: row.iso_expiry_date
	};
}

function mapLatestNewsItem(row: LatestNewsRow): LatestNewsItem {
	return {
		id: Number(row.id),
		title: row.title,
		href: row.href || '/news/announcements',
		sortOrder: Number(row.sort_order ?? 0)
	};
}

function mapResult(row: ResultRow): ExamResult {
	return {
		id: Number(row.id),
		title: row.title,
		date: row.formatted_date,
		isoDate: row.iso_date,
		type: row.result_type,
		fileUrl: row.file_url
	};
}

function mapQuickLink(row: QuickLinkRow): QuickLink {
	return {
		id: Number(row.id),
		title: row.title,
		description: row.description,
		href: row.href,
		iconName: row.icon_name || 'graduation-cap'
	};
}

export async function listAnnouncements(limit = 12): Promise<Announcement[]> {
	const rows = await withDatabase('list announcements', async (sql) =>
		(await sql`
			SELECT
				id,
				title,
				description,
				category,
				to_char(date, 'Mon DD, YYYY') AS formatted_date,
				to_char(date AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') AS iso_date
			FROM announcements
			ORDER BY date DESC, id DESC
			LIMIT ${limit}
		`) as AnnouncementRow[]
	);

	return rows.map(mapAnnouncement);
}

export async function listLatestNewsItems(limit = 8): Promise<LatestNewsItem[]> {
	const rows = await withDatabase('list latest news items', async (sql) =>
		(await sql`
			SELECT id, title, href, sort_order
			FROM latest_news_items
			ORDER BY sort_order ASC, id DESC
			LIMIT ${limit}
		`) as LatestNewsRow[]
	);

	return rows.map(mapLatestNewsItem);
}

export async function listTickerAnnouncements(limit = 6): Promise<TickerAnnouncement[]> {
	return listLatestNewsItems(limit);
}

export async function listNoticeBoardItems(
	limit = 3,
	{ includeExpired = false }: { includeExpired?: boolean } = {}
): Promise<NoticeBoardItem[]> {
	const rows = await withDatabase('list notice board items', async (sql) =>
		includeExpired
			? ((await sql`
					SELECT
						id,
						title,
						message,
						tag,
						to_char(notice_date, 'Mon DD, YYYY') AS formatted_date,
						to_char(notice_date AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') AS iso_date,
						CASE
							WHEN expiry_date IS NULL THEN NULL
							ELSE to_char(expiry_date, 'Mon DD, YYYY')
						END AS formatted_expiry_date,
						CASE
							WHEN expiry_date IS NULL THEN NULL
							ELSE to_char(expiry_date AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"')
						END AS iso_expiry_date,
						sort_order
					FROM notice_board_items
					ORDER BY sort_order ASC, notice_date DESC, id DESC
					LIMIT ${limit}
				`) as NoticeBoardRow[])
			: ((await sql`
					SELECT
						id,
						title,
						message,
						tag,
						to_char(notice_date, 'Mon DD, YYYY') AS formatted_date,
						to_char(notice_date AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') AS iso_date,
						CASE
							WHEN expiry_date IS NULL THEN NULL
							ELSE to_char(expiry_date, 'Mon DD, YYYY')
						END AS formatted_expiry_date,
						CASE
							WHEN expiry_date IS NULL THEN NULL
							ELSE to_char(expiry_date AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"')
						END AS iso_expiry_date,
						sort_order
					FROM notice_board_items
					WHERE expiry_date IS NULL OR expiry_date >= CURRENT_TIMESTAMP
					ORDER BY sort_order ASC, notice_date DESC, id DESC
					LIMIT ${limit}
				`) as NoticeBoardRow[])
	);

	return rows.map(mapNoticeBoardItem);
}

export async function listEvents(limit = 12): Promise<CollegeEvent[]> {
	const rows = await withDatabase('list events', async (sql) =>
		(await sql`
			SELECT
				id,
				title,
				to_char(date, 'Mon DD, YYYY') AS formatted_date,
				to_char(date, 'YYYY-MM-DD') AS iso_date,
				time,
				location,
				image_url,
				status
			FROM events
			ORDER BY date ASC, id DESC
			LIMIT ${limit}
		`) as EventRow[]
	);

	return rows.map(mapEvent);
}

export async function listExamResults({
	search = '',
	limit = 20
}: {
	search?: string;
	limit?: number;
} = {}): Promise<ExamResult[]> {
	const normalizedSearch = search.trim();

	if (!normalizedSearch) {
		const rows = await withDatabase('list exam results', async (sql) =>
			(await sql`
				SELECT
					id,
					title,
					to_char(publish_date, 'Mon DD, YYYY') AS formatted_date,
					to_char(publish_date, 'YYYY-MM-DD') AS iso_date,
					result_type,
					file_url
				FROM exam_results
				ORDER BY publish_date DESC, id DESC
				LIMIT ${limit}
			`) as ResultRow[]
		);

		return rows.map(mapResult);
	}

	const rows = await withDatabase('search exam results', async (sql) =>
		(await sql.query(
			`
				SELECT
					id,
					title,
					to_char(publish_date, 'Mon DD, YYYY') AS formatted_date,
					to_char(publish_date, 'YYYY-MM-DD') AS iso_date,
					result_type,
					file_url
				FROM exam_results
				WHERE title ILIKE $1 OR result_type ILIKE $1
				ORDER BY publish_date DESC, id DESC
				LIMIT $2
			`,
			[`%${normalizedSearch}%`, limit]
		)) as ResultRow[]
	);

	return rows.map(mapResult);
}

export async function listQuickLinks(limit = 8): Promise<QuickLink[]> {
	const rows = await withDatabase('list quick links', async (sql) =>
		(await sql`
			SELECT id, title, description, href, icon_name
			FROM quick_links
			ORDER BY id ASC
			LIMIT ${limit}
		`) as QuickLinkRow[]
	);

	return rows.map(mapQuickLink);
}

export async function createAnnouncement(input: {
	title: string;
	description: string;
	category: string;
	date?: string;
}) {
	await withDatabase('create announcement', async (sql) =>
		sql.query(
			`
				INSERT INTO announcements (title, description, category, date)
				VALUES ($1, $2, $3, COALESCE($4::timestamptz, CURRENT_TIMESTAMP))
			`,
			[input.title, input.description, input.category, input.date || null]
		)
	);
}

export async function createNoticeBoardItem(input: {
	title: string;
	message: string;
	tag: string;
	date?: string;
	expiryDate?: string;
	sortOrder?: number;
}) {
	await withDatabase('create notice board item', async (sql) =>
		sql.query(
			`
				INSERT INTO notice_board_items (title, message, tag, notice_date, expiry_date, sort_order)
				VALUES ($1, $2, $3, COALESCE($4::timestamptz, CURRENT_TIMESTAMP), $5::timestamptz, $6)
			`,
			[
				input.title,
				input.message,
				input.tag,
				input.date || null,
				input.expiryDate || null,
				input.sortOrder ?? 0
			]
		)
	);
}

export async function createLatestNewsItem(input: { title: string; sortOrder?: number }) {
	await withDatabase('create latest news item', async (sql) =>
		sql.query(
			`
				INSERT INTO latest_news_items (title, href, sort_order)
				VALUES ($1, $2, $3)
			`,
			[input.title, '/news/announcements', input.sortOrder ?? 0]
		)
	);
}

export async function updateLatestNewsItem(input: {
	id: number;
	title: string;
	sortOrder?: number;
}) {
	await withDatabase('update latest news item', async (sql) =>
		sql.query(
			`
				UPDATE latest_news_items
				SET title = $1, href = $2, sort_order = $3
				WHERE id = $4
			`,
			[input.title, '/news/announcements', input.sortOrder ?? 0, input.id]
		)
	);
}

export async function deleteLatestNewsItem(id: number) {
	await withDatabase('delete latest news item', async (sql) =>
		sql.query('DELETE FROM latest_news_items WHERE id = $1', [id])
	);
}

export async function updateNoticeBoardItem(input: {
	id: number;
	title: string;
	message: string;
	tag: string;
	date: string;
	expiryDate?: string;
	sortOrder: number;
}) {
	await withDatabase('update notice board item', async (sql) =>
		sql.query(
			`
				UPDATE notice_board_items
				SET title = $1, message = $2, tag = $3, notice_date = $4::timestamptz, expiry_date = $5::timestamptz, sort_order = $6
				WHERE id = $7
			`,
			[
				input.title,
				input.message,
				input.tag,
				input.date,
				input.expiryDate || null,
				input.sortOrder,
				input.id
			]
		)
	);
}

export async function deleteNoticeBoardItem(id: number) {
	await withDatabase('delete notice board item', async (sql) =>
		sql.query('DELETE FROM notice_board_items WHERE id = $1', [id])
	);
}

export async function updateAnnouncement(input: {
	id: number;
	title: string;
	description: string;
	category: string;
	date: string;
}) {
	await withDatabase('update announcement', async (sql) =>
		sql.query(
			`
				UPDATE announcements
				SET title = $1, description = $2, category = $3, date = $4::timestamptz
				WHERE id = $5
			`,
			[input.title, input.description, input.category, input.date, input.id]
		)
	);
}

export async function deleteAnnouncement(id: number) {
	await withDatabase('delete announcement', async (sql) =>
		sql.query('DELETE FROM announcements WHERE id = $1', [id])
	);
}

export async function createEvent(input: {
	title: string;
	date: string;
	time: string;
	location: string;
	imageUrl?: string | null;
	status: string;
}) {
	await withDatabase('create event', async (sql) =>
		sql.query(
			`
				INSERT INTO events (title, date, time, location, image_url, status)
				VALUES ($1, $2::date, $3, $4, $5, $6)
			`,
			[input.title, input.date, input.time, input.location, input.imageUrl || null, input.status]
		)
	);
}

export async function updateEvent(input: {
	id: number;
	title: string;
	date: string;
	time: string;
	location: string;
	imageUrl?: string | null;
	status: string;
}) {
	await withDatabase('update event', async (sql) =>
		sql.query(
			`
				UPDATE events
				SET title = $1, date = $2::date, time = $3, location = $4, image_url = $5, status = $6
				WHERE id = $7
			`,
			[input.title, input.date, input.time, input.location, input.imageUrl || null, input.status, input.id]
		)
	);
}

export async function deleteEvent(id: number) {
	await withDatabase('delete event', async (sql) =>
		sql.query('DELETE FROM events WHERE id = $1', [id])
	);
}

export async function createExamResult(input: {
	title: string;
	publishDate: string;
	resultType: string;
	fileUrl?: string | null;
}) {
	await withDatabase('create exam result', async (sql) =>
		sql.query(
			`
				INSERT INTO exam_results (title, publish_date, result_type, file_url)
				VALUES ($1, $2::date, $3, $4)
			`,
			[input.title, input.publishDate, input.resultType, input.fileUrl || null]
		)
	);
}

export async function updateExamResult(input: {
	id: number;
	title: string;
	publishDate: string;
	resultType: string;
	fileUrl?: string | null;
}) {
	await withDatabase('update exam result', async (sql) =>
		sql.query(
			`
				UPDATE exam_results
				SET title = $1, publish_date = $2::date, result_type = $3, file_url = $4
				WHERE id = $5
			`,
			[input.title, input.publishDate, input.resultType, input.fileUrl || null, input.id]
		)
	);
}

export async function deleteExamResult(id: number) {
	await withDatabase('delete exam result', async (sql) =>
		sql.query('DELETE FROM exam_results WHERE id = $1', [id])
	);
}

export async function createQuickLink(input: {
	title: string;
	description: string;
	href: string;
	iconName?: string | null;
}) {
	await withDatabase('create quick link', async (sql) =>
		sql.query(
			`
				INSERT INTO quick_links (title, description, href, icon_name)
				VALUES ($1, $2, $3, $4)
			`,
			[input.title, input.description, input.href, input.iconName || 'graduation-cap']
		)
	);
}

export async function updateQuickLink(input: {
	id: number;
	title: string;
	description: string;
	href: string;
	iconName?: string | null;
}) {
	await withDatabase('update quick link', async (sql) =>
		sql.query(
			`
				UPDATE quick_links
				SET title = $1, description = $2, href = $3, icon_name = $4
				WHERE id = $5
			`,
			[input.title, input.description, input.href, input.iconName || 'graduation-cap', input.id]
		)
	);
}

export async function deleteQuickLink(id: number) {
	await withDatabase('delete quick link', async (sql) =>
		sql.query('DELETE FROM quick_links WHERE id = $1', [id])
	);
}
