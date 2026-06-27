<script lang="ts">
	import { enhance } from '$app/forms';
	import { fly, fade } from 'svelte/transition';
	import type { PageData, ActionData } from './$types';
	import { reveal } from '$lib/admin/motion';

	import ClipboardList from 'lucide-svelte/icons/clipboard-list';
	import Plus from 'lucide-svelte/icons/plus';
	import Pencil from 'lucide-svelte/icons/pencil';
	import Trash2 from 'lucide-svelte/icons/trash-2';
	import X from 'lucide-svelte/icons/x';
	import CircleCheck from 'lucide-svelte/icons/circle-check';
	import CircleAlert from 'lucide-svelte/icons/circle-alert';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let showModal = $state(false);
	let editing = $state<(typeof data.notices)[0] | null>(null);
	let deletingId = $state<number | null>(null);
	let submitting = $state(false);

	const tags = ['Notice', 'Alert', 'Update', 'Holiday', 'Exam', ' Urgent'];
	function tagClass(t: string) {
		const map: Record<string, string> = {
			Alert: 'adm-badge--red',
			Urgent: 'adm-badge--red',
			Holiday: 'adm-badge--amber',
			Exam: 'adm-badge--blue',
			Update: 'adm-badge--green'
		};
		return map[t] ?? 'adm-badge--gray';
	}
	function openCreate() {
		editing = null;
		showModal = true;
	}
	function openEdit(item: (typeof data.notices)[0]) {
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
	function dateValue(iso: string | null) {
		return (iso ?? '').slice(0, 10);
	}
</script>

<svelte:head><title>Notice Board — Super Admin | GPGC Portal</title></svelte:head>

<div class="adm-page">
	<div class="adm-head">
		<div>
			<h1 class="adm-title"><ClipboardList size={22} stroke-width={1.75} /> Notice Board</h1>
			<p class="adm-sub">
				Pin notices to the home page notice board. Expired notices are hidden publicly.
			</p>
		</div>
		<button class="adm-btn adm-btn--primary" onclick={openCreate}>
			<Plus size={16} stroke-width={2} /> New Notice
		</button>
	</div>

	{#if form?.error}
		<div class="adm-alert adm-alert--error" transition:fade>
			<CircleAlert size={16} stroke-width={2} /> {form.error}
		</div>
	{/if}
	{#if form?.success}
		<div class="adm-alert adm-alert--success" transition:fade>
			<CircleCheck size={16} stroke-width={2} />
			Notice {form.action === 'create'
				? 'created'
				: form.action === 'update'
					? 'updated'
					: 'deleted'}.
		</div>
	{/if}

	<div class="adm-card" use:reveal={{ y: 18 }}>
		<div class="adm-table-wrap">
			{#if data.notices.length > 0}
				<table class="adm-table">
					<thead>
						<tr>
							<th>Notice</th>
							<th>Tag</th>
							<th>Order</th>
							<th>Posted</th>
							<th>Expires</th>
							<th style="text-align:right">Actions</th>
						</tr>
					</thead>
					<tbody>
						{#each data.notices as item (item.id)}
							<tr class={deletingId === item.id ? 'is-deleting' : ''}>
								<td>
									<div class="is-strong">{item.title}</div>
									<div class="adm-clamp is-muted" style="max-width:360px">{item.message}</div>
								</td>
								<td><span class="adm-badge {tagClass(item.tag)}">{item.tag}</span></td>
								<td class="is-muted">{item.sortOrder}</td>
								<td class="is-muted">{item.date}</td>
								<td class="is-muted">{item.expiryDate ?? '—'}</td>
								<td style="text-align:right">
									<div class="adm-row-actions" style="justify-content:flex-end">
										<button
											class="adm-btn adm-btn--ghost adm-btn--sm"
											onclick={() => openEdit(item)}
										>
											<Pencil size={14} stroke-width={1.75} /> Edit
										</button>
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
													if (!confirm('Delete this notice?')) e.preventDefault();
												}}
											>
												<Trash2 size={14} stroke-width={1.75} /> Delete
											</button>
										</form>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{:else}
				<div class="adm-empty">
					<div class="adm-empty__icon"><ClipboardList size={26} stroke-width={1.5} /></div>
					<h3>No notices yet</h3>
					<p>Add the first notice board item.</p>
					<button class="adm-btn adm-btn--primary" onclick={openCreate}>
						<Plus size={16} stroke-width={2} /> New Notice
					</button>
				</div>
			{/if}
		</div>
	</div>
</div>

{#if showModal}
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div class="adm-overlay" onclick={closeModal} role="presentation" transition:fade={{ duration: 150 }}>
		<div
			class="adm-modal"
			onclick={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
			tabindex="-1"
			in:fly={{ y: -16, duration: 220, opacity: 0 }}
		>
			<div class="adm-modal__head">
				<h2 class="adm-modal__title">
					{#if editing}
						<Pencil size={18} stroke-width={1.75} /> Edit Notice
					{:else}
						<ClipboardList size={18} stroke-width={1.75} /> New Notice
					{/if}
				</h2>
				<button class="adm-modal__close" onclick={closeModal} aria-label="Close">
					<X size={18} stroke-width={1.75} />
				</button>
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
				<div class="adm-grid-2">
					<div class="adm-field">
						<label class="adm-label" for="nb-title">Title *</label>
						<input
							id="nb-title"
							class="adm-input"
							type="text"
							name="title"
							required
							value={editing?.title ?? ''}
							placeholder="Notice title"
						/>
					</div>
					<div class="adm-field">
						<label class="adm-label" for="nb-tag">Tag</label>
						<select id="nb-tag" class="adm-select" name="tag">
							{#each tags as t}
								<option value={t.trim()} selected={(editing?.tag ?? 'Notice') === t.trim()}
									>{t.trim()}</option
								>
							{/each}
						</select>
					</div>
				</div>
				<div class="adm-field">
					<label class="adm-label" for="nb-msg">Message *</label>
					<textarea
						id="nb-msg"
						class="adm-textarea"
						name="message"
						required
						placeholder="Notice message...">{editing?.message ?? ''}</textarea
					>
				</div>
				<div class="adm-grid-3">
					<div class="adm-field">
						<label class="adm-label" for="nb-date">Posted Date</label>
						<input
							id="nb-date"
							class="adm-input"
							type="date"
							name="date"
							value={editing ? dateValue(editing.isoDate) : ''}
						/>
					</div>
					<div class="adm-field">
						<label class="adm-label" for="nb-exp">Expires</label>
						<input
							id="nb-exp"
							class="adm-input"
							type="date"
							name="expiry_date"
							value={editing ? dateValue(editing.expiryIsoDate) : ''}
						/>
						<span class="adm-hint">Blank = never.</span>
					</div>
					<div class="adm-field">
						<label class="adm-label" for="nb-order">Sort Order</label>
						<input
							id="nb-order"
							class="adm-input"
							type="number"
							name="sort_order"
							min="0"
							value={editing?.sortOrder ?? 0}
						/>
						<span class="adm-hint">Lower shows first.</span>
					</div>
				</div>
				<div class="adm-modal__foot">
					<button type="button" class="adm-btn adm-btn--ghost" onclick={closeModal}>Cancel</button>
					<button type="submit" class="adm-btn adm-btn--primary" disabled={submitting}>
						{#if submitting}<span class="adm-spin"></span>{/if}
						{editing ? 'Save Changes' : 'Create Notice'}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
