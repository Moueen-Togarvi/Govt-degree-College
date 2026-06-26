/**
 * database/users.ts — User CRUD operations
 */
import { getSql } from '../db';
import { hashPassword } from '../auth';

export interface User {
	id: number;
	name: string;
	email: string;
	role: 'super_admin' | 'coordinator' | 'faculty' | 'student';
	is_active: boolean;
	created_at: string;
}

type Row = Record<string, unknown>;

export async function getAllUsers(): Promise<User[]> {
	const sql = getSql();
	const rows = await sql`
		SELECT id, name, email, role, is_active, created_at
		FROM users
		ORDER BY created_at DESC
	`;
	return rows as unknown as User[];
}

export async function getUserById(id: number): Promise<User | null> {
	const sql = getSql();
	const rows = (await sql`
		SELECT id, name, email, role, is_active, created_at
		FROM users WHERE id = ${id} LIMIT 1
	`) as Row[];
	return (rows[0] as unknown as User) ?? null;
}

export async function getUserByEmail(email: string): Promise<User | null> {
	const sql = getSql();
	const rows = (await sql`
		SELECT id, name, email, role, is_active, created_at
		FROM users WHERE email = ${email.toLowerCase().trim()} LIMIT 1
	`) as Row[];
	return (rows[0] as unknown as User) ?? null;
}

export async function createUser(data: {
	name: string;
	email: string;
	password: string;
	role: User['role'];
}): Promise<User> {
	const sql = getSql();
	const hash = hashPassword(data.password);
	const rows = (await sql`
		INSERT INTO users (name, email, password_hash, role)
		VALUES (${data.name}, ${data.email.toLowerCase().trim()}, ${hash}, ${data.role})
		RETURNING id, name, email, role, is_active, created_at
	`) as Row[];
	return rows[0] as unknown as User;
}

export async function updateUser(
	id: number,
	data: Partial<{ name: string; email: string; role: User['role']; is_active: boolean; password: string }>
): Promise<User | null> {
	const sql = getSql();

	if (data.password) {
		const hash = hashPassword(data.password);
		await sql`UPDATE users SET password_hash = ${hash} WHERE id = ${id}`;
	}

	const rows = (await sql`
		UPDATE users
		SET
			name = COALESCE(${data.name ?? null}, name),
			email = COALESCE(${data.email?.toLowerCase().trim() ?? null}, email),
			role = COALESCE(${data.role ?? null}, role),
			is_active = COALESCE(${data.is_active ?? null}, is_active)
		WHERE id = ${id}
		RETURNING id, name, email, role, is_active, created_at
	`) as Row[];
	return (rows[0] as unknown as User) ?? null;
}

export async function deleteUser(id: number): Promise<void> {
	const sql = getSql();
	await sql`DELETE FROM users WHERE id = ${id}`;
}

export async function countUsersByRole(): Promise<Record<string, number>> {
	const sql = getSql();
	const rows = await sql`
		SELECT role, COUNT(*)::int as count
		FROM users
		GROUP BY role
	`;
	return Object.fromEntries((rows as unknown as Row[]).map((r) => [r.role as string, r.count as number]));
}
