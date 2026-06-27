<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import { reveal } from '$lib/admin/motion';

	import BookOpen from 'lucide-svelte/icons/book-open';
	import Users from 'lucide-svelte/icons/users';
	import Plus from 'lucide-svelte/icons/plus';
	import Pencil from 'lucide-svelte/icons/pencil';
	import Trash2 from 'lucide-svelte/icons/trash-2';
	import X from 'lucide-svelte/icons/x';
	import Check from 'lucide-svelte/icons/check';
	import TriangleAlert from 'lucide-svelte/icons/triangle-alert';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let activeTab = $state<'courses' | 'assignments'>('courses');
	let showCourseModal = $state(false);
	let showAssignModal = $state(false);
	let editingCourse = $state<(typeof data.courses)[0] | null>(null);
	let submitting = $state(false);

	function openCreate() {
		editingCourse = null;
		showCourseModal = true;
	}
	function openEdit(c: (typeof data.courses)[0]) {
		editingCourse = c;
		showCourseModal = true;
	}
	function closeCourseModal() {
		showCourseModal = false;
		editingCourse = null;
	}
</script>

<svelte:head><title>Courses — Coordinator | GPGC Portal</title></svelte:head>

<div class="adm-page">
	<!-- Header -->
	<div class="adm-head">
		<div>
			<h1 class="adm-title"><BookOpen size={22} stroke-width={1.75} /> Course Management</h1>
			<p class="adm-sub">
				{data.department?.name ?? ''} · {data.courses.length} courses, {data.offerings.length} assignments
			</p>
		</div>
		<div class="header-actions">
			{#if activeTab === 'courses'}
				<button class="adm-btn adm-btn--primary" onclick={openCreate}>
					<Plus size={16} stroke-width={1.75} /> Add Course
				</button>
			{:else}
				<button class="adm-btn adm-btn--primary" onclick={() => (showAssignModal = true)}>
					<Plus size={16} stroke-width={1.75} /> Assign Teacher
				</button>
			{/if}
		</div>
	</div>

	{#if form?.error}
		<div class="adm-alert adm-alert--error">
			<TriangleAlert size={18} stroke-width={2} />
			<span>{form.error}</span>
		</div>
	{/if}
	{#if form?.success}
		<div class="adm-alert adm-alert--success">
			<Check size={18} stroke-width={2} />
			<span>{form.message}</span>
		</div>
	{/if}

	<!-- Tabs -->
	<div class="tabs">
		<button
			class="tab {activeTab === 'courses' ? 'active' : ''}"
			onclick={() => (activeTab = 'courses')}
		>
			<BookOpen size={15} stroke-width={1.75} /> Courses ({data.courses.length})
		</button>
		<button
			class="tab {activeTab === 'assignments' ? 'active' : ''}"
			onclick={() => (activeTab = 'assignments')}
		>
			<Users size={15} stroke-width={1.75} /> Teacher Assignments ({data.offerings.length})
		</button>
	</div>

	<!-- Courses Tab -->
	{#if activeTab === 'courses'}
		<div class="adm-card" use:reveal={{ y: 16 }}>
			<div class="adm-table-wrap">
				<table class="adm-table">
					<thead>
						<tr>
							<th>#</th>
							<th>Code</th>
							<th>Title</th>
							<th>Credit Hours</th>
							<th>Description</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{#if data.courses.length === 0}
							<tr
								><td colspan="6">
									<div class="adm-empty">
										<div class="adm-empty__icon"><BookOpen size={24} stroke-width={1.75} /></div>
										<h3>No courses yet</h3>
										<p>Add your first course to get started.</p>
									</div>
								</td></tr
							>
						{:else}
							{#each data.courses as course, i}
								<tr>
									<td class="row-num">{i + 1}</td>
									<td><span class="adm-badge adm-badge--teal code-badge">{course.code}</span></td>
									<td class="is-strong">{course.title}</td>
									<td class="is-centered"
										><span class="adm-badge adm-badge--amber">{course.credit_hours} cr</span></td
									>
									<td class="is-muted">{course.description ?? '—'}</td>
									<td>
										<div class="adm-row-actions">
											<button
												class="adm-btn adm-btn--ghost adm-btn--sm"
												onclick={() => openEdit(course)}
												title="Edit"
												aria-label="Edit"
											>
												<Pencil size={15} stroke-width={1.75} />
											</button>
											<form
												method="POST"
												action="?/deleteCourse"
												use:enhance={() => {
													if (!confirm(`Delete course "${course.title}"?`)) return () => {};
													return async ({ update }) => update();
												}}
											>
												<input type="hidden" name="id" value={course.id} />
												<button
													class="adm-btn adm-btn--danger adm-btn--sm"
													type="submit"
													title="Delete"
													aria-label="Delete"
												>
													<Trash2 size={15} stroke-width={1.75} />
												</button>
											</form>
										</div>
									</td>
								</tr>
							{/each}
						{/if}
					</tbody>
				</table>
			</div>
		</div>
	{/if}

	<!-- Assignments Tab -->
	{#if activeTab === 'assignments'}
		<div class="adm-card" use:reveal={{ y: 16 }}>
			<div class="adm-table-wrap">
				<table class="adm-table">
					<thead>
						<tr>
							<th>#</th>
							<th>Course</th>
							<th>Teacher</th>
							<th>Semester</th>
							<th>Session</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{#if data.offerings.length === 0}
							<tr
								><td colspan="6">
									<div class="adm-empty">
										<div class="adm-empty__icon"><Users size={24} stroke-width={1.75} /></div>
										<h3>No assignments yet</h3>
										<p>Assign a teacher to a course to get started.</p>
									</div>
								</td></tr
							>
						{:else}
							{#each data.offerings as offering, i}
								<tr>
									<td class="row-num">{i + 1}</td>
									<td>
										<div class="course-cell">
											<span class="adm-badge adm-badge--teal code-badge"
												>{offering.course_code}</span
											>
											<span class="is-strong">{offering.course_title}</span>
										</div>
									</td>
									<td class="is-strong">{offering.teacher_name}</td>
									<td class="is-centered"
										><span class="adm-badge adm-badge--teal">Sem {offering.semester}</span></td
									>
									<td class="is-muted">{offering.session}</td>
									<td>
										<form
											method="POST"
											action="?/removeOffering"
											use:enhance={() => {
												if (!confirm('Remove this assignment?')) return () => {};
												return async ({ update }) => update();
											}}
										>
											<input type="hidden" name="id" value={offering.id} />
											<button
												class="adm-btn adm-btn--danger adm-btn--sm"
												type="submit"
												title="Remove"
												aria-label="Remove"
											>
												<Trash2 size={15} stroke-width={1.75} />
											</button>
										</form>
									</td>
								</tr>
							{/each}
						{/if}
					</tbody>
				</table>
			</div>
		</div>
	{/if}
</div>

<!-- Course Modal -->
{#if showCourseModal}
	<div class="adm-overlay" onclick={closeCourseModal} role="presentation" onkeydown={() => {}}>
		<div
			class="adm-modal"
			onclick={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
			tabindex="-1"
		>
			<div class="adm-modal__head">
				<h2 class="adm-modal__title">
					{#if editingCourse}
						<Pencil size={18} stroke-width={1.75} /> Edit Course
					{:else}
						<Plus size={18} stroke-width={1.75} /> Add Course
					{/if}
				</h2>
				<button onclick={closeCourseModal} class="adm-modal__close" aria-label="Close">
					<X size={18} stroke-width={2} />
				</button>
			</div>
			<form
				method="POST"
				action={editingCourse ? '?/updateCourse' : '?/createCourse'}
				use:enhance={() => {
					submitting = true;
					return async ({ update }) => {
						submitting = false;
						await update();
						closeCourseModal();
					};
				}}
				class="adm-modal__body adm-form"
			>
				{#if editingCourse}<input type="hidden" name="id" value={editingCourse.id} />{/if}

				<div class="adm-grid-2">
					<div class="adm-field">
						<label class="adm-label">Course Code *</label>
						<input
							type="text"
							name="code"
							required
							value={editingCourse?.code ?? ''}
							placeholder="CS-301"
							class="adm-input"
						/>
					</div>
					<div class="adm-field">
						<label class="adm-label">Credit Hours</label>
						<select name="credit_hours" class="adm-select">
							{#each [1, 2, 3, 4, 5, 6] as h}
								<option value={h} selected={(editingCourse?.credit_hours ?? 3) === h}>{h}</option>
							{/each}
						</select>
					</div>
				</div>
				<div class="adm-field">
					<label class="adm-label">Course Title *</label>
					<input
						type="text"
						name="title"
						required
						value={editingCourse?.title ?? ''}
						placeholder="Data Structures & Algorithms"
						class="adm-input"
					/>
				</div>
				<div class="adm-field">
					<label class="adm-label">Description</label>
					<textarea
						name="description"
						rows="3"
						placeholder="Optional description..."
						class="adm-textarea">{editingCourse?.description ?? ''}</textarea
					>
				</div>

				<div class="adm-modal__foot">
					<button type="button" onclick={closeCourseModal} class="adm-btn adm-btn--ghost"
						>Cancel</button
					>
					<button type="submit" class="adm-btn adm-btn--primary" disabled={submitting}>
						{#if submitting}<span class="adm-spin"></span>{/if}
						{editingCourse ? 'Save Changes' : 'Create Course'}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<!-- Assign Teacher Modal -->
{#if showAssignModal}
	<div
		class="adm-overlay"
		onclick={() => (showAssignModal = false)}
		role="presentation"
		onkeydown={() => {}}
	>
		<div
			class="adm-modal"
			onclick={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
			tabindex="-1"
		>
			<div class="adm-modal__head">
				<h2 class="adm-modal__title">
					<Users size={18} stroke-width={1.75} /> Assign Teacher to Course
				</h2>
				<button
					onclick={() => (showAssignModal = false)}
					class="adm-modal__close"
					aria-label="Close"
				>
					<X size={18} stroke-width={2} />
				</button>
			</div>
			<form
				method="POST"
				action="?/assignTeacher"
				use:enhance={() => {
					submitting = true;
					return async ({ update }) => {
						submitting = false;
						await update();
						showAssignModal = false;
					};
				}}
				class="adm-modal__body adm-form"
			>
				<div class="adm-field">
					<label class="adm-label">Course *</label>
					<select name="course_id" required class="adm-select">
						<option value="">— Select Course —</option>
						{#each data.courses as c}
							<option value={c.id}>{c.code} — {c.title}</option>
						{/each}
					</select>
				</div>
				<div class="adm-field">
					<label class="adm-label">Teacher *</label>
					<select name="teacher_id" required class="adm-select">
						<option value="">— Select Teacher —</option>
						{#each data.faculty as f}
							<option value={f.id}>{f.name} ({f.designation})</option>
						{/each}
					</select>
				</div>
				<div class="adm-grid-2">
					<div class="adm-field">
						<label class="adm-label">Semester *</label>
						<select name="semester" class="adm-select">
							{#each [1, 2, 3, 4, 5, 6, 7, 8] as s}
								<option value={s}>{s}</option>
							{/each}
						</select>
					</div>
					<div class="adm-field">
						<label class="adm-label">Session *</label>
						<input type="text" name="session" required placeholder="2024-2025" class="adm-input" />
					</div>
				</div>

				<div class="adm-modal__foot">
					<button
						type="button"
						onclick={() => (showAssignModal = false)}
						class="adm-btn adm-btn--ghost">Cancel</button
					>
					<button type="submit" class="adm-btn adm-btn--primary" disabled={submitting}>
						{#if submitting}<span class="adm-spin"></span>{/if}
						Assign Teacher
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
	.header-actions {
		display: flex;
		gap: 0.5rem;
	}

	/* Tabs */
	.tabs {
		display: inline-flex;
		gap: 0.25rem;
		background: #fff;
		padding: 0.35rem;
		border-radius: 12px;
		border: 1px solid var(--adm-line);
		width: fit-content;
		box-shadow: var(--adm-shadow);
	}
	.tab {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.5rem 1rem;
		border-radius: 8px;
		border: none;
		background: none;
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--adm-muted);
		cursor: pointer;
		font-family: inherit;
		transition:
			background 0.15s,
			color 0.15s,
			box-shadow 0.15s;
	}
	.tab:hover {
		color: var(--adm-ink);
		background: var(--adm-bg);
	}
	.tab.active {
		background: linear-gradient(135deg, #117d74, #0d5d56);
		color: #fff;
		box-shadow: 0 4px 14px rgba(13, 93, 86, 0.25);
	}
	.tab :global(svg) {
		width: 16px;
		height: 16px;
	}

	/* Table helpers */
	.row-num {
		color: var(--adm-muted);
		font-size: 0.8rem;
	}
	.is-centered {
		text-align: center;
	}
	.code-badge {
		font-family: ui-monospace, monospace;
		font-weight: 700;
		letter-spacing: 0.02em;
	}
	.course-cell {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
	}
</style>
