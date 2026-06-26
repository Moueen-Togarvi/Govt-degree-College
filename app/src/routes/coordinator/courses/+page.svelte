<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let activeTab = $state<'courses' | 'assignments'>('courses');
	let showCourseModal = $state(false);
	let showAssignModal = $state(false);
	let editingCourse = $state<typeof data.courses[0] | null>(null);
	let submitting = $state(false);

	function openCreate() { editingCourse = null; showCourseModal = true; }
	function openEdit(c: typeof data.courses[0]) { editingCourse = c; showCourseModal = true; }
	function closeCourseModal() { showCourseModal = false; editingCourse = null; }
</script>

<svelte:head><title>Courses — Coordinator | GPGC Portal</title></svelte:head>

<div class="page">
	<div class="page-header">
		<div>
			<h1 class="page-title">📚 Course Management</h1>
			<p class="page-subtitle">{data.department?.name ?? ''} · {data.courses.length} courses, {data.offerings.length} assignments</p>
		</div>
		<div class="header-actions">
			{#if activeTab === 'courses'}
				<button class="btn-primary" onclick={openCreate}>+ Add Course</button>
			{:else}
				<button class="btn-primary" onclick={() => (showAssignModal = true)}>+ Assign Teacher</button>
			{/if}
		</div>
	</div>

	{#if form?.error}
		<div class="alert alert-error">❌ {form.error}</div>
	{/if}
	{#if form?.success}
		<div class="alert alert-success">✅ {form.message}</div>
	{/if}

	<!-- Tabs -->
	<div class="tabs">
		<button class="tab {activeTab === 'courses' ? 'active' : ''}" onclick={() => (activeTab = 'courses')}>
			📚 Courses ({data.courses.length})
		</button>
		<button class="tab {activeTab === 'assignments' ? 'active' : ''}" onclick={() => (activeTab = 'assignments')}>
			👨‍🏫 Teacher Assignments ({data.offerings.length})
		</button>
	</div>

	<!-- Courses Tab -->
	{#if activeTab === 'courses'}
		<div class="table-card">
			<table class="table">
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
						<tr><td colspan="6" class="empty-row">No courses yet. Add your first course.</td></tr>
					{:else}
						{#each data.courses as course, i}
							<tr>
								<td class="row-num">{i + 1}</td>
								<td><span class="code-badge">{course.code}</span></td>
								<td class="course-title">{course.title}</td>
								<td class="text-center"><span class="credit-badge">{course.credit_hours} cr</span></td>
								<td class="text-sm text-muted">{course.description ?? '—'}</td>
								<td>
									<div class="actions">
										<button class="btn-icon btn-edit" onclick={() => openEdit(course)}>✏️</button>
										<form method="POST" action="?/deleteCourse" use:enhance={() => {
											if (!confirm(`Delete course "${course.title}"?`)) return () => {};
											return async ({ update }) => update();
										}}>
											<input type="hidden" name="id" value={course.id} />
											<button class="btn-icon btn-delete" type="submit">🗑️</button>
										</form>
									</div>
								</td>
							</tr>
						{/each}
					{/if}
				</tbody>
			</table>
		</div>
	{/if}

	<!-- Assignments Tab -->
	{#if activeTab === 'assignments'}
		<div class="table-card">
			<table class="table">
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
						<tr><td colspan="6" class="empty-row">No assignments yet.</td></tr>
					{:else}
						{#each data.offerings as offering, i}
							<tr>
								<td class="row-num">{i + 1}</td>
								<td>
									<div class="course-cell">
										<span class="code-badge">{offering.course_code}</span>
										<span class="course-title">{offering.course_title}</span>
									</div>
								</td>
								<td class="text-sm font-semibold">{offering.teacher_name}</td>
								<td class="text-center"><span class="sem-badge">Sem {offering.semester}</span></td>
								<td class="text-sm text-muted">{offering.session}</td>
								<td>
									<form method="POST" action="?/removeOffering" use:enhance={() => {
										if (!confirm('Remove this assignment?')) return () => {};
										return async ({ update }) => update();
									}}>
										<input type="hidden" name="id" value={offering.id} />
										<button class="btn-icon btn-delete" type="submit">🗑️</button>
									</form>
								</td>
							</tr>
						{/each}
					{/if}
				</tbody>
			</table>
		</div>
	{/if}
</div>

<!-- Course Modal -->
{#if showCourseModal}
	<div class="modal-overlay" onclick={closeCourseModal} role="presentation" onkeydown={() => {}}>
		<div class="modal" onclick={e => e.stopPropagation()} role="dialog" aria-modal="true" tabindex="-1">
			<div class="modal-header">
				<h2 class="modal-title">{editingCourse ? '✏️ Edit Course' : '+ Add Course'}</h2>
				<button onclick={closeCourseModal} class="modal-close">✕</button>
			</div>
			<form method="POST" action={editingCourse ? '?/updateCourse' : '?/createCourse'}
				use:enhance={() => { submitting = true; return async ({ update }) => { submitting = false; await update(); closeCourseModal(); }; }}
				class="modal-form">
				{#if editingCourse}<input type="hidden" name="id" value={editingCourse.id} />{/if}

				<div class="form-row">
					<div class="form-group">
						<label class="form-label">Course Code *</label>
						<input type="text" name="code" required value={editingCourse?.code ?? ''} placeholder="CS-301" class="form-input" />
					</div>
					<div class="form-group">
						<label class="form-label">Credit Hours</label>
						<select name="credit_hours" class="form-input">
							{#each [1,2,3,4,5,6] as h}
								<option value={h} selected={(editingCourse?.credit_hours ?? 3) === h}>{h}</option>
							{/each}
						</select>
					</div>
				</div>
				<div class="form-group">
					<label class="form-label">Course Title *</label>
					<input type="text" name="title" required value={editingCourse?.title ?? ''} placeholder="Data Structures & Algorithms" class="form-input" />
				</div>
				<div class="form-group">
					<label class="form-label">Description</label>
					<textarea name="description" rows="3" placeholder="Optional description..." class="form-input form-textarea">{editingCourse?.description ?? ''}</textarea>
				</div>

				<div class="modal-footer">
					<button type="button" onclick={closeCourseModal} class="btn-secondary">Cancel</button>
					<button type="submit" class="btn-primary" disabled={submitting}>
						{#if submitting}<span class="spinner"></span>{/if}
						{editingCourse ? 'Save Changes' : 'Create Course'}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<!-- Assign Teacher Modal -->
{#if showAssignModal}
	<div class="modal-overlay" onclick={() => (showAssignModal = false)} role="presentation" onkeydown={() => {}}>
		<div class="modal" onclick={e => e.stopPropagation()} role="dialog" aria-modal="true" tabindex="-1">
			<div class="modal-header">
				<h2 class="modal-title">👨‍🏫 Assign Teacher to Course</h2>
				<button onclick={() => (showAssignModal = false)} class="modal-close">✕</button>
			</div>
			<form method="POST" action="?/assignTeacher"
				use:enhance={() => { submitting = true; return async ({ update }) => { submitting = false; await update(); showAssignModal = false; }; }}
				class="modal-form">

				<div class="form-group">
					<label class="form-label">Course *</label>
					<select name="course_id" required class="form-input">
						<option value="">— Select Course —</option>
						{#each data.courses as c}
							<option value={c.id}>{c.code} — {c.title}</option>
						{/each}
					</select>
				</div>
				<div class="form-group">
					<label class="form-label">Teacher *</label>
					<select name="teacher_id" required class="form-input">
						<option value="">— Select Teacher —</option>
						{#each data.faculty as f}
							<option value={f.id}>{f.name} ({f.designation})</option>
						{/each}
					</select>
				</div>
				<div class="form-row">
					<div class="form-group">
						<label class="form-label">Semester *</label>
						<select name="semester" class="form-input">
							{#each [1,2,3,4,5,6,7,8] as s}
								<option value={s}>{s}</option>
							{/each}
						</select>
					</div>
					<div class="form-group">
						<label class="form-label">Session *</label>
						<input type="text" name="session" required placeholder="2024-2025" class="form-input" />
					</div>
				</div>

				<div class="modal-footer">
					<button type="button" onclick={() => (showAssignModal = false)} class="btn-secondary">Cancel</button>
					<button type="submit" class="btn-primary" disabled={submitting}>
						{#if submitting}<span class="spinner"></span>{/if}
						Assign Teacher
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
	.page { display: flex; flex-direction: column; gap: 1.25rem; }
	.page-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }
	.page-title { font-size: 1.5rem; font-weight: 700; color: #0f172a; margin: 0 0 0.25rem; }
	.page-subtitle { font-size: 0.85rem; color: #64748b; margin: 0; }
	.header-actions { display: flex; gap: 0.5rem; }
	.alert { padding: 0.75rem 1rem; border-radius: 10px; font-size: 0.88rem; font-weight: 500; }
	.alert-error { background: #fee2e2; color: #dc2626; border: 1px solid #fecaca; }
	.alert-success { background: #d1fae5; color: #065f46; border: 1px solid #a7f3d0; }

	/* Tabs */
	.tabs { display: flex; gap: 0.5rem; background: white; padding: 0.4rem; border-radius: 12px; border: 1px solid #e2e8f0; width: fit-content; }
	.tab { padding: 0.5rem 1rem; border-radius: 8px; border: none; background: none; font-size: 0.85rem; font-weight: 600; color: #64748b; cursor: pointer; font-family: inherit; transition: all 0.2s; }
	.tab.active { background: #0284c7; color: white; }

	/* Table */
	.table-card { background: white; border-radius: 14px; border: 1px solid #e2e8f0; overflow: hidden; }
	.table { width: 100%; border-collapse: collapse; }
	.table th { background: #f8fafc; padding: 0.75rem 1rem; text-align: left; font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #e2e8f0; }
	.table td { padding: 0.875rem 1rem; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
	.table tbody tr:last-child td { border-bottom: none; }
	.table tbody tr:hover { background: #f8fafc; }
	.text-center { text-align: center; }
	.row-num { color: #94a3b8; font-size: 0.8rem; }
	.empty-row { text-align: center; color: #94a3b8; padding: 2.5rem; font-size: 0.9rem; }
	.text-sm { font-size: 0.85rem; }
	.text-muted { color: #64748b; }
	.font-semibold { font-weight: 600; color: #0f172a; }

	.code-badge { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; padding: 0.2rem 0.6rem; border-radius: 6px; font-size: 0.78rem; font-weight: 700; font-family: monospace; }
	.credit-badge { background: #fefce8; color: #713f12; border: 1px solid #fde68a; padding: 0.2rem 0.6rem; border-radius: 6px; font-size: 0.78rem; font-weight: 600; }
	.sem-badge { background: #f0f9ff; color: #075985; border: 1px solid #bae6fd; padding: 0.2rem 0.6rem; border-radius: 6px; font-size: 0.78rem; font-weight: 600; }
	.course-title { font-size: 0.88rem; font-weight: 600; color: #0f172a; }
	.course-cell { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }

	.actions { display: flex; gap: 0.4rem; }
	.btn-icon { background: none; border: 1px solid #e2e8f0; border-radius: 7px; padding: 0.35rem 0.5rem; cursor: pointer; font-size: 0.9rem; transition: all 0.2s; }
	.btn-edit:hover { background: #e0f2fe; border-color: #7dd3fc; }
	.btn-delete:hover { background: #fee2e2; border-color: #fca5a5; }

	.btn-primary { background: linear-gradient(135deg, #0284c7, #0369a1); color: white; border: none; border-radius: 10px; padding: 0.6rem 1.25rem; font-size: 0.88rem; font-weight: 600; cursor: pointer; font-family: inherit; display: flex; align-items: center; gap: 0.4rem; }
	.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
	.btn-secondary { background: white; color: #475569; border: 1px solid #e2e8f0; border-radius: 10px; padding: 0.6rem 1.25rem; font-size: 0.88rem; font-weight: 600; cursor: pointer; font-family: inherit; }

	.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 200; padding: 1rem; }
	.modal { background: white; border-radius: 16px; width: 100%; max-width: 520px; max-height: 90vh; overflow-y: auto; box-shadow: 0 25px 60px rgba(0,0,0,0.2); }
	.modal-header { display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 1.5rem; border-bottom: 1px solid #e2e8f0; }
	.modal-title { font-size: 1.05rem; font-weight: 700; color: #0f172a; margin: 0; }
	.modal-close { background: none; border: none; font-size: 1rem; cursor: pointer; color: #94a3b8; padding: 0.25rem; border-radius: 5px; }
	.modal-form { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
	.modal-footer { display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 0.5rem; padding-top: 1rem; border-top: 1px solid #e2e8f0; }
	.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
	.form-group { display: flex; flex-direction: column; gap: 0.4rem; }
	.form-label { font-size: 0.8rem; font-weight: 600; color: #374151; }
	.form-input { padding: 0.6rem 0.875rem; border: 1px solid #e2e8f0; border-radius: 9px; font-size: 0.88rem; font-family: inherit; outline: none; }
	.form-input:focus { border-color: #7dd3fc; box-shadow: 0 0 0 3px rgba(125,211,252,0.2); }
	.form-textarea { resize: vertical; min-height: 80px; }
	.spinner { width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; }
	@keyframes spin { to { transform: rotate(360deg); } }
</style>
