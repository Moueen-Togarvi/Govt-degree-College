// Faculty — Attendance Module
import { fail } from '@sveltejs/kit';
import { getFacultyByUserId } from '$lib/server/database/faculty';
import { getAttendanceByDate, getAttendanceSummary, markAttendance } from '$lib/server/database/attendance';
import { getSql } from '$lib/server/db';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const profile = await getFacultyByUserId(locals.user!.id);
	if (!profile) return { profile: null, offerings: [], attendance: [], summary: [], selectedOffering: null, selectedDate: '', view: 'mark' };

	const sql = getSql();
	const offerings = await sql`
		SELECT co.*, c.title AS course_title, c.code AS course_code
		FROM course_offerings co
		JOIN courses c ON c.id = co.course_id
		WHERE co.teacher_id = ${profile.id} AND co.is_active = TRUE
		ORDER BY co.semester ASC, c.title ASC
	`;

	const offeringId = parseInt(url.searchParams.get('offering') ?? '0');
	const date = url.searchParams.get('date') ?? new Date().toISOString().split('T')[0];
	const view = url.searchParams.get('view') ?? 'mark';

	let attendance: Awaited<ReturnType<typeof getAttendanceByDate>> = [];
	let summary: Awaited<ReturnType<typeof getAttendanceSummary>> = [];
	let students: Record<string, unknown>[] = [];
	let selectedOffering = null as Record<string, unknown> | null;

	if (offeringId) {
		selectedOffering = (offerings as unknown as Record<string, unknown>[]).find(o => o.id === offeringId) ?? null;

		if (view === 'summary') {
			summary = await getAttendanceSummary(offeringId);
		} else {
			// Get enrolled students for this offering
			students = await sql`
				SELECT sp.id AS student_id, u.name, sp.roll_number
				FROM enrollments e
				JOIN student_profiles sp ON sp.id = e.student_id
				JOIN users u ON u.id = sp.user_id
				WHERE e.course_offering_id = ${offeringId}
				ORDER BY sp.roll_number ASC
			` as Record<string, unknown>[];
			attendance = await getAttendanceByDate(offeringId, date);
		}
	}

	return { profile, offerings: offerings as unknown as Record<string, unknown>[], attendance, summary, students, selectedOffering, selectedDate: date, selectedOfferingId: offeringId, view };
};

export const actions: Actions = {
	mark: async ({ request, locals }) => {
		const profile = await getFacultyByUserId(locals.user!.id);
		if (!profile) return fail(403, { error: 'No profile' });

		const fd = await request.formData();
		const offeringId = parseInt(fd.get('offering_id')?.toString() ?? '0');
		const date = fd.get('date')?.toString() ?? '';
		if (!offeringId || !date) return fail(400, { error: 'Missing offering or date' });

		const entries = fd.getAll('student_id').map((sid, i) => ({
			student_id: parseInt(sid.toString()),
			course_offering_id: offeringId,
			date,
			status: fd.getAll('status')[i]?.toString() ?? 'absent',
			marked_by: profile.id
		}));

		try {
			await markAttendance(entries);
			return { success: true, message: `Attendance saved for ${entries.length} students.` };
		} catch (err: unknown) {
			return fail(500, { error: (err as Error).message });
		}
	}
};
