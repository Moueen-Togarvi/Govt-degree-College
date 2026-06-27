<script lang="ts">
	import { enhance } from '$app/forms';
	import { fly, fade } from 'svelte/transition';
	import type { PageData, ActionData } from './$types';
	import { reveal } from '$lib/admin/motion';

	import Users from 'lucide-svelte/icons/users';
	import UserPlus from 'lucide-svelte/icons/user-plus';
	import Pencil from 'lucide-svelte/icons/pencil';
	import Search from 'lucide-svelte/icons/search';
	import Lock from 'lucide-svelte/icons/lock';
	import Ban from 'lucide-svelte/icons/ban';
	import Check from 'lucide-svelte/icons/check';
	import Trash2 from 'lucide-svelte/icons/trash-2';
	import X from 'lucide-svelte/icons/x';
	import CircleCheck from 'lucide-svelte/icons/circle-check';
	import CircleAlert from 'lucide-svelte/icons/circle-alert';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let showModal = $state(false);
	let editingUser = $state<any>(null);
	let selectedRole = $state('coordinator');
	let submitting = $state(false);
	let searchQuery = $state('');
	let filterRole = $state('all');

	// tone keys map to avatar + badge classes in this page's <style>
	const roleTones: Record<string, string> = {
		super_admin: 'teal',
		coordinator: 'blue',
		faculty: 'green',
		student: 'orange'
	};

	const roleLabels: Record<string, string> = {
		super_admin: 'Super Admin',
		coordinator: 'Coordinator',
		faculty: 'Faculty',
		student: 'Student'
	};

	let filteredUsers = $derived(
		data.users.filter((u) => {
			const matchSearch =
				!searchQuery ||
				u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				u.email.toLowerCase().includes(searchQuery.toLowerCase());
			const matchRole = filterRole === 'all' || u.role === filterRole;
			return matchSearch && matchRole;
		})
	);

	function countFor(role: string) {
		return role === 'all' ? data.users.length : data.users.filter((u) => u.role === role).length;
	}

	// Department currently linked to a user (coordinator link lives on the dept row).
	function deptForUser(user: any): number | string {
		if (user.role === 'coordinator') {
			const dept = data.departments.find((d: any) => d.coordinator_id === user.id);
			return dept?.id ?? '';
		}
		return '';
	}

	function openEdit(user: any) {
		editingUser = user;
		selectedRole = user.role;
		showModal = true;
	}

	function closeModals() {
		showModal = false;
		editingUser = null;
		selectedRole = 'coordinator';
	}

	$effect(() => {
		if (form?.success) {
			closeModals();
		}
	});
</script>

<svelte:head>
	<title>Users — Super Admin | GPGC Portal</title>
</svelte:head>

<div class="adm-page">
	<div class="adm-head">
		<div>
			<h1 class="adm-title"><Users size={22} stroke-width={1.75} /> User Management</h1>
			<p class="adm-sub">Create and manage all portal users across all roles.</p>
		</div>
		<button
			class="adm-btn adm-btn--primary"
			onclick={() => {
				editingUser = null;
				selectedRole = 'coordinator';
				showModal = true;
			}}
		>
			<UserPlus size={16} stroke-width={2} /> Add User
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
			User {form.action === 'create' ? 'created' : form.action === 'delete' ? 'deleted' : 'updated'} successfully.
		</div>
	{/if}

	<!-- Filters -->
	<div class="filters" use:reveal={{ y: 14 }}>
		<div class="search-box">
			<Search size={16} stroke-width={1.75} class="search-icon" />
			<input
				type="search"
				bind:value={searchQuery}
				placeholder="Search by name or email…"
				class="search-input"
			/>
		</div>
		<div class="role-filters">
			{#each ['all', 'coordinator', 'faculty', 'student'] as role (role)}
				<button
					onclick={() => (filterRole = role)}
					class="role-pill {filterRole === role ? 'active' : ''}"
				>
					{role === 'all' ? 'All' : roleLabels[role]}
					<span class="role-count">{countFor(role)}</span>
				</button>
			{/each}
		</div>
	</div>

	<!-- Users Table -->
	<div class="adm-card" use:reveal={{ y: 18 }}>
		<div class="adm-table-wrap">
			{#if filteredUsers.length > 0}
				<table class="adm-table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Role</th>
							<th>Status</th>
							<th>Created</th>
							<th style="text-align: right">Actions</th>
						</tr>
					</thead>
					<tbody>
						{#each filteredUsers as user (user.id)}
							<tr>
								<td>
									<div class="user-cell">
										<div class="user-avatar tone-{roleTones[user.role]}">
											{user.name.charAt(0).toUpperCase()}
										</div>
										<span class="is-strong">{user.name}</span>
									</div>
								</td>
								<td class="is-muted">{user.email}</td>
								<td>
									<span class="adm-badge tone-{roleTones[user.role]}">{roleLabels[user.role]}</span>
								</td>
								<td>
									<span class="status {user.is_active ? 'active' : 'inactive'}">
										<span
											class="adm-status-dot {user.is_active
												? 'adm-status-dot--green'
												: 'adm-status-dot--amber'}"
										></span>
										{user.is_active ? 'Active' : 'Inactive'}
									</span>
								</td>
								<td class="is-muted">
									{new Date(user.created_at).toLocaleDateString('en-PK')}
								</td>
								<td style="text-align: right">
									<div class="adm-row-actions" style="justify-content: flex-end">
										{#if user.role === 'super_admin'}
											<span class="protected" title="Super admin accounts are always active">
												<Lock size={13} stroke-width={2} /> Protected
											</span>
										{:else}
											<button
												type="button"
												class="adm-btn adm-btn--ghost adm-btn--sm"
												title="Edit user"
												onclick={() => openEdit(user)}
											>
												<Pencil size={14} stroke-width={1.75} /> Edit
											</button>
											<form method="POST" action="?/toggle_active" use:enhance>
												<input type="hidden" name="id" value={user.id} />
												<input type="hidden" name="is_active" value={user.is_active} />
												<button
													type="submit"
													class="adm-btn adm-btn--sm {user.is_active
														? 'adm-btn--warn'
														: 'adm-btn--good'}"
													title={user.is_active ? 'Deactivate' : 'Activate'}
												>
													{#if user.is_active}
														<Ban size={14} stroke-width={1.75} /> Deactivate
													{:else}
														<Check size={14} stroke-width={2} /> Activate
													{/if}
												</button>
											</form>
											<form method="POST" action="?/delete" use:enhance>
												<input type="hidden" name="id" value={user.id} />
												<button
													type="submit"
													class="adm-btn adm-btn--danger adm-btn--sm"
													onclick={(e) => {
														if (!confirm(`Delete "${user.name}"? This cannot be undone.`))
															e.preventDefault();
													}}
												>
													<Trash2 size={14} stroke-width={1.75} /> Delete
												</button>
											</form>
										{/if}
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{:else}
				<div class="adm-empty">
					<div class="adm-empty__icon"><Users size={26} stroke-width={1.5} /></div>
					<h3>No users found</h3>
					<p>
						{searchQuery
							? 'Try adjusting your search.'
							: 'Click "Add User" to create the first portal user.'}
					</p>
				</div>
			{/if}
		</div>
	</div>
</div>

<!-- User Modal (Add / Edit) -->
{#if showModal}
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div
		class="adm-overlay"
		transition:fade={{ duration: 150 }}
		onclick={() => closeModals()}
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
					{#if editingUser}
						<Pencil size={18} stroke-width={1.75} /> Edit User
					{:else}
						<UserPlus size={18} stroke-width={1.75} /> Add New User
					{/if}
				</h2>
				<button class="adm-modal__close" onclick={() => closeModals()} aria-label="Close">
					<X size={18} stroke-width={1.75} />
				</button>
			</div>

			<form
				method="POST"
				action={editingUser ? '?/update' : '?/create'}
				use:enhance={() => {
					submitting = true;
					return async ({ update }) => {
						submitting = false;
						await update();
					};
				}}
				class="adm-modal__body adm-form"
			>
				{#if editingUser}
					<input type="hidden" name="id" value={editingUser.id} />
				{/if}

				<div class="adm-grid-2">
					<div class="adm-field">
						<label class="adm-label" for="user-name">Full Name *</label>
						<input
							id="user-name"
							type="text"
							name="name"
							required
							placeholder="Muhammad Ali"
							class="adm-input"
							value={editingUser?.name ?? ''}
						/>
					</div>
					<div class="adm-field">
						<label class="adm-label" for="user-email">Email *</label>
						<input
							id="user-email"
							type="email"
							name="email"
							required
							placeholder="ali@gpgc.edu.pk"
							class="adm-input"
							value={editingUser?.email ?? ''}
						/>
					</div>
				</div>

				<div class="adm-grid-2">
					<div class="adm-field">
						<label class="adm-label" for="user-password">
							{#if editingUser}Reset Password{:else}Password *{/if}
						</label>
						<input
							id="user-password"
							type="password"
							name="password"
							minlength="6"
							placeholder={editingUser ? 'Leave blank to keep current' : 'Min. 6 characters'}
							class="adm-input"
							required={!editingUser}
						/>
					</div>
					<div class="adm-field">
						<label class="adm-label" for="user-role">Role *</label>
						<select
							id="user-role"
							name="role"
							class="adm-select"
							bind:value={selectedRole}
							disabled={editingUser?.role === 'super_admin'}
						>
							<option value="coordinator">Coordinator</option>
							<option value="faculty">Faculty</option>
							<option value="student">Student</option>
						</select>
					</div>
				</div>

				{#if selectedRole === 'faculty' || selectedRole === 'coordinator' || selectedRole === 'student'}
					<div class="adm-field">
						<label class="adm-label" for="user-dept">Department *</label>
						<select id="user-dept" name="department_id" class="adm-select" required>
							<option value="">— Select Department —</option>
							{#each data.departments as dept (dept.id)}
								<option value={dept.id} selected={editingUser && deptForUser(editingUser) === dept.id}>
									{dept.name}
								</option>
							{/each}
						</select>
					</div>
				{/if}

				{#if selectedRole === 'faculty'}
					<div class="adm-field">
						<label class="adm-label" for="user-designation">Designation</label>
						<input
							id="user-designation"
							type="text"
							name="designation"
							placeholder="Lecturer"
							class="adm-input"
						/>
					</div>
				{/if}

				{#if selectedRole === 'student'}
					<div class="adm-grid-2">
						<div class="adm-field">
							<label class="adm-label" for="user-roll">Roll Number *</label>
							<input
								id="user-roll"
								type="text"
								name="roll_number"
								required
								placeholder="CS-2022-001"
								class="adm-input"
							/>
						</div>
						<div class="adm-field">
							<label class="adm-label" for="user-semester">Semester</label>
							<select id="user-semester" name="semester" class="adm-select">
								{#each [1, 2, 3, 4, 5, 6, 7, 8] as s (s)}
									<option value={s}>Semester {s}</option>
								{/each}
							</select>
						</div>
					</div>
					<div class="adm-field">
						<label class="adm-label" for="user-session">Session *</label>
						<input
							id="user-session"
							type="text"
							name="session"
							required
							placeholder="2022-2026"
							class="adm-input"
						/>
					</div>
				{/if}

				<div class="adm-modal__foot">
					<button type="button" class="adm-btn adm-btn--ghost" onclick={() => closeModals()}
						>Cancel</button
					>
					<button type="submit" class="adm-btn adm-btn--primary" disabled={submitting}>
						{#if submitting}<span class="adm-spin"></span>{/if}
						{editingUser ? 'Save Changes' : 'Create User'}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
	/* ─── Filters ─── */
	.filters {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.search-box {
		position: relative;
		flex: 1;
		min-width: 220px;
	}

	.search-box :global(.search-icon) {
		position: absolute;
		left: 0.85rem;
		top: 50%;
		transform: translateY(-50%);
		color: #94a3b8;
		pointer-events: none;
	}

	.search-input {
		width: 100%;
		padding: 0.65rem 0.9rem 0.65rem 2.4rem;
		border: 1.5px solid var(--adm-line);
		border-radius: 10px;
		font-size: 0.875rem;
		font-family: inherit;
		color: var(--adm-ink);
		background: #fff;
		box-sizing: border-box;
		transition:
			border-color 0.15s,
			box-shadow 0.15s;
	}

	.search-input:focus {
		outline: none;
		border-color: var(--adm-accent);
		box-shadow: var(--adm-ring);
	}

	.role-filters {
		display: flex;
		gap: 0.4rem;
		flex-wrap: wrap;
	}

	.role-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.5rem 0.9rem;
		border: 1.5px solid var(--adm-line);
		border-radius: 999px;
		background: #fff;
		font-size: 0.8rem;
		font-weight: 600;
		cursor: pointer;
		color: #64748b;
		font-family: inherit;
		transition: all 0.18s;
	}

	.role-pill:hover {
		border-color: #cdeae6;
		color: #0d5d56;
	}

	.role-pill.active {
		background: linear-gradient(135deg, #117d74, #0d5d56);
		border-color: transparent;
		color: #fff;
		box-shadow: 0 4px 12px rgba(13, 93, 86, 0.2);
	}

	.role-count {
		background: rgba(0, 0, 0, 0.08);
		padding: 0.05rem 0.45rem;
		border-radius: 999px;
		font-size: 0.7rem;
	}

	.role-pill.active .role-count {
		background: rgba(255, 255, 255, 0.22);
	}

	/* ─── User cells ─── */
	.user-cell {
		display: flex;
		align-items: center;
		gap: 0.65rem;
	}

	.user-avatar {
		width: 34px;
		height: 34px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.82rem;
		font-weight: 700;
		color: #fff;
		flex-shrink: 0;
	}

	.user-avatar.tone-teal {
		background: linear-gradient(135deg, #117d74, #0d5d56);
	}
	.user-avatar.tone-blue {
		background: linear-gradient(135deg, #1d4ed8, #3b82f6);
	}
	.user-avatar.tone-green {
		background: linear-gradient(135deg, #059669, #10b981);
	}
	.user-avatar.tone-orange {
		background: linear-gradient(135deg, #d97706, #f59e0b);
	}

	/* tone-specific badges override base for role colour */
	.adm-badge.tone-teal {
		background: #e6f2f0;
		color: #0a4a44;
	}
	.adm-badge.tone-blue {
		background: #dbeafe;
		color: #1d4ed8;
	}
	.adm-badge.tone-green {
		background: #d1fae5;
		color: #065f46;
	}
	.adm-badge.tone-orange {
		background: #fef0dd;
		color: #b45f00;
	}

	.status {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.78rem;
		font-weight: 600;
	}
	.status.active {
		color: #047857;
	}
	.status.inactive {
		color: #94a3b8;
	}

	.protected {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		font-size: 0.74rem;
		font-weight: 600;
		color: #64748b;
		background: var(--adm-line-soft);
		padding: 0.3rem 0.6rem;
		border-radius: 7px;
	}
</style>
