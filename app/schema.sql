-- ============================================================
-- University Department Management System — Database Schema
-- ============================================================

-- Enable pgcrypto for UUID generation
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================================
-- USERS (Super Admin, Coordinator, Faculty, Student)
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    email       TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role        TEXT NOT NULL CHECK (role IN ('super_admin','coordinator','faculty','student')),
    is_active   BOOLEAN DEFAULT TRUE,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- DEPARTMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS departments (
    id              SERIAL PRIMARY KEY,
    name            TEXT NOT NULL,
    slug            TEXT NOT NULL UNIQUE,
    urdu_name       TEXT,
    description     TEXT,
    coordinator_id  INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- FACULTY PROFILES (extended from users)
-- ============================================================
CREATE TABLE IF NOT EXISTS faculty_profiles (
    id            SERIAL PRIMARY KEY,
    user_id       INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    department_id INTEGER NOT NULL REFERENCES departments(id) ON DELETE RESTRICT,
    designation   TEXT NOT NULL DEFAULT 'Lecturer',
    phone         TEXT,
    image_url     TEXT,
    office_hours  TEXT,
    is_hod        BOOLEAN DEFAULT FALSE,
    education     TEXT,
    created_at    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_faculty_department ON faculty_profiles(department_id);

-- ============================================================
-- STUDENT PROFILES (extended from users)
-- ============================================================
CREATE TABLE IF NOT EXISTS student_profiles (
    id            SERIAL PRIMARY KEY,
    user_id       INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    department_id INTEGER NOT NULL REFERENCES departments(id) ON DELETE RESTRICT,
    roll_number   TEXT NOT NULL UNIQUE,
    semester      INTEGER NOT NULL DEFAULT 1 CHECK (semester BETWEEN 1 AND 8),
    session       TEXT NOT NULL,   -- e.g. '2022-2026'
    father_name   TEXT,
    phone         TEXT,
    address       TEXT,
    created_at    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_student_department ON student_profiles(department_id);
CREATE INDEX IF NOT EXISTS idx_student_roll ON student_profiles(roll_number);

-- ============================================================
-- COURSES
-- ============================================================
CREATE TABLE IF NOT EXISTS courses (
    id            SERIAL PRIMARY KEY,
    code          TEXT NOT NULL,
    title         TEXT NOT NULL,
    credit_hours  INTEGER NOT NULL DEFAULT 3 CHECK (credit_hours BETWEEN 1 AND 6),
    department_id INTEGER NOT NULL REFERENCES departments(id) ON DELETE RESTRICT,
    description   TEXT,
    course_outline TEXT,
    created_at    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (code, department_id)
);
CREATE INDEX IF NOT EXISTS idx_courses_department ON courses(department_id);

-- ============================================================
-- COURSE OFFERINGS (semester-wise instances of a course)
-- ============================================================
CREATE TABLE IF NOT EXISTS course_offerings (
    id            SERIAL PRIMARY KEY,
    course_id     INTEGER NOT NULL REFERENCES courses(id) ON DELETE RESTRICT,
    teacher_id    INTEGER NOT NULL REFERENCES faculty_profiles(id) ON DELETE RESTRICT,
    semester      INTEGER NOT NULL CHECK (semester BETWEEN 1 AND 8),
    session       TEXT NOT NULL,
    department_id INTEGER NOT NULL REFERENCES departments(id) ON DELETE RESTRICT,
    is_active     BOOLEAN DEFAULT TRUE,
    created_at    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_offerings_course ON course_offerings(course_id);
CREATE INDEX IF NOT EXISTS idx_offerings_teacher ON course_offerings(teacher_id);

-- ============================================================
-- ENROLLMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS enrollments (
    id                  SERIAL PRIMARY KEY,
    student_id          INTEGER NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    course_offering_id  INTEGER NOT NULL REFERENCES course_offerings(id) ON DELETE CASCADE,
    enrolled_at         TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (student_id, course_offering_id)
);
CREATE INDEX IF NOT EXISTS idx_enrollments_student ON enrollments(student_id);

-- ============================================================
-- ATTENDANCE
-- ============================================================
CREATE TABLE IF NOT EXISTS attendance (
    id                  SERIAL PRIMARY KEY,
    student_id          INTEGER NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    course_offering_id  INTEGER NOT NULL REFERENCES course_offerings(id) ON DELETE CASCADE,
    date                DATE NOT NULL,
    status              TEXT NOT NULL CHECK (status IN ('present','absent','late','leave')),
    marked_by           INTEGER REFERENCES faculty_profiles(id) ON DELETE SET NULL,
    created_at          TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (student_id, course_offering_id, date)
);
CREATE INDEX IF NOT EXISTS idx_attendance_student ON attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_offering ON attendance(course_offering_id);

-- ============================================================
-- MARKS / RESULTS
-- ============================================================
CREATE TABLE IF NOT EXISTS marks (
    id                  SERIAL PRIMARY KEY,
    student_id          INTEGER NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    course_offering_id  INTEGER NOT NULL REFERENCES course_offerings(id) ON DELETE CASCADE,
    midterm             NUMERIC(5,2) DEFAULT 0,
    finals              NUMERIC(5,2) DEFAULT 0,
    quizzes             NUMERIC(5,2) DEFAULT 0,
    assignments         NUMERIC(5,2) DEFAULT 0,
    practical           NUMERIC(5,2) DEFAULT 0,
    total               NUMERIC(5,2) GENERATED ALWAYS AS (midterm + finals + quizzes + assignments + practical) STORED,
    grade               TEXT,
    gpa_points          NUMERIC(3,2),
    is_published        BOOLEAN DEFAULT FALSE,
    updated_at          TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (student_id, course_offering_id)
);
CREATE INDEX IF NOT EXISTS idx_marks_student ON marks(student_id);

-- ============================================================
-- TIMETABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS timetable (
    id                  SERIAL PRIMARY KEY,
    course_offering_id  INTEGER NOT NULL REFERENCES course_offerings(id) ON DELETE CASCADE,
    room                TEXT,
    day                 TEXT NOT NULL CHECK (day IN ('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday')),
    start_time          TIME NOT NULL,
    end_time            TIME NOT NULL,
    class_type          TEXT NOT NULL DEFAULT 'lecture' CHECK (class_type IN ('lecture','lab')),
    created_at          TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_timetable_offering ON timetable(course_offering_id);

-- ============================================================
-- ANNOUNCEMENTS (department-specific or global)
-- ============================================================
CREATE TABLE IF NOT EXISTS announcements (
    id            SERIAL PRIMARY KEY,
    department_id INTEGER REFERENCES departments(id) ON DELETE CASCADE, -- NULL = global
    title         TEXT NOT NULL,
    description   TEXT NOT NULL,
    category      TEXT NOT NULL DEFAULT 'General',
    created_by    INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_announcements_dept ON announcements(department_id);

-- ============================================================
-- NOTICE BOARD
-- ============================================================
CREATE TABLE IF NOT EXISTS notice_board_items (
    id            SERIAL PRIMARY KEY,
    department_id INTEGER REFERENCES departments(id) ON DELETE CASCADE,
    title         TEXT NOT NULL,
    message       TEXT NOT NULL,
    tag           TEXT NOT NULL DEFAULT 'Notice',
    notice_date   TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expiry_date   TIMESTAMP WITH TIME ZONE,
    sort_order    INTEGER DEFAULT 0,
    created_by    INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- LATEST NEWS TICKER
-- ============================================================
CREATE TABLE IF NOT EXISTS latest_news_items (
    id          SERIAL PRIMARY KEY,
    title       TEXT NOT NULL,
    href        TEXT DEFAULT '/news/announcements',
    sort_order  INTEGER DEFAULT 0,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- EVENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS events (
    id            SERIAL PRIMARY KEY,
    department_id INTEGER REFERENCES departments(id) ON DELETE CASCADE,
    title         TEXT NOT NULL,
    date          DATE NOT NULL,
    time          TEXT NOT NULL,
    location      TEXT NOT NULL,
    image_url     TEXT,
    status        TEXT DEFAULT 'Upcoming' CHECK (status IN ('Upcoming','Ongoing','Completed')),
    created_by    INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- FYP PROJECTS
-- ============================================================
CREATE TABLE IF NOT EXISTS fyp_projects (
    id            SERIAL PRIMARY KEY,
    department_id INTEGER NOT NULL REFERENCES departments(id) ON DELETE RESTRICT,
    title         TEXT NOT NULL,
    description   TEXT,
    supervisor_id INTEGER REFERENCES faculty_profiles(id) ON DELETE SET NULL,
    status        TEXT NOT NULL DEFAULT 'Proposed' CHECK (status IN ('Proposed','Approved','InProgress','Completed','Cancelled')),
    session       TEXT NOT NULL,
    created_at    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS fyp_members (
    id         SERIAL PRIMARY KEY,
    fyp_id     INTEGER NOT NULL REFERENCES fyp_projects(id) ON DELETE CASCADE,
    student_id INTEGER NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    UNIQUE (fyp_id, student_id)
);

-- ============================================================
-- DOCUMENTS (notes, assignments, course files)
-- ============================================================
CREATE TABLE IF NOT EXISTS documents (
    id                  SERIAL PRIMARY KEY,
    department_id       INTEGER REFERENCES departments(id) ON DELETE CASCADE,
    course_offering_id  INTEGER REFERENCES course_offerings(id) ON DELETE SET NULL,
    title               TEXT NOT NULL,
    file_url            TEXT NOT NULL,
    doc_type            TEXT NOT NULL DEFAULT 'note' CHECK (doc_type IN ('note','assignment','lab_manual','past_paper','syllabus','other')),
    uploaded_by         INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at          TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_documents_dept ON documents(department_id);

-- ============================================================
-- FEE RECORDS
-- ============================================================
CREATE TABLE IF NOT EXISTS fee_records (
    id          SERIAL PRIMARY KEY,
    student_id  INTEGER NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    semester    INTEGER NOT NULL CHECK (semester BETWEEN 1 AND 8),
    amount      NUMERIC(10,2) NOT NULL,
    status      TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','paid','overdue')),
    challan_no  TEXT,
    due_date    DATE,
    paid_date   DATE,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_fee_student ON fee_records(student_id);

-- ============================================================
-- SESSIONS (for auth — httpOnly cookie stores session_id)
-- ============================================================
CREATE TABLE IF NOT EXISTS sessions (
    id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires_at  TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at);

-- ============================================================
-- QUICK LINKS (public homepage)
-- ============================================================
CREATE TABLE IF NOT EXISTS quick_links (
    id          SERIAL PRIMARY KEY,
    title       TEXT NOT NULL,
    description TEXT NOT NULL,
    href        TEXT NOT NULL,
    icon_name   TEXT,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- SEED: Default Super Admin (email: admin@gpgc.edu.pk, pass: Admin@1234)
-- Password hash is bcrypt of 'Admin@1234' — update this in production!
-- We store SHA-256 derived via our own auth.ts hash function.
-- This is a placeholder - run npm run db:seed-admin to set properly.
-- ============================================================
INSERT INTO users (name, email, password_hash, role)
VALUES (
    'Super Admin',
    'admin@gpgc.edu.pk',
    'PLACEHOLDER_WILL_BE_SET_BY_SETUP_SCRIPT',
    'super_admin'
)
ON CONFLICT (email) DO NOTHING;
