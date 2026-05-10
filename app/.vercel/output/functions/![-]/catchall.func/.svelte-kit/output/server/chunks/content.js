import { i as isExpectedDatabaseError, o as withDatabase } from "./faculty-fallback.js";
import { n as updateLocalContentStore, t as readLocalContentStore } from "./local-content-store.js";
//#region src/lib/server/database/content.ts
var defaultEventImage = "/images/gallery/491999992_1166947772110194_8921941246071863873_n.jpg";
var preferLocalStore = process.env.CONTENT_STORE_MODE === "local";
var dateFormatter = new Intl.DateTimeFormat("en-US", {
	month: "short",
	day: "2-digit",
	year: "numeric",
	timeZone: "UTC"
});
function mapAnnouncement(row) {
	return {
		id: Number(row.id),
		title: row.title,
		description: row.description,
		category: row.category,
		date: row.formatted_date,
		isoDate: row.iso_date
	};
}
function mapEvent(row) {
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
function mapNoticeBoardItem(row) {
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
function mapLatestNewsItem(row) {
	return {
		id: Number(row.id),
		title: row.title,
		href: row.href || "/news/announcements",
		sortOrder: Number(row.sort_order ?? 0)
	};
}
function mapResult(row) {
	return {
		id: Number(row.id),
		title: row.title,
		date: row.formatted_date,
		isoDate: row.iso_date,
		type: row.result_type,
		fileUrl: row.file_url
	};
}
function mapQuickLink(row) {
	return {
		id: Number(row.id),
		title: row.title,
		description: row.description,
		href: row.href,
		iconName: row.icon_name || "graduation-cap"
	};
}
function formatDisplayDate(value) {
	return dateFormatter.format(new Date(value));
}
function toIsoDateTime(value) {
	if (value) {
		const date = new Date(value);
		if (!Number.isNaN(date.getTime())) return date.toISOString();
	}
	return (/* @__PURE__ */ new Date()).toISOString();
}
function toIsoDate(value) {
	if (value && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
	if (value) {
		const date = new Date(value);
		if (!Number.isNaN(date.getTime())) return date.toISOString().slice(0, 10);
	}
	return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function nextId(items) {
	return items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
}
async function withContentFallback(databaseOperation, localOperation) {
	if (preferLocalStore) return localOperation();
	try {
		return await databaseOperation();
	} catch (error) {
		if (isExpectedDatabaseError(error)) return localOperation();
		throw error;
	}
}
async function withContentMutation(databaseOperation, localOperation) {
	return withContentFallback(async () => {
		await databaseOperation();
	}, localOperation);
}
async function listAnnouncements(limit = 12) {
	return withContentFallback(async () => {
		return (await withDatabase("list announcements", async (sql) => await sql`
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
				`)).map(mapAnnouncement);
	}, async () => {
		return [...(await readLocalContentStore()).announcements].sort((left, right) => right.isoDate.localeCompare(left.isoDate) || right.id - left.id).slice(0, limit);
	});
}
async function listLatestNewsItems(limit = 8) {
	return withContentFallback(async () => {
		return (await withDatabase("list latest news items", async (sql) => await sql`
					SELECT id, title, href, sort_order
					FROM latest_news_items
					ORDER BY sort_order ASC, id DESC
					LIMIT ${limit}
				`)).map(mapLatestNewsItem);
	}, async () => {
		return [...(await readLocalContentStore()).latestNewsItems].sort((left, right) => left.sortOrder - right.sortOrder || right.id - left.id).slice(0, limit);
	});
}
async function listTickerAnnouncements(limit = 6) {
	return listLatestNewsItems(limit);
}
async function listNoticeBoardItems(limit = 3, { includeExpired = false } = {}) {
	return withContentFallback(async () => {
		return (await withDatabase("list notice board items", async (sql) => includeExpired ? await sql`
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
						` : await sql`
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
						`)).map(mapNoticeBoardItem);
	}, async () => {
		const store = await readLocalContentStore();
		const now = Date.now();
		return [...store.noticeBoardItems].filter((item) => {
			if (includeExpired || !item.expiryIsoDate) return true;
			const expiryTime = new Date(item.expiryIsoDate).getTime();
			return Number.isNaN(expiryTime) || expiryTime >= now;
		}).sort((left, right) => left.sortOrder - right.sortOrder || right.isoDate.localeCompare(left.isoDate) || right.id - left.id).slice(0, limit);
	});
}
async function listEvents(limit = 12) {
	return withContentFallback(async () => {
		return (await withDatabase("list events", async (sql) => await sql`
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
				`)).map(mapEvent);
	}, async () => {
		return [...(await readLocalContentStore()).events].sort((left, right) => left.isoDate.localeCompare(right.isoDate) || right.id - left.id).slice(0, limit);
	});
}
async function listExamResults({ search = "", limit = 20 } = {}) {
	const normalizedSearch = search.trim().toLowerCase();
	return withContentFallback(async () => {
		if (!normalizedSearch) return (await withDatabase("list exam results", async (sql) => await sql`
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
					`)).map(mapResult);
		return (await withDatabase("search exam results", async (sql) => await sql.query(`
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
					`, [`%${search.trim()}%`, limit]))).map(mapResult);
	}, async () => {
		return [...(await readLocalContentStore()).results].filter((item) => !normalizedSearch ? true : item.title.toLowerCase().includes(normalizedSearch) || item.type.toLowerCase().includes(normalizedSearch)).sort((left, right) => right.isoDate.localeCompare(left.isoDate) || right.id - left.id).slice(0, limit);
	});
}
async function listQuickLinks(limit = 8) {
	return withContentFallback(async () => {
		return (await withDatabase("list quick links", async (sql) => await sql`
					SELECT id, title, description, href, icon_name
					FROM quick_links
					ORDER BY id ASC
					LIMIT ${limit}
				`)).map(mapQuickLink);
	}, async () => {
		return [...(await readLocalContentStore()).quickLinks].sort((left, right) => left.id - right.id).slice(0, limit);
	});
}
async function createAnnouncement(input) {
	return withContentMutation(async () => withDatabase("create announcement", async (sql) => sql.query(`
						INSERT INTO announcements (title, description, category, date)
						VALUES ($1, $2, $3, COALESCE($4::timestamptz, CURRENT_TIMESTAMP))
					`, [
		input.title,
		input.description,
		input.category,
		input.date || null
	])), async () => updateLocalContentStore((store) => {
		const isoDate = toIsoDateTime(input.date);
		store.announcements.unshift({
			id: nextId(store.announcements),
			title: input.title,
			description: input.description,
			category: input.category,
			date: formatDisplayDate(isoDate),
			isoDate
		});
	}));
}
async function createNoticeBoardItem(input) {
	return withContentMutation(async () => withDatabase("create notice board item", async (sql) => sql.query(`
						INSERT INTO notice_board_items (title, message, tag, notice_date, expiry_date, sort_order)
						VALUES ($1, $2, $3, COALESCE($4::timestamptz, CURRENT_TIMESTAMP), $5::timestamptz, $6)
					`, [
		input.title,
		input.message,
		input.tag,
		input.date || null,
		input.expiryDate || null,
		input.sortOrder ?? 0
	])), async () => updateLocalContentStore((store) => {
		const isoDate = toIsoDateTime(input.date);
		const expiryIsoDate = input.expiryDate ? toIsoDateTime(input.expiryDate) : null;
		store.noticeBoardItems.unshift({
			id: nextId(store.noticeBoardItems),
			title: input.title,
			message: input.message,
			tag: input.tag,
			date: formatDisplayDate(isoDate),
			isoDate,
			sortOrder: input.sortOrder ?? 0,
			expiryDate: expiryIsoDate ? formatDisplayDate(expiryIsoDate) : null,
			expiryIsoDate
		});
	}));
}
async function createLatestNewsItem(input) {
	return withContentMutation(async () => withDatabase("create latest news item", async (sql) => sql.query(`
						INSERT INTO latest_news_items (title, href, sort_order)
						VALUES ($1, $2, $3)
					`, [
		input.title,
		"/news/announcements",
		input.sortOrder ?? 0
	])), async () => updateLocalContentStore((store) => {
		store.latestNewsItems.push({
			id: nextId(store.latestNewsItems),
			title: input.title,
			href: "/news/announcements",
			sortOrder: input.sortOrder ?? 0
		});
	}));
}
async function updateLatestNewsItem(input) {
	return withContentMutation(async () => withDatabase("update latest news item", async (sql) => sql.query(`
						UPDATE latest_news_items
						SET title = $1, href = $2, sort_order = $3
						WHERE id = $4
					`, [
		input.title,
		"/news/announcements",
		input.sortOrder ?? 0,
		input.id
	])), async () => updateLocalContentStore((store) => {
		const item = store.latestNewsItems.find((entry) => entry.id === input.id);
		if (!item) return;
		item.title = input.title;
		item.href = "/news/announcements";
		item.sortOrder = input.sortOrder ?? 0;
	}));
}
async function deleteLatestNewsItem(id) {
	return withContentMutation(async () => withDatabase("delete latest news item", async (sql) => sql.query("DELETE FROM latest_news_items WHERE id = $1", [id])), async () => updateLocalContentStore((store) => {
		store.latestNewsItems = store.latestNewsItems.filter((item) => item.id !== id);
	}));
}
async function updateNoticeBoardItem(input) {
	return withContentMutation(async () => withDatabase("update notice board item", async (sql) => sql.query(`
						UPDATE notice_board_items
						SET title = $1, message = $2, tag = $3, notice_date = $4::timestamptz, expiry_date = $5::timestamptz, sort_order = $6
						WHERE id = $7
					`, [
		input.title,
		input.message,
		input.tag,
		input.date,
		input.expiryDate || null,
		input.sortOrder,
		input.id
	])), async () => updateLocalContentStore((store) => {
		const item = store.noticeBoardItems.find((entry) => entry.id === input.id);
		if (!item) return;
		const isoDate = toIsoDateTime(input.date);
		const expiryIsoDate = input.expiryDate ? toIsoDateTime(input.expiryDate) : null;
		item.title = input.title;
		item.message = input.message;
		item.tag = input.tag;
		item.sortOrder = input.sortOrder;
		item.isoDate = isoDate;
		item.date = formatDisplayDate(isoDate);
		item.expiryIsoDate = expiryIsoDate;
		item.expiryDate = expiryIsoDate ? formatDisplayDate(expiryIsoDate) : null;
	}));
}
async function deleteNoticeBoardItem(id) {
	return withContentMutation(async () => withDatabase("delete notice board item", async (sql) => sql.query("DELETE FROM notice_board_items WHERE id = $1", [id])), async () => updateLocalContentStore((store) => {
		store.noticeBoardItems = store.noticeBoardItems.filter((item) => item.id !== id);
	}));
}
async function updateAnnouncement(input) {
	return withContentMutation(async () => withDatabase("update announcement", async (sql) => sql.query(`
						UPDATE announcements
						SET title = $1, description = $2, category = $3, date = $4::timestamptz
						WHERE id = $5
					`, [
		input.title,
		input.description,
		input.category,
		input.date,
		input.id
	])), async () => updateLocalContentStore((store) => {
		const item = store.announcements.find((entry) => entry.id === input.id);
		if (!item) return;
		const isoDate = toIsoDateTime(input.date);
		item.title = input.title;
		item.description = input.description;
		item.category = input.category;
		item.isoDate = isoDate;
		item.date = formatDisplayDate(isoDate);
	}));
}
async function deleteAnnouncement(id) {
	return withContentMutation(async () => withDatabase("delete announcement", async (sql) => sql.query("DELETE FROM announcements WHERE id = $1", [id])), async () => updateLocalContentStore((store) => {
		store.announcements = store.announcements.filter((item) => item.id !== id);
	}));
}
async function createEvent(input) {
	return withContentMutation(async () => withDatabase("create event", async (sql) => sql.query(`
						INSERT INTO events (title, date, time, location, image_url, status)
						VALUES ($1, $2::date, $3, $4, $5, $6)
					`, [
		input.title,
		input.date,
		input.time,
		input.location,
		input.imageUrl || null,
		input.status
	])), async () => updateLocalContentStore((store) => {
		const isoDate = toIsoDate(input.date);
		store.events.push({
			id: nextId(store.events),
			title: input.title,
			date: formatDisplayDate(isoDate),
			isoDate,
			time: input.time,
			location: input.location,
			imageUrl: input.imageUrl || defaultEventImage,
			status: input.status
		});
	}));
}
async function updateEvent(input) {
	return withContentMutation(async () => withDatabase("update event", async (sql) => sql.query(`
						UPDATE events
						SET title = $1, date = $2::date, time = $3, location = $4, image_url = $5, status = $6
						WHERE id = $7
					`, [
		input.title,
		input.date,
		input.time,
		input.location,
		input.imageUrl || null,
		input.status,
		input.id
	])), async () => updateLocalContentStore((store) => {
		const item = store.events.find((entry) => entry.id === input.id);
		if (!item) return;
		const isoDate = toIsoDate(input.date);
		item.title = input.title;
		item.date = formatDisplayDate(isoDate);
		item.isoDate = isoDate;
		item.time = input.time;
		item.location = input.location;
		item.imageUrl = input.imageUrl || defaultEventImage;
		item.status = input.status;
	}));
}
async function deleteEvent(id) {
	return withContentMutation(async () => withDatabase("delete event", async (sql) => sql.query("DELETE FROM events WHERE id = $1", [id])), async () => updateLocalContentStore((store) => {
		store.events = store.events.filter((item) => item.id !== id);
	}));
}
async function createExamResult(input) {
	return withContentMutation(async () => withDatabase("create exam result", async (sql) => sql.query(`
						INSERT INTO exam_results (title, publish_date, result_type, file_url)
						VALUES ($1, $2::date, $3, $4)
					`, [
		input.title,
		input.publishDate,
		input.resultType,
		input.fileUrl || null
	])), async () => updateLocalContentStore((store) => {
		const isoDate = toIsoDate(input.publishDate);
		store.results.push({
			id: nextId(store.results),
			title: input.title,
			date: formatDisplayDate(isoDate),
			isoDate,
			type: input.resultType,
			fileUrl: input.fileUrl || null
		});
	}));
}
async function updateExamResult(input) {
	return withContentMutation(async () => withDatabase("update exam result", async (sql) => sql.query(`
						UPDATE exam_results
						SET title = $1, publish_date = $2::date, result_type = $3, file_url = $4
						WHERE id = $5
					`, [
		input.title,
		input.publishDate,
		input.resultType,
		input.fileUrl || null,
		input.id
	])), async () => updateLocalContentStore((store) => {
		const item = store.results.find((entry) => entry.id === input.id);
		if (!item) return;
		const isoDate = toIsoDate(input.publishDate);
		item.title = input.title;
		item.date = formatDisplayDate(isoDate);
		item.isoDate = isoDate;
		item.type = input.resultType;
		item.fileUrl = input.fileUrl || null;
	}));
}
async function deleteExamResult(id) {
	return withContentMutation(async () => withDatabase("delete exam result", async (sql) => sql.query("DELETE FROM exam_results WHERE id = $1", [id])), async () => updateLocalContentStore((store) => {
		store.results = store.results.filter((item) => item.id !== id);
	}));
}
//#endregion
export { updateNoticeBoardItem as S, listTickerAnnouncements as _, createNoticeBoardItem as a, updateExamResult as b, deleteExamResult as c, listAnnouncements as d, listEvents as f, listQuickLinks as g, listNoticeBoardItems as h, createLatestNewsItem as i, deleteLatestNewsItem as l, listLatestNewsItems as m, createEvent as n, deleteAnnouncement as o, listExamResults as p, createExamResult as r, deleteEvent as s, createAnnouncement as t, deleteNoticeBoardItem as u, updateAnnouncement as v, updateLatestNewsItem as x, updateEvent as y };
