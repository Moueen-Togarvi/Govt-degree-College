// Student Fees Server
import { getStudentByUserId } from '$lib/server/database/students';
import { getSql } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const profile = await getStudentByUserId(locals.user!.id);
	if (!profile) return { profile: null, fee_records: [] };

	const sql = getSql();
	const fee_records = await sql`
		SELECT * FROM fee_records
		WHERE student_id = ${profile.id}
		ORDER BY semester DESC, created_at DESC
	`;

	return { profile, fee_records: fee_records as unknown as any[] };
};
