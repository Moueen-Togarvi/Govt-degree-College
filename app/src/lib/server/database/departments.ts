/**
 * database/departments.ts — Department CRUD operations
 */
import { getSql } from '../db';

export interface Department {
	id: number;
	name: string;
	slug: string;
	urdu_name: string | null;
	description: string | null;
	coordinator_id: number | null;
	coordinator_name?: string;
	created_at: string;
}

type Row = Record<string, unknown>;

export async function getAllDepartments(): Promise<Department[]> {
	const sql = getSql();
	const rows = await sql`
		SELECT d.*, u.name AS coordinator_name
		FROM departments d
		LEFT JOIN users u ON u.id = d.coordinator_id
		ORDER BY d.name ASC
	`;
	return rows as unknown as Department[];
}

export async function getDepartmentById(id: number): Promise<Department | null> {
	const sql = getSql();
	const rows = (await sql`
		SELECT d.*, u.name AS coordinator_name
		FROM departments d
		LEFT JOIN users u ON u.id = d.coordinator_id
		WHERE d.id = ${id} LIMIT 1
	`) as Row[];
	return (rows[0] as unknown as Department) ?? null;
}

export async function getDepartmentBySlug(slug: string): Promise<Department | null> {
	const sql = getSql();
	const rows = (await sql`
		SELECT d.*, u.name AS coordinator_name
		FROM departments d
		LEFT JOIN users u ON u.id = d.coordinator_id
		WHERE d.slug = ${slug} LIMIT 1
	`) as Row[];
	return (rows[0] as unknown as Department) ?? null;
}

export async function getDepartmentByCoordinatorId(userId: number): Promise<Department | null> {
	const sql = getSql();
	const rows = (await sql`
		SELECT d.*, u.name AS coordinator_name
		FROM departments d
		LEFT JOIN users u ON u.id = d.coordinator_id
		WHERE d.coordinator_id = ${userId} LIMIT 1
	`) as Row[];
	return (rows[0] as unknown as Department) ?? null;
}

export async function createDepartment(data: {
	name: string;
	slug: string;
	urdu_name?: string;
	description?: string;
	coordinator_id?: number;
}): Promise<Department> {
	const sql = getSql();
	const rows = (await sql`
		INSERT INTO departments (name, slug, urdu_name, description, coordinator_id)
		VALUES (
			${data.name},
			${data.slug},
			${data.urdu_name ?? null},
			${data.description ?? null},
			${data.coordinator_id ?? null}
		)
		RETURNING *
	`) as Row[];
	return rows[0] as unknown as Department;
}

export async function updateDepartment(
	id: number,
	data: Partial<{ name: string; slug: string; urdu_name: string; description: string; coordinator_id: number }>
): Promise<Department | null> {
	const sql = getSql();
	const rows = (await sql`
		UPDATE departments
		SET
			name = COALESCE(${data.name ?? null}, name),
			slug = COALESCE(${data.slug ?? null}, slug),
			urdu_name = COALESCE(${data.urdu_name ?? null}, urdu_name),
			description = COALESCE(${data.description ?? null}, description),
			coordinator_id = COALESCE(${data.coordinator_id ?? null}, coordinator_id)
		WHERE id = ${id}
		RETURNING *
	`) as Row[];
	return (rows[0] as unknown as Department) ?? null;
}

export async function deleteDepartment(id: number): Promise<void> {
	const sql = getSql();
	await sql`DELETE FROM departments WHERE id = ${id}`;
}
