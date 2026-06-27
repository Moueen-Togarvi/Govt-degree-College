<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import { reveal } from '$lib/admin/motion';

	import GraduationCap from 'lucide-svelte/icons/graduation-cap';
	import UserPlus from 'lucide-svelte/icons/user-plus';
	import Search from 'lucide-svelte/icons/search';
	import Pencil from 'lucide-svelte/icons/pencil';
	import Trash2 from 'lucide-svelte/icons/trash-2';
	import X from 'lucide-svelte/icons/x';
	import Check from 'lucide-svelte/icons/check';
	import TriangleAlert from 'lucide-svelte/icons/triangle-alert';
	import Upload from 'lucide-svelte/icons/upload';
	import Info from 'lucide-svelte/icons/info';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let showModal = $state(false);
	let showImportModal = $state(false);
	let editingStudent = $state<typeof data.students[0] | null>(null);
	let submitting = $state(false);
	let search = $state('');
	let semesterFilter = $state('');

	const filtered = $derived(
		data.students.filter(s => {
			const matchSearch = !search.trim() ||
				s.name?.toLowerCase().includes(search.toLowerCase()) ||
				s.roll_number?.toLowerCase().includes(search.toLowerCase());
			const matchSem = !semesterFilter || s.semester === parseInt(semesterFilter);
			return matchSearch && matchSem;
		})
	);

	// Group by semester for display
	const semesters = [1,2,3,4,5,6,7,8];

	function openCreate() { editingStudent = null; showModal = true; }
	function openEdit(s: typeof data.students[0]) { editingStudent = s; showModal = true; }
	function closeModal() { showModal = false; editingStudent = null; }
</script>

<svelte:head><title>Students — Coordinator | GPGC Portal</title></svelte:head>

<div class="adm-page">
	<!-- Header -->
	<div class="adm-head">
		<div>
			<h1 class="adm-title"><GraduationCap size={22} stroke-width={1.75} /> Student Management</h1>
			<p class="adm-sub">{data.department?.name ?? ''} · {data.students.length} enrolled</p>
		</div>
		<div class="head-actions">
			<button class="adm-btn adm-btn--ghost" onclick={() => showImportModal = true}>
				<Upload size={16} stroke-width={1.75} /> Import CSV
			</button>
			<button class="adm-btn adm-btn--primary" onclick={openCreate}>
				<UserPlus size={16} stroke-width={1.75} /> Enroll Student
			</button>
		</div>
	</div>

	<!-- Flash Messages -->
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

	<!-- Filters -->
	<div class="filters">
		<div class="search-bar">
			<Search size={16} stroke-width={1.75} class="search-icon" />
			<input
				type="text"
				placeholder="Search by name or roll no..."
				bind:value={search}
				class="adm-input search-input"
			/>
		</div>
		<select bind:value={semesterFilter} class="adm-select sem-select">
			<option value="">All Semesters</option>
			{#each semesters as s}
				<option value={s}>Semester {s}</option>
			{/each}
		</select>
	</div>

	<!-- Table -->
	<div class="adm-card" use:reveal={{ y: 16 }}>
		<div class="adm-table-wrap">
			<table class="adm-table">
				<thead>
					<tr>
						<th>#</th>
						<th>Student</th>
						<th>Roll No.</th>
						<th>Semester</th>
						<th>Session</th>
						<th>Father's Name</th>
						<th>Phone</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{#if filtered.length === 0}
						<tr>
							<td colspan="8">
								<div class="adm-empty">
									<div class="adm-empty__icon"><GraduationCap size={24} stroke-width={1.75} /></div>
									<h3>No students found</h3>
									<p>Click "Enroll Student" to get started.</p>
								</div>
							</td>
						</tr>
					{:else}
						{#each filtered as student, i}
							<tr>
								<td class="row-num">{i + 1}</td>
								<td>
									<div class="student-cell">
										<div class="student-avatar">{(student.name ?? '?').charAt(0).toUpperCase()}</div>
										<div>
											<div class="student-name">{student.name}</div>
											<div class="student-email">{student.email}</div>
										</div>
									</div>
								</td>
								<td><span class="roll-badge">{student.roll_number}</span></td>
								<td><span class="adm-badge adm-badge--teal">Sem {student.semester}</span></td>
								<td class="is-muted">{student.session}</td>
								<td class="is-muted">{student.father_name ?? '—'}</td>
								<td class="is-muted">{student.phone ?? '—'}</td>
								<td>
									<div class="adm-row-actions">
										<button class="adm-btn adm-btn--ghost adm-btn--sm" onclick={() => openEdit(student)} title="Edit" aria-label="Edit">
											<Pencil size={15} stroke-width={1.75} />
										</button>
										<form method="POST" action="?/delete" use:enhance={() => {
											if (!confirm(`Remove ${student.name}?`)) return () => {};
											return async ({ update }) => update();
										}}>
											<input type="hidden" name="profile_id" value={student.id} />
											<button class="adm-btn adm-btn--danger adm-btn--sm" type="submit" title="Delete" aria-label="Delete">
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
</div>

<!-- Import CSV Modal -->
{#if showImportModal}
	<div class="adm-overlay" onclick={() => showImportModal = false} role="presentation" onkeydown={() => {}}>
		<div class="adm-modal" onclick={e => e.stopPropagation()} role="dialog" aria-modal="true" tabindex="-1">
			<div class="adm-modal__head">
				<h2 class="adm-modal__title"><Upload size={18} stroke-width={1.75} /> Import Students via CSV</h2>
				<button onclick={() => showImportModal = false} class="adm-modal__close" aria-label="Close">
					<X size={18} stroke-width={2} />
				</button>
			</div>

			<form method="POST" action="?/importCSV" enctype="multipart/form-data"
				use:enhance={() => { submitting = true; return async ({ update }) => { submitting = false; await update(); showImportModal = false; }; }}
				class="adm-modal__body adm-form">

				<div class="adm-field">
					<label class="adm-label" for="csv_file">Upload CSV File</label>
					<input type="file" id="csv_file" name="csv_file" accept=".csv" required class="adm-input" style="padding: 0.5rem;" />
					<p class="note">
						<Info size={15} stroke-width={1.75} />
						<span>
							Ensure your CSV has these exact columns in the first row:<br>
							<code class="code-chip">Name, Email, RollNumber, Session, Semester, FatherName, Phone</code>
						</span>
					</p>
				</div>

				<div class="modal-foot">
					<button type="button" onclick={() => showImportModal = false} class="adm-btn adm-btn--ghost">Cancel</button>
					<button type="submit" class="adm-btn adm-btn--primary" disabled={submitting}>
						{#if submitting}<span class="adm-spin"></span>{/if} Upload & Import
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<!-- Modal -->
{#if showModal}
	<div class="adm-overlay" onclick={closeModal} role="presentation" onkeydown={() => {}}>
		<div class="adm-modal" onclick={e => e.stopPropagation()} role="dialog" aria-modal="true" tabindex="-1">
			<div class="adm-modal__head">
				<h2 class="adm-modal__title">
					{#if editingStudent}
						<Pencil size={18} stroke-width={1.75} /> Edit Student
					{:else}
						<UserPlus size={18} stroke-width={1.75} /> Enroll Student
					{/if}
				</h2>
				<button onclick={closeModal} class="adm-modal__close" aria-label="Close">
					<X size={18} stroke-width={2} />
				</button>
			</div>

			<form method="POST" action={editingStudent ? '?/update' : '?/create'}
				use:enhance={() => { submitting = true; return async ({ update }) => { submitting = false; await update(); closeModal(); }; }}
				class="adm-modal__body adm-form">

				{#if editingStudent}
					<input type="hidden" name="profile_id" value={editingStudent.id} />
					<input type="hidden" name="user_id" value={editingStudent.user_id} />
				{/if}

				<div class="adm-grid-2">
					<div class="adm-field">
						<label class="adm-label">Full Name *</label>
						<input type="text" name="name" required value={editingStudent?.name ?? ''} placeholder="Muhammad Ali" class="adm-input" />
					</div>
					{#if !editingStudent}
						<div class="adm-field">
							<label class="adm-label">Email *</label>
							<input type="email" name="email" required placeholder="ali@student.gpgc.edu.pk" class="adm-input" />
						</div>
					{/if}
				</div>

				{#if !editingStudent}
					<div class="adm-grid-2">
						<div class="adm-field">
							<label class="adm-label">Roll Number *</label>
							<input type="text" name="roll_number" required placeholder="CS-2022-001" class="adm-input" />
						</div>
						<div class="adm-field">
							<label class="adm-label">Session *</label>
							<input type="text" name="session" required placeholder="2022-2026" class="adm-input" />
						</div>
					</div>
				{/if}

				<div class="adm-grid-2">
					<div class="adm-field">
						<label class="adm-label">Semester *</label>
						<select name="semester" class="adm-select">
							{#each [1,2,3,4,5,6,7,8] as s}
								<option value={s} selected={editingStudent?.semester === s}>{s}</option>
							{/each}
						</select>
					</div>
					<div class="adm-field">
						<label class="adm-label">Father's Name</label>
						<input type="text" name="father_name" value={editingStudent?.father_name ?? ''} placeholder="Abdul Rahman" class="adm-input" />
					</div>
				</div>

				<div class="adm-field">
					<label class="adm-label">Phone</label>
					<input type="text" name="phone" value={editingStudent?.phone ?? ''} placeholder="03XX-XXXXXXX" class="adm-input" />
				</div>

				{#if !editingStudent}
					<p class="note">
						<Info size={15} stroke-width={1.75} />
						<span>Default password: <strong>Student@1234</strong> — student can change it later.</span>
					</p>
				{/if}

				<div class="modal-foot">
					<button type="button" onclick={closeModal} class="adm-btn adm-btn--ghost">Cancel</button>
					<button type="submit" class="adm-btn adm-btn--primary" disabled={submitting}>
						{#if submitting}<span class="adm-spin"></span>{/if}
						{editingStudent ? 'Save Changes' : 'Enroll Student'}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
	/* Header actions */
	.head-actions {
		display: flex;
		gap: 0.6rem;
		flex-wrap: wrap;
	}

	/* Filters */
	.filters {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
	}
	.search-bar {
		position: relative;
		flex: 1;
		min-width: 220px;
	}
	.search-input {
		padding-left: 2.5rem;
	}
	.search-bar :global(.search-icon) {
		position: absolute;
		left: 0.85rem;
		top: 50%;
		transform: translateY(-50%);
		color: var(--adm-muted);
		pointer-events: none;
	}
	.sem-select {
		width: auto;
		min-width: 180px;
		cursor: pointer;
	}

	/* Table cells */
	.row-num {
		color: var(--adm-muted);
		font-size: 0.8rem;
	}

	.student-cell {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}
	.student-avatar {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: linear-gradient(135deg, #f7941d, #d97706);
		color: #fff;
		font-weight: 700;
		font-size: 0.88rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}
	.student-name {
		font-size: 0.88rem;
		font-weight: 600;
		color: var(--adm-ink);
	}
	.student-email {
		font-size: 0.73rem;
		color: var(--adm-muted);
	}

	.roll-badge {
		background: #e6f2f0;
		color: #0a4a44;
		border: 1px solid #cdeae6;
		padding: 0.2rem 0.6rem;
		border-radius: 6px;
		font-size: 0.78rem;
		font-weight: 600;
		font-family: ui-monospace, monospace;
		white-space: nowrap;
	}

	/* Info note */
	.note {
		display: flex;
		gap: 0.5rem;
		align-items: flex-start;
		font-size: 0.8rem;
		color: var(--adm-ink-2);
		background: var(--adm-bg);
		padding: 0.65rem 0.875rem;
		border-radius: 9px;
		border: 1px solid var(--adm-line);
		margin: 0;
		line-height: 1.5;
	}
	.note :global(svg) {
		color: var(--adm-accent);
		flex-shrink: 0;
		margin-top: 1px;
	}
	.code-chip {
		font-family: ui-monospace, monospace;
		font-size: 0.76rem;
		background: #e6f2f0;
		color: #0a4a44;
		padding: 0.15rem 0.4rem;
		border-radius: 5px;
	}

	/* Modal footer */
	.modal-foot {
		display: flex;
		justify-content: flex-end;
		gap: 0.75rem;
		margin-top: 0.5rem;
		padding-top: 1rem;
		border-top: 1px solid var(--adm-line-soft);
	}

	@media (max-width: 560px) {
		.head-actions {
			width: 100%;
		}
		.head-actions .adm-btn {
			flex: 1;
		}
	}
</style>
