// Coordinator AI Entry Server Module
import { fail } from '@sveltejs/kit';
import { getDepartmentByCoordinatorId } from '$lib/server/database/departments';
import { getSql } from '$lib/server/db';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const dept = await getDepartmentByCoordinatorId(locals.user!.id);
	return { department: dept };
};

export const actions: Actions = {
	processPrompt: async ({ request, locals }) => {
		const dept = await getDepartmentByCoordinatorId(locals.user!.id);
		if (!dept) return fail(403, { error: 'No department assigned' });

		const fd = await request.formData();
		const prompt = fd.get('prompt')?.toString().trim().toLowerCase() || '';

		if (!prompt) return fail(400, { error: 'Please enter a prompt.' });

		// Simulated AI parsing logic for demonstration purposes.
		// In a real environment, this would call Google Gemini API with function calling to execute DB inserts.

		try {
			const sql = getSql();

			// 1. Course Creation Heuristic
			if (prompt.includes('create course') || prompt.includes('add course')) {
				return {
					success: true,
					intent: 'course_creation',
					message:
						'AI simulated: I understand you want to create a course. In production, this would parse the title and credits and insert into the courses table.'
				};
			}

			// 2. Announcement Heuristic
			if (prompt.includes('announce') || prompt.includes('notice')) {
				// Naive extraction: "announce that tomorrow is a holiday"
				const msg = prompt.replace(/announce that|announce|create notice|post notice/i, '').trim();
				if (msg.length > 5) {
					await sql`
						INSERT INTO announcements (department_id, title, description, category, created_by)
						VALUES (${dept.id}, 'AI Generated Announcement', ${msg}, 'General', ${locals.user!.id})
					`;
					return {
						success: true,
						intent: 'announcement',
						message: `Successfully posted announcement: "${msg}"`
					};
				}
			}

			// 3. Fallback
			return {
				success: false,
				intent: 'unknown',
				error:
					'I could not understand that command. Try "Announce that classes are cancelled tomorrow".'
			};
		} catch (err: unknown) {
			return fail(500, { error: 'Failed to process AI command. ' + (err as Error).message });
		}
	}
};
