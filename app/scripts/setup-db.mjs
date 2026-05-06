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
}

main().catch((error) => {
	console.error('Database setup failed.');
	console.error(error instanceof Error ? error.message : error);
	process.exit(1);
});
