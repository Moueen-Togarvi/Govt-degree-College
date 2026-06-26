<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

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

<div class="page">
	<div class="page-header">
		<div>
			<h1 class="page-title">🎓 Student Management</h1>
			<p class="page-subtitle">{data.department?.name ?? ''} · {data.students.length} enrolled</p>
		<div class="header-actions">
			<button class="btn-secondary" onclick={() => showImportModal = true}>📥 Import CSV</button>
			<button class="btn-primary" onclick={openCreate}>+ Enroll Student</button>
		</div>
	</div>

	{#if form?.error}
		<div class="alert alert-error">❌ {form.error}</div>
	{/if}
	{#if form?.success}
		<div class="alert alert-success">✅ {form.message}</div>
	{/if}

	<!-- Filters -->
	<div class="filters">
		<input type="text" placeholder="🔍 Search by name or roll no..." bind:value={search} class="search-input" />
		<select bind:value={semesterFilter} class="select-input">
			<option value="">All Semesters</option>
			{#each semesters as s}
				<option value={s}>Semester {s}</option>
			{/each}
		</select>
	</div>

	<!-- Table -->
	<div class="table-card">
		<table class="table">
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
					<tr><td colspan="8" class="empty-row">No students found.</td></tr>
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
							<td><span class="sem-badge">Sem {student.semester}</span></td>
							<td class="text-sm text-muted">{student.session}</td>
							<td class="text-sm">{student.father_name ?? '—'}</td>
							<td class="text-sm">{student.phone ?? '—'}</td>
							<td>
								<div class="actions">
									<button class="btn-icon btn-edit" onclick={() => openEdit(student)}>✏️</button>
									<form method="POST" action="?/delete" use:enhance={() => {
										if (!confirm(`Remove ${student.name}?`)) return () => {};
										return async ({ update }) => update();
									}}>
										<input type="hidden" name="profile_id" value={student.id} />
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
</div>

<!-- Import CSV Modal -->
{#if showImportModal}
	<div class="modal-overlay" onclick={() => showImportModal = false} role="presentation" onkeydown={() => {}}>
		<div class="modal" onclick={e => e.stopPropagation()} role="dialog" aria-modal="true" tabindex="-1">
			<div class="modal-header">
				<h2 class="modal-title">📥 Import Students via CSV</h2>
				<button onclick={() => showImportModal = false} class="modal-close">✕</button>
			</div>

			<form method="POST" action="?/importCSV" enctype="multipart/form-data"
				use:enhance={() => { submitting = true; return async ({ update }) => { submitting = false; await update(); showImportModal = false; }; }}
				class="modal-form">
				
				<div class="form-group">
					<label class="form-label" for="csv_file">Upload CSV File</label>
					<input type="file" id="csv_file" name="csv_file" accept=".csv" required class="form-input" style="padding: 0.5rem;" />
					<p class="form-note mt-2">
						Ensure your CSV has these exact columns in the first row:<br>
						<code class="font-mono text-xs">Name, Email, RollNumber, Session, Semester, FatherName, Phone</code>
					</p>
				</div>

				<div class="modal-footer">
					<button type="button" onclick={() => showImportModal = false} class="btn-secondary">Cancel</button>
					<button type="submit" class="btn-primary" disabled={submitting}>
						{#if submitting}<span class="spinner"></span>{/if} Upload & Import
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<!-- Modal -->
{#if showModal}
	<div class="modal-overlay" onclick={closeModal} role="presentation" onkeydown={() => {}}>
		<div class="modal" onclick={e => e.stopPropagation()} role="dialog" aria-modal="true" tabindex="-1">
			<div class="modal-header">
				<h2 class="modal-title">{editingStudent ? '✏️ Edit Student' : '+ Enroll Student'}</h2>
				<button onclick={closeModal} class="modal-close">✕</button>
			</div>

			<form method="POST" action={editingStudent ? '?/update' : '?/create'}
				use:enhance={() => { submitting = true; return async ({ update }) => { submitting = false; await update(); closeModal(); }; }}
				class="modal-form">

				{#if editingStudent}
					<input type="hidden" name="profile_id" value={editingStudent.id} />
					<input type="hidden" name="user_id" value={editingStudent.user_id} />
				{/if}

				<div class="form-row">
					<div class="form-group">
						<label class="form-label">Full Name *</label>
						<input type="text" name="name" required value={editingStudent?.name ?? ''} placeholder="Muhammad Ali" class="form-input" />
					</div>
					{#if !editingStudent}
						<div class="form-group">
							<label class="form-label">Email *</label>
							<input type="email" name="email" required placeholder="ali@student.gpgc.edu.pk" class="form-input" />
						</div>
					{/if}
				</div>

				{#if !editingStudent}
					<div class="form-row">
						<div class="form-group">
							<label class="form-label">Roll Number *</label>
							<input type="text" name="roll_number" required placeholder="CS-2022-001" class="form-input" />
						</div>
						<div class="form-group">
							<label class="form-label">Session *</label>
							<input type="text" name="session" required placeholder="2022-2026" class="form-input" />
						</div>
					</div>
				{/if}

				<div class="form-row">
					<div class="form-group">
						<label class="form-label">Semester *</label>
						<select name="semester" class="form-input">
							{#each [1,2,3,4,5,6,7,8] as s}
								<option value={s} selected={editingStudent?.semester === s}>{s}</option>
							{/each}
						</select>
					</div>
					<div class="form-group">
						<label class="form-label">Father's Name</label>
						<input type="text" name="father_name" value={editingStudent?.father_name ?? ''} placeholder="Abdul Rahman" class="form-input" />
					</div>
				</div>

				<div class="form-group">
					<label class="form-label">Phone</label>
					<input type="text" name="phone" value={editingStudent?.phone ?? ''} placeholder="03XX-XXXXXXX" class="form-input" />
				</div>

				{#if !editingStudent}
					<p class="form-note">💡 Default password: <strong>Student@1234</strong> — student can change it later.</p>
				{/if}

				<div class="modal-footer">
					<button type="button" onclick={closeModal} class="btn-secondary">Cancel</button>
					<button type="submit" class="btn-primary" disabled={submitting}>
						{#if submitting}<span class="spinner"></span>{/if}
						{editingStudent ? 'Save Changes' : 'Enroll Student'}
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
	.alert { padding: 0.75rem 1rem; border-radius: 10px; font-size: 0.88rem; font-weight: 500; }
	.alert-error { background: #fee2e2; color: #dc2626; border: 1px solid #fecaca; }
	.alert-success { background: #d1fae5; color: #065f46; border: 1px solid #a7f3d0; }

	.filters { display: flex; gap: 0.75rem; }
	.search-input { flex: 1; padding: 0.65rem 1rem; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 0.88rem; font-family: inherit; outline: none; background: white; }
	.search-input:focus { border-color: #7dd3fc; box-shadow: 0 0 0 3px rgba(125,211,252,0.2); }
	.select-input { padding: 0.65rem 1rem; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 0.88rem; font-family: inherit; outline: none; background: white; cursor: pointer; }

	.table-card { background: white; border-radius: 14px; border: 1px solid #e2e8f0; overflow: hidden; }
	.table { width: 100%; border-collapse: collapse; }
	.table th { background: #f8fafc; padding: 0.75rem 1rem; text-align: left; font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #e2e8f0; }
	.table td { padding: 0.875rem 1rem; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
	.table tbody tr:last-child td { border-bottom: none; }
	.table tbody tr:hover { background: #f8fafc; }
	.row-num { color: #94a3b8; font-size: 0.8rem; }
	.empty-row { text-align: center; color: #94a3b8; padding: 2.5rem; font-size: 0.9rem; }
	.text-sm { font-size: 0.85rem; }
	.text-muted { color: #64748b; }

	.student-cell { display: flex; align-items: center; gap: 0.75rem; }
	.student-avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #8b5cf6, #a78bfa); color: white; font-weight: 700; font-size: 0.88rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
	.student-name { font-size: 0.88rem; font-weight: 600; color: #0f172a; }
	.student-email { font-size: 0.73rem; color: #64748b; }

	.roll-badge { background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; padding: 0.2rem 0.6rem; border-radius: 6px; font-size: 0.78rem; font-weight: 600; font-family: monospace; }
	.sem-badge { background: #f0f9ff; color: #075985; border: 1px solid #bae6fd; padding: 0.2rem 0.6rem; border-radius: 6px; font-size: 0.78rem; font-weight: 600; }

	.actions { display: flex; gap: 0.4rem; }
	.btn-icon { background: none; border: 1px solid #e2e8f0; border-radius: 7px; padding: 0.35rem 0.5rem; cursor: pointer; font-size: 0.9rem; transition: all 0.2s; }
	.btn-edit:hover { background: #e0f2fe; border-color: #7dd3fc; }
	.btn-delete:hover { background: #fee2e2; border-color: #fca5a5; }

	.btn-primary { background: linear-gradient(135deg, #7c3aed, #6d28d9); color: white; border: none; border-radius: 10px; padding: 0.6rem 1.25rem; font-size: 0.88rem; font-weight: 600; cursor: pointer; font-family: inherit; display: flex; align-items: center; gap: 0.4rem; }
	.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
	.btn-secondary { background: white; color: #475569; border: 1px solid #e2e8f0; border-radius: 10px; padding: 0.6rem 1.25rem; font-size: 0.88rem; font-weight: 600; cursor: pointer; font-family: inherit; }

	.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 200; padding: 1rem; }
	.modal { background: white; border-radius: 16px; width: 100%; max-width: 540px; max-height: 90vh; overflow-y: auto; box-shadow: 0 25px 60px rgba(0,0,0,0.2); }
	.modal-header { display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 1.5rem; border-bottom: 1px solid #e2e8f0; }
	.modal-title { font-size: 1.05rem; font-weight: 700; color: #0f172a; margin: 0; }
	.modal-close { background: none; border: none; font-size: 1rem; cursor: pointer; color: #94a3b8; padding: 0.25rem; border-radius: 5px; }
	.modal-form { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
	.modal-footer { display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 0.5rem; padding-top: 1rem; border-top: 1px solid #e2e8f0; }
	.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
	.form-group { display: flex; flex-direction: column; gap: 0.4rem; }
	.form-label { font-size: 0.8rem; font-weight: 600; color: #374151; }
	.form-input { padding: 0.6rem 0.875rem; border: 1px solid #e2e8f0; border-radius: 9px; font-size: 0.88rem; font-family: inherit; outline: none; }
	.form-input:focus { border-color: #c4b5fd; box-shadow: 0 0 0 3px rgba(196,181,253,0.2); }
	.form-note { font-size: 0.8rem; color: #64748b; background: #f8fafc; padding: 0.6rem 0.875rem; border-radius: 8px; border: 1px solid #e2e8f0; margin: 0; }
	.spinner { width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; }
	@keyframes spin { to { transform: rotate(360deg); } }
</style>
