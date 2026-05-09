import { r as isAdminAuthenticated } from "../../../../chunks/admin-auth.js";
import { n as fallbackFacultyDepartments, r as getSql } from "../../../../chunks/faculty-fallback.js";
import { a as fallbackResults, i as fallbackQuickLinks, n as fallbackEvents, o as fallbackTickerAnnouncements, r as fallbackNoticeBoardItems, t as fallbackAnnouncements } from "../../../../chunks/fallback.js";
import { error, json } from "@sveltejs/kit";
//#region src/lib/server/database/setup.ts
var schemaStatements = [
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
	)`,
	`CREATE TABLE IF NOT EXISTS departments (
		id SERIAL PRIMARY KEY,
		name TEXT NOT NULL,
		slug TEXT NOT NULL UNIQUE,
		urdu_name TEXT,
		created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
	)`,
	`CREATE TABLE IF NOT EXISTS faculty_members (
		id SERIAL PRIMARY KEY,
		department_id INTEGER NOT NULL REFERENCES departments(id) ON DELETE RESTRICT,
		name TEXT NOT NULL,
		education TEXT NOT NULL,
		subject TEXT NOT NULL,
		image_url TEXT,
		is_hod BOOLEAN DEFAULT FALSE,
		is_coordinator BOOLEAN DEFAULT FALSE,
		is_teaching_staff BOOLEAN DEFAULT TRUE,
		created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
	)`,
	`CREATE INDEX IF NOT EXISTS faculty_members_department_idx ON faculty_members (department_id)`
];
var announcementSeeds = fallbackAnnouncements.map((item) => [
	item.title,
	item.description,
	item.category,
	item.isoDate
]);
var eventSeeds = fallbackEvents.map((item) => [
	item.title,
	item.isoDate.slice(0, 10),
	item.time,
	item.location,
	item.imageUrl,
	item.status
]);
var noticeBoardSeeds = fallbackNoticeBoardItems.map((item) => [
	item.title,
	item.message,
	item.tag,
	item.isoDate,
	item.expiryIsoDate,
	item.sortOrder
]);
var latestNewsSeeds = fallbackTickerAnnouncements.map((item) => [
	item.title,
	item.href,
	item.sortOrder
]);
var resultSeeds = fallbackResults.map((item) => [
	item.title,
	item.isoDate.slice(0, 10),
	item.type,
	item.fileUrl
]);
var quickLinkSeeds = fallbackQuickLinks.map((item) => [
	item.title,
	item.description,
	item.href,
	item.iconName
]);
var departmentSeeds = fallbackFacultyDepartments.map((department) => [
	department.name,
	department.id,
	department.urduName
]);
var facultyMemberSeeds = fallbackFacultyDepartments.flatMap((department) => department.staff.map((member) => ({
	departmentSlug: department.id,
	name: member.name,
	education: member.qualification,
	subject: member.subject,
	imageUrl: member.photo,
	isHod: member.isHod,
	isCoordinator: member.isCoordinator,
	isTeachingStaff: member.isTeachingStaff
})));
async function createTables(db) {
	for (const statement of schemaStatements) await db.query(statement);
}
async function seedAnnouncements(db) {
	const rows = await db.query("SELECT COUNT(*)::int AS count FROM announcements");
	if (Number(rows[0]?.count ?? 0) > 0) return 0;
	for (const [title, description, category, isoDate] of announcementSeeds) await db.query("INSERT INTO announcements (title, description, category, date) VALUES ($1, $2, $3, $4)", [
		title,
		description,
		category,
		isoDate
	]);
	return announcementSeeds.length;
}
async function seedEvents(db) {
	const rows = await db.query("SELECT COUNT(*)::int AS count FROM events");
	if (Number(rows[0]?.count ?? 0) > 0) return 0;
	for (const [title, date, time, location, imageUrl, status] of eventSeeds) await db.query("INSERT INTO events (title, date, time, location, image_url, status) VALUES ($1, $2, $3, $4, $5, $6)", [
		title,
		date,
		time,
		location,
		imageUrl,
		status
	]);
	return eventSeeds.length;
}
async function seedNoticeBoard(db) {
	const rows = await db.query("SELECT COUNT(*)::int AS count FROM notice_board_items");
	if (Number(rows[0]?.count ?? 0) > 0) return 0;
	for (const [title, message, tag, isoDate, expiryIsoDate, sortOrder] of noticeBoardSeeds) await db.query("INSERT INTO notice_board_items (title, message, tag, notice_date, expiry_date, sort_order) VALUES ($1, $2, $3, $4, $5, $6)", [
		title,
		message,
		tag,
		isoDate,
		expiryIsoDate,
		sortOrder
	]);
	return noticeBoardSeeds.length;
}
async function seedLatestNews(db) {
	const rows = await db.query("SELECT COUNT(*)::int AS count FROM latest_news_items");
	if (Number(rows[0]?.count ?? 0) > 0) return 0;
	for (const [title, href, sortOrder] of latestNewsSeeds) await db.query("INSERT INTO latest_news_items (title, href, sort_order) VALUES ($1, $2, $3)", [
		title,
		href,
		sortOrder
	]);
	return latestNewsSeeds.length;
}
async function seedResults(db) {
	const rows = await db.query("SELECT COUNT(*)::int AS count FROM exam_results");
	if (Number(rows[0]?.count ?? 0) > 0) return 0;
	for (const [title, publishDate, resultType, fileUrl] of resultSeeds) await db.query("INSERT INTO exam_results (title, publish_date, result_type, file_url) VALUES ($1, $2, $3, $4)", [
		title,
		publishDate,
		resultType,
		fileUrl
	]);
	return resultSeeds.length;
}
async function seedQuickLinks(db) {
	const rows = await db.query("SELECT COUNT(*)::int AS count FROM quick_links");
	if (Number(rows[0]?.count ?? 0) > 0) return 0;
	for (const [title, description, href, iconName] of quickLinkSeeds) await db.query("INSERT INTO quick_links (title, description, href, icon_name) VALUES ($1, $2, $3, $4)", [
		title,
		description,
		href,
		iconName
	]);
	return quickLinkSeeds.length;
}
async function seedDepartments(db) {
	const rows = await db.query("SELECT COUNT(*)::int AS count FROM departments");
	if (Number(rows[0]?.count ?? 0) > 0) return 0;
	for (const [name, slug, urduName] of departmentSeeds) await db.query("INSERT INTO departments (name, slug, urdu_name) VALUES ($1, $2, $3)", [
		name,
		slug,
		urduName
	]);
	return departmentSeeds.length;
}
async function seedFacultyMembers(db) {
	const rows = await db.query("SELECT COUNT(*)::int AS count FROM faculty_members");
	if (Number(rows[0]?.count ?? 0) > 0) return 0;
	const departments = await db.query("SELECT id, slug FROM departments ORDER BY id ASC");
	const departmentMap = new Map(departments.map((department) => [department.slug, Number(department.id)]));
	let inserted = 0;
	for (const member of facultyMemberSeeds) {
		const departmentId = departmentMap.get(member.departmentSlug);
		if (!departmentId) continue;
		await db.query(`INSERT INTO faculty_members
				(department_id, name, education, subject, image_url, is_hod, is_coordinator, is_teaching_staff)
			 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [
			departmentId,
			member.name,
			member.education,
			member.subject,
			member.imageUrl,
			member.isHod,
			member.isCoordinator,
			member.isTeachingStaff
		]);
		inserted += 1;
	}
	return inserted;
}
async function initializeDatabase({ seed = true, db = getSql() } = {}) {
	await createTables(db);
	if (!seed) return {
		tablesCreated: schemaStatements.length,
		seeded: {
			announcements: 0,
			events: 0,
			examResults: 0
		}
	};
	const seededAnnouncements = await seedAnnouncements(db);
	const seededNoticeBoard = await seedNoticeBoard(db);
	const seededLatestNews = await seedLatestNews(db);
	const seededEvents = await seedEvents(db);
	const seededResults = await seedResults(db);
	const seededQuickLinks = await seedQuickLinks(db);
	const seededDepartments = await seedDepartments(db);
	const seededFacultyMembers = await seedFacultyMembers(db);
	return {
		tablesCreated: schemaStatements.length,
		seeded: {
			announcements: seededAnnouncements,
			noticeBoard: seededNoticeBoard,
			latestNews: seededLatestNews,
			events: seededEvents,
			examResults: seededResults,
			quickLinks: seededQuickLinks,
			departments: seededDepartments,
			facultyMembers: seededFacultyMembers
		}
	};
}
//#endregion
//#region src/routes/api/init-db/+server.ts
async function handleInit(cookies) {
	if (!isAdminAuthenticated(cookies)) throw error(401, "Unauthorized");
	try {
		return json({
			success: true,
			message: "Database initialized successfully",
			result: await initializeDatabase()
		});
	} catch (err) {
		console.error("DB Init Error:", err);
		throw error(500, String(err));
	}
}
var GET = async ({ cookies }) => handleInit(cookies);
var POST = async ({ cookies }) => handleInit(cookies);
//#endregion
export { GET, POST };
