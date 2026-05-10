import { readFile } from 'node:fs/promises';
import { basename, extname } from 'node:path';
import { getUploadedFilePath } from '$lib/server/uploads';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const contentTypes: Record<string, string> = {
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.png': 'image/png',
	'.webp': 'image/webp',
	'.gif': 'image/gif',
	'.pdf': 'application/pdf'
};

export const GET: RequestHandler = async ({ params, setHeaders }) => {
	const fileName = basename(params.file);

	try {
		const filePath = getUploadedFilePath(fileName);
		const file = await readFile(filePath);
		const extension = extname(fileName).toLowerCase();

		setHeaders({
			'cache-control': 'public, max-age=60'
		});

		return new Response(file, {
			headers: {
				'content-type': contentTypes[extension] ?? 'application/octet-stream'
			}
		});
	} catch {
		throw error(404, 'Uploaded file not found.');
	}
};
