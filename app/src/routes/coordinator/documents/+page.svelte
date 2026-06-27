<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import { reveal } from '$lib/admin/motion';

	import Folder from 'lucide-svelte/icons/folder';
	import FileText from 'lucide-svelte/icons/file-text';
	import Upload from 'lucide-svelte/icons/upload';
	import Trash2 from 'lucide-svelte/icons/trash-2';
	import Eye from 'lucide-svelte/icons/eye';
	import User from 'lucide-svelte/icons/user';
	import X from 'lucide-svelte/icons/x';
	import Check from 'lucide-svelte/icons/check';
	import TriangleAlert from 'lucide-svelte/icons/triangle-alert';
	import StickyNote from 'lucide-svelte/icons/sticky-note';
	import Clipboard from 'lucide-svelte/icons/clipboard';
	import FlaskConical from 'lucide-svelte/icons/flask-conical';
	import Book from 'lucide-svelte/icons/book';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let showModal = $state(false);
	let submitting = $state(false);

	function docIcon(type: string) {
		switch (type) {
			case 'note':
				return StickyNote;
			case 'assignment':
				return Clipboard;
			case 'lab_manual':
				return FlaskConical;
			case 'past_paper':
				return FileText;
			case 'syllabus':
				return Book;
			default:
				return Folder;
		}
	}
</script>

<svelte:head><title>Documents — Coordinator | GPGC Portal</title></svelte:head>

<div class="adm-page">
	<!-- Header -->
	<div class="adm-head">
		<div>
			<h1 class="adm-title"><Folder size={22} stroke-width={1.75} /> Department Documents</h1>
			<p class="adm-sub">Manage notes, assignments, and course resources</p>
		</div>
		<button class="adm-btn adm-btn--primary" onclick={() => (showModal = true)}>
			<Upload size={16} stroke-width={1.75} /> Upload Document
		</button>
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

	<!-- Documents Table -->
	<div class="adm-card" use:reveal={{ y: 16 }}>
		<div class="adm-table-wrap">
			<table class="adm-table">
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
						<tr>
							<td colspan="5">
								<div class="adm-empty">
									<div class="adm-empty__icon"><Folder size={24} stroke-width={1.75} /></div>
									<h3>No documents uploaded yet</h3>
									<p>Click "Upload Document" to add your first resource.</p>
								</div>
							</td>
						</tr>
					{:else}
						{#each data.documents as doc (doc.id)}
							{@const Icon = docIcon(doc.doc_type)}
							<tr>
								<td>
									<div class="doc-cell">
										<span class="doc-icon"><Icon size={18} stroke-width={1.75} /></span>
										<div>
											<div class="doc-title">{doc.title}</div>
											<div class="doc-type">{doc.doc_type.replace('_', ' ')}</div>
										</div>
									</div>
								</td>
								<td>
									{#if doc.course_code}
										<div class="course-line">
											<span class="adm-badge adm-badge--teal doc-code">{doc.course_code}</span>
											<span class="course-meta">{doc.course_title} (Sem {doc.semester})</span>
										</div>
									{:else}
										<span class="is-muted general-note">General / Department-wide</span>
									{/if}
								</td>
								<td>
									<span class="uploader">
										<User size={14} stroke-width={1.75} />
										{doc.uploaded_by_name}
									</span>
								</td>
								<td class="is-muted">{new Date(doc.created_at).toLocaleDateString()}</td>
								<td class="text-right">
									<div class="adm-row-actions doc-actions">
										<a
											href={doc.file_url}
											target="_blank"
											class="adm-btn adm-btn--ghost adm-btn--sm"
											title="View/Download"
											aria-label="View/Download"
										>
											<Eye size={15} stroke-width={1.75} />
										</a>
										<form
											method="POST"
											action="?/delete"
											use:enhance={() => {
												if (!confirm(`Delete document "${doc.title}"?`)) return () => {};
												return async ({ update }) => update();
											}}
										>
											<input type="hidden" name="id" value={doc.id} />
											<button
												type="submit"
												class="adm-btn adm-btn--danger adm-btn--sm"
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
</div>

<!-- Upload Modal -->
{#if showModal}
	<div
		class="adm-overlay"
		onclick={() => (showModal = false)}
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
				<h2 class="adm-modal__title"><Upload size={18} stroke-width={1.75} /> Upload Document</h2>
				<button onclick={() => (showModal = false)} class="adm-modal__close" aria-label="Close">
					<X size={18} stroke-width={2} />
				</button>
			</div>

			<form
				method="POST"
				action="?/create"
				use:enhance={() => {
					submitting = true;
					return async ({ update }) => {
						submitting = false;
						await update();
						showModal = false;
					};
				}}
				class="adm-modal__body adm-form"
			>
				<div class="adm-field">
					<label class="adm-label" for="title">Document Title *</label>
					<input
						type="text"
						id="title"
						name="title"
						required
						class="adm-input"
						placeholder="e.g. Intro to DB Notes Chap 1"
					/>
				</div>

				<div class="adm-grid-2">
					<div class="adm-field">
						<label class="adm-label" for="doc_type">Document Type *</label>
						<select id="doc_type" name="doc_type" required class="adm-select">
							<option value="note">Note / Slides</option>
							<option value="assignment">Assignment</option>
							<option value="lab_manual">Lab Manual</option>
							<option value="past_paper">Past Paper</option>
							<option value="syllabus">Syllabus</option>
							<option value="other">Other</option>
						</select>
					</div>
					<div class="adm-field">
						<label class="adm-label" for="file_url">File URL *</label>
						<input
							type="url"
							id="file_url"
							name="file_url"
							required
							class="adm-input"
							placeholder="https://drive.google.com/..."
						/>
					</div>
				</div>

				<div class="adm-field">
					<label class="adm-label" for="course_offering_id">Link to Course (Optional)</label>
					<select id="course_offering_id" name="course_offering_id" class="adm-select">
						<option value="">— General / No Course —</option>
						{#each data.offerings as o (o.id)}
							<option value={o.id}>{o.course_code} - {o.course_title} (Sem {o.semester})</option>
						{/each}
					</select>
					<p class="adm-hint">
						Linking to a course makes it visible on the student's dashboard for that specific
						course.
					</p>
				</div>

				<div class="modal-foot">
					<button type="button" onclick={() => (showModal = false)} class="adm-btn adm-btn--ghost">
						Cancel
					</button>
					<button type="submit" class="adm-btn adm-btn--primary" disabled={submitting}>
						{#if submitting}<span class="adm-spin"></span>{/if} Upload
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
	/* Table cell helpers */
	.text-right {
		text-align: right;
	}

	.doc-cell {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.doc-icon {
		display: grid;
		place-items: center;
		width: 38px;
		height: 38px;
		border-radius: 10px;
		background: #e6f2f0;
		color: #0d5d56;
		flex-shrink: 0;
	}

	.doc-title {
		font-size: 0.88rem;
		font-weight: 600;
		color: var(--adm-ink);
	}

	.doc-type {
		font-size: 0.72rem;
		color: var(--adm-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-top: 0.1rem;
	}

	.course-line {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.doc-code {
		align-self: flex-start;
		font-family: ui-monospace, monospace;
	}

	.course-meta {
		font-size: 0.78rem;
		color: var(--adm-ink-2);
	}

	.general-note {
		font-style: italic;
		font-size: 0.85rem;
	}

	.uploader {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-size: 0.85rem;
		color: var(--adm-ink-2);
	}

	.uploader :global(svg) {
		color: var(--adm-muted);
	}

	.doc-actions {
		justify-content: flex-end;
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
</style>
