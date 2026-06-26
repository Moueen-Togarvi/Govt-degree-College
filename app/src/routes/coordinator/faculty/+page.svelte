<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let showModal = $state(false);
	let editingMember = $state<typeof data.faculty[0] | null>(null);
	let deletingId = $state<number | null>(null);
	let submitting = $state(false);
	let search = $state('');

	const filtered = $derived(
		search.trim()
			? data.faculty.filter(f =>
					f.name?.toLowerCase().includes(search.toLowerCase()) ||
					f.designation?.toLowerCase().includes(search.toLowerCase())
				)
			: data.faculty
	);

	function openCreate() { editingMember = null; showModal = true; }
	function openEdit(m: typeof data.faculty[0]) { editingMember = m; showModal = true; }
	function closeModal() { showModal = false; editingMember = null; }
</script>

<svelte:head><title>Faculty — Coordinator | GPGC Portal</title></svelte:head>

<div class="page">
	<!-- Header -->
	<div class="page-header">
		<div>
			<h1 class="page-title">👨‍🏫 Faculty Management</h1>
			<p class="page-subtitle">{data.department?.name ?? ''} · {data.faculty.length} members</p>
		</div>
		<button class="btn-primary" onclick={openCreate}>+ Add Faculty</button>
	</div>

	<!-- Flash Messages -->
	{#if form?.error}
		<div class="alert alert-error">❌ {form.error}</div>
	{/if}
	{#if form?.success}
		<div class="alert alert-success">✅ {form.message}</div>
	{/if}

	<!-- Search -->
	<div class="search-bar">
		<input type="text" placeholder="🔍 Search by name or designation..." bind:value={search} class="search-input" />
	</div>

	<!-- Table -->
	<div class="table-card">
		<table class="table">
			<thead>
				<tr>
					<th>#</th>
					<th>Name</th>
					<th>Designation</th>
					<th>Education</th>
					<th>Phone</th>
					<th>Role</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#if filtered.length === 0}
					<tr>
						<td colspan="7" class="empty-row">No faculty found. Click "Add Faculty" to get started.</td>
					</tr>
				{:else}
					{#each filtered as member, i}
						<tr>
							<td class="row-num">{i + 1}</td>
							<td>
								<div class="member-cell">
									<div class="member-avatar">{(member.name ?? '?').charAt(0).toUpperCase()}</div>
									<div>
										<div class="member-name">{member.name}</div>
										<div class="member-email">{member.email}</div>
									</div>
								</div>
							</td>
							<td>{member.designation}</td>
							<td class="text-sm text-muted">{member.education ?? '—'}</td>
							<td class="text-sm">{member.phone ?? '—'}</td>
							<td>
								{#if member.is_hod}
									<span class="badge badge-gold">HOD</span>
								{:else}
									<span class="badge badge-blue">Faculty</span>
								{/if}
							</td>
							<td>
								<div class="actions">
									<button class="btn-icon btn-edit" onclick={() => openEdit(member)} title="Edit">✏️</button>
									<form method="POST" action="?/delete" use:enhance={() => {
										if (!confirm(`Remove ${member.name}?`)) return () => {};
										return async ({ update }) => update();
									}}>
										<input type="hidden" name="profile_id" value={member.id} />
										<button class="btn-icon btn-delete" type="submit" title="Delete">🗑️</button>
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

<!-- Modal -->
{#if showModal}
	<div class="modal-overlay" onclick={closeModal} role="presentation" onkeydown={() => {}}>
		<div class="modal" onclick={e => e.stopPropagation()} role="dialog" aria-modal="true" tabindex="-1">
			<div class="modal-header">
				<h2 class="modal-title">{editingMember ? '✏️ Edit Faculty' : '+ Add Faculty'}</h2>
				<button onclick={closeModal} class="modal-close">✕</button>
			</div>

			<form method="POST" action={editingMember ? '?/update' : '?/create'}
				use:enhance={() => { submitting = true; return async ({ update }) => { submitting = false; await update(); closeModal(); }; }}
				class="modal-form">

				{#if editingMember}
					<input type="hidden" name="profile_id" value={editingMember.id} />
					<input type="hidden" name="user_id" value={editingMember.user_id} />
				{/if}

				<div class="form-row">
					<div class="form-group">
						<label class="form-label">Full Name *</label>
						<input type="text" name="name" required value={editingMember?.name ?? ''} placeholder="Dr. Muhammad Ali" class="form-input" />
					</div>
					{#if !editingMember}
						<div class="form-group">
							<label class="form-label">Email *</label>
							<input type="email" name="email" required placeholder="ali@gpgc.edu.pk" class="form-input" />
						</div>
					{/if}
				</div>

				{#if !editingMember}
					<div class="form-group">
						<label class="form-label">Password *</label>
						<input type="password" name="password" required minlength="6" placeholder="Min. 6 characters" class="form-input" />
					</div>
				{/if}

				<div class="form-row">
					<div class="form-group">
						<label class="form-label">Designation</label>
						<input type="text" name="designation" value={editingMember?.designation ?? 'Lecturer'} placeholder="Lecturer" class="form-input" />
					</div>
					<div class="form-group">
						<label class="form-label">Phone</label>
						<input type="text" name="phone" value={editingMember?.phone ?? ''} placeholder="03XX-XXXXXXX" class="form-input" />
					</div>
				</div>

				<div class="form-group">
					<label class="form-label">Education / Qualification</label>
					<input type="text" name="education" value={editingMember?.education ?? ''} placeholder="M.Phil Computer Science" class="form-input" />
				</div>

				<label class="checkbox-label">
					<input type="checkbox" name="is_hod" checked={editingMember?.is_hod ?? false} />
					<span>Mark as Head of Department (HOD)</span>
				</label>

				<div class="modal-footer">
					<button type="button" onclick={closeModal} class="btn-secondary">Cancel</button>
					<button type="submit" class="btn-primary" disabled={submitting}>
						{#if submitting}<span class="spinner"></span>{/if}
						{editingMember ? 'Save Changes' : 'Add Faculty'}
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

	/* Alerts */
	.alert { padding: 0.75rem 1rem; border-radius: 10px; font-size: 0.88rem; font-weight: 500; }
	.alert-error { background: #fee2e2; color: #dc2626; border: 1px solid #fecaca; }
	.alert-success { background: #d1fae5; color: #065f46; border: 1px solid #a7f3d0; }

	/* Search */
	.search-bar { }
	.search-input { width: 100%; padding: 0.65rem 1rem; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 0.88rem; font-family: inherit; outline: none; background: white; box-sizing: border-box; }
	.search-input:focus { border-color: #7dd3fc; box-shadow: 0 0 0 3px rgba(125,211,252,0.2); }

	/* Table */
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

	.member-cell { display: flex; align-items: center; gap: 0.75rem; }
	.member-avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #0ea5e9, #38bdf8); color: white; font-weight: 700; font-size: 0.88rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
	.member-name { font-size: 0.88rem; font-weight: 600; color: #0f172a; }
	.member-email { font-size: 0.73rem; color: #64748b; }

	.badge { padding: 0.2rem 0.6rem; border-radius: 999px; font-size: 0.68rem; font-weight: 700; text-transform: uppercase; }
	.badge-gold { background: #fef3c7; color: #d97706; border: 1px solid #fde68a; }
	.badge-blue { background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; }

	.actions { display: flex; gap: 0.4rem; }
	.btn-icon { background: none; border: 1px solid #e2e8f0; border-radius: 7px; padding: 0.35rem 0.5rem; cursor: pointer; font-size: 0.9rem; transition: all 0.2s; }
	.btn-edit:hover { background: #e0f2fe; border-color: #7dd3fc; }
	.btn-delete:hover { background: #fee2e2; border-color: #fca5a5; }

	/* Buttons */
	.btn-primary { background: linear-gradient(135deg, #0284c7, #0369a1); color: white; border: none; border-radius: 10px; padding: 0.6rem 1.25rem; font-size: 0.88rem; font-weight: 600; cursor: pointer; font-family: inherit; display: flex; align-items: center; gap: 0.4rem; transition: opacity 0.2s; }
	.btn-primary:hover { opacity: 0.9; }
	.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
	.btn-secondary { background: white; color: #475569; border: 1px solid #e2e8f0; border-radius: 10px; padding: 0.6rem 1.25rem; font-size: 0.88rem; font-weight: 600; cursor: pointer; font-family: inherit; }

	/* Modal */
	.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 200; padding: 1rem; }
	.modal { background: white; border-radius: 16px; width: 100%; max-width: 520px; max-height: 90vh; overflow-y: auto; box-shadow: 0 25px 60px rgba(0,0,0,0.2); }
	.modal-header { display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 1.5rem; border-bottom: 1px solid #e2e8f0; }
	.modal-title { font-size: 1.05rem; font-weight: 700; color: #0f172a; margin: 0; }
	.modal-close { background: none; border: none; font-size: 1rem; cursor: pointer; color: #94a3b8; padding: 0.25rem; border-radius: 5px; }
	.modal-close:hover { color: #0f172a; background: #f1f5f9; }
	.modal-form { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
	.modal-footer { display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 0.5rem; padding-top: 1rem; border-top: 1px solid #e2e8f0; }

	/* Form */
	.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
	.form-group { display: flex; flex-direction: column; gap: 0.4rem; }
	.form-label { font-size: 0.8rem; font-weight: 600; color: #374151; }
	.form-input { padding: 0.6rem 0.875rem; border: 1px solid #e2e8f0; border-radius: 9px; font-size: 0.88rem; font-family: inherit; outline: none; }
	.form-input:focus { border-color: #7dd3fc; box-shadow: 0 0 0 3px rgba(125,211,252,0.2); }
	.checkbox-label { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: #374151; cursor: pointer; }
	.spinner { width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; }
	@keyframes spin { to { transform: rotate(360deg); } }
</style>
