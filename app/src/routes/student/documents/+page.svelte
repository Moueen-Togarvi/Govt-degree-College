<script lang="ts">
	import type { PageData } from './$types';
	import { reveal } from '$lib/admin/motion';
	import FolderOpen from 'lucide-svelte/icons/folder-open';
	import FileText from 'lucide-svelte/icons/file-text';
	import ClipboardList from 'lucide-svelte/icons/clipboard-list';
	import FlaskConical from 'lucide-svelte/icons/flask-conical';
	import FileCode from 'lucide-svelte/icons/file-code';
	import BookOpen from 'lucide-svelte/icons/book-open';
	import File from 'lucide-svelte/icons/file';
	import User from 'lucide-svelte/icons/user';
	import CalendarDays from 'lucide-svelte/icons/calendar-days';
	import Download from 'lucide-svelte/icons/download';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head><title>Documents — Student Portal | GPGC</title></svelte:head>

<div class="adm-page" use:reveal={{ y: 12 }}>
	<div class="adm-head">
		<div>
			<h1 class="adm-title">
				<FolderOpen size={22} stroke-width={2} /> My Documents
			</h1>
			<p class="adm-sub">Notes, assignments, and resources for your courses</p>
		</div>
	</div>

	<div class="adm-card" use:reveal={{ delay: 100, y: 12 }}>
		{#if data.documents.length === 0}
			<div class="adm-empty">
				<div class="adm-empty__icon"><FolderOpen size={24} /></div>
				<h3>No Documents Available</h3>
				<p>There are no notes or study resources uploaded for your courses yet.</p>
			</div>
		{:else}
			<div class="adm-table-wrap">
				<table class="adm-table">
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
						{#each data.documents as doc, di}
							<tr use:reveal={{ delay: 40 * di, y: 8 }}>
								<td>
									<div class="doc-info-cell">
										<div class="doc-icon-wrap {doc.doc_type}">
											{#if doc.doc_type === 'note'}
												<FileText size={18} />
											{:else if doc.doc_type === 'assignment'}
												<ClipboardList size={18} />
											{:else if doc.doc_type === 'lab_manual'}
												<FlaskConical size={18} />
											{:else if doc.doc_type === 'past_paper'}
												<FileCode size={18} />
											{:else if doc.doc_type === 'syllabus'}
												<BookOpen size={18} />
											{:else}
												<File size={18} />
											{/if}
										</div>
										<div>
											<div class="doc-title">{doc.title}</div>
											<div class="doc-type-label">
												{doc.doc_type.replace('_', ' ').toUpperCase()}
											</div>
										</div>
									</div>
								</td>
								<td>
									{#if doc.course_code}
										<div class="course-cell">
											<span class="adm-code">{doc.course_code}</span>
											<span class="course-name">{doc.course_title}</span>
										</div>
									{:else}
										<span class="adm-muted italic">General / Department-wide</span>
									{/if}
								</td>
								<td>
									<span class="uploader-cell">
										<User size={13} class="mr-1" /> {doc.uploaded_by_name}
									</span>
								</td>
								<td>
									<span class="date-cell">
										<CalendarDays size={13} class="mr-1" />
										{new Date(doc.created_at).toLocaleDateString('en-PK', {
											day: 'numeric',
											month: 'short',
											year: 'numeric'
										})}
									</span>
								</td>
								<td class="text-right">
									<a href={doc.file_url} target="_blank" rel="noopener noreferrer" class="adm-btn adm-btn--ghost adm-btn--sm">
										<Download size={13} /> View / Download
									</a>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>
</div>

<style>
	.p-0 {
		padding: 0 !important;
	}
	.mr-1 {
		margin-right: 0.25rem;
		display: inline-block;
		vertical-align: middle;
	}
	.text-right {
		text-align: right;
	}
	.italic {
		font-style: italic;
	}

	.doc-info-cell {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}
	.doc-icon-wrap {
		width: 36px;
		height: 36px;
		border-radius: 8px;
		display: grid;
		place-items: center;
		flex-shrink: 0;
	}
	.doc-icon-wrap.note {
		background: #e6f2f0;
		color: #0d5d56;
	}
	.doc-icon-wrap.assignment {
		background: #fee2e2;
		color: #991b1b;
	}
	.doc-icon-wrap.lab_manual {
		background: #fef3c7;
		color: #92400e;
	}
	.doc-icon-wrap.past_paper {
		background: #dbeafe;
		color: #1d4ed8;
	}
	.doc-icon-wrap.syllabus {
		background: #f3e8ff;
		color: #6b21a8;
	}
	.doc-icon-wrap.other {
		background: #f1f5f9;
		color: #475569;
	}

	.doc-title {
		font-weight: 600;
		color: var(--adm-ink);
		font-size: 0.88rem;
	}
	.doc-type-label {
		font-size: 0.7rem;
		font-weight: 700;
		color: var(--adm-muted);
		margin-top: 0.1rem;
	}

	.course-cell {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		align-items: flex-start;
	}
	.course-name {
		font-size: 0.8rem;
		color: var(--adm-ink-2);
	}

	.uploader-cell,
	.date-cell {
		font-size: 0.82rem;
		color: var(--adm-ink-2);
		white-space: nowrap;
	}
</style>
