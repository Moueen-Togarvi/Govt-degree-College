// Student Dashboard
import { getStudentByUserId } from '$lib/server/database/students';
import { getStudentAttendance } from '$lib/server/database/attendance';
import { getStudentResults } from '$lib/server/database/marks';
import { getSql } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const profile = await getStudentByUserId(locals.user!.id);
	if (!profile) return { profile: null, attendance: [], results: [], announcements: [] };

	const [attendance, results] = await Promise.all([
		getStudentAttendance(profile.id),
		getStudentResults(profile.id)
	]);

	const sql = getSql();
	const announcements = await sql`
		SELECT * FROM announcements
		WHERE department_id = ${profile.department_id} OR department_id IS NULL
		ORDER BY created_at DESC LIMIT 5
	`;

	// Overall attendance percentage
	const totalClasses = attendance.reduce((sum, a) => sum + a.total, 0);
	const totalPresent = attendance.reduce((sum, a) => sum + a.present, 0);
	const overallPercent = totalClasses > 0 ? Math.round((totalPresent / totalClasses) * 100) : 0;

	// Published results only
	const publishedResults = results.filter((r) => r.is_published);

	return {
		profile,
		attendance,
		results: publishedResults,
		announcements: announcements as unknown as {
			id: number;
			title: string;
			description: string;
			category: string;
			created_at: string;
		}[],
		stats: {
			overallAttendance: overallPercent,
			courses: attendance.length,
			results: publishedResults.length
		}
	};
};
