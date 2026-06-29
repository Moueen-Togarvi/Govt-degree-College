import { fail, redirect } from '@sveltejs/kit';
import { login, createSession, getDefaultRedirect } from '$lib/server/auth';
import { env } from '$env/dynamic/private';
import type { Actions, PageServerLoad } from './$types';
import { createHash, randomBytes } from 'crypto';

async function seedDatabase(sql: any, jwtSecret: string) {
	// Hash helper
	const makeHash = (pwd: string) => {
		const salt = randomBytes(16).toString('hex');
		const hash = createHash('sha256').update(`${salt}:${pwd}:${jwtSecret}`).digest('hex');
		return `${salt}:${hash}`;
	};

	const superAdminHash = makeHash('Admin@1234');
	const coordHash = makeHash('Coordinator@1234');
	const facultyHash = makeHash('Faculty@1234');
	const studentHash = makeHash('Student@1234');

	// 1. Insert Users
	const superAdminRes = await sql`
		INSERT INTO users (name, email, password_hash, role, is_active)
		VALUES ('Super Admin', 'admin@gpgc.edu.pk', ${superAdminHash}, 'super_admin', TRUE)
		ON CONFLICT (email) DO UPDATE
		SET password_hash = ${superAdminHash}, is_active = TRUE
		RETURNING id
	`;

	const coordRes = await sql`
		INSERT INTO users (name, email, password_hash, role, is_active)
		VALUES ('CS Coordinator', 'coordinator@gpgc.edu.pk', ${coordHash}, 'coordinator', TRUE)
		ON CONFLICT (email) DO UPDATE
		SET password_hash = ${coordHash}, is_active = TRUE
		RETURNING id
	`;
	const coordinatorUserId = coordRes[0].id;

	const facultyRes = await sql`
		INSERT INTO users (name, email, password_hash, role, is_active)
		VALUES ('Dr. Aisha (Faculty)', 'faculty@gpgc.edu.pk', ${facultyHash}, 'faculty', TRUE)
		ON CONFLICT (email) DO UPDATE
		SET password_hash = ${facultyHash}, is_active = TRUE
		RETURNING id
	`;
	const facultyUserId = facultyRes[0].id;

	const studentRes = await sql`
		INSERT INTO users (name, email, password_hash, role, is_active)
		VALUES ('Muhammad Ali (Student)', 'student@gpgc.edu.pk', ${studentHash}, 'student', TRUE)
		ON CONFLICT (email) DO UPDATE
		SET password_hash = ${studentHash}, is_active = TRUE
		RETURNING id
	`;
	const studentUserId = studentRes[0].id;

	// 2. Department
	const deptRes = await sql`
		INSERT INTO departments (name, slug, urdu_name, description, coordinator_id)
		VALUES ('Computer Science', 'computer-science', 'شعبہ کمپیوٹر سائنس', 'Department of Computer Science & Information Technology', ${coordinatorUserId})
		ON CONFLICT (slug) DO UPDATE
		SET coordinator_id = EXCLUDED.coordinator_id, description = EXCLUDED.description
		RETURNING id
	`;
	const deptId = deptRes[0].id;

	// 3. Faculty Profile
	const facultyProfileRes = await sql`
		INSERT INTO faculty_profiles (user_id, department_id, designation, phone, office_hours, is_hod, education)
		VALUES (${facultyUserId}, ${deptId}, 'Assistant Professor', '03009876543', 'Mon-Wed 10:00 AM - 12:00 PM', TRUE, 'Ph.D. in Computer Science')
		ON CONFLICT (user_id) DO UPDATE
		SET department_id = EXCLUDED.department_id, designation = EXCLUDED.designation, is_hod = TRUE
		RETURNING id
	`;
	const facultyProfileId = facultyProfileRes[0].id;

	// 4. Student Profile
	const studentProfileRes = await sql`
		INSERT INTO student_profiles (user_id, department_id, roll_number, semester, session, father_name, phone, address)
		VALUES (${studentUserId}, ${deptId}, 'CS-2022-101', 6, '2022-2026', 'Ahmad Khan', '03001234567', 'Bahawalnagar')
		ON CONFLICT (user_id) DO UPDATE
		SET department_id = EXCLUDED.department_id, roll_number = EXCLUDED.roll_number, semester = EXCLUDED.semester, session = EXCLUDED.session
		RETURNING id
	`;
	const studentProfileId = studentProfileRes[0].id;

	// 5. Courses
	const webCourseRes = await sql`
		INSERT INTO courses (code, title, credit_hours, department_id, description, course_outline)
		VALUES ('CS-301', 'Web Engineering', 4, ${deptId}, 'Modern web application development using modern frameworks and technologies.', 'HTML, CSS, JavaScript, SvelteKit, Postgres')
		ON CONFLICT (code, department_id) DO UPDATE SET title = EXCLUDED.title
		RETURNING id
	`;
	const webCourseId = webCourseRes[0].id;

	const aiCourseRes = await sql`
		INSERT INTO courses (code, title, credit_hours, department_id, description, course_outline)
		VALUES ('CS-302', 'Artificial Intelligence', 3, ${deptId}, 'Introduction to intelligent agents, search algorithms, machine learning and neural networks.', 'Search, Logic, Probability, Machine Learning, Deep Learning')
		ON CONFLICT (code, department_id) DO UPDATE SET title = EXCLUDED.title
		RETURNING id
	`;
	const aiCourseId = aiCourseRes[0].id;

	// 6. Course Offerings
	const webOfferingRes = await sql`
		INSERT INTO course_offerings (course_id, teacher_id, semester, session, department_id, is_active)
		VALUES (${webCourseId}, ${facultyProfileId}, 6, '2022-2026', ${deptId}, TRUE)
		RETURNING id
	`;
	const webOfferingId = webOfferingRes[0].id;

	const aiOfferingRes = await sql`
		INSERT INTO course_offerings (course_id, teacher_id, semester, session, department_id, is_active)
		VALUES (${aiCourseId}, ${facultyProfileId}, 6, '2022-2026', ${deptId}, TRUE)
		RETURNING id
	`;
	const aiOfferingId = aiOfferingRes[0].id;

	// 7. Enrollments
	await sql`
		INSERT INTO enrollments (student_id, course_offering_id)
		VALUES (${studentProfileId}, ${webOfferingId}), (${studentProfileId}, ${aiOfferingId})
		ON CONFLICT (student_id, course_offering_id) DO NOTHING
	`;

	// 8. Attendance
	const today = new Date().toISOString().slice(0, 10);
	const yesterday = new Date(Date.now() - 24*60*60*1000).toISOString().slice(0, 10);
	await sql`
		INSERT INTO attendance (student_id, course_offering_id, date, status, marked_by)
		VALUES 
		(${studentProfileId}, ${webOfferingId}, ${yesterday}, 'present', ${facultyProfileId}),
		(${studentProfileId}, ${webOfferingId}, ${today}, 'present', ${facultyProfileId}),
		(${studentProfileId}, ${aiOfferingId}, ${yesterday}, 'present', ${facultyProfileId}),
		(${studentProfileId}, ${aiOfferingId}, ${today}, 'absent', ${facultyProfileId})
		ON CONFLICT (student_id, course_offering_id, date) DO NOTHING
	`;

	// 9. Marks
	await sql`
		INSERT INTO marks (student_id, course_offering_id, midterm, finals, quizzes, assignments, practical, grade, gpa_points, is_published)
		VALUES 
		(${studentProfileId}, ${webOfferingId}, 16.5, 45.0, 4.0, 4.5, 0.0, 'A', 3.70, TRUE),
		(${studentProfileId}, ${aiOfferingId}, 15.0, 40.0, 3.5, 4.0, 0.0, 'B+', 3.30, TRUE)
		ON CONFLICT (student_id, course_offering_id) DO NOTHING
	`;

	// 10. Timetable
	await sql`
		INSERT INTO timetable (course_offering_id, room, day, start_time, end_time, class_type)
		VALUES 
		(${webOfferingId}, 'Lab 1', 'Monday', '09:00:00', '11:00:00', 'lab'),
		(${webOfferingId}, 'Classroom 3', 'Wednesday', '09:00:00', '10:00:00', 'lecture'),
		(${aiOfferingId}, 'Classroom 3', 'Tuesday', '10:00:00', '11:30:00', 'lecture'),
		(${aiOfferingId}, 'Classroom 3', 'Thursday', '10:00:00', '11:30:00', 'lecture')
		ON CONFLICT DO NOTHING
	`;

	// 11. Announcements & Notices
	await sql`
		INSERT INTO announcements (department_id, title, description, category, created_by)
		VALUES 
		(${deptId}, 'Midterm Examinations Schedule', 'Midterm examinations for Semester 6 BSCS will start from next Monday. Ensure all fees are cleared.', 'Academic', ${coordinatorUserId}),
		(NULL, 'Annual Sports Gala 2026', 'GPGC Annual Sports Gala will commence on October 15th, 2026. All students are invited to register.', 'Event', ${coordinatorUserId})
	`;
	await sql`
		INSERT INTO notice_board_items (department_id, title, message, tag, notice_date, sort_order, created_by)
		VALUES 
		(${deptId}, 'FYP Proposals Deadline', 'All 6th semester groups must submit their Final Year Project proposals to the coordinator by Friday.', 'FYP', NOW(), 1, ${coordinatorUserId})
	`;
	await sql`
		INSERT INTO latest_news_items (title, href, sort_order)
		VALUES 
		('Admissions open for Fall 2026 - Apply Online!', '/admissions/how-to-apply', 1),
		('Scholarship distribution ceremony scheduled for next week.', '/admissions/scholarships', 2)
	`;
	await sql`
		INSERT INTO events (department_id, title, date, time, location, status, created_by)
		VALUES 
		(${deptId}, 'Tech Expo Bahawalnagar 2026', ${today}, '10:00 AM', 'Main Auditorium', 'Upcoming', ${coordinatorUserId})
	`;

	// 12. Fee Records
	await sql`
		INSERT INTO fee_records (student_id, semester, amount, status, challan_no, due_date, paid_date)
		VALUES 
		(${studentProfileId}, 5, 12500.00, 'paid', 'CH-55102', '2025-10-15', '2025-10-12'),
		(${studentProfileId}, 6, 12500.00, 'pending', 'CH-66103', '2026-07-15', NULL)
	`;

	// 13. FYP Project
	const fypRes = await sql`
		INSERT INTO fyp_projects (department_id, title, description, supervisor_id, status, session)
		VALUES (${deptId}, 'GPGC Smart Campus Portal', 'A web-based portal to manage college/university departments, courses, students, and faculty.', ${facultyProfileId}, 'InProgress', '2022-2026')
		RETURNING id
	`;
	const fypId = fypRes[0].id;

	await sql`
		INSERT INTO fyp_members (fyp_id, student_id)
		VALUES (${fypId}, ${studentProfileId})
		ON CONFLICT (fyp_id, student_id) DO NOTHING
	`;
}

export const load: PageServerLoad = async ({ locals, url }) => {
	// Already handled by hooks.server.ts, but extra safety
	if (locals.user) {
		redirect(303, getDefaultRedirect(locals.user.role));
	}
	return {
		reason: url.searchParams.get('reason'),
		next: url.searchParams.get('next') ?? ''
	};
};

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = (data.get('email') as string)?.trim() ?? '';
		const password = (data.get('password') as string) ?? '';
		const next = (data.get('next') as string) ?? '';

		if (!email || !password) {
			return fail(400, { error: 'Email and password are required.', email });
		}

		let result;
		try {
			result = await login(email, password);
		} catch (err: any) {
			if (err.message?.includes('relation "users" does not exist')) {
				console.log('⚡ Users table not found. Auto-bootstrapping database...');
				try {
					const { readFileSync } = await import('fs');
					const { join } = await import('path');
					const { getSql } = await import('$lib/server/db');

					const sql = getSql();

					// 1. Drop public schema
					await sql`DROP SCHEMA IF EXISTS public CASCADE`;
					await sql`CREATE SCHEMA public`;
					await sql`CREATE EXTENSION IF NOT EXISTS pgcrypto`;

					// 2. Read schema file
					const schemaPath = join(process.cwd(), 'schema.sql');
					let schema = readFileSync(schemaPath, 'utf8');

					// Remove placeholder inserts
					schema = schema.replace(/INSERT INTO users[\s\S]*?ON CONFLICT \(email\) DO NOTHING;/, '');

					// Remove comments
					schema = schema.replace(/--.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');

					// Split and execute statements
					const statements = schema
						.split(';')
						.map((s) => s.trim())
						.filter((s) => s.length > 0);

					for (const stmt of statements) {
						await sql.query(stmt);
					}

					// 3. Seed Database with helper
					const jwtSecret = env.JWT_SECRET ?? 'fallback-secret';
					await seedDatabase(sql, jwtSecret);
					console.log('✅ Database auto-bootstrapped successfully!');

					// Retry login after successful setup
					result = await login(email, password);
				} catch (setupErr: any) {
					console.error('Database auto-bootstrap failed:', setupErr);
					return fail(500, {
						error: 'Database needs setup but auto-bootstrap failed: ' + setupErr.message,
						email
					});
				}
			} else {
				throw err;
			}
		}

		if ('error' in result) {
			return fail(401, { error: result.error, email });
		}

		await createSession(result.user.id, cookies);

		const destination = next || getDefaultRedirect(result.user.role);
		redirect(303, destination);
	},
	setupDb: async () => {
		try {
			const { readFileSync } = await import('fs');
			const { join } = await import('path');
			const { getSql } = await import('$lib/server/db');

			const sql = getSql();

			// 1. Drop public schema
			await sql`DROP SCHEMA IF EXISTS public CASCADE`;
			await sql`CREATE SCHEMA public`;
			await sql`CREATE EXTENSION IF NOT EXISTS pgcrypto`;

			// 2. Read schema file
			const schemaPath = join(process.cwd(), 'schema.sql');
			let schema = readFileSync(schemaPath, 'utf8');

			// Remove placeholder inserts
			schema = schema.replace(/INSERT INTO users[\s\S]*?ON CONFLICT \(email\) DO NOTHING;/, '');

			// Remove comments
			schema = schema.replace(/--.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');

			// Split and execute statements
			const statements = schema
				.split(';')
				.map((s) => s.trim())
				.filter((s) => s.length > 0);

			for (const stmt of statements) {
				await sql.query(stmt);
			}

			// 3. Seed Database with helper
			const jwtSecret = env.JWT_SECRET ?? 'fallback-secret';
			await seedDatabase(sql, jwtSecret);

			return { success: true, message: 'Database reset and seeded successfully!' };
		} catch (err: any) {
			console.error('Database setup action failed:', err);
			return fail(500, { error: 'Failed to initialize database: ' + err.message });
		}
	}
};
