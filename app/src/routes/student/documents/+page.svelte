<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

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

<svelte:head><title>Documents — Student Portal | GPGC</title></svelte:head>

<div class="page">
	<div class="page-header">
		<div>
			<h1 class="page-title">📁 My Documents</h1>
			<p class="page-subtitle">Notes, assignments, and resources for your courses</p>
		</div>
	</div>

	<div class="table-card">
		<table class="table">
			<thead>
				<tr>
					<th>Title & Type</th>
					<th>Course Assignment</th>
					<th>Uploaded By</th>
					<th>Date</th>
					<th class="text-right">Action</th>
				</tr>
			</thead>
			<tbody>
				{#if data.documents.length === 0}
					<tr><td colspan="5" class="text-center py-8">No documents available.</td></tr>
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
									<div class="text-sm text-slate-700">{doc.course_title}</div>
								{:else}
									<span class="text-sm text-slate-400 italic">General / Department-wide</span>
								{/if}
							</td>
							<td><span class="text-sm">👤 {doc.uploaded_by_name}</span></td>
							<td><span class="text-sm text-slate-500">{new Date(doc.created_at).toLocaleDateString()}</span></td>
							<td class="text-right">
								<a href={doc.file_url} target="_blank" class="btn-primary-sm">View / Download</a>
							</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
</div>

<style>
	/* Standard Portal CSS - Identical to coordinator documents */
	.page { display: flex; flex-direction: column; gap: 1.5rem; }
	.page-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }
	.page-title { font-size: 1.5rem; font-weight: 700; color: #0f172a; margin: 0 0 0.25rem; }
	.page-subtitle { font-size: 0.85rem; color: #64748b; margin: 0; }

	.table-card { background: white; border-radius: 14px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05); overflow: hidden; }
	.table { width: 100%; border-collapse: collapse; }
	.table th { background: #f8fafc; padding: 0.85rem 1.25rem; text-align: left; font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #e2e8f0; }
	.table td { padding: 1rem 1.25rem; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
	.table tbody tr:last-child td { border-bottom: none; }
	.table tbody tr:hover { background: #f8fafc; }

	.badge-blue { display: inline-block; background: #eff6ff; color: #1d4ed8; padding: 0.2rem 0.4rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; }
	
	.flex { display: flex; } .items-center { align-items: center; } .gap-3 { gap: 0.75rem; }
	.font-semibold { font-weight: 600; } .font-mono { font-family: monospace; }
	.text-sm { font-size: 0.875rem; } .text-xs { font-size: 0.75rem; } .text-2xl { font-size: 1.5rem; }
	.uppercase { text-transform: uppercase; } .tracking-wider { letter-spacing: 0.05em; }
	.text-slate-900 { color: #0f172a; } .text-slate-700 { color: #334155; } .text-slate-500 { color: #64748b; } .text-slate-400 { color: #94a3b8; }
	.italic { font-style: italic; } .mb-1 { margin-bottom: 0.25rem; }
	.text-right { text-align: right; } .text-center { text-align: center; } .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
	
	.btn-primary-sm { background: linear-gradient(135deg, #1e1b4b, #4c1d95); color: white; border: none; border-radius: 8px; padding: 0.5rem 1rem; font-size: 0.8rem; font-weight: 600; cursor: pointer; text-decoration: none; display: inline-block; transition: all 0.2s; }
	.btn-primary-sm:hover { transform: translateY(-1px); box-shadow: 0 4px 6px rgba(76,29,149,0.2); }
</style>
