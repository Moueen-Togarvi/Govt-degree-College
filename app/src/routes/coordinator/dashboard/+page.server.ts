// Coordinator Dashboard
import { getDepartmentByCoordinatorId } from '$lib/server/database/departments';
import { getFacultyByDepartment } from '$lib/server/database/faculty';
import { getStudentsByDepartment } from '$lib/server/database/students';
import { getCoursesByDepartment } from '$lib/server/database/courses';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user!;
	const dept = await getDepartmentByCoordinatorId(user.id);

	if (!dept) {
		return {
			department: null,
			stats: { faculty: 0, students: 0, courses: 0 },
			recentFaculty: [],
			recentStudents: []
		};
	}

	const [faculty, students, courses] = await Promise.all([
		getFacultyByDepartment(dept.id),
		getStudentsByDepartment(dept.id),
		getCoursesByDepartment(dept.id)
	]);

	return {
		department: dept,
		stats: {
			faculty: faculty.length,
			students: students.length,
			courses: courses.length
		},
		recentFaculty: faculty.slice(0, 5),
		recentStudents: students.slice(0, 5)
	};
};
