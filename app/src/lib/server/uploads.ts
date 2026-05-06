import { mkdir, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { basename, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';

const uploadDirectory = resolve(fileURLToPath(new URL('../../../static/uploads/admin', import.meta.url)));

export type UploadedMedia = {
	name: string;
	url: string;
	size: number;
	modifiedAt: string;
};

const allowedMimeTypes = new Set([
	'image/jpeg',
	'image/png',
	'image/webp',
	'image/gif',
	'application/pdf'
]);

export async function ensureUploadDirectory() {
	await mkdir(uploadDirectory, { recursive: true });
}

export async function saveUploadedFile(file: File) {
	if (!file || file.size === 0) {
		return null;
	}

	if (!allowedMimeTypes.has(file.type)) {
		throw new Error('Only JPG, PNG, WEBP, GIF, and PDF files are allowed.');
	}

	await ensureUploadDirectory();

	const extension = extname(file.name) || '.bin';
	const safeBaseName = basename(file.name, extension).replace(/[^a-zA-Z0-9-_]/g, '-').slice(0, 40) || 'file';
	const fileName = `${safeBaseName}-${randomUUID()}${extension.toLowerCase()}`;
	const filePath = resolve(uploadDirectory, fileName);
	const arrayBuffer = await file.arrayBuffer();

	await writeFile(filePath, Buffer.from(arrayBuffer));

	return `/uploads/admin/${fileName}`;
}

export async function listUploadedMedia(): Promise<UploadedMedia[]> {
	await ensureUploadDirectory();
	const fileNames = await readdir(uploadDirectory);

	const items = await Promise.all(
		fileNames.map(async (fileName) => {
			const filePath = resolve(uploadDirectory, fileName);
			const fileStat = await stat(filePath);

			return {
				name: fileName,
				url: `/uploads/admin/${fileName}`,
				size: fileStat.size,
				modifiedAt: fileStat.mtime.toISOString()
			};
		})
	);

	return items.sort((left, right) => right.modifiedAt.localeCompare(left.modifiedAt));
}

export async function deleteUploadedMedia(fileName: string) {
	const safeFileName = basename(fileName);
	if (!safeFileName) {
		throw new Error('Invalid file name.');
	}

	const filePath = resolve(uploadDirectory, safeFileName);
	await rm(filePath, { force: true });
}
