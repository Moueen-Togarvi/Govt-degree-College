<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let showModal = $state(false);
	let submitting = $state(false);

	function statusClass(status: string) {
		switch(status) {
			case 'Proposed': return 'bg-gray-100 text-gray-700 border-gray-200';
			case 'Approved': return 'bg-blue-100 text-blue-700 border-blue-200';
			case 'InProgress': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
			case 'Completed': return 'bg-green-100 text-green-700 border-green-200';
			case 'Cancelled': return 'bg-red-100 text-red-700 border-red-200';
			default: return 'bg-gray-100 text-gray-700';
		}
	}
</script>

<svelte:head><title>FYP Management — Coordinator | GPGC</title></svelte:head>

<div class="page">
	<div class="page-header">
		<div>
			<h1 class="page-title">🔬 Final Year Projects (FYP)</h1>
			<p class="page-subtitle">Manage departmental projects and assignments</p>
		</div>
		<button class="btn-primary" onclick={() => showModal = true}>+ New Project</button>
	</div>

	{#if form?.error}
		<div class="alert alert-error">❌ {form.error}</div>
	{/if}
	{#if form?.success}
		<div class="alert alert-success">✅ {form.message}</div>
	{/if}

	<div class="table-card">
		<table class="table">
			<thead>
				<tr>
					<th>Project Title</th>
					<th>Session</th>
					<th>Supervisor</th>
					<th>Members</th>
					<th>Status</th>
					<th class="text-right">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#if data.projects.length === 0}
					<tr><td colspan="6" class="text-center py-8">No FYP projects found. Click "+ New Project" to create one.</td></tr>
				{:else}
					{#each data.projects as proj}
						<tr>
							<td>
								<div class="font-semibold text-slate-900">{proj.title}</div>
								<div class="text-xs text-slate-500 truncate max-w-xs">{proj.description || 'No description'}</div>
							</td>
							<td><span class="badge">{proj.session}</span></td>
							<td>
								{#if proj.supervisor_name}
									<span class="text-sm font-medium">👨‍🏫 {proj.supervisor_name}</span>
								{:else}
									<span class="text-sm text-slate-400 italic">Unassigned</span>
								{/if}
							</td>
							<td>
								<div class="flex items-center gap-1">
									<span class="text-sm font-bold text-slate-700">{proj.member_count}</span>
									<span class="text-xs text-slate-500">students</span>
								</div>
							</td>
							<td>
								<form method="POST" action="?/updateStatus" use:enhance>
									<input type="hidden" name="id" value={proj.id} />
									<select name="status" class="status-select {statusClass(proj.status)}" onchange={(e) => e.currentTarget.form?.requestSubmit()}>
										{#each ['Proposed', 'Approved', 'InProgress', 'Completed', 'Cancelled'] as stat}
											<option value={stat} selected={proj.status === stat}>{stat}</option>
										{/each}
									</select>
								</form>
							</td>
							<td class="text-right">
								<!-- Manage Members Link (to be implemented) -->
								<form method="POST" action="?/delete" class="inline" use:enhance={() => {
									if (!confirm(`Delete project "${proj.title}"?`)) return () => {};
									return async ({ update }) => update();
								}}>
									<input type="hidden" name="id" value={proj.id} />
									<button type="submit" class="btn-icon text-red-500 hover:bg-red-50" title="Delete Project">🗑️</button>
								</form>
							</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
</div>

{#if showModal}
	<div class="modal-overlay" onclick={() => showModal = false} role="presentation" onkeydown={() => {}}>
		<div class="modal" onclick={e => e.stopPropagation()} role="dialog" aria-modal="true" tabindex="-1">
			<div class="modal-header">
				<h2 class="modal-title">Create FYP Project</h2>
				<button onclick={() => showModal = false} class="modal-close">✕</button>
			</div>
			<form method="POST" action="?/create" use:enhance={() => { submitting = true; return async ({ update }) => { submitting = false; await update(); showModal = false; }; }} class="modal-form">
				
				<div class="form-group">
					<label class="form-label" for="title">Project Title *</label>
					<input type="text" id="title" name="title" required class="form-input" placeholder="e.g. AI-based Attendance System" />
				</div>

				<div class="form-group">
					<label class="form-label" for="description">Description</label>
					<textarea id="description" name="description" rows="3" class="form-input form-textarea" placeholder="Brief overview of the project..."></textarea>
				</div>

				<div class="form-row">
					<div class="form-group">
						<label class="form-label" for="supervisor_id">Assign Supervisor</label>
						<select id="supervisor_id" name="supervisor_id" class="form-input">
							<option value="">— Unassigned —</option>
							{#each data.faculty as fac}
								<option value={fac.id}>{fac.name} ({fac.designation})</option>
							{/each}
						</select>
					</div>
					<div class="form-group">
						<label class="form-label" for="session">Academic Session *</label>
						<input type="text" id="session" name="session" required class="form-input" placeholder="e.g. 2022-2026" />
					</div>
				</div>

				<div class="modal-footer">
					<button type="button" onclick={() => showModal = false} class="btn-secondary">Cancel</button>
					<button type="submit" class="btn-primary" disabled={submitting}>
						{#if submitting}<span class="spinner"></span>{/if} Create Project
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
	/* Standard Portal CSS */
	.page { display: flex; flex-direction: column; gap: 1.5rem; }
	.page-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }
	.page-title { font-size: 1.5rem; font-weight: 700; color: #0f172a; margin: 0 0 0.25rem; }
	.page-subtitle { font-size: 0.85rem; color: #64748b; margin: 0; }
	
	.alert { padding: 0.75rem 1rem; border-radius: 10px; font-size: 0.88rem; font-weight: 500; }
	.alert-error { background: #fee2e2; color: #dc2626; border: 1px solid #fecaca; }
	.alert-success { background: #d1fae5; color: #065f46; border: 1px solid #a7f3d0; }

	.table-card { background: white; border-radius: 14px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05); overflow: hidden; }
	.table { width: 100%; border-collapse: collapse; }
	.table th { background: #f8fafc; padding: 0.85rem 1.25rem; text-align: left; font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #e2e8f0; }
	.table td { padding: 1rem 1.25rem; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
	.table tbody tr:last-child td { border-bottom: none; }
	.table tbody tr:hover { background: #f8fafc; }

	.badge { background: #f1f5f9; color: #475569; padding: 0.2rem 0.5rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600; border: 1px solid #e2e8f0; }
	
	.status-select { font-size: 0.75rem; font-weight: 600; padding: 0.25rem 0.5rem; border-radius: 6px; border-width: 1px; border-style: solid; outline: none; cursor: pointer; appearance: none; }
	
	.inline { display: inline-block; }
	.flex { display: flex; } .items-center { align-items: center; } .gap-1 { gap: 0.25rem; }
	.font-semibold { font-weight: 600; } .font-medium { font-weight: 500; } .font-bold { font-weight: 700; }
	.text-sm { font-size: 0.875rem; } .text-xs { font-size: 0.75rem; }
	.text-slate-900 { color: #0f172a; } .text-slate-700 { color: #334155; } .text-slate-500 { color: #64748b; } .text-slate-400 { color: #94a3b8; }
	.italic { font-style: italic; } .truncate { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } .max-w-xs { max-width: 20rem; }
	.text-right { text-align: right; } .text-center { text-align: center; } .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
	.text-red-500 { color: #ef4444; } .hover\:bg-red-50:hover { background-color: #fef2f2; }
	
	.bg-gray-100 { background-color: #f3f4f6; } .text-gray-700 { color: #374151; } .border-gray-200 { border-color: #e5e7eb; }
	.bg-blue-100 { background-color: #dbeafe; } .text-blue-700 { color: #1d4ed8; } .border-blue-200 { border-color: #bfdbfe; }
	.bg-yellow-100 { background-color: #fef9c3; } .text-yellow-700 { color: #a16207; } .border-yellow-200 { border-color: #fef08a; }
	.bg-green-100 { background-color: #dcfce3; } .text-green-700 { color: #15803d; } .border-green-200 { border-color: #bbf7d0; }
	.bg-red-100 { background-color: #fee2e2; } .text-red-700 { color: #b91c1c; } .border-red-200 { border-color: #fecaca; }

	.btn-primary { background: linear-gradient(135deg, #0284c7, #0369a1); color: white; border: none; border-radius: 10px; padding: 0.65rem 1.25rem; font-size: 0.9rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; }
	.btn-secondary { background: white; color: #475569; border: 1px solid #e2e8f0; border-radius: 10px; padding: 0.65rem 1.25rem; font-size: 0.9rem; font-weight: 600; cursor: pointer; }
	.btn-icon { background: none; border: 1px solid transparent; border-radius: 8px; padding: 0.4rem; cursor: pointer; font-size: 1rem; transition: all 0.2s; }

	/* Modal Styles */
	.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 200; padding: 1rem; }
	.modal { background: white; border-radius: 16px; width: 100%; max-width: 550px; box-shadow: 0 25px 60px rgba(0,0,0,0.2); }
	.modal-header { display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 1.5rem; border-bottom: 1px solid #e2e8f0; }
	.modal-title { font-size: 1.1rem; font-weight: 700; color: #0f172a; margin: 0; }
	.modal-close { background: none; border: none; font-size: 1.1rem; cursor: pointer; color: #94a3b8; }
	.modal-form { padding: 1.5rem; display: flex; flex-direction: column; gap: 1.15rem; }
	.modal-footer { display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 0.5rem; }
	
	.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
	.form-group { display: flex; flex-direction: column; gap: 0.4rem; }
	.form-label { font-size: 0.85rem; font-weight: 600; color: #374151; }
	.form-input { padding: 0.65rem 0.875rem; border: 1px solid #e2e8f0; border-radius: 9px; font-size: 0.9rem; font-family: inherit; outline: none; background: #fff; }
	.form-textarea { resize: vertical; min-height: 80px; }
	.spinner { width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; }
	@keyframes spin { to { transform: rotate(360deg); } }
</style>
