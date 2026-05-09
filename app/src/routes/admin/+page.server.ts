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
import { logDatabaseLoadError } from '$lib/server/db';
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

export const load: PageServerLoad = async ({ url }) => {
	const requestedSection = url.searchParams.get('section');
	const activeSection =
		requestedSection && validSections.has(requestedSection) ? requestedSection : null;

	try {
		const [
			announcements,
			noticeBoardItems,
			latestNewsItems,
			events,
			results,
			media,
			departments,
			facultyMembers
		] = await Promise.all([
			listAnnouncements(100),
			listNoticeBoardItems(100, { includeExpired: true }),
			listLatestNewsItems(100),
			listEvents(100),
			listExamResults({ limit: 100 }),
			listUploadedMedia(),
			listDepartments(),
			listFacultyMembers()
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

		await createAnnouncement({ title, description, category, date });
		return success('Announcement create ho gaya.', 'announcements');
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

		await updateAnnouncement({ id, title, description, category, date });
		return success('Announcement update ho gaya.', 'announcements');
	},

	deleteAnnouncement: async ({ request }) => {
		const formData = await request.formData();
		const id = numberValue(formData, 'id');
		if (!id) {
			return actionError(400, 'Announcement ID missing hai.', 'announcements');
		}

		await deleteAnnouncement(id);
		return success('Announcement delete ho gaya.', 'announcements');
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

		await createNoticeBoardItem({ title, message, tag, date, expiryDate, sortOrder });
		return success('Notice board item create ho gaya.', 'noticeBoard');
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

		await updateNoticeBoardItem({ id, title, message, tag, date, expiryDate, sortOrder });
		return success('Notice board item update ho gaya.', 'noticeBoard');
	},

	deleteNoticeBoard: async ({ request }) => {
		const formData = await request.formData();
		const id = numberValue(formData, 'id');
		if (!id) {
			return actionError(400, 'Notice board ID missing hai.', 'noticeBoard');
		}

		await deleteNoticeBoardItem(id);
		return success('Notice board item delete ho gaya.', 'noticeBoard');
	},

	createLatestNews: async ({ request }) => {
		const formData = await request.formData();
		const title = stringValue(formData, 'title');
		const sortOrder = numberValue(formData, 'sortOrder');

		if (!title) {
			return actionError(400, 'Latest news ke liye title required hai.', 'latestNews');
		}

		await createLatestNewsItem({ title, sortOrder });
		return success('Latest news item create ho gaya.', 'latestNews');
	},

	updateLatestNews: async ({ request }) => {
		const formData = await request.formData();
		const id = numberValue(formData, 'id');
		const title = stringValue(formData, 'title');
		const sortOrder = numberValue(formData, 'sortOrder');

		if (!id || !title) {
			return actionError(400, 'Latest news update ke fields incomplete hain.', 'latestNews');
		}

		await updateLatestNewsItem({ id, title, sortOrder });
		return success('Latest news item update ho gaya.', 'latestNews');
	},

	deleteLatestNews: async ({ request }) => {
		const formData = await request.formData();
		const id = numberValue(formData, 'id');
		if (!id) {
			return actionError(400, 'Latest news ID missing hai.', 'latestNews');
		}

		await deleteLatestNewsItem(id);
		return success('Latest news item delete ho gaya.', 'latestNews');
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

		let imageUrl = imageUrlInput || null;
		if (imageFile && imageFile.size > 0) {
			imageUrl = await saveUploadedFile(imageFile);
		}

		await createEvent({ title, date, time, location, status, imageUrl });
		return success('Event create ho gaya.', 'events');
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

		let imageUrl = imageUrlInput || null;
		if (imageFile && imageFile.size > 0) {
			imageUrl = await saveUploadedFile(imageFile);
		}

		await updateEvent({ id, title, date, time, location, status, imageUrl });
		return success('Event update ho gaya.', 'events');
	},

	deleteEvent: async ({ request }) => {
		const formData = await request.formData();
		const id = numberValue(formData, 'id');
		if (!id) {
			return actionError(400, 'Event ID missing hai.', 'events');
		}

		await deleteEvent(id);
		return success('Event delete ho gaya.', 'events');
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

		let fileUrl = fileUrlInput || null;
		if (fileUpload && fileUpload.size > 0) {
			fileUrl = await saveUploadedFile(fileUpload);
		}

		await createExamResult({ title, publishDate, resultType, fileUrl });
		return success('Result create ho gaya.', 'results');
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

		let fileUrl = fileUrlInput || null;
		if (fileUpload && fileUpload.size > 0) {
			fileUrl = await saveUploadedFile(fileUpload);
		}

		await updateExamResult({ id, title, publishDate, resultType, fileUrl });
		return success('Result update ho gaya.', 'results');
	},

	deleteResult: async ({ request }) => {
		const formData = await request.formData();
		const id = numberValue(formData, 'id');
		if (!id) {
			return actionError(400, 'Result ID missing hai.', 'results');
		}

		await deleteExamResult(id);
		return success('Result delete ho gaya.', 'results');
	},

	createDepartment: async ({ request }) => {
		const formData = await request.formData();
		const name = stringValue(formData, 'name');
		const urduName = stringValue(formData, 'urduName');
		const slug = stringValue(formData, 'slug');

		if (!name) {
			return actionError(400, 'Department ka name required hai.', 'departments');
		}

		await createDepartment({ name, urduName, slug });
		return success('Department create ho gaya.', 'departments');
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

		await updateDepartment({ id, name, urduName, slug });
		return success('Department update ho gaya.', 'departments');
	},

	deleteDepartment: async ({ request }) => {
		const formData = await request.formData();
		const id = numberValue(formData, 'id');

		if (!id) {
			return actionError(400, 'Department ID missing hai.', 'departments');
		}

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
		return success('Teacher create ho gaya.', 'faculty');
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
		return success('Teacher update ho gaya.', 'faculty');
	},

	deleteFaculty: async ({ request }) => {
		const formData = await request.formData();
		const id = numberValue(formData, 'id');
		if (!id) {
			return actionError(400, 'Teacher ID missing hai.', 'faculty');
		}

		await deleteFacultyMember(id);
		return success('Teacher delete ho gaya.', 'faculty');
	},

	uploadMedia: async ({ request }) => {
		const formData = await request.formData();
		const file = fileValue(formData, 'mediaFile');

		if (!file || file.size === 0) {
			return actionError(400, 'Upload ke liye file select karein.', 'media');
		}

		await saveUploadedFile(file);
		return success('Media upload ho gaya.', 'media');
	},

	deleteMedia: async ({ request }) => {
		const formData = await request.formData();
		const fileName = stringValue(formData, 'fileName');
		if (!fileName) {
			return actionError(400, 'File name missing hai.', 'media');
		}

		await deleteUploadedMedia(fileName);
		return success('Media delete ho gaya.', 'media');
	}
};
