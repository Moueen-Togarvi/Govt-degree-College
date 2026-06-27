/**
 * permissions.ts — Role-based access control helpers
 */
import { redirect, error } from '@sveltejs/kit';
import type { UserRole } from './auth';
import type { AuthUser } from './auth';

// ─── Route Guards ──────────────────────────────────────────────────────────────

/**
 * Require the user to be authenticated. Redirects to /portal if not.
 */
export function requireAuth(user: AuthUser | null): asserts user is AuthUser {
	if (!user) {
		redirect(303, '/portal');
	}
}

/**
 * Require a specific role. Throws 403 if role doesn't match.
 */
export function requireRole(user: AuthUser | null, ...roles: UserRole[]): asserts user is AuthUser {
	requireAuth(user);
	if (!roles.includes(user.role)) {
		error(403, 'Access denied. You do not have permission to view this page.');
	}
}

/**
 * Check if user is super admin.
 */
export function isSuperAdmin(user: AuthUser | null): boolean {
	return user?.role === 'super_admin';
}

/**
 * Check if user is coordinator.
 */
export function isCoordinator(user: AuthUser | null): boolean {
	return user?.role === 'coordinator';
}

/**
 * Check if user is faculty.
 */
export function isFaculty(user: AuthUser | null): boolean {
	return user?.role === 'faculty';
}

/**
 * Check if user is student.
 */
export function isStudent(user: AuthUser | null): boolean {
	return user?.role === 'student';
}

/**
 * Check if coordinator manages a specific department.
 * Super admin always has access to all departments.
 */
export async function canManageDepartment(
	user: AuthUser,
	departmentId: number,
	coordinatorDeptId: number | null
): Promise<boolean> {
	if (user.role === 'super_admin') return true;
	if (user.role === 'coordinator') return coordinatorDeptId === departmentId;
	return false;
}
