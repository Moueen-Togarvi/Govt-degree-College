<script lang="ts">
	import { enhance } from '$app/forms';
	import { fly, fade } from 'svelte/transition';
	import type { PageData, ActionData } from './$types';
	import { reveal } from '$lib/admin/motion';

	import Building2 from 'lucide-svelte/icons/building-2';
	import Plus from 'lucide-svelte/icons/plus';
	import Pencil from 'lucide-svelte/icons/pencil';
	import Trash2 from 'lucide-svelte/icons/trash-2';
	import X from 'lucide-svelte/icons/x';
	import CircleCheck from 'lucide-svelte/icons/circle-check';
	import CircleAlert from 'lucide-svelte/icons/circle-alert';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let showModal = $state(false);
	let editingDept = $state<(typeof data.departments)[0] | null>(null);
	let deletingId = $state<number | null>(null);
	let submitting = $state(false);

	function openCreate() {
		editingDept = null;
		showModal = true;
	}

	function openEdit(dept: (typeof data.departments)[0]) {
		editingDept = { ...dept };
		showModal = true;
	}

	function closeModal() {
		showModal = false;
		editingDept = null;
	}

	$effect(() => {
		if (form?.success) {
			closeModal();
			deletingId = null;
		}
	});
</script>

<svelte:head>
	<title>Departments — Super Admin | GPGC Portal</title>
</svelte:head>

<div class="adm-page">
	<div class="adm-head">
		<div>
			<h1 class="adm-title"><Building2 size={22} stroke-width={1.75} /> Departments</h1>
			<p class="adm-sub">
				Manage all academic departments. Assign coordinators and configure settings.
			</p>
		</div>
		<button class="adm-btn adm-btn--primary" onclick={openCreate}>
			<Plus size={16} stroke-width={2} /> Add Department
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
			Department {form.action === 'create'
				? 'created'
				: form.action === 'update'
					? 'updated'
					: 'deleted'} successfully.
		</div>
	{/if}

	<!-- Departments Table -->
	<div class="adm-card" use:reveal={{ y: 18 }}>
		<div class="adm-table-wrap">
			{#if data.departments && data.departments.length > 0}
				<table class="adm-table">
					<thead>
						<tr>
							<th>#</th>
							<th>Department Name</th>
							<th>Urdu Name</th>
							<th>Coordinator</th>
							<th>Slug</th>
							<th style="text-align: right">Actions</th>
						</tr>
					</thead>
					<tbody>
						{#each data.departments as dept, i (dept.id)}
							<tr class={deletingId === dept.id ? 'is-deleting' : ''}>
								<td class="is-muted">{i + 1}</td>
								<td>
									<div class="dept-name-cell">
										<span class="row-icon"><Building2 size={16} stroke-width={1.75} /></span>
										<div>
											<div class="is-strong">{dept.name}</div>
											{#if dept.description}
												<div class="adm-clamp is-muted" style="max-width: 360px">
													{dept.description.slice(0, 60)}{dept.description.length > 60
														? '…'
														: ''}
												</div>
											{/if}
										</div>
									</div>
								</td>
								<td>{dept.urdu_name ?? '—'}</td>
								<td>
									{#if dept.coordinator_name}
										<span class="adm-badge adm-badge--teal">{dept.coordinator_name}</span>
									{:else}
										<span class="adm-badge adm-badge--gray">Not assigned</span>
									{/if}
								</td>
								<td><code class="adm-code">{dept.slug}</code></td>
								<td style="text-align: right">
									<div class="adm-row-actions" style="justify-content: flex-end">
										<button
											class="adm-btn adm-btn--ghost adm-btn--sm"
											onclick={() => openEdit(dept)}
										>
											<Pencil size={14} stroke-width={1.75} /> Edit
										</button>
										<form
											method="POST"
											action="?/delete"
											use:enhance={() => {
												deletingId = dept.id;
												return async ({ update }) => {
													await update();
												};
											}}
										>
											<input type="hidden" name="id" value={dept.id} />
											<button
												type="submit"
												class="adm-btn adm-btn--danger adm-btn--sm"
												onclick={(e) => {
													if (!confirm(`Delete "${dept.name}"? This cannot be undone.`))
														e.preventDefault();
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
					<div class="adm-empty__icon"><Building2 size={26} stroke-width={1.5} /></div>
					<h3>No departments yet</h3>
					<p>Click "Add Department" to create your first academic department.</p>
					<button class="adm-btn adm-btn--primary" onclick={openCreate}>
						<Plus size={16} stroke-width={2} /> Add Department
					</button>
				</div>
			{/if}
		</div>
	</div>
</div>

<!-- Create / Edit Modal -->
{#if showModal}
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div
		class="adm-overlay"
		transition:fade={{ duration: 150 }}
		onclick={closeModal}
		role="presentation"
	>
		<div
			class="adm-modal"
			in:fly={{ y: -16, duration: 220, opacity: 0 }}
			onclick={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
			tabindex="-1"
		>
			<div class="adm-modal__head">
				<h2 class="adm-modal__title">
					{#if editingDept}
						<Pencil size={18} stroke-width={1.75} /> Edit Department
					{:else}
						<Building2 size={18} stroke-width={1.75} /> New Department
					{/if}
				</h2>
				<button class="adm-modal__close" onclick={closeModal} aria-label="Close">
					<X size={18} stroke-width={1.75} />
				</button>
			</div>

			<form
				method="POST"
				action={editingDept ? '?/update' : '?/create'}
				use:enhance={() => {
					submitting = true;
					return async ({ update }) => {
						submitting = false;
						await update();
					};
				}}
				class="adm-modal__body adm-form"
			>
				{#if editingDept}
					<input type="hidden" name="id" value={editingDept.id} />
				{/if}

				<div class="adm-grid-2">
					<div class="adm-field">
						<label class="adm-label" for="dept-name">Department Name *</label>
						<input
							id="dept-name"
							type="text"
							name="name"
							value={editingDept?.name ?? ''}
							placeholder="e.g. Computer Science"
							required
							class="adm-input"
						/>
					</div>
					<div class="adm-field">
						<label class="adm-label" for="dept-urdu">Urdu Name</label>
						<input
							id="dept-urdu"
							type="text"
							name="urdu_name"
							value={editingDept?.urdu_name ?? ''}
							placeholder="e.g. کمپیوٹر سائنس"
							class="adm-input"
							dir="rtl"
						/>
					</div>
				</div>

				<div class="adm-field">
					<label class="adm-label" for="dept-desc">Description</label>
					<textarea
						id="dept-desc"
						name="description"
						rows="3"
						placeholder="Brief description of the department..."
						class="adm-textarea"
					>{editingDept?.description ?? ''}</textarea>
				</div>

				<div class="adm-field">
					<label class="adm-label" for="dept-coordinator">Assign Coordinator</label>
					<select id="dept-coordinator" name="coordinator_id" class="adm-select">
						<option value="">— No Coordinator —</option>
						{#each data.coordinators as coord (coord.id)}
							<option value={coord.id} selected={editingDept?.coordinator_id === coord.id}>
								{coord.name} ({coord.email})
							</option>
						{/each}
					</select>
				</div>

				<div class="adm-modal__foot">
					<button type="button" class="adm-btn adm-btn--ghost" onclick={closeModal}>Cancel</button>
					>
					<button type="submit" class="adm-btn adm-btn--primary" disabled={submitting}>
						{#if submitting}<span class="adm-spin"></span>{/if}
						{editingDept ? 'Save Changes' : 'Create Department'}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
	.dept-name-cell {
		display: flex;
		align-items: flex-start;
		gap: 0.6rem;
	}

	.row-icon {
		display: grid;
		place-items: center;
		width: 30px;
		height: 30px;
		border-radius: 8px;
		background: #e6f2f0;
		color: #0d5d56;
		margin-top: 1px;
		flex-shrink: 0;
	}
</style>
