<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let showModal = $state(false);
	let submitting = $state(false);

	function docIcon(type: string) {
		switch(type) {
			case 'note': return '📝';
			case 'assignment': return '📋';
			case 'lab_manual': return '🧪';
			case 'past_paper': return '📄';
			case 'syllabus': return '📘';
			default: return '📁';
		}
	}
</script>

<svelte:head><title>Documents — Coordinator | GPGC</title></svelte:head>

<div class="page">
	<div class="page-header">
		<div>
			<h1 class="page-title">📁 Department Documents</h1>
			<p class="page-subtitle">Manage notes, assignments, and course resources</p>
		</div>
		<button class="btn-primary" onclick={() => showModal = true}>+ Upload Document</button>
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
					<th>Title & Type</th>
					<th>Course Assignment</th>
					<th>Uploaded By</th>
					<th>Date</th>
					<th class="text-right">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#if data.documents.length === 0}
					<tr><td colspan="5" class="text-center py-8">No documents uploaded yet.</td></tr>
				{:else}
					{#each data.documents as doc}
						<tr>
							<td>
								<div class="flex items-center gap-3">
									<span class="text-2xl">{docIcon(doc.doc_type)}</span>
									<div>
										<div class="font-semibold text-slate-900">{doc.title}</div>
										<div class="text-xs text-slate-500 uppercase tracking-wider">{doc.doc_type.replace('_', ' ')}</div>
									</div>
								</div>
							</td>
							<td>
								{#if doc.course_code}
									<div class="badge-blue font-mono mb-1">{doc.course_code}</div>
									<div class="text-sm text-slate-700">{doc.course_title} (Sem {doc.semester})</div>
								{:else}
									<span class="text-sm text-slate-400 italic">General / Department-wide</span>
								{/if}
							</td>
							<td><span class="text-sm">👤 {doc.uploaded_by_name}</span></td>
							<td><span class="text-sm text-slate-500">{new Date(doc.created_at).toLocaleDateString()}</span></td>
							<td class="text-right">
								<a href={doc.file_url} target="_blank" class="btn-icon text-blue-600 hover:bg-blue-50" title="View/Download">🔗</a>
								<form method="POST" action="?/delete" class="inline" use:enhance={() => {
									if (!confirm(`Delete document "${doc.title}"?`)) return () => {};
									return async ({ update }) => update();
								}}>
									<input type="hidden" name="id" value={doc.id} />
									<button type="submit" class="btn-icon text-red-500 hover:bg-red-50" title="Delete">🗑️</button>
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
				<h2 class="modal-title">Upload Document</h2>
				<button onclick={() => showModal = false} class="modal-close">✕</button>
			</div>
			<form method="POST" action="?/create" use:enhance={() => { submitting = true; return async ({ update }) => { submitting = false; await update(); showModal = false; }; }} class="modal-form">
				
				<div class="form-group">
					<label class="form-label" for="title">Document Title *</label>
					<input type="text" id="title" name="title" required class="form-input" placeholder="e.g. Intro to DB Notes Chap 1" />
				</div>

				<div class="form-row">
					<div class="form-group">
						<label class="form-label" for="doc_type">Document Type *</label>
						<select id="doc_type" name="doc_type" required class="form-input">
							<option value="note">Note / Slides</option>
							<option value="assignment">Assignment</option>
							<option value="lab_manual">Lab Manual</option>
							<option value="past_paper">Past Paper</option>
							<option value="syllabus">Syllabus</option>
							<option value="other">Other</option>
						</select>
					</div>
					<div class="form-group">
						<label class="form-label" for="file_url">File URL *</label>
						<input type="url" id="file_url" name="file_url" required class="form-input" placeholder="https://drive.google.com/..." />
					</div>
				</div>

				<div class="form-group">
					<label class="form-label" for="course_offering_id">Link to Course (Optional)</label>
					<select id="course_offering_id" name="course_offering_id" class="form-input">
						<option value="">— General / No Course —</option>
						{#each data.offerings as o}
							<option value={o.id}>{o.course_code} - {o.course_title} (Sem {o.semester})</option>
						{/each}
					</select>
					<p class="text-xs text-slate-500 mt-1">Linking to a course makes it visible on the student's dashboard for that specific course.</p>
				</div>

				<div class="modal-footer">
					<button type="button" onclick={() => showModal = false} class="btn-secondary">Cancel</button>
					<button type="submit" class="btn-primary" disabled={submitting}>
						{#if submitting}<span class="spinner"></span>{/if} Upload
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
	/* Shared CSS - Keep it identical to fyp table style */
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

	.badge-blue { display: inline-block; background: #eff6ff; color: #1d4ed8; padding: 0.2rem 0.4rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; }
	
	.inline { display: inline-block; }
	.flex { display: flex; } .items-center { align-items: center; } .gap-3 { gap: 0.75rem; }
	.font-semibold { font-weight: 600; } .font-mono { font-family: monospace; }
	.text-sm { font-size: 0.875rem; } .text-xs { font-size: 0.75rem; } .text-2xl { font-size: 1.5rem; }
	.uppercase { text-transform: uppercase; } .tracking-wider { letter-spacing: 0.05em; }
	.text-slate-900 { color: #0f172a; } .text-slate-700 { color: #334155; } .text-slate-500 { color: #64748b; } .text-slate-400 { color: #94a3b8; }
	.italic { font-style: italic; } .mb-1 { margin-bottom: 0.25rem; } .mt-1 { margin-top: 0.25rem; }
	.text-right { text-align: right; } .text-center { text-align: center; } .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
	.text-red-500 { color: #ef4444; } .text-blue-600 { color: #2563eb; }
	.hover\:bg-red-50:hover { background-color: #fef2f2; } .hover\:bg-blue-50:hover { background-color: #eff6ff; }
	
	.btn-primary { background: linear-gradient(135deg, #0284c7, #0369a1); color: white; border: none; border-radius: 10px; padding: 0.65rem 1.25rem; font-size: 0.9rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; }
	.btn-secondary { background: white; color: #475569; border: 1px solid #e2e8f0; border-radius: 10px; padding: 0.65rem 1.25rem; font-size: 0.9rem; font-weight: 600; cursor: pointer; }
	.btn-icon { background: none; border: 1px solid transparent; border-radius: 8px; padding: 0.4rem; cursor: pointer; font-size: 1rem; transition: all 0.2s; text-decoration: none; display: inline-flex; }

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
	.spinner { width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; }
	@keyframes spin { to { transform: rotate(360deg); } }
</style>
