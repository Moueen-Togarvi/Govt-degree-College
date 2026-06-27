<script lang="ts">
	import { enhance } from '$app/forms';
	import { fly, fade } from 'svelte/transition';
	import type { PageData, ActionData } from './$types';
	import { reveal } from '$lib/admin/motion';

	import CalendarDays from 'lucide-svelte/icons/calendar-days';
	import Plus from 'lucide-svelte/icons/plus';
	import Pencil from 'lucide-svelte/icons/pencil';
	import Trash2 from 'lucide-svelte/icons/trash-2';
	import X from 'lucide-svelte/icons/x';
	import CircleCheck from 'lucide-svelte/icons/circle-check';
	import CircleAlert from 'lucide-svelte/icons/circle-alert';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let showModal = $state(false);
	let editing = $state<(typeof data.events)[0] | null>(null);
	let deletingId = $state<number | null>(null);
	let submitting = $state(false);

	const statuses = ['Upcoming', 'Ongoing', 'Completed'];

	function statusClass(s: string) {
		if (s === 'Upcoming') return 'adm-badge--blue';
		if (s === 'Ongoing') return 'adm-badge--green';
		return 'adm-badge--gray';
	}
	function openCreate() {
		editing = null;
		showModal = true;
	}
	function openEdit(item: (typeof data.events)[0]) {
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

<svelte:head><title>Events — Super Admin | GPGC Portal</title></svelte:head>

<div class="adm-page">
	<div class="adm-head">
		<div>
			<h1 class="adm-title"><CalendarDays size={22} stroke-width={1.75} /> Events</h1>
			<p class="adm-sub">Manage campus events shown on the public events page.</p>
		</div>
		<button class="adm-btn adm-btn--primary" onclick={openCreate}>
			<Plus size={16} stroke-width={2} /> New Event
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
			Event {form.action === 'create'
				? 'created'
				: form.action === 'update'
					? 'updated'
					: 'deleted'}.
		</div>
	{/if}

	<div class="adm-card" use:reveal={{ y: 18 }}>
		<div class="adm-table-wrap">
			{#if data.events.length > 0}
				<table class="adm-table">
					<thead>
						<tr>
							<th>Event</th>
							<th>Date &amp; Time</th>
							<th>Location</th>
							<th>Status</th>
							<th style="text-align:right">Actions</th>
						</tr>
					</thead>
					<tbody>
						{#each data.events as item (item.id)}
							<tr class={deletingId === item.id ? 'is-deleting' : ''}>
								<td>
									<div style="display:flex;align-items:center;gap:.6rem">
										<img
											src={item.imageUrl}
											alt=""
											style="width:40px;height:40px;border-radius:8px;object-fit:cover"
										/>
										<div>
											<div class="is-strong">{item.title}</div>
										</div>
									</div>
								</td>
								<td class="is-muted">
									<div class="is-strong" style="color:#334155">{item.date}</div>
									<div style="font-size:.78rem">{item.time}</div>
								</td>
								<td class="is-muted">{item.location}</td>
								<td><span class="adm-badge {statusClass(item.status)}">{item.status}</span></td>
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
													if (!confirm('Delete this event?')) e.preventDefault();
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
					<div class="adm-empty__icon"><CalendarDays size={26} stroke-width={1.5} /></div>
					<h3>No events yet</h3>
					<p>Add the first campus event.</p>
					<button class="adm-btn adm-btn--primary" onclick={openCreate}>
						<Plus size={16} stroke-width={2} /> New Event
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
						<Pencil size={18} stroke-width={1.75} /> Edit Event
					{:else}
						<CalendarDays size={18} stroke-width={1.75} /> New Event
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
					<label class="adm-label" for="ev-title">Title *</label>
					<input
						id="ev-title"
						class="adm-input"
						type="text"
						name="title"
						required
						value={editing?.title ?? ''}
						placeholder="e.g. Annual Sports Gala"
					/>
				</div>
				<div class="adm-grid-3">
					<div class="adm-field">
						<label class="adm-label" for="ev-date">Date *</label>
						<input
							id="ev-date"
							class="adm-input"
							type="date"
							name="date"
							required
							value={editing?.isoDate ?? ''}
						/>
					</div>
					<div class="adm-field">
						<label class="adm-label" for="ev-time">Time</label>
						<input
							id="ev-time"
							class="adm-input"
							type="time"
							name="time"
							value={editing?.time ?? '09:00'}
						/>
					</div>
					<div class="adm-field">
						<label class="adm-label" for="ev-status">Status</label>
						<select id="ev-status" class="adm-select" name="status">
							{#each statuses as s}
								<option value={s} selected={(editing?.status ?? 'Upcoming') === s}>{s}</option>
							{/each}
						</select>
					</div>
				</div>
				<div class="adm-field">
					<label class="adm-label" for="ev-loc">Location *</label>
					<input
						id="ev-loc"
						class="adm-input"
						type="text"
						name="location"
						required
						value={editing?.location ?? ''}
						placeholder="e.g. Main Campus Ground"
					/>
				</div>
				<div class="adm-field">
					<label class="adm-label" for="ev-img">Image URL</label>
					<input
						id="ev-img"
						class="adm-input"
						type="text"
						name="image_url"
						value={editing?.imageUrl ?? ''}
						placeholder="/images/gallery/..."
					/>
					<span class="adm-hint">Optional. Defaults to a standard event image.</span>
				</div>
				<div class="adm-modal__foot">
					<button type="button" class="adm-btn adm-btn--ghost" onclick={closeModal}>Cancel</button>
					<button type="submit" class="adm-btn adm-btn--primary" disabled={submitting}>
						{#if submitting}<span class="adm-spin"></span>{/if}
						{editing ? 'Save Changes' : 'Create Event'}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
