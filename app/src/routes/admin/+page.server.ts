import {
	createAnnouncement,
	createEvent,
	createExamResult,
	createQuickLink,
	deleteAnnouncement,
	deleteEvent,
	deleteExamResult,
	deleteQuickLink,
	listAnnouncements,
	listEvents,
	listExamResults,
	listQuickLinks,
	updateAnnouncement,
	updateEvent,
	updateExamResult,
	updateQuickLink
} from '$lib/server/database/content';
import { deleteUploadedMedia, listUploadedMedia, saveUploadedFile } from '$lib/server/uploads';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

function stringValue(formData: FormData, key: string) {
	return String(formData.get(key) ?? '').trim();
}

function numberValue(formData: FormData, key: string) {
	return Number(stringValue(formData, key));
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

export const load: PageServerLoad = async () => {
	try {
		const [announcements, events, results, quickLinks, media] = await Promise.all([
			listAnnouncements(100),
			listEvents(100),
			listExamResults({ limit: 100 }),
			listQuickLinks(50),
			listUploadedMedia()
		]);

		return {
			announcements,
			events,
			results,
			quickLinks,
			media,
			databaseConnected: true
		};
	} catch (error) {
		console.error('Admin dashboard load failed:', error);

		return {
			announcements: [],
			events: [],
			results: [],
			quickLinks: [],
			media: [],
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

	createQuickLink: async ({ request }) => {
		const formData = await request.formData();
		const title = stringValue(formData, 'title');
		const description = stringValue(formData, 'description');
		const href = stringValue(formData, 'href');
		const iconName = stringValue(formData, 'iconName') || 'graduation-cap';

		if (!title || !description || !href) {
			return actionError(400, 'Quick link ke required fields missing hain.', 'quickLinks');
		}

		await createQuickLink({ title, description, href, iconName });
		return success('Quick link create ho gaya.', 'quickLinks');
	},

	updateQuickLink: async ({ request }) => {
		const formData = await request.formData();
		const id = numberValue(formData, 'id');
		const title = stringValue(formData, 'title');
		const description = stringValue(formData, 'description');
		const href = stringValue(formData, 'href');
		const iconName = stringValue(formData, 'iconName') || 'graduation-cap';

		if (!id || !title || !description || !href) {
			return actionError(400, 'Quick link update ke fields incomplete hain.', 'quickLinks');
		}

		await updateQuickLink({ id, title, description, href, iconName });
		return success('Quick link update ho gaya.', 'quickLinks');
	},

	deleteQuickLink: async ({ request }) => {
		const formData = await request.formData();
		const id = numberValue(formData, 'id');
		if (!id) {
			return actionError(400, 'Quick link ID missing hai.', 'quickLinks');
		}

		await deleteQuickLink(id);
		return success('Quick link delete ho gaya.', 'quickLinks');
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
