<script lang="ts">
	import { BellRing, Calendar, FileText, Image, Link as LinkIcon, Megaphone, Trash2, Upload, Pencil } from 'lucide-svelte';

	let { data, form } = $props();

	const iconOptions = ['graduation-cap', 'users', 'library', 'banknote'];

	function isImage(url: string) {
		return /\.(png|jpe?g|webp|gif)$/i.test(url);
	}

	function formatSize(bytes: number) {
		if (bytes < 1024) return `${bytes} B`;
		if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
		return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
	}
</script>

<section class="mx-auto max-w-7xl px-6 py-10">
	<div class="space-y-6">
		<div class="grid gap-4 md:grid-cols-4">
			<div class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
				<p class="text-xs font-black uppercase tracking-[0.25em] text-slate-500">Announcements</p>
				<p class="mt-3 text-4xl font-black text-primary">{data.announcements.length}</p>
			</div>
			<div class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
				<p class="text-xs font-black uppercase tracking-[0.25em] text-slate-500">Events</p>
				<p class="mt-3 text-4xl font-black text-primary">{data.events.length}</p>
			</div>
			<div class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
				<p class="text-xs font-black uppercase tracking-[0.25em] text-slate-500">Results</p>
				<p class="mt-3 text-4xl font-black text-primary">{data.results.length}</p>
			</div>
			<div class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
				<p class="text-xs font-black uppercase tracking-[0.25em] text-slate-500">Media Files</p>
				<p class="mt-3 text-4xl font-black text-primary">{data.media.length}</p>
			</div>
		</div>

		{#if !data.databaseConnected}
			<div class="rounded-[1.5rem] border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-bold text-amber-900">
				Neon database is waqt connect nahi ho rahi. Panel loaded hai, lekin live content fetch fail hui hai.
			</div>
		{/if}

		{#if form?.message}
			<div class="rounded-[1.5rem] border px-5 py-4 text-sm font-bold {form.success ? 'border-emerald-200 bg-emerald-50 text-emerald-900' : 'border-rose-200 bg-rose-50 text-rose-900'}">
				{form.message}
			</div>
		{/if}

		<div class="grid gap-6 lg:grid-cols-2">
			<section id="announcements" class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
				<div class="mb-6 flex items-center gap-3">
					<div class="rounded-2xl bg-primary/10 p-3 text-primary"><Megaphone size={22} /></div>
					<div>
						<h2 class="text-2xl font-black text-primary">Announcements</h2>
						<p class="text-sm font-medium text-slate-500">Create, edit, aur delete official notices.</p>
					</div>
				</div>

				<form method="POST" action="?/createAnnouncement" class="space-y-3 rounded-[1.5rem] bg-slate-50 p-4">
					<input name="title" placeholder="Title" class="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
					<input name="category" placeholder="Category" class="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
					<input name="date" type="datetime-local" class="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
					<textarea name="description" rows="4" placeholder="Description" class="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold"></textarea>
					<button class="rounded-xl bg-primary px-5 py-3 text-sm font-black text-white hover:bg-secondary">Add Announcement</button>
				</form>

				<div class="mt-6 space-y-4">
					{#each data.announcements as item}
						<form method="POST" action="?/updateAnnouncement" class="rounded-[1.5rem] border border-slate-200 p-4">
							<input type="hidden" name="id" value={item.id} />
							<div class="grid gap-3">
								<input name="title" value={item.title} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
								<input name="category" value={item.category} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
								<input name="date" type="datetime-local" value={item.isoDate.slice(0, 16)} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
								<textarea name="description" rows="4" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold">{item.description}</textarea>
								<div class="flex flex-wrap gap-3">
									<button class="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-black text-white hover:bg-secondary"><Pencil size={16} /> Save</button>
									<button formaction="?/deleteAnnouncement" class="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-3 text-sm font-black text-white hover:bg-rose-700"><Trash2 size={16} /> Delete</button>
								</div>
							</div>
						</form>
					{/each}
				</div>
			</section>

			<section id="events" class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
				<div class="mb-6 flex items-center gap-3">
					<div class="rounded-2xl bg-secondary/10 p-3 text-secondary"><Calendar size={22} /></div>
					<div>
						<h2 class="text-2xl font-black text-primary">Events</h2>
						<p class="text-sm font-medium text-slate-500">Events ke details aur image manage karein.</p>
					</div>
				</div>

				<form method="POST" action="?/createEvent" enctype="multipart/form-data" class="space-y-3 rounded-[1.5rem] bg-slate-50 p-4">
					<input name="title" placeholder="Event title" class="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
					<div class="grid gap-3 md:grid-cols-2">
						<input name="date" type="date" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
						<input name="time" placeholder="10:00 AM" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
					</div>
					<input name="location" placeholder="Location" class="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
					<div class="grid gap-3 md:grid-cols-2">
						<input name="status" placeholder="Upcoming" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
						<input name="imageUrl" placeholder="/uploads/admin/example.jpg or full URL" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
					</div>
					<input name="imageFile" type="file" accept="image/*" class="w-full rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3 font-semibold" />
					<button class="rounded-xl bg-primary px-5 py-3 text-sm font-black text-white hover:bg-secondary">Add Event</button>
				</form>

				<div class="mt-6 space-y-4">
					{#each data.events as event}
						<form method="POST" action="?/updateEvent" enctype="multipart/form-data" class="rounded-[1.5rem] border border-slate-200 p-4">
							<input type="hidden" name="id" value={event.id} />
							<div class="grid gap-3">
								<input name="title" value={event.title} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
								<div class="grid gap-3 md:grid-cols-2">
									<input name="date" type="date" value={event.isoDate.slice(0, 10)} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="time" value={event.time} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
								</div>
								<input name="location" value={event.location} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
								<div class="grid gap-3 md:grid-cols-2">
									<input name="status" value={event.status} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="imageUrl" value={event.imageUrl} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
								</div>
								<input name="imageFile" type="file" accept="image/*" class="w-full rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3 font-semibold" />
								<div class="flex flex-wrap gap-3">
									<button class="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-black text-white hover:bg-secondary"><Pencil size={16} /> Save</button>
									<button formaction="?/deleteEvent" class="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-3 text-sm font-black text-white hover:bg-rose-700"><Trash2 size={16} /> Delete</button>
								</div>
							</div>
						</form>
					{/each}
				</div>
			</section>
		</div>

		<div class="grid gap-6 lg:grid-cols-2">
			<section id="results" class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
				<div class="mb-6 flex items-center gap-3">
					<div class="rounded-2xl bg-primary/10 p-3 text-primary"><FileText size={22} /></div>
					<div>
						<h2 class="text-2xl font-black text-primary">Exam Results</h2>
						<p class="text-sm font-medium text-slate-500">Result records aur downloadable files manage karein.</p>
					</div>
				</div>

				<form method="POST" action="?/createResult" enctype="multipart/form-data" class="space-y-3 rounded-[1.5rem] bg-slate-50 p-4">
					<input name="title" placeholder="Result title" class="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
					<div class="grid gap-3 md:grid-cols-2">
						<input name="publishDate" type="date" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
						<input name="resultType" placeholder="Semester / Annual" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
					</div>
					<input name="fileUrl" placeholder="/uploads/admin/result.pdf or full URL" class="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
					<input name="fileUpload" type="file" accept="image/*,application/pdf" class="w-full rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3 font-semibold" />
					<button class="rounded-xl bg-primary px-5 py-3 text-sm font-black text-white hover:bg-secondary">Add Result</button>
				</form>

				<div class="mt-6 space-y-4">
					{#each data.results as result}
						<form method="POST" action="?/updateResult" enctype="multipart/form-data" class="rounded-[1.5rem] border border-slate-200 p-4">
							<input type="hidden" name="id" value={result.id} />
							<div class="grid gap-3">
								<input name="title" value={result.title} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
								<div class="grid gap-3 md:grid-cols-2">
									<input name="publishDate" type="date" value={result.isoDate.slice(0, 10)} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="resultType" value={result.type} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
								</div>
								<input name="fileUrl" value={result.fileUrl ?? ''} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
								<input name="fileUpload" type="file" accept="image/*,application/pdf" class="w-full rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3 font-semibold" />
								<div class="flex flex-wrap gap-3">
									<button class="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-black text-white hover:bg-secondary"><Pencil size={16} /> Save</button>
									<button formaction="?/deleteResult" class="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-3 text-sm font-black text-white hover:bg-rose-700"><Trash2 size={16} /> Delete</button>
								</div>
							</div>
						</form>
					{/each}
				</div>
			</section>

			<section id="quickLinks" class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
				<div class="mb-6 flex items-center gap-3">
					<div class="rounded-2xl bg-secondary/10 p-3 text-secondary"><LinkIcon size={22} /></div>
					<div>
						<h2 class="text-2xl font-black text-primary">Quick Links</h2>
						<p class="text-sm font-medium text-slate-500">Homepage cards aur CTA links update karein.</p>
					</div>
				</div>

				<form method="POST" action="?/createQuickLink" class="space-y-3 rounded-[1.5rem] bg-slate-50 p-4">
					<input name="title" placeholder="Title" class="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
					<input name="href" placeholder="/resources" class="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
					<select name="iconName" class="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold">
						{#each iconOptions as option}
							<option value={option}>{option}</option>
						{/each}
					</select>
					<textarea name="description" rows="4" placeholder="Description" class="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold"></textarea>
					<button class="rounded-xl bg-primary px-5 py-3 text-sm font-black text-white hover:bg-secondary">Add Quick Link</button>
				</form>

				<div class="mt-6 space-y-4">
					{#each data.quickLinks as item}
						<form method="POST" action="?/updateQuickLink" class="rounded-[1.5rem] border border-slate-200 p-4">
							<input type="hidden" name="id" value={item.id} />
							<div class="grid gap-3">
								<input name="title" value={item.title} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
								<input name="href" value={item.href} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
								<select name="iconName" value={item.iconName} class="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold">
									{#each iconOptions as option}
										<option value={option} selected={item.iconName === option}>{option}</option>
									{/each}
								</select>
								<textarea name="description" rows="4" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold">{item.description}</textarea>
								<div class="flex flex-wrap gap-3">
									<button class="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-black text-white hover:bg-secondary"><Pencil size={16} /> Save</button>
									<button formaction="?/deleteQuickLink" class="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-3 text-sm font-black text-white hover:bg-rose-700"><Trash2 size={16} /> Delete</button>
								</div>
							</div>
						</form>
					{/each}
				</div>
			</section>
		</div>

		<section id="media" class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
			<div class="mb-6 flex items-center gap-3">
				<div class="rounded-2xl bg-primary/10 p-3 text-primary"><Image size={22} /></div>
				<div>
					<h2 class="text-2xl font-black text-primary">Media Library</h2>
					<p class="text-sm font-medium text-slate-500">Images aur PDFs upload karein, phir unka path events/results mein use karein.</p>
				</div>
			</div>

			<form method="POST" action="?/uploadMedia" enctype="multipart/form-data" class="mb-8 rounded-[1.5rem] bg-slate-50 p-4">
				<div class="flex flex-col gap-4 md:flex-row md:items-center">
					<input name="mediaFile" type="file" accept="image/*,application/pdf" class="w-full rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3 font-semibold" />
					<button class="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-black text-white hover:bg-secondary">
						<Upload size={16} />
						Upload Media
					</button>
				</div>
			</form>

			<div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
				{#each data.media as file}
					<div class="rounded-[1.5rem] border border-slate-200 p-4">
						{#if isImage(file.url)}
							<img src={file.url} alt={file.name} class="mb-4 h-44 w-full rounded-2xl object-cover" />
						{:else}
							<div class="mb-4 flex h-44 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
								<FileText size={42} />
							</div>
						{/if}

						<p class="truncate text-sm font-black text-primary">{file.name}</p>
						<p class="mt-1 text-xs font-semibold text-slate-500">{formatSize(file.size)}</p>
						<a href={file.url} target="_blank" class="mt-3 block text-xs font-black uppercase tracking-[0.2em] text-secondary">Open File</a>

						<form method="POST" action="?/deleteMedia" class="mt-4">
							<input type="hidden" name="fileName" value={file.name} />
							<button class="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-3 text-sm font-black text-white hover:bg-rose-700">
								<Trash2 size={16} />
								Delete File
							</button>
						</form>
					</div>
				{/each}
			</div>
		</section>
	</div>
</section>
