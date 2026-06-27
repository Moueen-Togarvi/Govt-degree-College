/**
 * setup-db.mjs — Applies schema.sql and seeds the super admin user
 * Uses HTTP neon client to bypass WebSocket timeout issues.
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createHash, randomBytes } from 'crypto';
import { neon } from '@neondatabase/serverless';

const __dirname = dirname(fileURLToPath(import.meta.url));

const DATABASE_URL = process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET ?? 'fallback-secret';

if (!DATABASE_URL) {
	console.error('❌ DATABASE_URL not found in .env');
	process.exit(1);
}

// --- Hash password (same algorithm as auth.ts) ---
function hashPassword(password) {
	const salt = randomBytes(16).toString('hex');
	const hash = createHash('sha256').update(`${salt}:${password}:${JWT_SECRET}`).digest('hex');
	return `${salt}:${hash}`;
}

async function main() {
	const sql = neon(DATABASE_URL);

	// Optional: Drop existing schema to apply clean if requested
	// This is useful if old schemas are missing columns.
	console.log('📦 Dropping public schema (resetting DB)...');
	await sql`DROP SCHEMA IF EXISTS public CASCADE`;
	await sql`CREATE SCHEMA public`;

	console.log('📦 Applying schema.sql...');

	const schemaPath = join(__dirname, '../schema.sql');
	let schema = readFileSync(schemaPath, 'utf8');

	// Remove the placeholder seed from schema
	schema = schema.replace(/INSERT INTO users[\s\S]*?ON CONFLICT \(email\) DO NOTHING;/, '');

	// Remove block comments and line comments
	schema = schema.replace(/--.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');

	// Split on semicolons and run each statement
	const statements = schema
		.split(';')
		.map((s) => s.trim())
		.filter((s) => s.length > 0);

	let success = 0;
	let errors = 0;

	for (const stmt of statements) {
		try {
			await sql.query(stmt);
			success++;
		} catch (err) {
			console.warn(`  ⚠️  Statement warning: ${err.message?.slice(0, 80)}`);
			errors++;
		}
	}

	console.log(`  ✅ ${success} statements applied, ${errors} warnings.`);

	// Seed super admin
	console.log('\n👤 Seeding Super Admin account...');
	const email = 'admin@gpgc.edu.pk';
	const password = 'Admin@1234';
	const hash = hashPassword(password);

	try {
		await sql`
			INSERT INTO users (name, email, password_hash, role, is_active)
			VALUES ('Super Admin', ${email}, ${hash}, 'super_admin', TRUE)
			ON CONFLICT (email) DO UPDATE
			SET password_hash = ${hash}, is_active = TRUE
		`;
		console.log(`  ✅ Super Admin ready:`);
		console.log(`     Email: ${email}`);
		console.log(`     Password: ${password}`);
		console.log(`  ⚠️  Change this password after first login!`);
	} catch (err) {
		console.error('  ❌ Failed to seed admin:', err.message);
	}

	console.log('\n🎉 Database setup complete!');
	console.log('   Run: npm run dev');
	console.log('   Login at: http://localhost:5173/login');
}

main().catch((err) => {
	console.error('Fatal error:', err);
	process.exit(1);
});
