<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let showModal = $state(false);
	let editingDept = $state<(typeof data.departments)[0] | null>(null);
	let deletingId = $state<number | null>(null);
	let submitting = $state(false);

	function openCreate() {
		editingDept = null;
		showModal = true;
	}

	function openEdit(dept: (typeof data.departments)[0]) {
		editingDept = { ...dept };
		showModal = true;
	}

	function closeModal() {
		showModal = false;
		editingDept = null;
	}

	$effect(() => {
		if (form?.success) {
			closeModal();
			deletingId = null;
		}
	});
</script>

<svelte:head>
	<title>Departments — Super Admin | GPGC Portal</title>
</svelte:head>

<div class="page">
	<div class="page-header">
		<div>
			<h1 class="page-title">🏛️ Departments</h1>
			<p class="page-subtitle">Manage all academic departments. Assign coordinators and configure settings.</p>
		</div>
		<button onclick={openCreate} class="btn-primary">
			+ Add Department
		</button>
	</div>

	{#if form?.error}
		<div class="alert alert-error">❌ {form.error}</div>
	{/if}
	{#if form?.success}
		<div class="alert alert-success">
			✅ Department {form.action === 'create' ? 'created' : form.action === 'update' ? 'updated' : 'deleted'} successfully.
		</div>
	{/if}

	<!-- Departments Table -->
	<div class="card">
		{#if data.departments && data.departments.length > 0}
			<table class="data-table">
				<thead>
					<tr>
						<th>#</th>
						<th>Department Name</th>
						<th>Urdu Name</th>
						<th>Coordinator</th>
						<th>Slug</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each data.departments as dept, i}
						<tr class={deletingId === dept.id ? 'deleting' : ''}>
							<td class="td-num">{i + 1}</td>
							<td class="td-name">
								<div class="dept-name-cell">
									<span class="dept-icon">🏛️</span>
									<div>
										<div class="dept-title">{dept.name}</div>
										{#if dept.description}
											<div class="dept-desc">{dept.description.slice(0, 60)}{dept.description.length > 60 ? '…' : ''}</div>
										{/if}
									</div>
								</div>
							</td>
							<td>{dept.urdu_name ?? '—'}</td>
							<td>
								{#if dept.coordinator_name}
									<span class="badge badge-green">{dept.coordinator_name}</span>
								{:else}
									<span class="badge badge-gray">Not assigned</span>
								{/if}
							</td>
							<td><code class="slug-code">{dept.slug}</code></td>
							<td>
								<div class="action-btns">
									<button onclick={() => openEdit(dept)} class="btn-edit">✏️ Edit</button>
									<form
										method="POST"
										action="?/delete"
										use:enhance={() => {
											deletingId = dept.id;
											return async ({ update }) => {
												await update();
											};
										}}
									>
										<input type="hidden" name="id" value={dept.id} />
										<button
											type="submit"
											class="btn-delete"
											onclick={(e) => {
												if (!confirm(`Delete "${dept.name}"? This cannot be undone.`)) e.preventDefault();
											}}
										>
											🗑️ Delete
										</button>
									</form>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<div class="empty-state">
				<span class="empty-icon">🏛️</span>
				<h3>No departments yet</h3>
				<p>Click "Add Department" to create your first academic department.</p>
				<button onclick={openCreate} class="btn-primary">+ Add Department</button>
			</div>
		{/if}
	</div>
</div>

<!-- Create / Edit Modal -->
{#if showModal}
	<div class="modal-overlay" onclick={closeModal} role="presentation">
		<div class="modal" onclick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
			<div class="modal-header">
				<h2 class="modal-title">{editingDept ? '✏️ Edit Department' : '+ New Department'}</h2>
				<button onclick={closeModal} class="modal-close">✕</button>
			</div>

			<form
				method="POST"
				action={editingDept ? '?/update' : '?/create'}
				use:enhance={() => {
					submitting = true;
					return async ({ update }) => {
						submitting = false;
						await update();
					};
				}}
				class="modal-form"
			>
				{#if editingDept}
					<input type="hidden" name="id" value={editingDept.id} />
				{/if}

				<div class="form-row">
					<div class="form-group">
						<label for="dept-name" class="form-label">Department Name *</label>
						<input
							id="dept-name"
							type="text"
							name="name"
							value={editingDept?.name ?? ''}
							placeholder="e.g. Computer Science"
							required
							class="form-input"
						/>
					</div>
					<div class="form-group">
						<label for="dept-urdu" class="form-label">Urdu Name</label>
						<input
							id="dept-urdu"
							type="text"
							name="urdu_name"
							value={editingDept?.urdu_name ?? ''}
							placeholder="e.g. کمپیوٹر سائنس"
							class="form-input"
							dir="rtl"
						/>
					</div>
				</div>

				<div class="form-group">
					<label for="dept-desc" class="form-label">Description</label>
					<textarea
						id="dept-desc"
						name="description"
						rows="3"
						placeholder="Brief description of the department..."
						class="form-input form-textarea"
					>{editingDept?.description ?? ''}</textarea>
				</div>

				<div class="form-group">
					<label for="dept-coordinator" class="form-label">Assign Coordinator</label>
					<select id="dept-coordinator" name="coordinator_id" class="form-input form-select">
						<option value="">— No Coordinator —</option>
						{#each data.coordinators as coord}
							<option value={coord.id} selected={editingDept?.coordinator_id === coord.id}>
								{coord.name} ({coord.email})
							</option>
						{/each}
					</select>
				</div>

				<div class="modal-footer">
					<button type="button" onclick={closeModal} class="btn-secondary">Cancel</button>
					<button type="submit" class="btn-primary" disabled={submitting}>
						{#if submitting}
							<span class="btn-spinner"></span>
						{/if}
						{editingDept ? 'Save Changes' : 'Create Department'}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.page-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
	}

	.page-title {
		font-size: 1.4rem;
		font-weight: 700;
		color: #0f172a;
		margin: 0 0 0.25rem;
	}

	.page-subtitle {
		font-size: 0.875rem;
		color: #64748b;
		margin: 0;
	}

	/* ─── Alerts ─── */
	.alert {
		padding: 0.85rem 1rem;
		border-radius: 10px;
		font-size: 0.875rem;
		font-weight: 500;
	}

	.alert-error { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }
	.alert-success { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }

	/* ─── Card ─── */
	.card {
		background: white;
		border-radius: 14px;
		border: 1px solid #e2e8f0;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
		overflow: hidden;
	}

	/* ─── Table ─── */
	.data-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.875rem;
	}

	.data-table th {
		background: #f8fafc;
		padding: 0.75rem 1rem;
		text-align: left;
		font-size: 0.75rem;
		font-weight: 700;
		color: #64748b;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		border-bottom: 1px solid #e2e8f0;
	}

	.data-table td {
		padding: 0.9rem 1rem;
		border-bottom: 1px solid #f1f5f9;
		color: #374151;
		vertical-align: middle;
	}

	.data-table tr:last-child td {
		border-bottom: none;
	}

	.data-table tr.deleting {
		opacity: 0.5;
	}

	.data-table tr:hover td {
		background: #fafafa;
	}

	.td-num { color: #94a3b8; font-size: 0.8rem; width: 40px; }

	.dept-name-cell {
		display: flex;
		align-items: flex-start;
		gap: 0.6rem;
	}

	.dept-icon { font-size: 1.2rem; margin-top: 1px; }

	.dept-title {
		font-weight: 600;
		color: #0f172a;
	}

	.dept-desc {
		font-size: 0.75rem;
		color: #94a3b8;
		margin-top: 2px;
	}

	.badge {
		padding: 0.25rem 0.6rem;
		border-radius: 999px;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.badge-green { background: #d1fae5; color: #065f46; }
	.badge-gray { background: #f1f5f9; color: #64748b; }

	.slug-code {
		font-family: monospace;
		font-size: 0.78rem;
		background: #f1f5f9;
		padding: 0.2rem 0.5rem;
		border-radius: 5px;
		color: #475569;
	}

	.action-btns {
		display: flex;
		gap: 0.4rem;
	}

	.btn-edit, .btn-delete {
		padding: 0.35rem 0.7rem;
		border-radius: 7px;
		font-size: 0.78rem;
		font-weight: 600;
		cursor: pointer;
		border: none;
		font-family: inherit;
		transition: opacity 0.2s;
	}

	.btn-edit {
		background: #ede9fe;
		color: #5b21b6;
	}

	.btn-delete {
		background: #fef2f2;
		color: #991b1b;
	}

	.btn-edit:hover, .btn-delete:hover {
		opacity: 0.8;
	}

	/* ─── Buttons ─── */
	.btn-primary {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.65rem 1.2rem;
		background: linear-gradient(135deg, #7c3aed, #6d28d9);
		color: white;
		border: none;
		border-radius: 10px;
		font-size: 0.875rem;
		font-weight: 600;
		font-family: inherit;
		cursor: pointer;
		transition: opacity 0.2s, transform 0.1s;
		text-decoration: none;
	}

	.btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
	.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

	.btn-secondary {
		padding: 0.65rem 1.2rem;
		background: white;
		border: 1.5px solid #e2e8f0;
		border-radius: 10px;
		font-size: 0.875rem;
		font-weight: 600;
		color: #374151;
		font-family: inherit;
		cursor: pointer;
		transition: background 0.2s;
	}

	.btn-secondary:hover { background: #f8fafc; }

	/* ─── Empty State ─── */
	.empty-state {
		text-align: center;
		padding: 3rem 1rem;
		color: #64748b;
	}

	.empty-icon {
		font-size: 3rem;
		display: block;
		margin-bottom: 0.75rem;
	}

	.empty-state h3 {
		font-size: 1.1rem;
		color: #0f172a;
		margin: 0 0 0.4rem;
	}

	.empty-state p {
		font-size: 0.875rem;
		margin: 0 0 1.25rem;
	}

	/* ─── Modal ─── */
	.modal-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(4px);
		z-index: 200;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}

	.modal {
		background: white;
		border-radius: 16px;
		width: 100%;
		max-width: 540px;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
		animation: modalIn 0.2s ease-out;
	}

	@keyframes modalIn {
		from { opacity: 0; transform: scale(0.95) translateY(-10px); }
		to { opacity: 1; transform: scale(1) translateY(0); }
	}

	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.25rem 1.5rem;
		border-bottom: 1px solid #e2e8f0;
	}

	.modal-title {
		font-size: 1.1rem;
		font-weight: 700;
		color: #0f172a;
		margin: 0;
	}

	.modal-close {
		background: none;
		border: none;
		font-size: 1rem;
		cursor: pointer;
		color: #64748b;
		padding: 0.25rem;
		border-radius: 6px;
		transition: background 0.2s;
	}

	.modal-close:hover { background: #f1f5f9; }

	.modal-form {
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.form-label {
		font-size: 0.82rem;
		font-weight: 600;
		color: #374151;
	}

	.form-input {
		padding: 0.65rem 0.9rem;
		border: 1.5px solid #e2e8f0;
		border-radius: 9px;
		font-size: 0.875rem;
		font-family: inherit;
		color: #0f172a;
		background: white;
		transition: border-color 0.2s;
	}

	.form-input:focus {
		outline: none;
		border-color: #7c3aed;
		box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
	}

	.form-textarea {
		resize: vertical;
		min-height: 80px;
	}

	.form-select {
		cursor: pointer;
	}

	.modal-footer {
		display: flex;
		justify-content: flex-end;
		gap: 0.75rem;
		padding-top: 0.5rem;
		border-top: 1px solid #f1f5f9;
	}

	.btn-spinner {
		width: 14px;
		height: 14px;
		border: 2px solid rgba(255, 255, 255, 0.4);
		border-top-color: white;
		border-radius: 50%;
		animation: spin 0.7s linear infinite;
	}

	@keyframes spin { to { transform: rotate(360deg); } }
</style>
