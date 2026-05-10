import {
	createAnnouncement,
	createEvent,
	createExamResult,
	createLatestNewsItem,
	createNoticeBoardItem,
	deleteAnnouncement,
	deleteEvent,
	deleteExamResult,
	deleteLatestNewsItem,
	deleteNoticeBoardItem,
	listAnnouncements,
	listEvents,
	listExamResults,
	listLatestNewsItems,
	listNoticeBoardItems,
	updateAnnouncement,
	updateEvent,
	updateExamResult,
	updateLatestNewsItem,
	updateNoticeBoardItem
} from '$lib/server/database/content';
import {
	countFacultyMembersByDepartment,
	createDepartment,
	createFacultyMember,
	deleteDepartment,
	deleteFacultyMember,
	listDepartments,
	listFacultyMembers,
	updateDepartment,
	updateFacultyMember
} from '$lib/server/database/faculty';
import { isExpectedDatabaseError, logDatabaseLoadError } from '$lib/server/db';
import { deleteUploadedMedia, listUploadedMedia, saveUploadedFile } from '$lib/server/uploads';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

const validSections = new Set([
	'announcements',
	'noticeBoard',
	'latestNews',
	'events',
	'results',
	'media',
	'departments',
	'faculty'
]);

function stringValue(formData: FormData, key: string) {
	return String(formData.get(key) ?? '').trim();
}

function numberValue(formData: FormData, key: string) {
	return Number(stringValue(formData, key));
}

function booleanValue(formData: FormData, key: string) {
	return formData.get(key) === 'on';
}

function fileValue(formData: FormData, key: string) {
	const value = formData.get(key);
	return value instanceof File ? value : null;
}

function success(message: string, section: string) {
	return { success: true, message, section };
}

function actionError(status: number, message: string, section: string) {
	return fail(status, { success: false, message, section });
}

function getErrorCode(error: unknown) {
	return typeof error === 'object' &&
		error !== null &&
		'code' in error &&
		typeof error.code === 'string'
		? error.code
		: '';
}

function getActionErrorStatus(error: unknown) {
	if (isExpectedDatabaseError(error)) return 503;

	const code = getErrorCode(error);
	if (['23505', '23503', '22P02'].includes(code)) {
		return 400;
	}

	return 500;
}

function getActionErrorMessage(error: unknown) {
	if (isExpectedDatabaseError(error)) {
		return 'Production database abhi connect nahi ho rahi. DATABASE_URL aur Neon access verify karein, phir dobara try karein.';
	}

	const code = getErrorCode(error);
	if (code === '23505') {
		return 'Ye record duplicate lag raha hai. Unique value change karke dobara try karein.';
	}

	if (code === '23503') {
		return 'Related record nahi mila ya abhi tak create nahi hua. Pehle required parent item create karein.';
	}

	if (code === '22P02') {
		return 'Submitted value ka format sahi nahi tha. Required fields aur dates dobara check karein.';
	}

	if (error instanceof Error && error.message) {
		return error.message;
	}

	return 'Server par request process nahi ho saki. Thori dair baad dobara try karein.';
}

async function runMutationAction(
	section: string,
	successMessage: string,
	operation: () => Promise<void>
) {
	try {
		await operation();
		return success(successMessage, section);
	} catch (error) {
		console.error(`Admin action failed for ${section}:`, error);
		return actionError(getActionErrorStatus(error), getActionErrorMessage(error), section);
	}
}

export const load: PageServerLoad = async ({ url }) => {
	const requestedSection = url.searchParams.get('section');
	const activeSection =
		requestedSection && validSections.has(requestedSection) ? requestedSection : null;

	try {
		const mediaPromise = listUploadedMedia().catch((error) => {
			console.error('Admin media load failed:', error);
			return [];
		});

		const [
			announcements,
			noticeBoardItems,
			latestNewsItems,
			events,
			results,
			departments,
			facultyMembers,
			media
		] = await Promise.all([
			listAnnouncements(100),
			listNoticeBoardItems(100, { includeExpired: true }),
			listLatestNewsItems(100),
			listEvents(100),
			listExamResults({ limit: 100 }),
			listDepartments(),
			listFacultyMembers(),
			mediaPromise
		]);

		return {
			announcements,
			noticeBoardItems,
			latestNewsItems,
			events,
			results,
			media,
			departments,
			facultyMembers,
			activeSection,
			databaseConnected: true
		};
	} catch (error) {
		logDatabaseLoadError('Admin dashboard load', error);

		return {
			announcements: [],
			noticeBoardItems: [],
			latestNewsItems: [],
			events: [],
			results: [],
			media: [],
			departments: [],
			facultyMembers: [],
			activeSection,
			databaseConnected: false
		};
	}
};

export const actions: Actions = {
	createAnnouncement: async ({ request }) => {
		const formData = await request.formData();
		const title = stringValue(formData, 'title');
		const description = stringValue(formData, 'description');
		const category = stringValue(formData, 'category');
		const date = stringValue(formData, 'date');

		if (!title || !description || !category) {
			return actionError(400, 'Announcement ke required fields missing hain.', 'announcements');
		}

		return runMutationAction('announcements', 'Announcement create ho gaya.', async () => {
			await createAnnouncement({ title, description, category, date });
		});
	},

	updateAnnouncement: async ({ request }) => {
		const formData = await request.formData();
		const id = numberValue(formData, 'id');
		const title = stringValue(formData, 'title');
		const description = stringValue(formData, 'description');
		const category = stringValue(formData, 'category');
		const date = stringValue(formData, 'date');

		if (!id || !title || !description || !category || !date) {
			return actionError(400, 'Announcement update ke fields incomplete hain.', 'announcements');
		}

		return runMutationAction('announcements', 'Announcement update ho gaya.', async () => {
			await updateAnnouncement({ id, title, description, category, date });
		});
	},

	deleteAnnouncement: async ({ request }) => {
		const formData = await request.formData();
		const id = numberValue(formData, 'id');
		if (!id) {
			return actionError(400, 'Announcement ID missing hai.', 'announcements');
		}

		return runMutationAction('announcements', 'Announcement delete ho gaya.', async () => {
			await deleteAnnouncement(id);
		});
	},

	createNoticeBoard: async ({ request }) => {
		const formData = await request.formData();
		const title = stringValue(formData, 'title');
		const message = stringValue(formData, 'message');
		const tag = stringValue(formData, 'tag');
		const date = stringValue(formData, 'date');
		const expiryDate = stringValue(formData, 'expiryDate');
		const sortOrder = numberValue(formData, 'sortOrder');

		if (!title || !message || !tag) {
			return actionError(400, 'Notice board ke required fields missing hain.', 'noticeBoard');
		}

		return runMutationAction('noticeBoard', 'Notice board item create ho gaya.', async () => {
			await createNoticeBoardItem({ title, message, tag, date, expiryDate, sortOrder });
		});
	},

	updateNoticeBoard: async ({ request }) => {
		const formData = await request.formData();
		const id = numberValue(formData, 'id');
		const title = stringValue(formData, 'title');
		const message = stringValue(formData, 'message');
		const tag = stringValue(formData, 'tag');
		const date = stringValue(formData, 'date');
		const expiryDate = stringValue(formData, 'expiryDate');
		const sortOrder = numberValue(formData, 'sortOrder');

		if (!id || !title || !message || !tag || !date) {
			return actionError(400, 'Notice board update ke fields incomplete hain.', 'noticeBoard');
		}

		return runMutationAction('noticeBoard', 'Notice board item update ho gaya.', async () => {
			await updateNoticeBoardItem({ id, title, message, tag, date, expiryDate, sortOrder });
		});
	},

	deleteNoticeBoard: async ({ request }) => {
		const formData = await request.formData();
		const id = numberValue(formData, 'id');
		if (!id) {
			return actionError(400, 'Notice board ID missing hai.', 'noticeBoard');
		}

		return runMutationAction('noticeBoard', 'Notice board item delete ho gaya.', async () => {
			await deleteNoticeBoardItem(id);
		});
	},

	createLatestNews: async ({ request }) => {
		const formData = await request.formData();
		const title = stringValue(formData, 'title');
		const sortOrder = numberValue(formData, 'sortOrder');

		if (!title) {
			return actionError(400, 'Latest news ke liye title required hai.', 'latestNews');
		}

		return runMutationAction('latestNews', 'Latest news item create ho gaya.', async () => {
			await createLatestNewsItem({ title, sortOrder });
		});
	},

	updateLatestNews: async ({ request }) => {
		const formData = await request.formData();
		const id = numberValue(formData, 'id');
		const title = stringValue(formData, 'title');
		const sortOrder = numberValue(formData, 'sortOrder');

		if (!id || !title) {
			return actionError(400, 'Latest news update ke fields incomplete hain.', 'latestNews');
		}

		return runMutationAction('latestNews', 'Latest news item update ho gaya.', async () => {
			await updateLatestNewsItem({ id, title, sortOrder });
		});
	},

	deleteLatestNews: async ({ request }) => {
		const formData = await request.formData();
		const id = numberValue(formData, 'id');
		if (!id) {
			return actionError(400, 'Latest news ID missing hai.', 'latestNews');
		}

		return runMutationAction('latestNews', 'Latest news item delete ho gaya.', async () => {
			await deleteLatestNewsItem(id);
		});
	},

	createEvent: async ({ request }) => {
		const formData = await request.formData();
		const title = stringValue(formData, 'title');
		const date = stringValue(formData, 'date');
		const time = stringValue(formData, 'time');
		const location = stringValue(formData, 'location');
		const status = stringValue(formData, 'status') || 'Upcoming';
		const imageUrlInput = stringValue(formData, 'imageUrl');
		const imageFile = fileValue(formData, 'imageFile');

		if (!title || !date || !time || !location) {
			return actionError(400, 'Event ke required fields missing hain.', 'events');
		}

		return runMutationAction('events', 'Event create ho gaya.', async () => {
			let imageUrl = imageUrlInput || null;
			if (imageFile && imageFile.size > 0) {
				imageUrl = await saveUploadedFile(imageFile);
			}

			await createEvent({ title, date, time, location, status, imageUrl });
		});
	},

	updateEvent: async ({ request }) => {
		const formData = await request.formData();
		const id = numberValue(formData, 'id');
		const title = stringValue(formData, 'title');
		const date = stringValue(formData, 'date');
		const time = stringValue(formData, 'time');
		const location = stringValue(formData, 'location');
		const status = stringValue(formData, 'status') || 'Upcoming';
		const imageUrlInput = stringValue(formData, 'imageUrl');
		const imageFile = fileValue(formData, 'imageFile');

		if (!id || !title || !date || !time || !location) {
			return actionError(400, 'Event update ke fields incomplete hain.', 'events');
		}

		return runMutationAction('events', 'Event update ho gaya.', async () => {
			let imageUrl = imageUrlInput || null;
			if (imageFile && imageFile.size > 0) {
				imageUrl = await saveUploadedFile(imageFile);
			}

			await updateEvent({ id, title, date, time, location, status, imageUrl });
		});
	},

	deleteEvent: async ({ request }) => {
		const formData = await request.formData();
		const id = numberValue(formData, 'id');
		if (!id) {
			return actionError(400, 'Event ID missing hai.', 'events');
		}

		return runMutationAction('events', 'Event delete ho gaya.', async () => {
			await deleteEvent(id);
		});
	},

	createResult: async ({ request }) => {
		const formData = await request.formData();
		const title = stringValue(formData, 'title');
		const publishDate = stringValue(formData, 'publishDate');
		const resultType = stringValue(formData, 'resultType');
		const fileUrlInput = stringValue(formData, 'fileUrl');
		const fileUpload = fileValue(formData, 'fileUpload');

		if (!title || !publishDate || !resultType) {
			return actionError(400, 'Result ke required fields missing hain.', 'results');
		}

		return runMutationAction('results', 'Result create ho gaya.', async () => {
			let fileUrl = fileUrlInput || null;
			if (fileUpload && fileUpload.size > 0) {
				fileUrl = await saveUploadedFile(fileUpload);
			}

			await createExamResult({ title, publishDate, resultType, fileUrl });
		});
	},

	updateResult: async ({ request }) => {
		const formData = await request.formData();
		const id = numberValue(formData, 'id');
		const title = stringValue(formData, 'title');
		const publishDate = stringValue(formData, 'publishDate');
		const resultType = stringValue(formData, 'resultType');
		const fileUrlInput = stringValue(formData, 'fileUrl');
		const fileUpload = fileValue(formData, 'fileUpload');

		if (!id || !title || !publishDate || !resultType) {
			return actionError(400, 'Result update ke fields incomplete hain.', 'results');
		}

		return runMutationAction('results', 'Result update ho gaya.', async () => {
			let fileUrl = fileUrlInput || null;
			if (fileUpload && fileUpload.size > 0) {
				fileUrl = await saveUploadedFile(fileUpload);
			}

			await updateExamResult({ id, title, publishDate, resultType, fileUrl });
		});
	},

	deleteResult: async ({ request }) => {
		const formData = await request.formData();
		const id = numberValue(formData, 'id');
		if (!id) {
			return actionError(400, 'Result ID missing hai.', 'results');
		}

		return runMutationAction('results', 'Result delete ho gaya.', async () => {
			await deleteExamResult(id);
		});
	},

	createDepartment: async ({ request }) => {
		const formData = await request.formData();
		const name = stringValue(formData, 'name');
		const urduName = stringValue(formData, 'urduName');
		const slug = stringValue(formData, 'slug');

		if (!name) {
			return actionError(400, 'Department ka name required hai.', 'departments');
		}

		return runMutationAction('departments', 'Department create ho gaya.', async () => {
			await createDepartment({ name, urduName, slug });
		});
	},

	updateDepartment: async ({ request }) => {
		const formData = await request.formData();
		const id = numberValue(formData, 'id');
		const name = stringValue(formData, 'name');
		const urduName = stringValue(formData, 'urduName');
		const slug = stringValue(formData, 'slug');

		if (!id || !name) {
			return actionError(400, 'Department update ke fields incomplete hain.', 'departments');
		}

		return runMutationAction('departments', 'Department update ho gaya.', async () => {
			await updateDepartment({ id, name, urduName, slug });
		});
	},

	deleteDepartment: async ({ request }) => {
		const formData = await request.formData();
		const id = numberValue(formData, 'id');

		if (!id) {
			return actionError(400, 'Department ID missing hai.', 'departments');
		}

		try {
			const assignedFacultyCount = await countFacultyMembersByDepartment(id);
			if (assignedFacultyCount > 0) {
				return actionError(
					400,
					'Is department me teachers maujood hain. Delete se pehle unko move ya delete karein.',
					'departments'
				);
			}

			await deleteDepartment(id);
			return success('Department delete ho gaya.', 'departments');
		} catch (error) {
			console.error('Admin action failed for departments:', error);
			return actionError(getActionErrorStatus(error), getActionErrorMessage(error), 'departments');
		}
	},

	createFaculty: async ({ request }) => {
		const formData = await request.formData();
		const departmentId = numberValue(formData, 'departmentId');
		const name = stringValue(formData, 'name');
		const education = stringValue(formData, 'education');
		const subject = stringValue(formData, 'subject');
		const isHod = booleanValue(formData, 'isHod');
		const isCoordinator = booleanValue(formData, 'isCoordinator');
		const isTeachingStaff = booleanValue(formData, 'isTeachingStaff');
		const imageUrlInput = stringValue(formData, 'imageUrl');
		const imageFile = fileValue(formData, 'imageFile');

		if (!departmentId || !name || !education || !subject) {
			return actionError(400, 'Teacher ke required fields missing hain.', 'faculty');
		}

		if (!isHod && !isCoordinator && !isTeachingStaff) {
			return actionError(
				400,
				'Teacher ke liye kam az kam ek role select karein: HOD, coordinator, ya teaching staff.',
				'faculty'
			);
		}

		return runMutationAction('faculty', 'Teacher create ho gaya.', async () => {
			let imageUrl = imageUrlInput || null;
			if (imageFile && imageFile.size > 0) {
				imageUrl = await saveUploadedFile(imageFile);
			}

			await createFacultyMember({
				departmentId,
				name,
				education,
				subject,
				imageUrl,
				isHod,
				isCoordinator,
				isTeachingStaff
			});
		});
	},

	updateFaculty: async ({ request }) => {
		const formData = await request.formData();
		const id = numberValue(formData, 'id');
		const departmentId = numberValue(formData, 'departmentId');
		const name = stringValue(formData, 'name');
		const education = stringValue(formData, 'education');
		const subject = stringValue(formData, 'subject');
		const isHod = booleanValue(formData, 'isHod');
		const isCoordinator = booleanValue(formData, 'isCoordinator');
		const isTeachingStaff = booleanValue(formData, 'isTeachingStaff');
		const imageUrlInput = stringValue(formData, 'imageUrl');
		const imageFile = fileValue(formData, 'imageFile');

		if (!id || !departmentId || !name || !education || !subject) {
			return actionError(400, 'Teacher update ke fields incomplete hain.', 'faculty');
		}

		if (!isHod && !isCoordinator && !isTeachingStaff) {
			return actionError(
				400,
				'Teacher ke liye kam az kam ek role select karein: HOD, coordinator, ya teaching staff.',
				'faculty'
			);
		}

		return runMutationAction('faculty', 'Teacher update ho gaya.', async () => {
			let imageUrl = imageUrlInput || null;
			if (imageFile && imageFile.size > 0) {
				imageUrl = await saveUploadedFile(imageFile);
			}

			await updateFacultyMember({
				id,
				departmentId,
				name,
				education,
				subject,
				imageUrl,
				isHod,
				isCoordinator,
				isTeachingStaff
			});
		});
	},

	deleteFaculty: async ({ request }) => {
		const formData = await request.formData();
		const id = numberValue(formData, 'id');
		if (!id) {
			return actionError(400, 'Teacher ID missing hai.', 'faculty');
		}

		return runMutationAction('faculty', 'Teacher delete ho gaya.', async () => {
			await deleteFacultyMember(id);
		});
	},

	uploadMedia: async ({ request }) => {
		const formData = await request.formData();
		const file = fileValue(formData, 'mediaFile');

		if (!file || file.size === 0) {
			return actionError(400, 'Upload ke liye file select karein.', 'media');
		}

		return runMutationAction('media', 'Media upload ho gaya.', async () => {
			await saveUploadedFile(file);
		});
	},

	deleteMedia: async ({ request }) => {
		const formData = await request.formData();
		const fileName = stringValue(formData, 'fileName');
		if (!fileName) {
			return actionError(400, 'File name missing hai.', 'media');
		}

		return runMutationAction('media', 'Media delete ho gaya.', async () => {
			await deleteUploadedMedia(fileName);
		});
	}
};
