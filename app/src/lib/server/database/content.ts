import type { Announcement, CollegeEvent, ExamResult, QuickLink, TickerAnnouncement } from '$lib/types/content';
import { getSql } from '$lib/server/db';

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
	const sql = getSql();
	const rows = (await sql`
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
	`) as AnnouncementRow[];

	return rows.map(mapAnnouncement);
}

export async function listTickerAnnouncements(limit = 6): Promise<TickerAnnouncement[]> {
	const announcements = await listAnnouncements(limit);

	return announcements.map((item) => ({
		id: item.id,
		title: item.title,
		category: item.category,
		href: '/news/announcements'
	}));
}

export async function listEvents(limit = 12): Promise<CollegeEvent[]> {
	const sql = getSql();
	const rows = (await sql`
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
	`) as EventRow[];

	return rows.map(mapEvent);
}

export async function listExamResults({
	search = '',
	limit = 20
}: {
	search?: string;
	limit?: number;
} = {}): Promise<ExamResult[]> {
	const sql = getSql();
	const normalizedSearch = search.trim();

	if (!normalizedSearch) {
		const rows = (await sql`
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
		`) as ResultRow[];

		return rows.map(mapResult);
	}

	const rows = (await sql.query(
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
	)) as ResultRow[];

	return rows.map(mapResult);
}

export async function listQuickLinks(limit = 8): Promise<QuickLink[]> {
	const sql = getSql();
	const rows = (await sql`
		SELECT id, title, description, href, icon_name
		FROM quick_links
		ORDER BY id ASC
		LIMIT ${limit}
	`) as QuickLinkRow[];

	return rows.map(mapQuickLink);
}

export async function createAnnouncement(input: {
	title: string;
	description: string;
	category: string;
	date?: string;
}) {
	const sql = getSql();
	await sql.query(
		`
			INSERT INTO announcements (title, description, category, date)
			VALUES ($1, $2, $3, COALESCE($4::timestamptz, CURRENT_TIMESTAMP))
		`,
		[input.title, input.description, input.category, input.date || null]
	);
}

export async function updateAnnouncement(input: {
	id: number;
	title: string;
	description: string;
	category: string;
	date: string;
}) {
	const sql = getSql();
	await sql.query(
		`
			UPDATE announcements
			SET title = $1, description = $2, category = $3, date = $4::timestamptz
			WHERE id = $5
		`,
		[input.title, input.description, input.category, input.date, input.id]
	);
}

export async function deleteAnnouncement(id: number) {
	const sql = getSql();
	await sql.query('DELETE FROM announcements WHERE id = $1', [id]);
}

export async function createEvent(input: {
	title: string;
	date: string;
	time: string;
	location: string;
	imageUrl?: string | null;
	status: string;
}) {
	const sql = getSql();
	await sql.query(
		`
			INSERT INTO events (title, date, time, location, image_url, status)
			VALUES ($1, $2::date, $3, $4, $5, $6)
		`,
		[input.title, input.date, input.time, input.location, input.imageUrl || null, input.status]
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
	const sql = getSql();
	await sql.query(
		`
			UPDATE events
			SET title = $1, date = $2::date, time = $3, location = $4, image_url = $5, status = $6
			WHERE id = $7
		`,
		[input.title, input.date, input.time, input.location, input.imageUrl || null, input.status, input.id]
	);
}

export async function deleteEvent(id: number) {
	const sql = getSql();
	await sql.query('DELETE FROM events WHERE id = $1', [id]);
}

export async function createExamResult(input: {
	title: string;
	publishDate: string;
	resultType: string;
	fileUrl?: string | null;
}) {
	const sql = getSql();
	await sql.query(
		`
			INSERT INTO exam_results (title, publish_date, result_type, file_url)
			VALUES ($1, $2::date, $3, $4)
		`,
		[input.title, input.publishDate, input.resultType, input.fileUrl || null]
	);
}

export async function updateExamResult(input: {
	id: number;
	title: string;
	publishDate: string;
	resultType: string;
	fileUrl?: string | null;
}) {
	const sql = getSql();
	await sql.query(
		`
			UPDATE exam_results
			SET title = $1, publish_date = $2::date, result_type = $3, file_url = $4
			WHERE id = $5
		`,
		[input.title, input.publishDate, input.resultType, input.fileUrl || null, input.id]
	);
}

export async function deleteExamResult(id: number) {
	const sql = getSql();
	await sql.query('DELETE FROM exam_results WHERE id = $1', [id]);
}

export async function createQuickLink(input: {
	title: string;
	description: string;
	href: string;
	iconName?: string | null;
}) {
	const sql = getSql();
	await sql.query(
		`
			INSERT INTO quick_links (title, description, href, icon_name)
			VALUES ($1, $2, $3, $4)
		`,
		[input.title, input.description, input.href, input.iconName || 'graduation-cap']
	);
}

export async function updateQuickLink(input: {
	id: number;
	title: string;
	description: string;
	href: string;
	iconName?: string | null;
}) {
	const sql = getSql();
	await sql.query(
		`
			UPDATE quick_links
			SET title = $1, description = $2, href = $3, icon_name = $4
			WHERE id = $5
		`,
		[input.title, input.description, input.href, input.iconName || 'graduation-cap', input.id]
	);
}

export async function deleteQuickLink(id: number) {
	const sql = getSql();
	await sql.query('DELETE FROM quick_links WHERE id = $1', [id]);
}
