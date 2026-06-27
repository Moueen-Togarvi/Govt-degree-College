// Coordinator — Course Management
import { fail } from '@sveltejs/kit';
import { getDepartmentByCoordinatorId } from '$lib/server/database/departments';
import {
	getCoursesByDepartment,
	createCourse,
	updateCourse,
	deleteCourse,
	getOfferingsByDepartment,
	createOffering,
	deleteOffering
} from '$lib/server/database/courses';
import { getFacultyByDepartment } from '$lib/server/database/faculty';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const dept = await getDepartmentByCoordinatorId(locals.user!.id);
	if (!dept) return { department: null, courses: [], offerings: [], faculty: [] };

	const [courses, offerings, faculty] = await Promise.all([
		getCoursesByDepartment(dept.id),
		getOfferingsByDepartment(dept.id),
		getFacultyByDepartment(dept.id)
	]);

	return { department: dept, courses, offerings, faculty };
};

export const actions: Actions = {
	createCourse: async ({ request, locals }) => {
		const dept = await getDepartmentByCoordinatorId(locals.user!.id);
		if (!dept) return fail(403, { error: 'No department assigned' });

		const fd = await request.formData();
		const code = fd.get('code')?.toString().trim();
		const title = fd.get('title')?.toString().trim();
		const credit_hours = parseInt(fd.get('credit_hours')?.toString() ?? '3');
		const description = fd.get('description')?.toString() || undefined;

		if (!code || !title) return fail(400, { error: 'Code and title are required' });

		try {
			await createCourse({ code, title, credit_hours, department_id: dept.id, description });
			return { success: true, message: `Course "${title}" created.` };
		} catch (err: unknown) {
			return fail(500, { error: 'Server error: ' + (err as Error).message });
		}
	},

	updateCourse: async ({ request }) => {
		const fd = await request.formData();
		const id = parseInt(fd.get('id')?.toString() ?? '0');
		if (!id) return fail(400, { error: 'Invalid ID' });

		try {
			await updateCourse(id, {
				code: fd.get('code')?.toString(),
				title: fd.get('title')?.toString(),
				credit_hours: parseInt(fd.get('credit_hours')?.toString() ?? '3'),
				description: fd.get('description')?.toString()
			});
			return { success: true, message: 'Course updated.' };
		} catch (err: unknown) {
			return fail(500, { error: 'Server error: ' + (err as Error).message });
		}
	},

	deleteCourse: async ({ request }) => {
		const fd = await request.formData();
		const id = parseInt(fd.get('id')?.toString() ?? '0');
		if (!id) return fail(400, { error: 'Invalid ID' });
		try {
			await deleteCourse(id);
			return { success: true, message: 'Course deleted.' };
		} catch (err: unknown) {
			return fail(500, { error: (err as Error).message });
		}
	},

	assignTeacher: async ({ request, locals }) => {
		const dept = await getDepartmentByCoordinatorId(locals.user!.id);
		if (!dept) return fail(403, { error: 'No department' });

		const fd = await request.formData();
		const course_id = parseInt(fd.get('course_id')?.toString() ?? '0');
		const teacher_id = parseInt(fd.get('teacher_id')?.toString() ?? '0');
		const semester = parseInt(fd.get('semester')?.toString() ?? '1');
		const session = fd.get('session')?.toString() ?? '';

		if (!course_id || !teacher_id || !session) return fail(400, { error: 'All fields required' });

		try {
			await createOffering({ course_id, teacher_id, semester, session, department_id: dept.id });
			return { success: true, message: 'Teacher assigned to course.' };
		} catch (err: unknown) {
			return fail(500, { error: (err as Error).message });
		}
	},

	removeOffering: async ({ request }) => {
		const fd = await request.formData();
		const id = parseInt(fd.get('id')?.toString() ?? '0');
		if (!id) return fail(400, { error: 'Invalid ID' });
		try {
			await deleteOffering(id);
			return { success: true, message: 'Assignment removed.' };
		} catch (err: unknown) {
			return fail(500, { error: (err as Error).message });
		}
	}
};
