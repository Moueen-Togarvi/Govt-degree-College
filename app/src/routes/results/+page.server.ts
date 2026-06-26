// Public Results Page Server
import { getStudentByRollNumber } from '$lib/server/database/students';
import { getStudentResults } from '$lib/server/database/marks';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const rollNumber = url.searchParams.get('roll_number')?.toString().trim();

	if (!rollNumber) {
		return { searched: false, student: null, results: [], cgpa: 0 };
	}

	const student = await getStudentByRollNumber(rollNumber);
	
	if (!student) {
		return { searched: true, student: null, results: [], cgpa: 0 };
	}

	const results = await getStudentResults(student.id);
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

	return {
		searched: true,
		student,
		results: published,
		cgpa
	};
};
