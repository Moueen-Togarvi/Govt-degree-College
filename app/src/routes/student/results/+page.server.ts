// Student — Results Page
import { getStudentByUserId } from '$lib/server/database/students';
import { getStudentResults } from '$lib/server/database/marks';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const profile = await getStudentByUserId(locals.user!.id);
	if (!profile) return { profile: null, results: [], cgpa: 0 };

	const results = await getStudentResults(profile.id);
	const published = results.filter(r => r.is_published);

	// Calculate CGPA
	let totalCredits = 0;
	let totalPoints = 0;
	for (const r of published) {
		if (r.gpa_points !== null) {
			totalCredits += r.credit_hours;
			totalPoints += r.gpa_points * r.credit_hours;
		}
	}
	const cgpa = totalCredits > 0 ? Math.round((totalPoints / totalCredits) * 100) / 100 : 0;

	return { profile, results: published, cgpa };
};
