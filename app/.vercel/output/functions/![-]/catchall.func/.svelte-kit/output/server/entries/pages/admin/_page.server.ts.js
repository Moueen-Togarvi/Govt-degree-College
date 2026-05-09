import { a as logDatabaseLoadError } from "../../../chunks/faculty-fallback.js";
import { S as updateNoticeBoardItem, a as createNoticeBoardItem, b as updateExamResult, c as deleteExamResult, d as listAnnouncements, f as listEvents, h as listNoticeBoardItems, i as createLatestNewsItem, l as deleteLatestNewsItem, m as listLatestNewsItems, n as createEvent, o as deleteAnnouncement, p as listExamResults, r as createExamResult, s as deleteEvent, t as createAnnouncement, u as deleteNoticeBoardItem, v as updateAnnouncement, x as updateLatestNewsItem, y as updateEvent } from "../../../chunks/content.js";
import { a as deleteFacultyMember, c as listFacultyMembers, i as deleteDepartment, l as updateDepartment, n as createDepartment, o as listDepartments, r as createFacultyMember, t as countFacultyMembersByDepartment, u as updateFacultyMember } from "../../../chunks/faculty.js";
import { fail } from "@sveltejs/kit";
import { randomUUID } from "node:crypto";
import { mkdir, readdir, rm, stat, writeFile } from "node:fs/promises";
import { basename, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
//#region src/lib/server/uploads.ts
var uploadDirectory = resolve(fileURLToPath(new URL("../../../static/uploads/admin", import.meta.url)));
var MAX_FILE_SIZE = 5 * 1024 * 1024;
var allowedExtensions = {
	"image/jpeg": [".jpg", ".jpeg"],
	"image/png": [".png"],
	"image/webp": [".webp"],
	"image/gif": [".gif"],
	"application/pdf": [".pdf"]
};
async function ensureUploadDirectory() {
	await mkdir(uploadDirectory, { recursive: true });
}
async function saveUploadedFile(file) {
	if (!file || file.size === 0) return null;
	if (file.size > MAX_FILE_SIZE) throw new Error("File size exceeds the 5MB limit.");
	const allowedExts = allowedExtensions[file.type];
	if (!allowedExts) throw new Error("Only JPG, PNG, WEBP, GIF, and PDF files are allowed.");
	const extension = extname(file.name).toLowerCase();
	if (!allowedExts.includes(extension)) throw new Error(`Invalid extension for ${file.type}. Expected ${allowedExts.join(" or ")}.`);
	await ensureUploadDirectory();
	const fileName = `${basename(file.name, extension).replace(/[^a-zA-Z0-9-_]/g, "-").slice(0, 40) || "file"}-${randomUUID()}${extension}`;
	const filePath = resolve(uploadDirectory, fileName);
	const arrayBuffer = await file.arrayBuffer();
	await writeFile(filePath, Buffer.from(arrayBuffer));
	return `/uploads/admin/${fileName}`;
}
async function listUploadedMedia() {
	await ensureUploadDirectory();
	const fileNames = await readdir(uploadDirectory);
	return (await Promise.all(fileNames.map(async (fileName) => {
		const fileStat = await stat(resolve(uploadDirectory, fileName));
		return {
			name: fileName,
			url: `/uploads/admin/${fileName}`,
			size: fileStat.size,
			modifiedAt: fileStat.mtime.toISOString()
		};
	}))).sort((left, right) => right.modifiedAt.localeCompare(left.modifiedAt));
}
async function deleteUploadedMedia(fileName) {
	const safeFileName = basename(fileName);
	if (!safeFileName) throw new Error("Invalid file name.");
	await rm(resolve(uploadDirectory, safeFileName), { force: true });
}
//#endregion
//#region src/routes/admin/+page.server.ts
var validSections = new Set([
	"announcements",
	"noticeBoard",
	"latestNews",
	"events",
	"results",
	"media",
	"departments",
	"faculty"
]);
function stringValue(formData, key) {
	return String(formData.get(key) ?? "").trim();
}
function numberValue(formData, key) {
	return Number(stringValue(formData, key));
}
function booleanValue(formData, key) {
	return formData.get(key) === "on";
}
function fileValue(formData, key) {
	const value = formData.get(key);
	return value instanceof File ? value : null;
}
function success(message, section) {
	return {
		success: true,
		message,
		section
	};
}
function actionError(status, message, section) {
	return fail(status, {
		success: false,
		message,
		section
	});
}
var load = async ({ url }) => {
	const requestedSection = url.searchParams.get("section");
	const activeSection = requestedSection && validSections.has(requestedSection) ? requestedSection : null;
	try {
		const [announcements, noticeBoardItems, latestNewsItems, events, results, media, departments, facultyMembers] = await Promise.all([
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
		logDatabaseLoadError("Admin dashboard load", error);
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
var actions = {
	createAnnouncement: async ({ request }) => {
		const formData = await request.formData();
		const title = stringValue(formData, "title");
		const description = stringValue(formData, "description");
		const category = stringValue(formData, "category");
		const date = stringValue(formData, "date");
		if (!title || !description || !category) return actionError(400, "Announcement ke required fields missing hain.", "announcements");
		await createAnnouncement({
			title,
			description,
			category,
			date
		});
		return success("Announcement create ho gaya.", "announcements");
	},
	updateAnnouncement: async ({ request }) => {
		const formData = await request.formData();
		const id = numberValue(formData, "id");
		const title = stringValue(formData, "title");
		const description = stringValue(formData, "description");
		const category = stringValue(formData, "category");
		const date = stringValue(formData, "date");
		if (!id || !title || !description || !category || !date) return actionError(400, "Announcement update ke fields incomplete hain.", "announcements");
		await updateAnnouncement({
			id,
			title,
			description,
			category,
			date
		});
		return success("Announcement update ho gaya.", "announcements");
	},
	deleteAnnouncement: async ({ request }) => {
		const id = numberValue(await request.formData(), "id");
		if (!id) return actionError(400, "Announcement ID missing hai.", "announcements");
		await deleteAnnouncement(id);
		return success("Announcement delete ho gaya.", "announcements");
	},
	createNoticeBoard: async ({ request }) => {
		const formData = await request.formData();
		const title = stringValue(formData, "title");
		const message = stringValue(formData, "message");
		const tag = stringValue(formData, "tag");
		const date = stringValue(formData, "date");
		const expiryDate = stringValue(formData, "expiryDate");
		const sortOrder = numberValue(formData, "sortOrder");
		if (!title || !message || !tag) return actionError(400, "Notice board ke required fields missing hain.", "noticeBoard");
		await createNoticeBoardItem({
			title,
			message,
			tag,
			date,
			expiryDate,
			sortOrder
		});
		return success("Notice board item create ho gaya.", "noticeBoard");
	},
	updateNoticeBoard: async ({ request }) => {
		const formData = await request.formData();
		const id = numberValue(formData, "id");
		const title = stringValue(formData, "title");
		const message = stringValue(formData, "message");
		const tag = stringValue(formData, "tag");
		const date = stringValue(formData, "date");
		const expiryDate = stringValue(formData, "expiryDate");
		const sortOrder = numberValue(formData, "sortOrder");
		if (!id || !title || !message || !tag || !date) return actionError(400, "Notice board update ke fields incomplete hain.", "noticeBoard");
		await updateNoticeBoardItem({
			id,
			title,
			message,
			tag,
			date,
			expiryDate,
			sortOrder
		});
		return success("Notice board item update ho gaya.", "noticeBoard");
	},
	deleteNoticeBoard: async ({ request }) => {
		const id = numberValue(await request.formData(), "id");
		if (!id) return actionError(400, "Notice board ID missing hai.", "noticeBoard");
		await deleteNoticeBoardItem(id);
		return success("Notice board item delete ho gaya.", "noticeBoard");
	},
	createLatestNews: async ({ request }) => {
		const formData = await request.formData();
		const title = stringValue(formData, "title");
		const sortOrder = numberValue(formData, "sortOrder");
		if (!title) return actionError(400, "Latest news ke liye title required hai.", "latestNews");
		await createLatestNewsItem({
			title,
			sortOrder
		});
		return success("Latest news item create ho gaya.", "latestNews");
	},
	updateLatestNews: async ({ request }) => {
		const formData = await request.formData();
		const id = numberValue(formData, "id");
		const title = stringValue(formData, "title");
		const sortOrder = numberValue(formData, "sortOrder");
		if (!id || !title) return actionError(400, "Latest news update ke fields incomplete hain.", "latestNews");
		await updateLatestNewsItem({
			id,
			title,
			sortOrder
		});
		return success("Latest news item update ho gaya.", "latestNews");
	},
	deleteLatestNews: async ({ request }) => {
		const id = numberValue(await request.formData(), "id");
		if (!id) return actionError(400, "Latest news ID missing hai.", "latestNews");
		await deleteLatestNewsItem(id);
		return success("Latest news item delete ho gaya.", "latestNews");
	},
	createEvent: async ({ request }) => {
		const formData = await request.formData();
		const title = stringValue(formData, "title");
		const date = stringValue(formData, "date");
		const time = stringValue(formData, "time");
		const location = stringValue(formData, "location");
		const status = stringValue(formData, "status") || "Upcoming";
		const imageUrlInput = stringValue(formData, "imageUrl");
		const imageFile = fileValue(formData, "imageFile");
		if (!title || !date || !time || !location) return actionError(400, "Event ke required fields missing hain.", "events");
		let imageUrl = imageUrlInput || null;
		if (imageFile && imageFile.size > 0) imageUrl = await saveUploadedFile(imageFile);
		await createEvent({
			title,
			date,
			time,
			location,
			status,
			imageUrl
		});
		return success("Event create ho gaya.", "events");
	},
	updateEvent: async ({ request }) => {
		const formData = await request.formData();
		const id = numberValue(formData, "id");
		const title = stringValue(formData, "title");
		const date = stringValue(formData, "date");
		const time = stringValue(formData, "time");
		const location = stringValue(formData, "location");
		const status = stringValue(formData, "status") || "Upcoming";
		const imageUrlInput = stringValue(formData, "imageUrl");
		const imageFile = fileValue(formData, "imageFile");
		if (!id || !title || !date || !time || !location) return actionError(400, "Event update ke fields incomplete hain.", "events");
		let imageUrl = imageUrlInput || null;
		if (imageFile && imageFile.size > 0) imageUrl = await saveUploadedFile(imageFile);
		await updateEvent({
			id,
			title,
			date,
			time,
			location,
			status,
			imageUrl
		});
		return success("Event update ho gaya.", "events");
	},
	deleteEvent: async ({ request }) => {
		const id = numberValue(await request.formData(), "id");
		if (!id) return actionError(400, "Event ID missing hai.", "events");
		await deleteEvent(id);
		return success("Event delete ho gaya.", "events");
	},
	createResult: async ({ request }) => {
		const formData = await request.formData();
		const title = stringValue(formData, "title");
		const publishDate = stringValue(formData, "publishDate");
		const resultType = stringValue(formData, "resultType");
		const fileUrlInput = stringValue(formData, "fileUrl");
		const fileUpload = fileValue(formData, "fileUpload");
		if (!title || !publishDate || !resultType) return actionError(400, "Result ke required fields missing hain.", "results");
		let fileUrl = fileUrlInput || null;
		if (fileUpload && fileUpload.size > 0) fileUrl = await saveUploadedFile(fileUpload);
		await createExamResult({
			title,
			publishDate,
			resultType,
			fileUrl
		});
		return success("Result create ho gaya.", "results");
	},
	updateResult: async ({ request }) => {
		const formData = await request.formData();
		const id = numberValue(formData, "id");
		const title = stringValue(formData, "title");
		const publishDate = stringValue(formData, "publishDate");
		const resultType = stringValue(formData, "resultType");
		const fileUrlInput = stringValue(formData, "fileUrl");
		const fileUpload = fileValue(formData, "fileUpload");
		if (!id || !title || !publishDate || !resultType) return actionError(400, "Result update ke fields incomplete hain.", "results");
		let fileUrl = fileUrlInput || null;
		if (fileUpload && fileUpload.size > 0) fileUrl = await saveUploadedFile(fileUpload);
		await updateExamResult({
			id,
			title,
			publishDate,
			resultType,
			fileUrl
		});
		return success("Result update ho gaya.", "results");
	},
	deleteResult: async ({ request }) => {
		const id = numberValue(await request.formData(), "id");
		if (!id) return actionError(400, "Result ID missing hai.", "results");
		await deleteExamResult(id);
		return success("Result delete ho gaya.", "results");
	},
	createDepartment: async ({ request }) => {
		const formData = await request.formData();
		const name = stringValue(formData, "name");
		const urduName = stringValue(formData, "urduName");
		const slug = stringValue(formData, "slug");
		if (!name) return actionError(400, "Department ka name required hai.", "departments");
		await createDepartment({
			name,
			urduName,
			slug
		});
		return success("Department create ho gaya.", "departments");
	},
	updateDepartment: async ({ request }) => {
		const formData = await request.formData();
		const id = numberValue(formData, "id");
		const name = stringValue(formData, "name");
		const urduName = stringValue(formData, "urduName");
		const slug = stringValue(formData, "slug");
		if (!id || !name) return actionError(400, "Department update ke fields incomplete hain.", "departments");
		await updateDepartment({
			id,
			name,
			urduName,
			slug
		});
		return success("Department update ho gaya.", "departments");
	},
	deleteDepartment: async ({ request }) => {
		const id = numberValue(await request.formData(), "id");
		if (!id) return actionError(400, "Department ID missing hai.", "departments");
		if (await countFacultyMembersByDepartment(id) > 0) return actionError(400, "Is department me teachers maujood hain. Delete se pehle unko move ya delete karein.", "departments");
		await deleteDepartment(id);
		return success("Department delete ho gaya.", "departments");
	},
	createFaculty: async ({ request }) => {
		const formData = await request.formData();
		const departmentId = numberValue(formData, "departmentId");
		const name = stringValue(formData, "name");
		const education = stringValue(formData, "education");
		const subject = stringValue(formData, "subject");
		const isHod = booleanValue(formData, "isHod");
		const isCoordinator = booleanValue(formData, "isCoordinator");
		const isTeachingStaff = booleanValue(formData, "isTeachingStaff");
		const imageUrlInput = stringValue(formData, "imageUrl");
		const imageFile = fileValue(formData, "imageFile");
		if (!departmentId || !name || !education || !subject) return actionError(400, "Teacher ke required fields missing hain.", "faculty");
		if (!isHod && !isCoordinator && !isTeachingStaff) return actionError(400, "Teacher ke liye kam az kam ek role select karein: HOD, coordinator, ya teaching staff.", "faculty");
		let imageUrl = imageUrlInput || null;
		if (imageFile && imageFile.size > 0) imageUrl = await saveUploadedFile(imageFile);
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
		return success("Teacher create ho gaya.", "faculty");
	},
	updateFaculty: async ({ request }) => {
		const formData = await request.formData();
		const id = numberValue(formData, "id");
		const departmentId = numberValue(formData, "departmentId");
		const name = stringValue(formData, "name");
		const education = stringValue(formData, "education");
		const subject = stringValue(formData, "subject");
		const isHod = booleanValue(formData, "isHod");
		const isCoordinator = booleanValue(formData, "isCoordinator");
		const isTeachingStaff = booleanValue(formData, "isTeachingStaff");
		const imageUrlInput = stringValue(formData, "imageUrl");
		const imageFile = fileValue(formData, "imageFile");
		if (!id || !departmentId || !name || !education || !subject) return actionError(400, "Teacher update ke fields incomplete hain.", "faculty");
		if (!isHod && !isCoordinator && !isTeachingStaff) return actionError(400, "Teacher ke liye kam az kam ek role select karein: HOD, coordinator, ya teaching staff.", "faculty");
		let imageUrl = imageUrlInput || null;
		if (imageFile && imageFile.size > 0) imageUrl = await saveUploadedFile(imageFile);
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
		return success("Teacher update ho gaya.", "faculty");
	},
	deleteFaculty: async ({ request }) => {
		const id = numberValue(await request.formData(), "id");
		if (!id) return actionError(400, "Teacher ID missing hai.", "faculty");
		await deleteFacultyMember(id);
		return success("Teacher delete ho gaya.", "faculty");
	},
	uploadMedia: async ({ request }) => {
		const file = fileValue(await request.formData(), "mediaFile");
		if (!file || file.size === 0) return actionError(400, "Upload ke liye file select karein.", "media");
		await saveUploadedFile(file);
		return success("Media upload ho gaya.", "media");
	},
	deleteMedia: async ({ request }) => {
		const fileName = stringValue(await request.formData(), "fileName");
		if (!fileName) return actionError(400, "File name missing hai.", "media");
		await deleteUploadedMedia(fileName);
		return success("Media delete ho gaya.", "media");
	}
};
//#endregion
export { actions, load };
