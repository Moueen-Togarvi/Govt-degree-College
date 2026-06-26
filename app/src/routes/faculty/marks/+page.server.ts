// Faculty — Marks Entry Module
import { fail } from '@sveltejs/kit';
import { getFacultyByUserId } from '$lib/server/database/faculty';
import { getMarksByOffering, upsertMark, publishResults, calculateGrade } from '$lib/server/database/marks';
import { getStudentsByDepartmentAndSemester } from '$lib/server/database/students';
import { getSql } from '$lib/server/db';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const profile = await getFacultyByUserId(locals.user!.id);
	if (!profile) return { profile: null, offerings: [], marks: [], students: [], selectedOffering: null };

	const sql = getSql();
	const offerings = await sql`
		SELECT co.*, c.title AS course_title, c.code AS course_code, c.credit_hours
		FROM course_offerings co
		JOIN courses c ON c.id = co.course_id
		WHERE co.teacher_id = ${profile.id} AND co.is_active = TRUE
		ORDER BY co.semester ASC, c.title ASC
	`;

	const offeringId = parseInt(url.searchParams.get('offering') ?? '0');
	let marks: Awaited<ReturnType<typeof getMarksByOffering>> = [];
	let students: Record<string, unknown>[] = [];
	let selectedOffering = null as Record<string, unknown> | null;

	if (offeringId) {
		selectedOffering = (offerings as unknown as Record<string, unknown>[]).find(o => o.id === offeringId) ?? null;
		marks = await getMarksByOffering(offeringId);

		// Get enrolled students
		students = await sql`
			SELECT sp.id AS student_id, u.name, sp.roll_number, sp.semester
			FROM enrollments e
			JOIN student_profiles sp ON sp.id = e.student_id
			JOIN users u ON u.id = sp.user_id
			WHERE e.course_offering_id = ${offeringId}
			ORDER BY sp.roll_number ASC
		` as Record<string, unknown>[];
	}

	return {
		profile,
		offerings: offerings as unknown as Record<string, unknown>[],
		marks,
		students,
		selectedOffering,
		selectedOfferingId: offeringId
	};
};

export const actions: Actions = {
	saveMarks: async ({ request, locals }) => {
		const profile = await getFacultyByUserId(locals.user!.id);
		if (!profile) return fail(403, { error: 'No profile' });

		const fd = await request.formData();
		const offeringId = parseInt(fd.get('offering_id')?.toString() ?? '0');
		const studentIds = fd.getAll('student_id');
		if (!offeringId || !studentIds.length) return fail(400, { error: 'No data provided' });

		try {
			for (let i = 0; i < studentIds.length; i++) {
				const studentId = parseInt(studentIds[i].toString());
				const midterm = parseFloat(fd.getAll('midterm')[i]?.toString() ?? '0');
				const finals = parseFloat(fd.getAll('finals')[i]?.toString() ?? '0');
				const quizzes = parseFloat(fd.getAll('quizzes')[i]?.toString() ?? '0');
				const assignments = parseFloat(fd.getAll('assignments')[i]?.toString() ?? '0');
				const practical = parseFloat(fd.getAll('practical')[i]?.toString() ?? '0');
				const total = midterm + finals + quizzes + assignments + practical;
				const { grade, gpa } = calculateGrade(total);

				await upsertMark({ student_id: studentId, course_offering_id: offeringId, midterm, finals, quizzes, assignments, practical, grade, gpa_points: gpa });
			}
			return { success: true, message: `Marks saved for ${studentIds.length} students.` };
		} catch (err: unknown) {
			return fail(500, { error: (err as Error).message });
		}
	},

	publish: async ({ request }) => {
		const fd = await request.formData();
		const offeringId = parseInt(fd.get('offering_id')?.toString() ?? '0');
		const publish = fd.get('publish') === 'true';
		if (!offeringId) return fail(400, { error: 'Invalid ID' });
		try {
			await publishResults(offeringId, publish);
			return { success: true, message: publish ? 'Results published to students.' : 'Results unpublished.' };
		} catch (err: unknown) {
			return fail(500, { error: (err as Error).message });
		}
	}
};
