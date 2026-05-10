import { mkdir, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';

const staticUploadDirectory = resolve(
	fileURLToPath(new URL('../../../static/uploads/admin', import.meta.url))
);
const uploadDirectory = isServerlessRuntime()
	? resolve(tmpdir(), 'gpgc-runtime', 'uploads', 'admin')
	: staticUploadDirectory;

export type UploadedMedia = {
	name: string;
	url: string;
	size: number;
	modifiedAt: string;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const allowedExtensions: Record<string, string[]> = {
	'image/jpeg': ['.jpg', '.jpeg'],
	'image/png': ['.png'],
	'image/webp': ['.webp'],
	'image/gif': ['.gif'],
	'application/pdf': ['.pdf']
};

function isServerlessRuntime() {
	return Boolean(
		process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.LAMBDA_TASK_ROOT
	);
}

function toPublicUploadUrl(fileName: string) {
	return `/uploads/admin/${fileName}`;
}

export function getUploadedFilePath(fileName: string) {
	const safeFileName = basename(fileName);
	if (!safeFileName) {
		throw new Error('Invalid file name.');
	}

	return resolve(uploadDirectory, safeFileName);
}

export async function ensureUploadDirectory() {
	await mkdir(uploadDirectory, { recursive: true });
}

export async function saveUploadedFile(file: File) {
	if (!file || file.size === 0) {
		return null;
	}

	if (file.size > MAX_FILE_SIZE) {
		throw new Error('File size exceeds the 5MB limit.');
	}

	const allowedExts = allowedExtensions[file.type];
	if (!allowedExts) {
		throw new Error('Only JPG, PNG, WEBP, GIF, and PDF files are allowed.');
	}

	const extension = extname(file.name).toLowerCase();
	if (!allowedExts.includes(extension)) {
		throw new Error(`Invalid extension for ${file.type}. Expected ${allowedExts.join(' or ')}.`);
	}

	await ensureUploadDirectory();

	const safeBaseName = basename(file.name, extension).replace(/[^a-zA-Z0-9-_]/g, '-').slice(0, 40) || 'file';
	const fileName = `${safeBaseName}-${randomUUID()}${extension}`;
	const filePath = resolve(uploadDirectory, fileName);
	const arrayBuffer = await file.arrayBuffer();

	await writeFile(filePath, Buffer.from(arrayBuffer));

	return toPublicUploadUrl(fileName);
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
				url: toPublicUploadUrl(fileName),
				size: fileStat.size,
				modifiedAt: fileStat.mtime.toISOString()
			};
		})
	);

	return items.sort((left, right) => right.modifiedAt.localeCompare(left.modifiedAt));
}

export async function deleteUploadedMedia(fileName: string) {
	const filePath = getUploadedFilePath(fileName);
	await rm(filePath, { force: true });
}
