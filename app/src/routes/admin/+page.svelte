<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { applyAction, enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import {
		ArrowLeft,
		BellRing,
		Building2,
		Calendar,
		FileText,
		GraduationCap,
		Image,
		Megaphone,
		Pencil,
		Plus,
		School,
		ScrollText,
		Trash2,
		Upload,
		X
	} from 'lucide-svelte';

	let { data, form } = $props();

	type SectionKey =
		| 'announcements'
		| 'noticeBoard'
		| 'latestNews'
		| 'events'
		| 'results'
		| 'media'
		| 'departments'
		| 'faculty';

	const sections = [
		{
			key: 'announcements',
			label: 'Announcements',
			singular: 'Announcement',
			description: 'Official notices and updates',
			icon: Megaphone
		},
		{
			key: 'noticeBoard',
			label: 'Notice Board',
			singular: 'Notice',
			description: 'Homepage pinned board slips',
			icon: ScrollText
		},
		{
			key: 'latestNews',
			label: 'Latest News',
			singular: 'News Title',
			description: 'Navbar ke neeche chalne wali news line',
			icon: BellRing
		},
		{
			key: 'events',
			label: 'Events',
			singular: 'Event',
			description: 'Upcoming campus activities',
			icon: Calendar
		},
		{
			key: 'results',
			label: 'Results',
			singular: 'Result',
			description: 'Exam result records and files',
			icon: FileText
		},
		{
			key: 'media',
			label: 'Media Library',
			singular: 'Media File',
			description: 'Uploaded images and documents',
			icon: Image
		},
		{
			key: 'departments',
			label: 'Departments',
			singular: 'Department',
			description: 'Faculty departments and their slugs',
			icon: Building2
		},
		{
			key: 'faculty',
			label: 'Faculty Teachers',
			singular: 'Teacher',
			description: 'Teachers shown on the faculty page',
			icon: GraduationCap
		}
	] as const;

	const facultySubjects = [
		'Computer Science',
		'Artificial Intelligence',
		'English',
		'English Literature',
		'Urdu',
		'Mathematics',
		'Physics',
		'Chemistry',
		'Zoology',
		'Botany',
		'Islamiyat',
		'Pakistan Studies',
		'Economics'
	];

	let showComposer = $state(false);

	$effect(() => {
		if (form?.section && form?.success === false) {
			showComposer = true;
		}
	});

	$effect(() => {
		if (form?.success === true) {
			showComposer = false;
		}
	});

	function openComposer() {
		showComposer = true;
	}

	function closeComposer() {
		showComposer = false;
	}

	const enhanceMutation: SubmitFunction = () => {
		return async ({ result }) => {
			await applyAction(result);

			if (result.type === 'success') {
				await invalidateAll();
			}
		};
	};

	function getSectionHref(section: SectionKey) {
		return `/admin?section=${section}`;
	}

	function isImage(url: string) {
		return /\.(png|jpe?g|webp|gif)$/i.test(url);
	}

	function formatSize(bytes: number) {
		if (bytes < 1024) return `${bytes} B`;
		if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
		return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
	}

	function formatDateTimeLocal(value: string | null | undefined) {
		return value ? value.slice(0, 16) : '';
	}

	function isExpired(expiryIsoDate: string | null) {
		return Boolean(expiryIsoDate && new Date(expiryIsoDate).getTime() < Date.now());
	}

	function getCount(section: SectionKey) {
		switch (section) {
			case 'announcements':
				return data.announcements.length;
			case 'noticeBoard':
				return data.noticeBoardItems.length;
			case 'latestNews':
				return data.latestNewsItems.length;
			case 'events':
				return data.events.length;
			case 'results':
				return data.results.length;
			case 'media':
				return data.media.length;
			case 'departments':
				return data.departments.length;
			case 'faculty':
				return data.facultyMembers.length;
		}
	}

	function hasItems(section: SectionKey) {
		return getCount(section) > 0;
	}

	function getEmptyTitle(section: SectionKey) {
		switch (section) {
			case 'announcements':
				return 'No announcements yet';
			case 'noticeBoard':
				return 'No notice board slips yet';
			case 'latestNews':
				return 'No latest news titles yet';
			case 'events':
				return 'No events yet';
			case 'results':
				return 'No results yet';
			case 'media':
				return 'No media uploads yet';
			case 'departments':
				return 'No departments yet';
			case 'faculty':
				return 'No teachers yet';
		}
	}

	function getEmptyDescription(section: SectionKey) {
		switch (section) {
			case 'announcements':
				return 'Create the first announcement and it will appear here in row format.';
			case 'noticeBoard':
				return 'Add pinned notices for the homepage board from here.';
			case 'latestNews':
				return 'Add only title text for the latest news ticker under the navbar.';
			case 'events':
				return 'Add campus events here and they will appear in a row list.';
			case 'results':
				return 'Publish result records and attached files from this section.';
			case 'media':
				return 'Upload images and documents for reuse across the site.';
			case 'departments':
				return 'Create departments first so teachers can be assigned properly.';
			case 'faculty':
				return 'Add teachers here and they will feed the public faculty page.';
		}
	}

	function summarizeFacultyRoles(member: {
		isHod: boolean;
		isCoordinator: boolean;
		isTeachingStaff: boolean;
	}) {
		const roles = [];
		if (member.isHod) roles.push('HOD');
		if (member.isCoordinator) roles.push('Coordinator');
		if (member.isTeachingStaff) roles.push('Teaching Staff');
		return roles.join(' • ') || 'No role selected';
	}

	const currentSection = $derived.by(() => {
		const candidate = (form?.section as SectionKey | undefined) ?? data.activeSection;
		return sections.find((section) => section.key === candidate)?.key ?? null;
	});

	const activeMeta = $derived.by(() => {
		if (!currentSection) return null;
		return sections.find((section) => section.key === currentSection) ?? null;
	});
</script>

<section class="mx-auto max-w-7xl px-6 py-10">
	<datalist id="faculty-subjects">
		{#each facultySubjects as subject}
			<option value={subject}></option>
		{/each}
	</datalist>

	<div class="space-y-8">
		<div>
			<p class="text-sm font-black uppercase tracking-[0.32em] text-secondary">Admin Workspace</p>
			<h1 class="mt-3 text-4xl font-black text-primary lg:text-5xl">Manage site content clearly.</h1>
			<p class="mt-4 max-w-3xl text-base font-medium leading-8 text-slate-500">
				Open a content area, then manage its entries in a clear row-by-row list.
			</p>
		</div>

		{#if !data.databaseConnected}
			<div class="rounded-[1.5rem] border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-bold text-amber-900">
				Neon database is waqt connect nahi ho rahi. Panel load ho gaya hai, lekin live content requests fail ho sakti hain.
			</div>
		{/if}

		{#if form?.message}
			<div class="rounded-[1.5rem] border px-5 py-4 text-sm font-bold {form.success ? 'border-emerald-200 bg-emerald-50 text-emerald-900' : 'border-rose-200 bg-rose-50 text-rose-900'}">
				{form.message}
			</div>
		{/if}

		{#if !currentSection}
			<div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
				{#each sections as section}
					<a
						href={getSectionHref(section.key)}
						class="rounded-[1.75rem] border border-slate-200 bg-white p-6 text-left text-primary shadow-sm transition-all hover:-translate-y-1 hover:border-secondary hover:shadow-[0_20px_60px_rgba(13,93,86,0.12)]"
					>
						<div class="flex items-start justify-between gap-4">
							<div class="rounded-2xl bg-primary/10 p-3 text-primary">
								<section.icon size={22} />
							</div>
							<p class="text-3xl font-black text-primary">{getCount(section.key)}</p>
						</div>
						<h2 class="mt-6 text-2xl font-black text-primary">{section.label}</h2>
						<p class="mt-2 text-sm font-medium leading-7 text-slate-500">{section.description}</p>
					</a>
				{/each}
			</div>
		{:else if activeMeta}
			<div class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
				<div class="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
					<div class="flex items-start gap-4">
						<a
							href="/admin"
							class="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-primary transition hover:border-secondary hover:text-secondary"
						>
							<ArrowLeft size={20} />
						</a>
						<div class="flex items-start gap-4">
							<div class="rounded-2xl bg-primary/10 p-3 text-primary">
								<activeMeta.icon size={24} />
							</div>
							<div>
								<p class="text-xs font-black uppercase tracking-[0.28em] text-secondary">
									Section Detail
								</p>
								<h2 class="mt-2 text-3xl font-black text-primary">{activeMeta.label}</h2>
								<p class="mt-2 text-sm font-medium leading-7 text-slate-500">
									{activeMeta.description}
								</p>
							</div>
						</div>
					</div>

					<div class="flex flex-wrap items-center gap-3">
						<div class="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-slate-500">
							{getCount(currentSection)} items
						</div>
						<button
							type="button"
							class="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:bg-secondary"
							onclick={openComposer}
						>
							<Plus size={16} />
							Add {activeMeta.singular}
						</button>
					</div>
				</div>

				{#if showComposer}
					<div class="mt-8 rounded-[1.75rem] border border-primary/10 bg-slate-50 p-5 lg:p-6">
						<div class="mb-5 flex items-center justify-between gap-4">
							<div>
								<p class="text-xs font-black uppercase tracking-[0.25em] text-secondary">Create New</p>
								<h3 class="mt-2 text-2xl font-black text-primary">Add {activeMeta.singular}</h3>
							</div>

							<button
								type="button"
								class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-600 hover:text-rose-600"
								onclick={closeComposer}
							>
								<X size={16} />
								Close
							</button>
						</div>

						{#if currentSection === 'announcements'}
							<form use:enhance={enhanceMutation} method="POST" action="?/createAnnouncement" class="grid gap-3">
								<input type="hidden" name="section" value="announcements" />
								<div class="grid gap-3 xl:grid-cols-[minmax(0,1.5fr)_220px_220px]">
									<input name="title" placeholder="Title" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="category" placeholder="Category" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="date" type="datetime-local" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
								</div>
								<textarea name="description" rows="4" placeholder="Description" class="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold"></textarea>
								<button class="w-fit rounded-xl bg-primary px-5 py-3 text-sm font-black text-white hover:bg-secondary">Add Announcement</button>
							</form>
						{:else if currentSection === 'noticeBoard'}
							<form use:enhance={enhanceMutation} method="POST" action="?/createNoticeBoard" class="grid gap-3">
								<input type="hidden" name="section" value="noticeBoard" />
								<div class="grid gap-3 xl:grid-cols-[minmax(0,1.2fr)_180px_120px_220px_220px]">
									<input name="title" placeholder="Notice title" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="tag" placeholder="Admissions / Important" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="sortOrder" type="number" placeholder="1" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="date" type="datetime-local" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="expiryDate" type="datetime-local" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
								</div>
								<textarea name="message" rows="4" placeholder="Notice text for homepage board" class="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold"></textarea>
								<button class="w-fit rounded-xl bg-primary px-5 py-3 text-sm font-black text-white hover:bg-secondary">Add Notice</button>
							</form>
						{:else if currentSection === 'latestNews'}
							<form use:enhance={enhanceMutation} method="POST" action="?/createLatestNews" class="grid gap-3">
								<input type="hidden" name="section" value="latestNews" />
								<div class="grid gap-3 xl:grid-cols-[minmax(0,1fr)_140px_auto]">
									<input name="title" placeholder="Latest news title" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="sortOrder" type="number" placeholder="1" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<button class="w-fit rounded-xl bg-primary px-5 py-3 text-sm font-black text-white hover:bg-secondary">Add News</button>
								</div>
							</form>
						{:else if currentSection === 'events'}
							<form use:enhance={enhanceMutation} method="POST" action="?/createEvent" enctype="multipart/form-data" class="grid gap-3">
								<input type="hidden" name="section" value="events" />
								<div class="grid gap-3 xl:grid-cols-[minmax(0,1.4fr)_180px_160px_220px_180px]">
									<input name="title" placeholder="Event title" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="date" type="date" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="time" placeholder="10:00 AM" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="location" placeholder="Location" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="status" placeholder="Upcoming" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
								</div>
								<div class="grid gap-3 xl:grid-cols-[minmax(0,1fr)_260px_auto]">
									<input name="imageUrl" placeholder="/uploads/admin/example.jpg or full URL" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="imageFile" type="file" accept="image/*" class="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3 font-semibold" />
									<button class="w-fit rounded-xl bg-primary px-5 py-3 text-sm font-black text-white hover:bg-secondary">Add Event</button>
								</div>
							</form>
						{:else if currentSection === 'results'}
							<form use:enhance={enhanceMutation} method="POST" action="?/createResult" enctype="multipart/form-data" class="grid gap-3">
								<input type="hidden" name="section" value="results" />
								<div class="grid gap-3 xl:grid-cols-[minmax(0,1.5fr)_200px_220px]">
									<input name="title" placeholder="Result title" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="publishDate" type="date" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="resultType" placeholder="Semester / Annual" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
								</div>
								<div class="grid gap-3 xl:grid-cols-[minmax(0,1fr)_260px_auto]">
									<input name="fileUrl" placeholder="/uploads/admin/result.pdf or full URL" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="fileUpload" type="file" accept="image/*,application/pdf" class="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3 font-semibold" />
									<button class="w-fit rounded-xl bg-primary px-5 py-3 text-sm font-black text-white hover:bg-secondary">Add Result</button>
								</div>
							</form>
						{:else if currentSection === 'media'}
							<form use:enhance={enhanceMutation} method="POST" action="?/uploadMedia" enctype="multipart/form-data" class="grid gap-3 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center">
								<input type="hidden" name="section" value="media" />
								<input name="mediaFile" type="file" accept="image/*,application/pdf" class="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3 font-semibold" />
								<button class="inline-flex w-fit items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-black text-white hover:bg-secondary">
									<Upload size={16} />
									Upload Media
								</button>
							</form>
						{:else if currentSection === 'departments'}
							<form use:enhance={enhanceMutation} method="POST" action="?/createDepartment" class="grid gap-3">
								<input type="hidden" name="section" value="departments" />
								<div class="grid gap-3 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_220px_auto]">
									<input name="name" placeholder="Department name" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="urduName" placeholder="Urdu name (optional)" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="slug" placeholder="computer-science" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<button class="w-fit rounded-xl bg-primary px-5 py-3 text-sm font-black text-white hover:bg-secondary">Add Department</button>
								</div>
							</form>
						{:else if currentSection === 'faculty'}
							{#if data.departments.length === 0}
								<div class="rounded-[1.25rem] border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-bold text-amber-900">
									Teachers add karne se pehle ek department create karein.
								</div>
							{:else}
								<form use:enhance={enhanceMutation} method="POST" action="?/createFaculty" enctype="multipart/form-data" class="grid gap-3">
									<input type="hidden" name="section" value="faculty" />
									<div class="grid gap-3 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_220px_220px]">
										<input name="name" placeholder="Teacher name" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
										<input name="education" placeholder="Education / qualification" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
										<select name="departmentId" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold">
											<option value="">Select department</option>
											{#each data.departments as department}
												<option value={department.id}>{department.name}</option>
											{/each}
										</select>
										<input name="subject" list="faculty-subjects" placeholder="Subject / teaching area" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									</div>
									<div class="grid gap-3 xl:grid-cols-[minmax(0,1fr)_260px_auto]">
										<input name="imageUrl" placeholder="/uploads/admin/teacher.jpg or full URL" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
										<input name="imageFile" type="file" accept="image/*" class="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3 font-semibold" />
										<button class="w-fit rounded-xl bg-primary px-5 py-3 text-sm font-black text-white hover:bg-secondary">Add Teacher</button>
									</div>
									<div class="flex flex-wrap gap-5 rounded-xl border border-slate-200 bg-white px-4 py-3">
										<label class="inline-flex items-center gap-3 text-sm font-black text-primary">
											<input name="isHod" type="checkbox" class="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" />
											Is HOD
										</label>
										<label class="inline-flex items-center gap-3 text-sm font-black text-primary">
											<input name="isCoordinator" type="checkbox" class="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" />
											Is Coordinator
										</label>
										<label class="inline-flex items-center gap-3 text-sm font-black text-primary">
											<input name="isTeachingStaff" type="checkbox" checked class="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" />
											Teaching Staff
										</label>
									</div>
								</form>
							{/if}
						{/if}
					</div>
				{/if}

				<div class="mt-8 space-y-3">
					{#if !hasItems(currentSection)}
						<div class="rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
							<p class="text-xs font-black uppercase tracking-[0.3em] text-secondary">{activeMeta.label}</p>
							<h3 class="mt-3 text-2xl font-black text-primary">{getEmptyTitle(currentSection)}</h3>
							<p class="mx-auto mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-500">
								{getEmptyDescription(currentSection)}
							</p>
							{#if !showComposer}
								<button
									type="button"
									class="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:bg-secondary"
									onclick={openComposer}
								>
									<Plus size={16} />
									Add {activeMeta.singular}
								</button>
							{/if}
						</div>
					{/if}

					{#if currentSection === 'announcements'}
						{#each data.announcements as item}
							<form use:enhance={enhanceMutation} method="POST" action="?/updateAnnouncement" class="rounded-[1.5rem] border border-slate-200 bg-white p-5">
								<input type="hidden" name="id" value={item.id} />
								<input type="hidden" name="section" value="announcements" />
								<div class="grid gap-3 xl:grid-cols-[minmax(0,1.6fr)_220px_220px_auto] xl:items-start">
									<input name="title" value={item.title} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="category" value={item.category} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="date" type="datetime-local" value={formatDateTimeLocal(item.isoDate)} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<div class="flex flex-wrap gap-2 xl:justify-end">
										<button class="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-black text-white hover:bg-secondary"><Pencil size={16} /> Save</button>
										<button formaction="?/deleteAnnouncement" class="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-3 text-sm font-black text-white hover:bg-rose-700"><Trash2 size={16} /> Delete</button>
									</div>
									<textarea name="description" rows="3" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold xl:col-span-4">{item.description}</textarea>
								</div>
							</form>
						{/each}
					{:else if currentSection === 'noticeBoard'}
						{#each data.noticeBoardItems as item}
							<form use:enhance={enhanceMutation} method="POST" action="?/updateNoticeBoard" class="rounded-[1.5rem] border border-slate-200 bg-white p-5">
								<input type="hidden" name="id" value={item.id} />
								<input type="hidden" name="section" value="noticeBoard" />
								<div class="mb-3 flex flex-wrap items-center justify-between gap-3">
									<div class="flex items-center gap-2">
										<span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-slate-600">{item.tag}</span>
										<span class={`rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] ${isExpired(item.expiryIsoDate) ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
											{isExpired(item.expiryIsoDate) ? 'Expired' : 'Active'}
										</span>
									</div>
									<div class="flex flex-wrap gap-2">
										<button class="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-black text-white hover:bg-secondary"><Pencil size={16} /> Save</button>
										<button formaction="?/deleteNoticeBoard" class="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-3 text-sm font-black text-white hover:bg-rose-700"><Trash2 size={16} /> Delete</button>
									</div>
								</div>
								<div class="grid gap-3 xl:grid-cols-[minmax(0,1.2fr)_180px_120px_220px_220px]">
									<input name="title" value={item.title} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="tag" value={item.tag} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="sortOrder" type="number" value={item.sortOrder} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="date" type="datetime-local" value={formatDateTimeLocal(item.isoDate)} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="expiryDate" type="datetime-local" value={formatDateTimeLocal(item.expiryIsoDate)} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<textarea name="message" rows="3" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold xl:col-span-5">{item.message}</textarea>
								</div>
							</form>
						{/each}
					{:else if currentSection === 'latestNews'}
						{#each data.latestNewsItems as item}
							<form use:enhance={enhanceMutation} method="POST" action="?/updateLatestNews" class="rounded-[1.5rem] border border-slate-200 bg-white p-5">
								<input type="hidden" name="id" value={item.id} />
								<input type="hidden" name="section" value="latestNews" />
								<div class="grid gap-3 xl:grid-cols-[minmax(0,1fr)_140px_auto] xl:items-start">
									<input name="title" value={item.title} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="sortOrder" type="number" value={item.sortOrder} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<div class="flex flex-wrap gap-2 xl:justify-end">
										<button class="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-black text-white hover:bg-secondary"><Pencil size={16} /> Save</button>
										<button formaction="?/deleteLatestNews" class="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-3 text-sm font-black text-white hover:bg-rose-700"><Trash2 size={16} /> Delete</button>
									</div>
								</div>
							</form>
						{/each}
					{:else if currentSection === 'events'}
						{#each data.events as event}
							<form use:enhance={enhanceMutation} method="POST" action="?/updateEvent" enctype="multipart/form-data" class="rounded-[1.5rem] border border-slate-200 bg-white p-5">
								<input type="hidden" name="id" value={event.id} />
								<input type="hidden" name="section" value="events" />
								<div class="mb-3 flex flex-wrap items-center justify-between gap-3">
									<span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-slate-600">{event.status}</span>
									<div class="flex flex-wrap gap-2">
										<button class="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-black text-white hover:bg-secondary"><Pencil size={16} /> Save</button>
										<button formaction="?/deleteEvent" class="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-3 text-sm font-black text-white hover:bg-rose-700"><Trash2 size={16} /> Delete</button>
									</div>
								</div>
								<div class="grid gap-3 xl:grid-cols-[minmax(0,1.4fr)_180px_160px_220px_180px_auto] xl:items-start">
									<input name="title" value={event.title} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="date" type="date" value={event.isoDate.slice(0, 10)} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="time" value={event.time} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="location" value={event.location} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="status" value={event.status} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="imageUrl" value={event.imageUrl ?? ''} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="imageFile" type="file" accept="image/*" class="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3 font-semibold xl:col-span-2" />
								</div>
							</form>
						{/each}
					{:else if currentSection === 'results'}
						{#each data.results as result}
							<form use:enhance={enhanceMutation} method="POST" action="?/updateResult" enctype="multipart/form-data" class="rounded-[1.5rem] border border-slate-200 bg-white p-5">
								<input type="hidden" name="id" value={result.id} />
								<input type="hidden" name="section" value="results" />
								<div class="mb-3 flex flex-wrap items-center justify-between gap-3">
									<span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-slate-600">{result.type}</span>
									<div class="flex flex-wrap gap-2">
										<button class="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-black text-white hover:bg-secondary"><Pencil size={16} /> Save</button>
										<button formaction="?/deleteResult" class="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-3 text-sm font-black text-white hover:bg-rose-700"><Trash2 size={16} /> Delete</button>
									</div>
								</div>
								<div class="grid gap-3 xl:grid-cols-[minmax(0,1.5fr)_200px_220px_minmax(0,1fr)] xl:items-start">
									<input name="title" value={result.title} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="publishDate" type="date" value={result.isoDate.slice(0, 10)} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="resultType" value={result.type} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="fileUrl" value={result.fileUrl ?? ''} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="fileUpload" type="file" accept="image/*,application/pdf" class="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3 font-semibold xl:col-span-2" />
								</div>
							</form>
						{/each}
					{:else if currentSection === 'media'}
						{#each data.media as file}
							<div class="rounded-[1.5rem] border border-slate-200 bg-white p-5">
								<div class="grid gap-4 xl:grid-cols-[96px_minmax(0,1fr)_120px_110px_auto] xl:items-center">
									{#if isImage(file.url)}
										<img src={file.url} alt={file.name} class="h-24 w-24 rounded-2xl object-cover" />
									{:else}
										<div class="flex h-24 w-24 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
											<FileText size={34} />
										</div>
									{/if}
									<div class="min-w-0">
										<p class="truncate text-base font-black text-primary">{file.name}</p>
										<p class="mt-1 text-sm font-medium text-slate-500">{file.url}</p>
									</div>
									<p class="text-sm font-bold text-slate-500">{formatSize(file.size)}</p>
									<a href={file.url} target="_blank" class="text-sm font-black uppercase tracking-[0.18em] text-secondary">Open</a>
									<form use:enhance={enhanceMutation} method="POST" action="?/deleteMedia" class="flex justify-start xl:justify-end">
										<input type="hidden" name="fileName" value={file.name} />
										<input type="hidden" name="section" value="media" />
										<button class="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-3 text-sm font-black text-white hover:bg-rose-700">
											<Trash2 size={16} />
											Delete
										</button>
									</form>
								</div>
							</div>
						{/each}
					{:else if currentSection === 'departments'}
						{#each data.departments as department}
							<form use:enhance={enhanceMutation} method="POST" action="?/updateDepartment" class="rounded-[1.5rem] border border-slate-200 bg-white p-5">
								<input type="hidden" name="id" value={department.id} />
								<input type="hidden" name="section" value="departments" />
								<div class="mb-3 flex flex-wrap items-center justify-between gap-3">
									<div class="flex items-center gap-2">
										<span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-slate-600">
											{department.slug}
										</span>
										<span class="rounded-full bg-primary/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-primary">
											{data.facultyMembers.filter((member) => member.departmentId === department.id).length} teachers
										</span>
									</div>
									<div class="flex flex-wrap gap-2">
										<button class="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-black text-white hover:bg-secondary"><Pencil size={16} /> Save</button>
										<button formaction="?/deleteDepartment" class="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-3 text-sm font-black text-white hover:bg-rose-700"><Trash2 size={16} /> Delete</button>
									</div>
								</div>
								<div class="grid gap-3 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_220px]">
									<input name="name" value={department.name} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="urduName" value={department.urduName} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="slug" value={department.slug} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
								</div>
							</form>
						{/each}
					{:else if currentSection === 'faculty'}
						{#each data.facultyMembers as member}
							<form use:enhance={enhanceMutation} method="POST" action="?/updateFaculty" enctype="multipart/form-data" class="rounded-[1.5rem] border border-slate-200 bg-white p-5">
								<input type="hidden" name="id" value={member.id} />
								<input type="hidden" name="section" value="faculty" />
								<div class="mb-4 flex flex-wrap items-start justify-between gap-3">
									<div class="flex items-center gap-3">
										<div class="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-slate-100">
											{#if isImage(member.imageUrl)}
												<img src={member.imageUrl} alt={member.name} class="h-full w-full object-cover" />
											{:else}
												<School size={20} class="text-slate-500" />
											{/if}
										</div>
										<div>
											<p class="text-base font-black text-primary">{member.name}</p>
											<p class="mt-1 text-sm font-medium text-slate-500">{member.departmentName} • {member.subject}</p>
											<p class="mt-1 text-xs font-black uppercase tracking-[0.18em] text-secondary">
												{summarizeFacultyRoles(member)}
											</p>
										</div>
									</div>
									<div class="flex flex-wrap gap-2">
										<button class="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-black text-white hover:bg-secondary"><Pencil size={16} /> Save</button>
										<button formaction="?/deleteFaculty" class="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-3 text-sm font-black text-white hover:bg-rose-700"><Trash2 size={16} /> Delete</button>
									</div>
								</div>
								<div class="grid gap-3 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_220px_220px]">
									<input name="name" value={member.name} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="education" value={member.education} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<select name="departmentId" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold">
										{#each data.departments as department}
											<option value={department.id} selected={department.id === member.departmentId}>
												{department.name}
											</option>
										{/each}
									</select>
									<input name="subject" value={member.subject} list="faculty-subjects" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold" />
									<input name="imageUrl" value={member.imageUrl} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold xl:col-span-2" />
									<input name="imageFile" type="file" accept="image/*" class="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3 font-semibold" />
									<div class="flex flex-wrap gap-5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
										<label class="inline-flex items-center gap-3 text-sm font-black text-primary">
											<input name="isHod" type="checkbox" checked={member.isHod} class="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" />
											Is HOD
										</label>
										<label class="inline-flex items-center gap-3 text-sm font-black text-primary">
											<input name="isCoordinator" type="checkbox" checked={member.isCoordinator} class="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" />
											Is Coordinator
										</label>
										<label class="inline-flex items-center gap-3 text-sm font-black text-primary">
											<input name="isTeachingStaff" type="checkbox" checked={member.isTeachingStaff} class="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" />
											Teaching Staff
										</label>
									</div>
								</div>
							</form>
						{/each}
					{/if}
				</div>
			</div>
		{/if}
	</div>
</section>
