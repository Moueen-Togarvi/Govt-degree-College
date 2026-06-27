// Coordinator — Student Management
import { fail } from '@sveltejs/kit';
import { getDepartmentByCoordinatorId } from '$lib/server/database/departments';
import {
	getStudentsByDepartment,
	createStudentProfile,
	updateStudentProfile,
	deleteStudentProfile
} from '$lib/server/database/students';
import { hashPassword } from '$lib/server/auth';
import { getSql } from '$lib/server/db';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const dept = await getDepartmentByCoordinatorId(locals.user!.id);
	const students = dept ? await getStudentsByDepartment(dept.id) : [];
	return { department: dept, students };
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const dept = await getDepartmentByCoordinatorId(locals.user!.id);
		if (!dept) return fail(403, { error: 'No department assigned' });

		const fd = await request.formData();
		const name = fd.get('name')?.toString().trim();
		const email = fd.get('email')?.toString().trim().toLowerCase();
		const password = fd.get('password')?.toString() || 'Student@1234';
		const roll_number = fd.get('roll_number')?.toString().trim();
		const semester = parseInt(fd.get('semester')?.toString() ?? '1');
		const session = fd.get('session')?.toString().trim();
		const father_name = fd.get('father_name')?.toString() || null;
		const phone = fd.get('phone')?.toString() || null;

		if (!name || !email || !roll_number || !session) {
			return fail(400, { error: 'Name, email, roll number, and session are required.' });
		}

		const sql = getSql();
		try {
			const userRows = (await sql`
				INSERT INTO users (name, email, password_hash, role)
				VALUES (${name}, ${email}, ${hashPassword(password)}, 'student')
				RETURNING id
			`) as Record<string, unknown>[];
			const userId = userRows[0].id as number;

			await createStudentProfile({
				user_id: userId,
				department_id: dept.id,
				roll_number,
				semester,
				session,
				father_name: father_name ?? undefined,
				phone: phone ?? undefined
			});

			return { success: true, message: `${name} enrolled successfully.` };
		} catch (err: unknown) {
			const msg = (err as Error).message ?? '';
			if (msg.includes('unique') || msg.includes('duplicate')) {
				return fail(400, { error: 'Email or roll number already exists.' });
			}
			return fail(500, { error: 'Server error: ' + msg });
		}
	},

	update: async ({ request, locals }) => {
		const dept = await getDepartmentByCoordinatorId(locals.user!.id);
		if (!dept) return fail(403, { error: 'No department assigned' });

		const fd = await request.formData();
		const profileId = parseInt(fd.get('profile_id')?.toString() ?? '0');
		const userId = parseInt(fd.get('user_id')?.toString() ?? '0');
		const name = fd.get('name')?.toString().trim();
		const semester = parseInt(fd.get('semester')?.toString() ?? '1');
		const father_name = fd.get('father_name')?.toString() || null;
		const phone = fd.get('phone')?.toString() || null;

		if (!profileId) return fail(400, { error: 'Invalid student ID' });

		const sql = getSql();
		try {
			if (name && userId) await sql`UPDATE users SET name = ${name} WHERE id = ${userId}`;
			await updateStudentProfile(profileId, {
				semester,
				father_name: father_name ?? undefined,
				phone: phone ?? undefined
			});
			return { success: true, message: 'Student updated.' };
		} catch (err: unknown) {
			return fail(500, { error: 'Server error: ' + (err as Error).message });
		}
	},

	delete: async ({ request, locals }) => {
		await getDepartmentByCoordinatorId(locals.user!.id);
		const fd = await request.formData();
		const profileId = parseInt(fd.get('profile_id')?.toString() ?? '0');
		if (!profileId) return fail(400, { error: 'Invalid ID' });

		try {
			await deleteStudentProfile(profileId);
			return { success: true, message: 'Student removed.' };
		} catch (err: unknown) {
			return fail(500, { error: 'Server error: ' + (err as Error).message });
		}
	},

	importCSV: async ({ request, locals }) => {
		const dept = await getDepartmentByCoordinatorId(locals.user!.id);
		if (!dept) return fail(403, { error: 'No department assigned' });

		const fd = await request.formData();
		const file = fd.get('csv_file') as File;
		if (!file || file.size === 0) return fail(400, { error: 'No file uploaded.' });

		try {
			const text = await file.text();
			const lines = text
				.split(/\r?\n/)
				.map((l) => l.trim())
				.filter((l) => l.length > 0);
			if (lines.length < 2)
				return fail(400, { error: 'File must contain a header row and at least one student.' });

			// Simple CSV parser assuming columns: Name, Email, RollNumber, Session, Semester, FatherName, Phone
			const header = lines[0].toLowerCase();
			if (!header.includes('name') || !header.includes('email') || !header.includes('roll')) {
				return fail(400, {
					error: 'Invalid CSV format. Expected columns: Name, Email, RollNumber, Session, Semester'
				});
			}

			const sql = getSql();
			let successCount = 0;
			let errorCount = 0;

			for (let i = 1; i < lines.length; i++) {
				// Naive split (assumes no commas inside quotes)
				const cols = lines[i].split(',').map((c) => c.trim());
				if (cols.length < 5) {
					errorCount++;
					continue;
				}

				const name = cols[0];
				const email = cols[1].toLowerCase();
				const roll_number = cols[2];
				const session = cols[3];
				const semester = parseInt(cols[4]) || 1;
				const father_name = cols[5] || null;
				const phone = cols[6] || null;

				try {
					const userRows = (await sql`
						INSERT INTO users (name, email, password_hash, role)
						VALUES (${name}, ${email}, ${hashPassword('Student@1234')}, 'student')
						ON CONFLICT (email) DO NOTHING
						RETURNING id
					`) as Record<string, unknown>[];

					if (userRows.length === 0) {
						errorCount++;
						continue;
					} // User exists

					const userId = userRows[0].id as number;

					await createStudentProfile({
						user_id: userId,
						department_id: dept.id,
						roll_number,
						semester,
						session,
						father_name,
						phone
					});
					successCount++;
				} catch (err) {
					errorCount++;
				}
			}

			return {
				success: true,
				message: `Import complete. ${successCount} imported, ${errorCount} failed.`
			};
		} catch (err: unknown) {
			return fail(500, { error: 'Import failed: ' + (err as Error).message });
		}
	}
};
