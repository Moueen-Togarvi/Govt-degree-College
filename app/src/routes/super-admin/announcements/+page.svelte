<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let showModal = $state(false);
	let editing = $state<(typeof data.announcements)[0] | null>(null);
	let deletingId = $state<number | null>(null);
	let submitting = $state(false);

	const categories = ['General', 'Admissions', 'Examination', 'Event', 'Urgent', 'Academic'];

	function openCreate() {
		editing = null;
		showModal = true;
	}
	function openEdit(item: (typeof data.announcements)[0]) {
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

	function dateValue(iso: string) {
		return (iso || '').slice(0, 10);
	}
</script>

<svelte:head><title>Announcements — Super Admin | GPGC Portal</title></svelte:head>

<div class="adm-page">
	<div class="adm-head">
		<div>
			<h1 class="adm-title">📢 Announcements</h1>
			<p class="adm-sub">Publish announcements shown on the public news &amp; home pages.</p>
		</div>
		<button class="adm-btn adm-btn--primary" onclick={openCreate}>+ New Announcement</button>
	</div>

	{#if form?.error}
		<div class="adm-alert adm-alert--error">⚠️ {form.error}</div>
	{/if}
	{#if form?.success}
		<div class="adm-alert adm-alert--success">
			✅ Announcement {form.action === 'create'
				? 'created'
				: form.action === 'update'
					? 'updated'
					: 'deleted'}.
		</div>
	{/if}

	<div class="adm-card">
		<div class="adm-table-wrap">
			{#if data.announcements.length > 0}
				<table class="adm-table">
					<thead>
						<tr>
							<th>Title</th>
							<th>Category</th>
							<th>Date</th>
							<th style="text-align:right">Actions</th>
						</tr>
					</thead>
					<tbody>
						{#each data.announcements as item (item.id)}
							<tr class={deletingId === item.id ? 'is-deleting' : ''}>
								<td>
									<div class="is-strong">{item.title}</div>
									<div class="adm-clamp is-muted" style="max-width:420px">{item.description}</div>
								</td>
								<td><span class="adm-badge adm-badge--purple">{item.category}</span></td>
								<td class="is-muted">{item.date}</td>
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
													if (!confirm('Delete this announcement?')) e.preventDefault();
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
					<span class="adm-empty__icon">📢</span>
					<h3>No announcements yet</h3>
					<p>Create the first announcement to show on the website.</p>
					<button class="adm-btn adm-btn--primary" onclick={openCreate}>+ New Announcement</button>
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
				<h2 class="adm-modal__title">{editing ? '✏️ Edit Announcement' : '📢 New Announcement'}</h2>
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
					<label class="adm-label" for="ann-title">Title *</label>
					<input
						id="ann-title"
						class="adm-input"
						type="text"
						name="title"
						required
						value={editing?.title ?? ''}
						placeholder="e.g. Admissions open for Fall 2025"
					/>
				</div>
				<div class="adm-grid-2">
					<div class="adm-field">
						<label class="adm-label" for="ann-cat">Category</label>
						<select id="ann-cat" class="adm-select" name="category">
							{#each categories as c}
								<option value={c} selected={(editing?.category ?? 'General') === c}>{c}</option>
							{/each}
						</select>
					</div>
					<div class="adm-field">
						<label class="adm-label" for="ann-date">Date</label>
						<input
							id="ann-date"
							class="adm-input"
							type="date"
							name="date"
							value={editing ? dateValue(editing.isoDate) : ''}
						/>
						<span class="adm-hint">Leave blank to use today.</span>
					</div>
				</div>
				<div class="adm-field">
					<label class="adm-label" for="ann-desc">Description *</label>
					<textarea
						id="ann-desc"
						class="adm-textarea"
						name="description"
						required
						placeholder="Full announcement details...">{editing?.description ?? ''}</textarea
					>
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
