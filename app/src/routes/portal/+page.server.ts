import { fail, redirect } from '@sveltejs/kit';
import { login, createSession, getDefaultRedirect } from '$lib/server/auth';
import { env } from '$env/dynamic/private';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	// Already handled by hooks.server.ts, but extra safety
	if (locals.user) {
		redirect(303, getDefaultRedirect(locals.user.role));
	}
	return {
		reason: url.searchParams.get('reason'),
		next: url.searchParams.get('next') ?? ''
	};
};

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = (data.get('email') as string)?.trim() ?? '';
		const password = (data.get('password') as string) ?? '';
		const next = (data.get('next') as string) ?? '';

		if (!email || !password) {
			return fail(400, { error: 'Email and password are required.', email });
		}

		let result;
		try {
			result = await login(email, password);
		} catch (err: any) {
			if (err.message?.includes('relation "users" does not exist')) {
				console.log('⚡ Users table not found. Auto-bootstrapping database...');
				try {
					const { readFileSync } = await import('fs');
					const { join } = await import('path');
					const { createHash, randomBytes } = await import('crypto');
					const { getSql } = await import('$lib/server/db');

					const sql = getSql();

					// 1. Drop public schema
					await sql`DROP SCHEMA IF EXISTS public CASCADE`;
					await sql`CREATE SCHEMA public`;
					await sql`CREATE EXTENSION IF NOT EXISTS pgcrypto`;

					// 2. Read schema file
					const schemaPath = join(process.cwd(), 'schema.sql');
					let schema = readFileSync(schemaPath, 'utf8');

					// Remove placeholder inserts
					schema = schema.replace(
						/INSERT INTO users[\s\S]*?ON CONFLICT \(email\) DO NOTHING;/,
						''
					);

					// Remove comments
					schema = schema.replace(/--.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');

					// Split and execute statements
					const statements = schema
						.split(';')
						.map((s) => s.trim())
						.filter((s) => s.length > 0);

					for (const stmt of statements) {
						await sql.query(stmt);
					}

					// 3. Hash admin password
					const adminEmail = 'admin@gpgc.edu.pk';
					const adminPassword = 'Admin@1234';
					const jwtSecret = env.JWT_SECRET ?? 'fallback-secret';
					const salt = randomBytes(16).toString('hex');
					const hashValue = createHash('sha256')
						.update(`${salt}:${adminPassword}:${jwtSecret}`)
						.digest('hex');
					const passwordHash = `${salt}:${hashValue}`;

					// 4. Insert Super Admin
					await sql`
						INSERT INTO users (name, email, password_hash, role, is_active)
						VALUES ('Super Admin', ${adminEmail}, ${passwordHash}, 'super_admin', TRUE)
						ON CONFLICT (email) DO UPDATE
						SET password_hash = ${passwordHash}, is_active = TRUE
					`;
					console.log('✅ Database auto-bootstrapped successfully!');
					
					// Retry login after successful setup
					result = await login(email, password);
				} catch (setupErr: any) {
					console.error('Database auto-bootstrap failed:', setupErr);
					return fail(500, { error: 'Database needs setup but auto-bootstrap failed: ' + setupErr.message, email });
				}
			} else {
				throw err;
			}
		}

		if ('error' in result) {
			return fail(401, { error: result.error, email });
		}

		await createSession(result.user.id, cookies);

		const destination = next || getDefaultRedirect(result.user.role);
		redirect(303, destination);
	},
	setupDb: async () => {
		try {
			const { readFileSync } = await import('fs');
			const { join } = await import('path');
			const { createHash, randomBytes } = await import('crypto');
			const { getSql } = await import('$lib/server/db');

			const sql = getSql();

			// 1. Drop public schema
			await sql`DROP SCHEMA IF EXISTS public CASCADE`;
			await sql`CREATE SCHEMA public`;
			await sql`CREATE EXTENSION IF NOT EXISTS pgcrypto`;

			// 2. Read schema file
			const schemaPath = join(process.cwd(), 'schema.sql');
			let schema = readFileSync(schemaPath, 'utf8');

			// Remove placeholder inserts
			schema = schema.replace(
				/INSERT INTO users[\s\S]*?ON CONFLICT \(email\) DO NOTHING;/,
				''
			);

			// Remove comments
			schema = schema.replace(/--.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');

			// Split and execute statements
			const statements = schema
				.split(';')
				.map((s) => s.trim())
				.filter((s) => s.length > 0);

			for (const stmt of statements) {
				await sql.query(stmt);
			}

			// 3. Hash admin password
			const email = 'admin@gpgc.edu.pk';
			const password = 'Admin@1234';
			const jwtSecret = env.JWT_SECRET ?? 'fallback-secret';
			const salt = randomBytes(16).toString('hex');
			const hash = createHash('sha256')
				.update(`${salt}:${password}:${jwtSecret}`)
				.digest('hex');
			const passwordHash = `${salt}:${hash}`;

			// 4. Insert Super Admin
			await sql`
				INSERT INTO users (name, email, password_hash, role, is_active)
				VALUES ('Super Admin', ${email}, ${passwordHash}, 'super_admin', TRUE)
				ON CONFLICT (email) DO UPDATE
				SET password_hash = ${passwordHash}, is_active = TRUE
			`;

			return { success: true, message: 'Database reset and seeded successfully!' };
		} catch (err: any) {
			console.error('Database setup action failed:', err);
			return fail(500, { error: 'Failed to initialize database: ' + err.message });
		}
	}
};
