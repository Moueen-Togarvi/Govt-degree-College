// Student Notifications Server
import { getStudentByUserId } from '$lib/server/database/students';
import { getSql } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const profile = await getStudentByUserId(locals.user!.id);
	if (!profile) return { profile: null, announcements: [], notices: [] };

	const sql = getSql();

	// Get Announcements (Global OR Department specific)
	const announcements = await sql`
		SELECT a.*, u.name AS author_name
		FROM announcements a
		LEFT JOIN users u ON u.id = a.created_by
		WHERE a.department_id IS NULL OR a.department_id = ${profile.department_id}
		ORDER BY a.created_at DESC
		LIMIT 20
	`;

	// Get Notice Board Items (Department specific, not expired)
	const notices = await sql`
		SELECT n.*, u.name AS author_name
		FROM notice_board_items n
		LEFT JOIN users u ON u.id = n.created_by
		WHERE n.department_id = ${profile.department_id}
		  AND (n.expiry_date IS NULL OR n.expiry_date > CURRENT_TIMESTAMP)
		ORDER BY n.sort_order ASC, n.notice_date DESC
	`;

	return {
		profile,
		announcements: announcements as unknown as any[],
		notices: notices as unknown as any[]
	};
};
