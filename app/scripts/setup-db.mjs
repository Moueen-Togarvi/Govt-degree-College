/**
 * setup-db.mjs — Applies schema.sql and seeds the super admin user
 * Uses HTTP neon client to bypass WebSocket timeout issues.
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createHash, randomBytes } from 'crypto';
import { neon } from '@neondatabase/serverless';

const __dirname = dirname(fileURLToPath(import.meta.url));

const DATABASE_URL = process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET ?? 'fallback-secret';

if (!DATABASE_URL) {
	console.error('❌ DATABASE_URL not found in .env');
	process.exit(1);
}

// --- Hash password (same algorithm as auth.ts) ---
function hashPassword(password) {
	const salt = randomBytes(16).toString('hex');
	const hash = createHash('sha256').update(`${salt}:${password}:${JWT_SECRET}`).digest('hex');
	return `${salt}:${hash}`;
}

async function main() {
	const sql = neon(DATABASE_URL);

	// Optional: Drop existing schema to apply clean if requested
	// This is useful if old schemas are missing columns.
	console.log('📦 Dropping public schema (resetting DB)...');
	await sql`DROP SCHEMA IF EXISTS public CASCADE`;
	await sql`CREATE SCHEMA public`;

	console.log('📦 Applying schema.sql...');

	const schemaPath = join(__dirname, '../schema.sql');
	let schema = readFileSync(schemaPath, 'utf8');

	// Remove the placeholder seed from schema
	schema = schema.replace(/INSERT INTO users[\s\S]*?ON CONFLICT \(email\) DO NOTHING;/, '');

	// Remove block comments and line comments
	schema = schema.replace(/--.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');

	// Split on semicolons and run each statement
	const statements = schema
		.split(';')
		.map((s) => s.trim())
		.filter((s) => s.length > 0);

	let success = 0;
	let errors = 0;

	for (const stmt of statements) {
		try {
			await sql.query(stmt);
			success++;
		} catch (err) {
			console.warn(`  ⚠️  Statement warning: ${err.message?.slice(0, 80)}`);
			errors++;
		}
	}

	console.log(`  ✅ ${success} statements applied, ${errors} warnings.`);

	// Seed demo accounts and operational data
	try {
		console.log('\n👤 Seeding demo accounts and related data...');

		// Hash passwords using the script's hashPassword function
		const superAdminEmail = 'admin@gpgc.edu.pk';
		const superAdminPassword = 'Admin@1234';
		const superAdminHash = hashPassword(superAdminPassword);

		const coordEmail = 'coordinator@gpgc.edu.pk';
		const coordPassword = 'Coordinator@1234';
		const coordHash = hashPassword(coordPassword);

		const facultyEmail = 'faculty@gpgc.edu.pk';
		const facultyPassword = 'Faculty@1234';
		const facultyHash = hashPassword(facultyPassword);

		const studentEmail = 'student@gpgc.edu.pk';
		const studentPassword = 'Student@1234';
		const studentHash = hashPassword(studentPassword);

		// Insert or update users
		const superAdminRes = await sql`
			INSERT INTO users (name, email, password_hash, role, is_active)
			VALUES ('Super Admin', ${superAdminEmail}, ${superAdminHash}, 'super_admin', TRUE)
			ON CONFLICT (email) DO UPDATE
			SET password_hash = ${superAdminHash}, is_active = TRUE
			RETURNING id
		`;
		const superAdminId = superAdminRes[0].id;

		const coordRes = await sql`
			INSERT INTO users (name, email, password_hash, role, is_active)
			VALUES ('CS Coordinator', ${coordEmail}, ${coordHash}, 'coordinator', TRUE)
			ON CONFLICT (email) DO UPDATE
			SET password_hash = ${coordHash}, is_active = TRUE
			RETURNING id
		`;
		const coordinatorUserId = coordRes[0].id;

		const facultyRes = await sql`
			INSERT INTO users (name, email, password_hash, role, is_active)
			VALUES ('Dr. Aisha (Faculty)', ${facultyEmail}, ${facultyHash}, 'faculty', TRUE)
			ON CONFLICT (email) DO UPDATE
			SET password_hash = ${facultyHash}, is_active = TRUE
			RETURNING id
		`;
		const facultyUserId = facultyRes[0].id;

		const studentRes = await sql`
			INSERT INTO users (name, email, password_hash, role, is_active)
			VALUES ('Muhammad Ali (Student)', ${studentEmail}, ${studentHash}, 'student', TRUE)
			ON CONFLICT (email) DO UPDATE
			SET password_hash = ${studentHash}, is_active = TRUE
			RETURNING id
		`;
		const studentUserId = studentRes[0].id;

		console.log('  ✅ Users seeded.');

		// 2. Departments
		const deptRes = await sql`
			INSERT INTO departments (name, slug, urdu_name, description, coordinator_id)
			VALUES ('Computer Science', 'computer-science', 'شعبہ کمپیوٹر سائنس', 'Department of Computer Science & Information Technology', ${coordinatorUserId})
			ON CONFLICT (slug) DO UPDATE
			SET coordinator_id = EXCLUDED.coordinator_id, description = EXCLUDED.description
			RETURNING id
		`;
		const deptId = deptRes[0].id;
		console.log('  ✅ Department seeded.');

		// 3. Faculty Profiles
		const facultyProfileRes = await sql`
			INSERT INTO faculty_profiles (user_id, department_id, designation, phone, office_hours, is_hod, education)
			VALUES (${facultyUserId}, ${deptId}, 'Assistant Professor', '03009876543', 'Mon-Wed 10:00 AM - 12:00 PM', TRUE, 'Ph.D. in Computer Science')
			ON CONFLICT (user_id) DO UPDATE
			SET department_id = EXCLUDED.department_id, designation = EXCLUDED.designation, is_hod = TRUE
			RETURNING id
		`;
		const facultyProfileId = facultyProfileRes[0].id;
		console.log('  ✅ Faculty Profile seeded.');

		// 4. Student Profiles
		const studentProfileRes = await sql`
			INSERT INTO student_profiles (user_id, department_id, roll_number, semester, session, father_name, phone, address)
			VALUES (${studentUserId}, ${deptId}, 'CS-2022-101', 6, '2022-2026', 'Ahmad Khan', '03001234567', 'Bahawalnagar')
			ON CONFLICT (user_id) DO UPDATE
			SET department_id = EXCLUDED.department_id, roll_number = EXCLUDED.roll_number, semester = EXCLUDED.semester, session = EXCLUDED.session
			RETURNING id
		`;
		const studentProfileId = studentProfileRes[0].id;
		console.log('  ✅ Student Profile seeded.');

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
		console.log('  ✅ Courses seeded.');

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
		console.log('  ✅ Course Offerings seeded.');

		// 7. Enrollments
		await sql`
			INSERT INTO enrollments (student_id, course_offering_id)
			VALUES (${studentProfileId}, ${webOfferingId}), (${studentProfileId}, ${aiOfferingId})
			ON CONFLICT (student_id, course_offering_id) DO NOTHING
		`;
		console.log('  ✅ Enrollments seeded.');

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
		console.log('  ✅ Attendance seeded.');

		// 9. Marks
		await sql`
			INSERT INTO marks (student_id, course_offering_id, midterm, finals, quizzes, assignments, practical, grade, gpa_points, is_published)
			VALUES 
			(${studentProfileId}, ${webOfferingId}, 16.5, 45.0, 4.0, 4.5, 0.0, 'A', 3.70, TRUE),
			(${studentProfileId}, ${aiOfferingId}, 15.0, 40.0, 3.5, 4.0, 0.0, 'B+', 3.30, TRUE)
			ON CONFLICT (student_id, course_offering_id) DO NOTHING
		`;
		console.log('  ✅ Marks seeded.');

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
		console.log('  ✅ Timetable seeded.');

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
		console.log('  ✅ Announcements and Events seeded.');

		// 12. Fee Records
		await sql`
			INSERT INTO fee_records (student_id, semester, amount, status, challan_no, due_date, paid_date)
			VALUES 
			(${studentProfileId}, 5, 12500.00, 'paid', 'CH-55102', '2025-10-15', '2025-10-12'),
			(${studentProfileId}, 6, 12500.00, 'pending', 'CH-66103', '2026-07-15', NULL)
		`;
		console.log('  ✅ Fee records seeded.');

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
		console.log('  ✅ FYP project and members seeded.');

		console.log(`\n🎉 Seed data populated successfully!`);
		console.log(`   Credentials available for demo:`);
		console.log(`   - Super Admin: admin@gpgc.edu.pk / Admin@1234`);
		console.log(`   - Coordinator: coordinator@gpgc.edu.pk / Coordinator@1234`);
		console.log(`   - Faculty:     faculty@gpgc.edu.pk / Faculty@1234`);
		console.log(`   - Student:     student@gpgc.edu.pk / Student@1234`);
	} catch (err) {
		console.error('  ❌ Failed to seed database:', err.message);
	}

	console.log('\n🎉 Database setup complete!');
	console.log('   Run: npm run dev');
	console.log('   Login at: http://localhost:5173/login');
}

main().catch((err) => {
	console.error('Fatal error:', err);
	process.exit(1);
});
