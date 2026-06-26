// See https://svelte.dev/docs/kit/types#app.d.ts
declare global {
	namespace App {
		interface Locals {
			user: {
				id: number;
				name: string;
				email: string;
				role: 'super_admin' | 'coordinator' | 'faculty' | 'student';
				is_active: boolean;
				sessionId: string;
			} | null;
		}
		// interface Error {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
