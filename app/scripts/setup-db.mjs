import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { neon } from '@neondatabase/serverless';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

function loadEnvFile(fileName) {
	const filePath = path.join(projectRoot, fileName);
	if (!fs.existsSync(filePath)) return;

	const fileContents = fs.readFileSync(filePath, 'utf8');

	for (const line of fileContents.split(/\r?\n/)) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) continue;

		const separatorIndex = trimmed.indexOf('=');
		if (separatorIndex === -1) continue;

		const key = trimmed.slice(0, separatorIndex).trim();
		let value = trimmed.slice(separatorIndex + 1).trim();

		if (
			(value.startsWith('"') && value.endsWith('"')) ||
			(value.startsWith("'") && value.endsWith("'"))
		) {
			value = value.slice(1, -1);
		}

		if (!(key in process.env)) {
			process.env[key] = value;
		}
	}
}

function splitSqlStatements(sqlText) {
	return sqlText
		.split(/;\s*(?:\r?\n|$)/)
		.map((statement) => statement.trim())
		.filter(Boolean);
}

async function main() {
	loadEnvFile('.env');
	loadEnvFile('.env.local');

	const databaseUrl = process.env.DATABASE_URL;
	if (!databaseUrl) {
		throw new Error('DATABASE_URL is missing. Add it to app/.env or app/.env.local first.');
	}

	const sql = neon(databaseUrl);
	const schemaPath = path.join(projectRoot, 'schema.sql');
	const schemaSql = fs.readFileSync(schemaPath, 'utf8');
	const schemaStatements = splitSqlStatements(schemaSql);

	for (const statement of schemaStatements) {
		await sql.query(statement);
	}

	console.log(`Created or verified ${schemaStatements.length} tables.`);

	if (process.argv.includes('--no-seed')) {
		console.log('Skipped sample seed data.');
		return;
	}

	const existingAnnouncements = await sql.query('SELECT COUNT(*)::int AS count FROM announcements');
	if (Number(existingAnnouncements[0]?.count ?? 0) === 0) {
		await sql.query(
			`INSERT INTO announcements (title, description, category, date) VALUES
			($1, $2, $3, $4),
			($5, $6, $7, $8),
			($9, $10, $11, $12)`,
			[
				'Admissions Open for BS Programs Fall 2026',
				'Applications are invited for admission to various BS programs affiliated with KFUEIT. Last date to apply is Nov 15, 2026.',
				'Admissions',
				'2026-10-25T00:00:00.000Z',
				'Mid-Term Examination Schedule Announced',
				'The mid-term exams for 11th and 12th classes will commence from Nov 1, 2026.',
				'Exams',
				'2026-10-20T00:00:00.000Z',
				'Annual Sports Week Postponed',
				'Due to unforeseen weather conditions, the annual sports week has been postponed.',
				'Events',
				'2026-10-15T00:00:00.000Z'
			]
		);
		console.log('Seeded announcements table.');
	} else {
		console.log('Announcements table already has data, skipping seed.');
	}

	const existingNoticeBoard = await sql.query('SELECT COUNT(*)::int AS count FROM notice_board_items');
	if (Number(existingNoticeBoard[0]?.count ?? 0) === 0) {
		await sql.query(
			`INSERT INTO notice_board_items (title, message, tag, notice_date, expiry_date, sort_order) VALUES
			($1, $2, $3, $4, $5, $6),
			($7, $8, $9, $10, $11, $12),
			($13, $14, $15, $16, $17, $18)`,
			[
				'11th Admissions Open',
				'Admissions for 11th class are now open. Submit your documents at the college admission office.',
				'Admissions',
				'2026-05-08T00:00:00.000Z',
				null,
				1,
				'BS Morning & Evening Admissions',
				'BS admissions are open in both morning and evening shifts under KFUEIT affiliation.',
				'BS Notice',
				'2026-05-06T00:00:00.000Z',
				null,
				2,
				'Bring Required Documents',
				'Intermediate applicants should bring previous result cards, photographs, and B-Form copy during admission.',
				'Important',
				'2026-05-03T00:00:00.000Z',
				null,
				3
			]
		);
		console.log('Seeded notice_board_items table.');
	} else {
		console.log('Notice board table already has data, skipping seed.');
	}

	const existingLatestNews = await sql.query('SELECT COUNT(*)::int AS count FROM latest_news_items');
	if (Number(existingLatestNews[0]?.count ?? 0) === 0) {
		await sql.query(
			`INSERT INTO latest_news_items (title, href, sort_order) VALUES
			($1, $2, $3),
			($4, $5, $6),
			($7, $8, $9)`,
			[
				'11th Class admissions are now open',
				'/news/announcements',
				1,
				'BS morning and evening admissions notice',
				'/news/announcements',
				2,
				'Intermediate applicants should submit required documents',
				'/news/announcements',
				3
			]
		);
		console.log('Seeded latest_news_items table.');
	} else {
		console.log('Latest news table already has data, skipping seed.');
	}

	const existingEvents = await sql.query('SELECT COUNT(*)::int AS count FROM events');
	if (Number(existingEvents[0]?.count ?? 0) === 0) {
		await sql.query(
			`INSERT INTO events (title, date, time, location, image_url, status) VALUES
			($1, $2, $3, $4, $5, $6),
			($7, $8, $9, $10, $11, $12)`,
			[
				'Annual Prize Distribution 2026',
				'2026-11-25',
				'10:00 AM',
				'College Main Auditorium',
				'/images/gallery/491999992_1166947772110194_8921941246071863873_n.jpg',
				'Upcoming',
				'Seminar on Artificial Intelligence',
				'2026-12-05',
				'11:30 AM',
				'CS Department Seminar Hall',
				'/images/gallery/488504405_1150873360384302_7113898617720777839_n.jpg',
				'Upcoming'
			]
		);
		console.log('Seeded events table.');
	} else {
		console.log('Events table already has data, skipping seed.');
	}

	const existingResults = await sql.query('SELECT COUNT(*)::int AS count FROM exam_results');
	if (Number(existingResults[0]?.count ?? 0) === 0) {
		await sql.query(
			`INSERT INTO exam_results (title, publish_date, result_type, file_url) VALUES
			($1, $2, $3, $4),
			($5, $6, $7, $8),
			($9, $10, $11, $12),
			($13, $14, $15, $16)`,
			[
				'BS Computer Science (2nd Semester) - Spring 2026',
				'2026-10-20',
				'Semester',
				null,
				'BS English (4th Semester) - Spring 2026',
				'2026-10-18',
				'Semester',
				null,
				'Intermediate Part-I (Mock Exams)',
				'2026-10-10',
				'Annual',
				null,
				'BS Zoology (1st Semester) - Spring 2026',
				'2026-10-05',
				'Semester',
				null
			]
		);
		console.log('Seeded exam_results table.');
	} else {
		console.log('Exam results table already has data, skipping seed.');
	}

	const existingQuickLinks = await sql.query('SELECT COUNT(*)::int AS count FROM quick_links');
	if (Number(existingQuickLinks[0]?.count ?? 0) === 0) {
		await sql.query(
			`INSERT INTO quick_links (title, description, href, icon_name) VALUES
			($1, $2, $3, $4),
			($5, $6, $7, $8),
			($9, $10, $11, $12),
			($13, $14, $15, $16)`,
			[
				'Scholarship Facility',
				'We offer merit-based and government scholarships to support bright students.',
				'/admissions/scholarships',
				'graduation-cap',
				'Skilled Lecturers',
				'Our faculty consists of highly qualified professors dedicated to your success.',
				'/about/faculty',
				'users',
				'Book Library Facility',
				'Access thousands of books, journals, and digital resources in our central library.',
				'/resources',
				'library',
				'Affordable Education',
				'High-quality government-standard education at the most affordable fee structure.',
				'/admissions/fee-structure',
				'banknote'
			]
		);
		console.log('Seeded quick_links table.');
	} else {
		console.log('Quick links table already has data, skipping seed.');
	}

	const existingDepartments = await sql.query('SELECT COUNT(*)::int AS count FROM departments');
	if (Number(existingDepartments[0]?.count ?? 0) === 0) {
		await sql.query(
			`INSERT INTO departments (name, slug, urdu_name) VALUES
			($1, $2, $3),
			($4, $5, $6),
			($7, $8, $9)`,
			[
				'Computer Science',
				'computer-science',
				'کمپیوٹر سائنس',
				'English',
				'english',
				'انگلش',
				'Urdu',
				'urdu',
				'اردو'
			]
		);
		console.log('Seeded departments table.');
	} else {
		console.log('Departments table already has data, skipping seed.');
	}

	const existingFacultyMembers = await sql.query('SELECT COUNT(*)::int AS count FROM faculty_members');
	if (Number(existingFacultyMembers[0]?.count ?? 0) === 0) {
		const departments = await sql.query('SELECT id, slug FROM departments');
		const departmentMap = new Map(departments.map((department) => [department.slug, department.id]));

		await sql.query(
			`INSERT INTO faculty_members
				(department_id, name, education, subject, image_url, is_hod, is_coordinator, is_teaching_staff)
			 VALUES
				($1, $2, $3, $4, $5, $6, $7, $8),
				($9, $10, $11, $12, $13, $14, $15, $16),
				($17, $18, $19, $20, $21, $22, $23, $24),
				($25, $26, $27, $28, $29, $30, $31, $32),
				($33, $34, $35, $36, $37, $38, $39, $40),
				($41, $42, $43, $44, $45, $46, $47, $48)`,
			[
				departmentMap.get('computer-science'),
				'Prof. Muhammad Zahid',
				'MS Computer Science',
				'Computer Science',
				'/images/gallery/488504405_1150873360384302_7113898617720777839_n.jpg',
				true,
				false,
				true,
				departmentMap.get('computer-science'),
				'Dr. Ahmed Hassan',
				'PhD AI',
				'Artificial Intelligence',
				'/images/gallery/474603631_1113700027116416_3753317337439731517_n.jpg',
				false,
				true,
				true,
				departmentMap.get('english'),
				'Prof. Sajjad Haider',
				'MA English Literature',
				'English Literature',
				'/images/gallery/497498149_1184322940372677_5964474392879878424_n.jpg',
				true,
				false,
				true,
				departmentMap.get('english'),
				'Ms. Amna Bibi',
				'M.Phil Linguistics',
				'English',
				'/images/gallery/491999992_1166947772110194_8921941246071863873_n.jpg',
				false,
				true,
				true,
				departmentMap.get('urdu'),
				'Prof. Khalid Mahmood',
				'MA Urdu',
				'Urdu',
				'/images/gallery/547755271_1299324492205854_5011253499358894922_n.jpg',
				true,
				false,
				true,
				departmentMap.get('urdu'),
				'Ms. Naila Ashraf',
				'M.Phil Urdu',
				'Urdu',
				'/images/gallery/488936577_1152937786844526_8441555087243500544_n.jpg',
				false,
				true,
				true
			]
		);
		console.log('Seeded faculty_members table.');
	} else {
		console.log('Faculty members table already has data, skipping seed.');
	}
}

main().catch((error) => {
	console.error('Database setup failed.');
	console.error(error instanceof Error ? error.message : error);
	process.exit(1);
});
