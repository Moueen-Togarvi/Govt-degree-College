<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let showModal = $state(false);
	let editing = $state<(typeof data.results)[0] | null>(null);
	let deletingId = $state<number | null>(null);
	let submitting = $state(false);

	const types = ['Annual', 'Supplementary', 'Semester', 'Entry Test', 'Other'];

	function openCreate() {
		editing = null;
		showModal = true;
	}
	function openEdit(item: (typeof data.results)[0]) {
		editing = { ...item };
		showModal = true;
	}
	function closeModal() {
		showModal = false;
		editing = null;
	}
	$effect(() => {
		if (form?.success) {
			closeModal();
			deletingId = null;
		}
	});
</script>

<svelte:head><title>Results — Super Admin | GPGC Portal</title></svelte:head>

<div class="adm-page">
	<div class="adm-head">
		<div>
			<h1 class="adm-title">🏆 Exam Results</h1>
			<p class="adm-sub">Publish exam result links shown on the public results page.</p>
		</div>
		<button class="adm-btn adm-btn--primary" onclick={openCreate}>+ New Result</button>
	</div>

	{#if form?.error}
		<div class="adm-alert adm-alert--error">⚠️ {form.error}</div>
	{/if}
	{#if form?.success}
		<div class="adm-alert adm-alert--success">
			✅ Result {form.action === 'create'
				? 'created'
				: form.action === 'update'
					? 'updated'
					: 'deleted'}.
		</div>
	{/if}

	<div class="adm-card">
		<div class="adm-table-wrap">
			{#if data.results.length > 0}
				<table class="adm-table">
					<thead>
						<tr>
							<th>Title</th>
							<th>Type</th>
							<th>Published</th>
							<th>File</th>
							<th style="text-align:right">Actions</th>
						</tr>
					</thead>
					<tbody>
						{#each data.results as item (item.id)}
							<tr class={deletingId === item.id ? 'is-deleting' : ''}>
								<td class="is-strong">{item.title}</td>
								<td><span class="adm-badge adm-badge--blue">{item.type}</span></td>
								<td class="is-muted">{item.date}</td>
								<td>
									{#if item.fileUrl}
										<a
											href={item.fileUrl}
											target="_blank"
											rel="noopener"
											class="adm-badge adm-badge--green">↗ Link</a
										>
									{:else}
										<span class="is-muted">—</span>
									{/if}
								</td>
								<td style="text-align:right">
									<div class="adm-row-actions" style="justify-content:flex-end">
										<button
											class="adm-btn adm-btn--ghost adm-btn--sm"
											onclick={() => openEdit(item)}>✏️ Edit</button
										>
										<form
											method="POST"
											action="?/delete"
											use:enhance={() => {
												deletingId = item.id;
												return async ({ update }) => {
													await update();
												};
											}}
										>
											<input type="hidden" name="id" value={item.id} />
											<button
												type="submit"
												class="adm-btn adm-btn--danger adm-btn--sm"
												onclick={(e) => {
													if (!confirm('Delete this result?')) e.preventDefault();
												}}>🗑️ Delete</button
											>
										</form>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{:else}
				<div class="adm-empty">
					<span class="adm-empty__icon">🏆</span>
					<h3>No results yet</h3>
					<p>Publish the first exam result.</p>
					<button class="adm-btn adm-btn--primary" onclick={openCreate}>+ New Result</button>
				</div>
			{/if}
		</div>
	</div>
</div>

{#if showModal}
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div class="adm-overlay" onclick={closeModal} role="presentation">
		<div
			class="adm-modal"
			onclick={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
			tabindex="-1"
		>
			<div class="adm-modal__head">
				<h2 class="adm-modal__title">{editing ? '✏️ Edit Result' : '🏆 New Result'}</h2>
				<button class="adm-modal__close" onclick={closeModal} aria-label="Close">✕</button>
			</div>
			<form
				class="adm-modal__body adm-form"
				method="POST"
				action={editing ? '?/update' : '?/create'}
				use:enhance={() => {
					submitting = true;
					return async ({ update }) => {
						submitting = false;
						await update();
					};
				}}
			>
				{#if editing}
					<input type="hidden" name="id" value={editing.id} />
				{/if}
				<div class="adm-field">
					<label class="adm-label" for="rs-title">Title *</label>
					<input
						id="rs-title"
						class="adm-input"
						type="text"
						name="title"
						required
						value={editing?.title ?? ''}
						placeholder="e.g. BSc Annual Result 2025"
					/>
				</div>
				<div class="adm-grid-2">
					<div class="adm-field">
						<label class="adm-label" for="rs-date">Publish Date *</label>
						<input
							id="rs-date"
							class="adm-input"
							type="date"
							name="publish_date"
							required
							value={editing?.isoDate ?? ''}
						/>
					</div>
					<div class="adm-field">
						<label class="adm-label" for="rs-type">Result Type</label>
						<select id="rs-type" class="adm-select" name="result_type">
							{#each types as t}
								<option value={t} selected={(editing?.type ?? 'Annual') === t}>{t}</option>
							{/each}
						</select>
					</div>
				</div>
				<div class="adm-field">
					<label class="adm-label" for="rs-file">Result Link (URL)</label>
					<input
						id="rs-file"
						class="adm-input"
						type="text"
						name="file_url"
						value={editing?.fileUrl ?? ''}
						placeholder="https://... or /uploads/results.pdf"
					/>
					<span class="adm-hint">Link to the PDF or external result page.</span>
				</div>
				<div class="adm-modal__foot">
					<button type="button" class="adm-btn adm-btn--ghost" onclick={closeModal}>Cancel</button>
					<button type="submit" class="adm-btn adm-btn--primary" disabled={submitting}>
						{#if submitting}<span class="adm-spin"></span>{/if}
						{editing ? 'Save Changes' : 'Publish'}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
