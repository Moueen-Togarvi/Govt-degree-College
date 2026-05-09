import { defaultFacultyImage } from '$lib/content/faculty-fallback';
import { isExpectedDatabaseError, withDatabase } from '$lib/server/db';
import { readLocalContentStore, updateLocalContentStore } from '$lib/server/local-content-store';
import type {
	Department,
	FacultyDirectoryDepartment,
	FacultyDirectoryMember,
	FacultyMember
} from '$lib/types/faculty';

type DepartmentRow = {
	id: number | string;
	name: string;
	slug: string;
	urdu_name: string | null;
};

type FacultyRow = {
	id: number | string;
	department_id: number | string;
	department_name: string;
	department_slug: string;
	name: string;
	education: string;
	subject: string;
	image_url: string | null;
	is_hod: boolean;
	is_coordinator: boolean;
	is_teaching_staff: boolean;
};

const facultySchemaStatements = [
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

const preferLocalStore =
	process.env.CONTENT_STORE_MODE === 'local' ||
	(process.env.NODE_ENV !== 'production' && process.env.CONTENT_STORE_MODE !== 'database');

let facultySchemaPromise: Promise<void> | null = null;

function slugifyDepartmentName(value: string) {
	return value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '') || 'department';
}

async function ensureFacultySchema() {
	if (preferLocalStore) return;

	if (!facultySchemaPromise) {
		facultySchemaPromise = withDatabase('ensure faculty schema', async (sql) => {
			for (const statement of facultySchemaStatements) {
				await sql.query(statement);
			}
		}).catch((error) => {
			facultySchemaPromise = null;
			throw error;
		});
	}

	await facultySchemaPromise;
}

function mapDepartment(row: DepartmentRow): Department {
	return {
		id: Number(row.id),
		name: row.name,
		slug: row.slug,
		urduName: row.urdu_name?.trim() || row.name
	};
}

function mapFacultyMember(row: FacultyRow): FacultyMember {
	return {
		id: Number(row.id),
		departmentId: Number(row.department_id),
		departmentName: row.department_name,
		departmentSlug: row.department_slug,
		name: row.name,
		education: row.education,
		subject: row.subject,
		imageUrl: row.image_url || defaultFacultyImage,
		isHod: Boolean(row.is_hod),
		isCoordinator: Boolean(row.is_coordinator),
		isTeachingStaff: Boolean(row.is_teaching_staff)
	};
}

function getDisplayRole(member: FacultyMember) {
	if (member.isHod) return 'HOD';
	if (member.isCoordinator) return 'Department Coordinator';
	if (member.isTeachingStaff) return member.subject || 'Teaching Staff';
	return 'Faculty Member';
}

function mapDirectoryMember(member: FacultyMember): FacultyDirectoryMember {
	const role = getDisplayRole(member);

	return {
		id: member.id,
		name: member.name,
		urduName: member.name,
		role,
		urduRole: role,
		qualification: member.education,
		urduQualification: member.education,
		photo: member.imageUrl,
		subject: member.subject,
		isHod: member.isHod,
		isCoordinator: member.isCoordinator,
		isTeachingStaff: member.isTeachingStaff
	};
}

function nextId(items: Array<{ id: number }>) {
	return items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
}

async function withFacultyFallback<T>(
	databaseOperation: () => Promise<T>,
	localOperation: () => Promise<T>
): Promise<T> {
	if (preferLocalStore) {
		return localOperation();
	}

	try {
		await ensureFacultySchema();
		return await databaseOperation();
	} catch (error) {
		if (isExpectedDatabaseError(error)) {
			return localOperation();
		}

		throw error;
	}
}

async function withFacultyMutation(
	databaseOperation: () => Promise<unknown>,
	localOperation: () => Promise<void>
): Promise<void> {
	return withFacultyFallback(
		async () => {
			await databaseOperation();
		},
		localOperation
	);
}

function mergeFacultyWithDepartments(
	departments: Department[],
	facultyMembers: FacultyMember[]
): FacultyMember[] {
	const departmentsById = new Map(departments.map((department) => [department.id, department]));

	return facultyMembers.map((member) => {
		const department = departmentsById.get(member.departmentId);
		return {
			...member,
			departmentName: department?.name ?? member.departmentName,
			departmentSlug: department?.slug ?? member.departmentSlug,
			imageUrl: member.imageUrl || defaultFacultyImage
		};
	});
}

function clearLeadershipFlagsLocally(
	facultyMembers: FacultyMember[],
	departmentId: number,
	{
		memberId,
		isHod,
		isCoordinator
	}: {
		memberId?: number;
		isHod: boolean;
		isCoordinator: boolean;
	}
) {
	for (const member of facultyMembers) {
		if (member.departmentId !== departmentId || member.id === memberId) continue;
		if (isHod) member.isHod = false;
		if (isCoordinator) member.isCoordinator = false;
	}
}

export async function listDepartments(): Promise<Department[]> {
	return withFacultyFallback(
		async () => {
			const rows = await withDatabase('list departments', async (sql) =>
				(await sql`
					SELECT id, name, slug, urdu_name
					FROM departments
					ORDER BY name ASC, id ASC
				`) as DepartmentRow[]
			);

			return rows.map(mapDepartment);
		},
		async () => {
			const store = await readLocalContentStore();
			return [...store.departments].sort((left, right) => left.name.localeCompare(right.name) || left.id - right.id);
		}
	);
}

export async function listFacultyMembers(): Promise<FacultyMember[]> {
	return withFacultyFallback(
		async () => {
			const rows = await withDatabase('list faculty members', async (sql) =>
				(await sql`
					SELECT
						fm.id,
						fm.department_id,
						d.name AS department_name,
						d.slug AS department_slug,
						fm.name,
						fm.education,
						fm.subject,
						fm.image_url,
						fm.is_hod,
						fm.is_coordinator,
						fm.is_teaching_staff
					FROM faculty_members fm
					INNER JOIN departments d ON d.id = fm.department_id
					ORDER BY d.name ASC, fm.is_hod DESC, fm.is_coordinator DESC, fm.name ASC
				`) as FacultyRow[]
			);

			return rows.map(mapFacultyMember);
		},
		async () => {
			const store = await readLocalContentStore();
			return mergeFacultyWithDepartments(store.departments, store.facultyMembers).sort(
				(left, right) =>
					left.departmentName.localeCompare(right.departmentName) ||
					Number(right.isHod) - Number(left.isHod) ||
					Number(right.isCoordinator) - Number(left.isCoordinator) ||
					left.name.localeCompare(right.name)
			);
		}
	);
}

export async function listFacultyDirectory(): Promise<FacultyDirectoryDepartment[]> {
	const [departments, facultyMembers] = await Promise.all([listDepartments(), listFacultyMembers()]);

	return departments.map((department) => {
		const members = facultyMembers
			.filter((member) => member.departmentId === department.id)
			.map(mapDirectoryMember);

		const coordinator =
			members.find((member) => member.isCoordinator) ??
			members.find((member) => member.isHod) ??
			null;

		return {
			id: department.slug,
			databaseId: department.id,
			name: department.name,
			urduName: department.urduName,
			coordinator,
			staff: members
		};
	});
}

export async function createDepartment(input: {
	name: string;
	urduName?: string;
	slug?: string;
}) {
	const slug = slugifyDepartmentName(input.slug || input.name);

	return withFacultyMutation(
		async () =>
			withDatabase('create department', async (sql) =>
				sql.query(
					`
						INSERT INTO departments (name, slug, urdu_name)
						VALUES ($1, $2, $3)
					`,
					[input.name, slug, input.urduName?.trim() || input.name]
				)
			),
		async () =>
			updateLocalContentStore((store) => {
				store.departments.push({
					id: nextId(store.departments),
					name: input.name,
					slug,
					urduName: input.urduName?.trim() || input.name
				});
			})
	);
}

export async function updateDepartment(input: {
	id: number;
	name: string;
	urduName?: string;
	slug?: string;
}) {
	const slug = slugifyDepartmentName(input.slug || input.name);

	return withFacultyMutation(
		async () =>
			withDatabase('update department', async (sql) =>
				sql.query(
					`
						UPDATE departments
						SET name = $1, slug = $2, urdu_name = $3
						WHERE id = $4
					`,
					[input.name, slug, input.urduName?.trim() || input.name, input.id]
				)
			),
		async () =>
			updateLocalContentStore((store) => {
				const department = store.departments.find((entry) => entry.id === input.id);
				if (!department) return;
				department.name = input.name;
				department.slug = slug;
				department.urduName = input.urduName?.trim() || input.name;

				for (const member of store.facultyMembers) {
					if (member.departmentId !== input.id) continue;
					member.departmentName = input.name;
					member.departmentSlug = slug;
				}
			})
	);
}

export async function countFacultyMembersByDepartment(departmentId: number) {
	return withFacultyFallback(
		async () => {
			const rows = await withDatabase('count faculty members by department', async (sql) =>
				sql.query('SELECT COUNT(*)::int AS count FROM faculty_members WHERE department_id = $1', [
					departmentId
				])
			);

			return Number((rows as Array<{ count: number | string }>)[0]?.count ?? 0);
		},
		async () => {
			const store = await readLocalContentStore();
			return store.facultyMembers.filter((member) => member.departmentId === departmentId).length;
		}
	);
}

export async function deleteDepartment(id: number) {
	return withFacultyMutation(
		async () =>
			withDatabase('delete department', async (sql) =>
				sql.query('DELETE FROM departments WHERE id = $1', [id])
			),
		async () =>
			updateLocalContentStore((store) => {
				store.departments = store.departments.filter((department) => department.id !== id);
			})
	);
}

async function clearLeadershipFlags(
	departmentId: number,
	{
		memberId,
		isHod,
		isCoordinator
	}: {
		memberId?: number;
		isHod: boolean;
		isCoordinator: boolean;
	}
) {
	return withFacultyMutation(
		async () =>
			withDatabase('clear faculty leadership flags', async (sql) => {
				if (isHod) {
					await sql.query(
						'UPDATE faculty_members SET is_hod = FALSE WHERE department_id = $1 AND id <> COALESCE($2, -1)',
						[departmentId, memberId ?? null]
					);
				}

				if (isCoordinator) {
					await sql.query(
						'UPDATE faculty_members SET is_coordinator = FALSE WHERE department_id = $1 AND id <> COALESCE($2, -1)',
						[departmentId, memberId ?? null]
					);
				}
			}),
		async () =>
			updateLocalContentStore((store) => {
				clearLeadershipFlagsLocally(store.facultyMembers, departmentId, {
					memberId,
					isHod,
					isCoordinator
				});
			})
	);
}

export async function createFacultyMember(input: {
	departmentId: number;
	name: string;
	education: string;
	subject: string;
	imageUrl?: string | null;
	isHod: boolean;
	isCoordinator: boolean;
	isTeachingStaff: boolean;
}) {
	await clearLeadershipFlags(input.departmentId, input);

	return withFacultyMutation(
		async () =>
			withDatabase('create faculty member', async (sql) =>
				sql.query(
					`
						INSERT INTO faculty_members (
							department_id, name, education, subject, image_url, is_hod, is_coordinator, is_teaching_staff
						)
						VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
					`,
					[
						input.departmentId,
						input.name,
						input.education,
						input.subject,
						input.imageUrl || null,
						input.isHod,
						input.isCoordinator,
						input.isTeachingStaff
					]
				)
			),
		async () =>
			updateLocalContentStore((store) => {
				const department = store.departments.find((entry) => entry.id === input.departmentId);
				store.facultyMembers.push({
					id: nextId(store.facultyMembers),
					departmentId: input.departmentId,
					departmentName: department?.name ?? '',
					departmentSlug: department?.slug ?? '',
					name: input.name,
					education: input.education,
					subject: input.subject,
					imageUrl: input.imageUrl || defaultFacultyImage,
					isHod: input.isHod,
					isCoordinator: input.isCoordinator,
					isTeachingStaff: input.isTeachingStaff
				});
			})
	);
}

export async function updateFacultyMember(input: {
	id: number;
	departmentId: number;
	name: string;
	education: string;
	subject: string;
	imageUrl?: string | null;
	isHod: boolean;
	isCoordinator: boolean;
	isTeachingStaff: boolean;
}) {
	await clearLeadershipFlags(input.departmentId, {
		memberId: input.id,
		isHod: input.isHod,
		isCoordinator: input.isCoordinator
	});

	return withFacultyMutation(
		async () =>
			withDatabase('update faculty member', async (sql) =>
				sql.query(
					`
						UPDATE faculty_members
						SET
							department_id = $1,
							name = $2,
							education = $3,
							subject = $4,
							image_url = $5,
							is_hod = $6,
							is_coordinator = $7,
							is_teaching_staff = $8
						WHERE id = $9
					`,
					[
						input.departmentId,
						input.name,
						input.education,
						input.subject,
						input.imageUrl || null,
						input.isHod,
						input.isCoordinator,
						input.isTeachingStaff,
						input.id
					]
				)
			),
		async () =>
			updateLocalContentStore((store) => {
				const member = store.facultyMembers.find((entry) => entry.id === input.id);
				const department = store.departments.find((entry) => entry.id === input.departmentId);
				if (!member) return;
				member.departmentId = input.departmentId;
				member.departmentName = department?.name ?? member.departmentName;
				member.departmentSlug = department?.slug ?? member.departmentSlug;
				member.name = input.name;
				member.education = input.education;
				member.subject = input.subject;
				member.imageUrl = input.imageUrl || defaultFacultyImage;
				member.isHod = input.isHod;
				member.isCoordinator = input.isCoordinator;
				member.isTeachingStaff = input.isTeachingStaff;
			})
	);
}

export async function deleteFacultyMember(id: number) {
	return withFacultyMutation(
		async () =>
			withDatabase('delete faculty member', async (sql) =>
				sql.query('DELETE FROM faculty_members WHERE id = $1', [id])
			),
		async () =>
			updateLocalContentStore((store) => {
				store.facultyMembers = store.facultyMembers.filter((member) => member.id !== id);
			})
	);
}

export async function seedFacultyData() {
	const [departments, facultyMembers] = await Promise.all([listDepartments(), listFacultyMembers()]);
	return {
		departments: departments.length,
		facultyMembers: facultyMembers.length
	};
}
