// Coordinator — Timetable Builder
import { fail } from '@sveltejs/kit';
import { getDepartmentByCoordinatorId } from '$lib/server/database/departments';
import { getOfferingsByDepartment } from '$lib/server/database/courses';
import {
	getTimetableByDepartment,
	createTimetableEntry,
	deleteTimetableEntry
} from '$lib/server/database/timetable';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const dept = await getDepartmentByCoordinatorId(locals.user!.id);
	if (!dept) return { department: null, timetable: [], offerings: [] };

	const [timetable, offerings] = await Promise.all([
		getTimetableByDepartment(dept.id),
		getOfferingsByDepartment(dept.id)
	]);

	return { department: dept, timetable, offerings };
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const dept = await getDepartmentByCoordinatorId(locals.user!.id);
		if (!dept) return fail(403, { error: 'No department assigned' });

		const fd = await request.formData();
		const course_offering_id = parseInt(fd.get('course_offering_id')?.toString() ?? '0');
		const room = fd.get('room')?.toString().trim() || undefined;
		const day = fd.get('day')?.toString();
		const start_time = fd.get('start_time')?.toString();
		const end_time = fd.get('end_time')?.toString();
		const class_type = fd.get('class_type')?.toString() || 'lecture';

		if (!course_offering_id || !day || !start_time || !end_time) {
			return fail(400, { error: 'Missing required fields' });
		}

		if (start_time >= end_time) {
			return fail(400, { error: 'Start time must be before end time' });
		}

		try {
			await createTimetableEntry({
				course_offering_id,
				room,
				day,
				start_time,
				end_time,
				class_type
			});
			return { success: true, message: 'Class added to timetable.' };
		} catch (err: unknown) {
			return fail(500, { error: 'Server error: ' + (err as Error).message });
		}
	},

	delete: async ({ request }) => {
		const fd = await request.formData();
		const id = parseInt(fd.get('id')?.toString() ?? '0');
		if (!id) return fail(400, { error: 'Invalid ID' });
		try {
			await deleteTimetableEntry(id);
			return { success: true, message: 'Class removed from timetable.' };
		} catch (err: unknown) {
			return fail(500, { error: (err as Error).message });
		}
	}
};
