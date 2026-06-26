// Student — Timetable Page
import { getStudentByUserId } from '$lib/server/database/students';
import { getTimetableForStudent } from '$lib/server/database/timetable';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const profile = await getStudentByUserId(locals.user!.id);
	if (!profile) return { profile: null, timetable: [] };

	const timetable = await getTimetableForStudent(profile.id);

	return { profile, timetable };
};
