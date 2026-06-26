import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { departments, userCounts } = await parent();
	return { departments, userCounts };
};
