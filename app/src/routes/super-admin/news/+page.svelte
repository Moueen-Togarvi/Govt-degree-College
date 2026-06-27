<script lang="ts">
	import { enhance } from '$app/forms';
	import { fly, fade } from 'svelte/transition';
	import type { PageData, ActionData } from './$types';
	import { reveal } from '$lib/admin/motion';

	import Newspaper from 'lucide-svelte/icons/newspaper';
	import Plus from 'lucide-svelte/icons/plus';
	import Pencil from 'lucide-svelte/icons/pencil';
	import Trash2 from 'lucide-svelte/icons/trash-2';
	import X from 'lucide-svelte/icons/x';
	import CircleCheck from 'lucide-svelte/icons/circle-check';
	import CircleAlert from 'lucide-svelte/icons/circle-alert';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let showModal = $state(false);
	let editing = $state<(typeof data.items)[0] | null>(null);
	let deletingId = $state<number | null>(null);
	let submitting = $state(false);

	function openCreate() {
		editing = null;
		showModal = true;
	}
	function openEdit(item: (typeof data.items)[0]) {
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

<svelte:head><title>News Ticker — Super Admin | GPGC Portal</title></svelte:head>

<div class="adm-page">
	<div class="adm-head">
		<div>
			<h1 class="adm-title"><Newspaper size={22} stroke-width={1.75} /> News Ticker</h1>
			<p class="adm-sub">
				Short headlines that scroll in the homepage ticker. Each links to the announcements page.
			</p>
		</div>
		<button class="adm-btn adm-btn--primary" onclick={openCreate}>
			<Plus size={16} stroke-width={2} /> New Headline
		</button>
	</div>

	{#if form?.error}
		<div class="adm-alert adm-alert--error" transition:fade>
			<CircleAlert size={16} stroke-width={2} />
			{form.error}
		</div>
	{/if}
	{#if form?.success}
		<div class="adm-alert adm-alert--success" transition:fade>
			<CircleCheck size={16} stroke-width={2} />
			Headline {form.action === 'create'
				? 'created'
				: form.action === 'update'
					? 'updated'
					: 'deleted'}.
		</div>
	{/if}

	<div class="adm-card" use:reveal={{ y: 18 }}>
		<div class="adm-table-wrap">
			{#if data.items.length > 0}
				<table class="adm-table">
					<thead>
						<tr>
							<th>Headline</th>
							<th>Order</th>
							<th style="text-align:right">Actions</th>
						</tr>
					</thead>
					<tbody>
						{#each data.items as item (item.id)}
							<tr class={deletingId === item.id ? 'is-deleting' : ''}>
								<td class="is-strong">{item.title}</td>
								<td><span class="adm-badge adm-badge--gray">{item.sortOrder}</span></td>
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
													if (!confirm('Delete this headline?')) e.preventDefault();
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
					<div class="adm-empty__icon"><Newspaper size={26} stroke-width={1.5} /></div>
					<h3>No headlines yet</h3>
					<p>Add a headline to the ticker.</p>
					<button class="adm-btn adm-btn--primary" onclick={openCreate}>
						<Plus size={16} stroke-width={2} /> New Headline
					</button>
				</div>
			{/if}
		</div>
	</div>
</div>

{#if showModal}
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div
		class="adm-overlay"
		onclick={closeModal}
		role="presentation"
		transition:fade={{ duration: 150 }}
	>
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
						<Pencil size={18} stroke-width={1.75} /> Edit Headline
					{:else}
						<Newspaper size={18} stroke-width={1.75} /> New Headline
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
				<div class="adm-field">
					<label class="adm-label" for="nt-title">Headline *</label>
					<input
						id="nt-title"
						class="adm-input"
						type="text"
						name="title"
						required
						value={editing?.title ?? ''}
						placeholder="e.g. Admissions open for Fall 2025"
					/>
				</div>
				<div class="adm-field">
					<label class="adm-label" for="nt-order">Sort Order</label>
					<input
						id="nt-order"
						class="adm-input"
						type="number"
						name="sort_order"
						min="0"
						value={editing?.sortOrder ?? 0}
					/>
					<span class="adm-hint">Lower numbers appear first in the ticker.</span>
				</div>
				<div class="adm-modal__foot">
					<button type="button" class="adm-btn adm-btn--ghost" onclick={closeModal}>Cancel</button>
					<button type="submit" class="adm-btn adm-btn--primary" disabled={submitting}>
						{#if submitting}<span class="adm-spin"></span>{/if}
						{editing ? 'Save Changes' : 'Create'}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
