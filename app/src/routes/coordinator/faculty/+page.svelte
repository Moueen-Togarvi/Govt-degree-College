<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import { reveal } from '$lib/admin/motion';

	import Users from 'lucide-svelte/icons/users';
	import UserPlus from 'lucide-svelte/icons/user-plus';
	import Search from 'lucide-svelte/icons/search';
	import Pencil from 'lucide-svelte/icons/pencil';
	import Trash2 from 'lucide-svelte/icons/trash-2';
	import X from 'lucide-svelte/icons/x';
	import Check from 'lucide-svelte/icons/check';
	import TriangleAlert from 'lucide-svelte/icons/triangle-alert';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let showModal = $state(false);
	let editingMember = $state<(typeof data.faculty)[0] | null>(null);
	let deletingId = $state<number | null>(null);
	let submitting = $state(false);
	let search = $state('');

	const filtered = $derived(
		search.trim()
			? data.faculty.filter(
					(f) =>
						f.name?.toLowerCase().includes(search.toLowerCase()) ||
						f.designation?.toLowerCase().includes(search.toLowerCase())
				)
			: data.faculty
	);

	function openCreate() {
		editingMember = null;
		showModal = true;
	}
	function openEdit(m: (typeof data.faculty)[0]) {
		editingMember = m;
		showModal = true;
	}
	function closeModal() {
		showModal = false;
		editingMember = null;
	}
</script>

<svelte:head><title>Faculty — Coordinator | GPGC Portal</title></svelte:head>

<div class="adm-page">
	<!-- Header -->
	<div class="adm-head">
		<div>
			<h1 class="adm-title"><Users size={22} stroke-width={1.75} /> Faculty Management</h1>
			<p class="adm-sub">{data.department?.name ?? ''} · {data.faculty.length} members</p>
		</div>
		<button class="adm-btn adm-btn--primary" onclick={openCreate}>
			<UserPlus size={16} stroke-width={1.75} /> Add Faculty
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

	<!-- Search -->
	<div class="search-bar">
		<Search size={16} stroke-width={1.75} class="search-icon" />
		<input
			type="text"
			placeholder="Search by name or designation..."
			bind:value={search}
			class="adm-input search-input"
		/>
	</div>

	<!-- Table -->
	<div class="adm-card" use:reveal={{ y: 16 }}>
		<div class="adm-table-wrap">
			<table class="adm-table">
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Designation</th>
						<th>Education</th>
						<th>Phone</th>
						<th>Role</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{#if filtered.length === 0}
						<tr>
							<td colspan="7">
								<div class="adm-empty">
									<div class="adm-empty__icon"><Users size={24} stroke-width={1.75} /></div>
									<h3>No faculty found</h3>
									<p>Click "Add Faculty" to get started.</p>
								</div>
							</td>
						</tr>
					{:else}
						{#each filtered as member, i}
							<tr>
								<td class="row-num">{i + 1}</td>
								<td>
									<div class="member-cell">
										<div class="member-avatar">{(member.name ?? '?').charAt(0).toUpperCase()}</div>
										<div>
											<div class="member-name">{member.name}</div>
											<div class="member-email">{member.email}</div>
										</div>
									</div>
								</td>
								<td>{member.designation}</td>
								<td class="is-muted">{member.education ?? '—'}</td>
								<td class="is-muted">{member.phone ?? '—'}</td>
								<td>
									{#if member.is_hod}
										<span class="adm-badge adm-badge--amber">HOD</span>
									{:else}
										<span class="adm-badge adm-badge--teal">Faculty</span>
									{/if}
								</td>
								<td>
									<div class="adm-row-actions">
										<button
											class="adm-btn adm-btn--ghost adm-btn--sm"
											onclick={() => openEdit(member)}
											title="Edit"
											aria-label="Edit"
										>
											<Pencil size={15} stroke-width={1.75} />
										</button>
										<form
											method="POST"
											action="?/delete"
											use:enhance={() => {
												if (!confirm(`Remove ${member.name}?`)) return () => {};
												return async ({ update }) => update();
											}}
										>
											<input type="hidden" name="profile_id" value={member.id} />
											<button
												class="adm-btn adm-btn--danger adm-btn--sm"
												type="submit"
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

<!-- Modal -->
{#if showModal}
	<div class="adm-overlay" onclick={closeModal} role="presentation" onkeydown={() => {}}>
		<div
			class="adm-modal"
			onclick={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
			tabindex="-1"
		>
			<div class="adm-modal__head">
				<h2 class="adm-modal__title">
					{#if editingMember}
						<Pencil size={18} stroke-width={1.75} /> Edit Faculty
					{:else}
						<UserPlus size={18} stroke-width={1.75} /> Add Faculty
					{/if}
				</h2>
				<button onclick={closeModal} class="adm-modal__close" aria-label="Close">
					<X size={18} stroke-width={2} />
				</button>
			</div>

			<form
				method="POST"
				action={editingMember ? '?/update' : '?/create'}
				use:enhance={() => {
					submitting = true;
					return async ({ update }) => {
						submitting = false;
						await update();
						closeModal();
					};
				}}
				class="adm-modal__body adm-form"
			>
				{#if editingMember}
					<input type="hidden" name="profile_id" value={editingMember.id} />
					<input type="hidden" name="user_id" value={editingMember.user_id} />
				{/if}

				<div class="adm-grid-2">
					<div class="adm-field">
						<label class="adm-label">Full Name *</label>
						<input
							type="text"
							name="name"
							required
							value={editingMember?.name ?? ''}
							placeholder="Dr. Muhammad Ali"
							class="adm-input"
						/>
					</div>
					{#if !editingMember}
						<div class="adm-field">
							<label class="adm-label">Email *</label>
							<input
								type="email"
								name="email"
								required
								placeholder="ali@gpgc.edu.pk"
								class="adm-input"
							/>
						</div>
					{/if}
				</div>

				{#if !editingMember}
					<div class="adm-field">
						<label class="adm-label">Password *</label>
						<input
							type="password"
							name="password"
							required
							minlength="6"
							placeholder="Min. 6 characters"
							class="adm-input"
						/>
					</div>
				{/if}

				<div class="adm-grid-2">
					<div class="adm-field">
						<label class="adm-label">Designation</label>
						<input
							type="text"
							name="designation"
							value={editingMember?.designation ?? 'Lecturer'}
							placeholder="Lecturer"
							class="adm-input"
						/>
					</div>
					<div class="adm-field">
						<label class="adm-label">Phone</label>
						<input
							type="text"
							name="phone"
							value={editingMember?.phone ?? ''}
							placeholder="03XX-XXXXXXX"
							class="adm-input"
						/>
					</div>
				</div>

				<div class="adm-field">
					<label class="adm-label">Education / Qualification</label>
					<input
						type="text"
						name="education"
						value={editingMember?.education ?? ''}
						placeholder="M.Phil Computer Science"
						class="adm-input"
					/>
				</div>

				<label class="checkbox-label">
					<input type="checkbox" name="is_hod" checked={editingMember?.is_hod ?? false} />
					<span>Mark as Head of Department (HOD)</span>
				</label>

				<div class="modal-foot">
					<button type="button" onclick={closeModal} class="adm-btn adm-btn--ghost">Cancel</button>
					<button type="submit" class="adm-btn adm-btn--primary" disabled={submitting}>
						{#if submitting}<span class="adm-spin"></span>{/if}
						{editingMember ? 'Save Changes' : 'Add Faculty'}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
	/* Search */
	.search-bar {
		position: relative;
	}
	.search-input {
		padding-left: 2.5rem;
	}
	.search-bar :global(.search-icon) {
		position: absolute;
		left: 0.85rem;
		top: 50%;
		transform: translateY(-50%);
		color: var(--adm-muted);
		pointer-events: none;
	}

	/* Table cells */
	.row-num {
		color: var(--adm-muted);
		font-size: 0.8rem;
	}

	.member-cell {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}
	.member-avatar {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: linear-gradient(135deg, #117d74, #0d5d56);
		color: #fff;
		font-weight: 700;
		font-size: 0.88rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}
	.member-name {
		font-size: 0.88rem;
		font-weight: 600;
		color: var(--adm-ink);
	}
	.member-email {
		font-size: 0.73rem;
		color: var(--adm-muted);
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

	.checkbox-label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.85rem;
		color: var(--adm-ink-2);
		cursor: pointer;
	}
</style>
