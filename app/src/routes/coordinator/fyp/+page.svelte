<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import { reveal } from '$lib/admin/motion';

	import FlaskConical from 'lucide-svelte/icons/flask-conical';
	import Plus from 'lucide-svelte/icons/plus';
	import Trash2 from 'lucide-svelte/icons/trash-2';
	import X from 'lucide-svelte/icons/x';
	import Check from 'lucide-svelte/icons/check';
	import TriangleAlert from 'lucide-svelte/icons/triangle-alert';
	import User from 'lucide-svelte/icons/user';
	import Users from 'lucide-svelte/icons/users';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let showModal = $state(false);
	let submitting = $state(false);

	function statusClass(status: string) {
		switch (status) {
			case 'Proposed':
				return 'tone-gray';
			case 'Approved':
				return 'tone-green';
			case 'InProgress':
				return 'tone-amber';
			case 'Completed':
				return 'tone-teal';
			case 'Cancelled':
				return 'tone-red';
			default:
				return 'tone-gray';
		}
	}
</script>

<svelte:head><title>FYP Management — Coordinator | GPGC Portal</title></svelte:head>

<div class="adm-page">
	<div class="adm-head">
		<div>
			<h1 class="adm-title">
				<FlaskConical size={22} stroke-width={1.75} /> Final Year Projects (FYP)
			</h1>
			<p class="adm-sub">Manage departmental projects and assignments</p>
		</div>
		<button class="adm-btn adm-btn--primary" onclick={() => (showModal = true)}>
			<Plus size={16} stroke-width={2} /> New Project
		</button>
	</div>

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

	<div class="adm-card" use:reveal={{ y: 16 }}>
		<div class="adm-table-wrap">
			<table class="adm-table">
				<thead>
					<tr>
						<th>Project Title</th>
						<th>Session</th>
						<th>Supervisor</th>
						<th>Members</th>
						<th>Status</th>
						<th class="cell-actions">Actions</th>
					</tr>
				</thead>
				<tbody>
					{#if data.projects.length === 0}
						<tr>
							<td colspan="6" class="empty-cell">
								<div class="adm-empty">
									<div class="adm-empty__icon"><FlaskConical size={26} stroke-width={1.75} /></div>
									<h3>No FYP projects yet</h3>
									<p>Click “New Project” to create your first one.</p>
								</div>
							</td>
						</tr>
					{:else}
						{#each data.projects as proj (proj.id)}
							<tr>
								<td>
									<div class="proj-title">{proj.title}</div>
									<div class="proj-desc">{proj.description || 'No description'}</div>
								</td>
								<td><span class="adm-badge adm-badge--teal">{proj.session}</span></td>
								<td>
									{#if proj.supervisor_name}
										<span class="supervisor">
											<User size={15} stroke-width={1.75} />
											{proj.supervisor_name}
										</span>
									{:else}
										<span class="is-muted unassigned">Unassigned</span>
									{/if}
								</td>
								<td>
									<div class="members">
										<Users size={15} stroke-width={1.75} />
										<span class="members-count">{proj.member_count}</span>
										<span class="members-label">students</span>
									</div>
								</td>
								<td>
									<form method="POST" action="?/updateStatus" use:enhance>
										<input type="hidden" name="id" value={proj.id} />
										<select
											name="status"
											class="fyp-status {statusClass(proj.status)}"
											onchange={(e) => e.currentTarget.form?.requestSubmit()}
										>
											{#each ['Proposed', 'Approved', 'InProgress', 'Completed', 'Cancelled'] as stat}
												<option value={stat} selected={proj.status === stat}>{stat}</option>
											{/each}
										</select>
									</form>
								</td>
								<td class="cell-actions">
									<!-- Manage Members Link (to be implemented) -->
									<form
										method="POST"
										action="?/delete"
										class="inline"
										use:enhance={() => {
											if (!confirm(`Delete project "${proj.title}"?`)) return () => {};
											return async ({ update }) => update();
										}}
									>
										<input type="hidden" name="id" value={proj.id} />
										<button
											type="submit"
											class="adm-btn adm-btn--danger adm-btn--sm"
											title="Delete Project"
											aria-label="Delete project"
										>
											<Trash2 size={15} stroke-width={1.75} />
										</button>
									</form>
								</td>
							</tr>
						{/each}
					{/if}
				</tbody>
			</table>
		</div>
	</div>
</div>

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
				<h2 class="adm-modal__title">
					<FlaskConical size={18} stroke-width={1.75} /> Create FYP Project
				</h2>
				<button onclick={() => (showModal = false)} class="adm-modal__close" aria-label="Close">
					<X size={18} stroke-width={1.75} />
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
				class="create-form"
			>
				<div class="adm-modal__body">
					<div class="adm-form">
						<div class="adm-field">
							<label class="adm-label" for="title">Project Title *</label>
							<input
								type="text"
								id="title"
								name="title"
								required
								class="adm-input"
								placeholder="e.g. AI-based Attendance System"
							/>
						</div>

						<div class="adm-field">
							<label class="adm-label" for="description">Description</label>
							<textarea
								id="description"
								name="description"
								rows="3"
								class="adm-textarea"
								placeholder="Brief overview of the project..."
							></textarea>
						</div>

						<div class="adm-grid-2">
							<div class="adm-field">
								<label class="adm-label" for="supervisor_id">Assign Supervisor</label>
								<select id="supervisor_id" name="supervisor_id" class="adm-select">
									<option value="">— Unassigned —</option>
									{#each data.faculty as fac (fac.id)}
										<option value={fac.id}>{fac.name} ({fac.designation})</option>
									{/each}
								</select>
							</div>
							<div class="adm-field">
								<label class="adm-label" for="session">Academic Session *</label>
								<input
									type="text"
									id="session"
									name="session"
									required
									class="adm-input"
									placeholder="e.g. 2022-2026"
								/>
							</div>
						</div>
					</div>
				</div>

				<div class="adm-modal__foot">
					<button type="button" onclick={() => (showModal = false)} class="adm-btn adm-btn--ghost">
						Cancel
					</button>
					<button type="submit" class="adm-btn adm-btn--primary" disabled={submitting}>
						{#if submitting}<span class="adm-spin"></span>{/if}
						Create Project
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
	/* Project cell content */
	.proj-title {
		font-weight: 600;
		color: var(--adm-ink);
	}
	.proj-desc {
		font-size: 0.74rem;
		color: var(--adm-muted);
		margin-top: 0.15rem;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
		max-width: 22rem;
	}

	.supervisor {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--adm-ink-2);
	}
	.supervisor :global(svg) {
		color: var(--adm-muted);
	}
	.unassigned {
		font-style: italic;
	}

	.members {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
	}
	.members :global(svg) {
		color: var(--adm-muted);
	}
	.members-count {
		font-size: 0.85rem;
		font-weight: 700;
		color: var(--adm-ink-2);
	}
	.members-label {
		font-size: 0.73rem;
		color: var(--adm-muted);
	}

	.cell-actions {
		text-align: right;
	}
	.inline {
		display: inline-block;
	}

	.empty-cell {
		padding: 0 !important;
	}

	/* Status select with teal-tinted tones */
	.fyp-status {
		font-size: 0.74rem;
		font-weight: 600;
		padding: 0.3rem 0.6rem;
		border-radius: 7px;
		border: 1.5px solid var(--adm-line);
		background: var(--adm-line-soft);
		color: var(--adm-muted);
		outline: none;
		cursor: pointer;
		font-family: inherit;
		transition:
			border-color 0.15s,
			box-shadow 0.15s;
	}
	.fyp-status:focus {
		box-shadow: var(--adm-ring);
		border-color: var(--adm-accent);
	}
	:global(.fyp-status.tone-gray) {
		background: var(--adm-line-soft);
		color: var(--adm-muted);
		border-color: var(--adm-line);
	}
	:global(.fyp-status.tone-green) {
		background: #d1fae5;
		color: #065f46;
		border-color: #a7f3d0;
	}
	:global(.fyp-status.tone-amber) {
		background: #fef3c7;
		color: #92400e;
		border-color: #fde68a;
	}
	:global(.fyp-status.tone-teal) {
		background: #e6f2f0;
		color: #0a4a44;
		border-color: #cdeae6;
	}
	:global(.fyp-status.tone-red) {
		background: #fee2e2;
		color: #991b1b;
		border-color: #fecaca;
	}

	.create-form {
		display: flex;
		flex-direction: column;
	}
</style>
