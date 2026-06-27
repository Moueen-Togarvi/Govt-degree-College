/**
 * hooks.server.ts — Global request middleware
 * Reads session cookie on every request and attaches user to locals.
 */
import { getSessionUser } from '$lib/server/auth';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Attach user to every request
	const user = await getSessionUser(event.cookies);
	event.locals.user = user;

	// Protected route prefixes
	const path = event.url.pathname;

	if (path.startsWith('/super-admin') && user?.role !== 'super_admin') {
		return new Response(null, {
			status: 303,
			headers: { location: '/portal?reason=unauthorized' }
		});
	}

	if (
		path.startsWith('/coordinator') &&
		user?.role !== 'coordinator' &&
		user?.role !== 'super_admin'
	) {
		return new Response(null, {
			status: 303,
			headers: { location: '/portal?reason=unauthorized' }
		});
	}

	if (path.startsWith('/faculty') && user?.role !== 'faculty' && user?.role !== 'super_admin') {
		return new Response(null, {
			status: 303,
			headers: { location: '/portal?reason=unauthorized' }
		});
	}

	if (path.startsWith('/student') && user?.role !== 'student' && user?.role !== 'super_admin') {
		return new Response(null, {
			status: 303,
			headers: { location: '/portal?reason=unauthorized' }
		});
	}

	// Redirect logged-in users away from /portal
	if (path === '/portal' && user) {
		const { getDefaultRedirect } = await import('$lib/server/auth');
		return new Response(null, {
			status: 303,
			headers: { location: getDefaultRedirect(user.role) }
		});
	}

	return resolve(event);
};
