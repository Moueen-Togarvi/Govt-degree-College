<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let showModal = $state(false);
	let selectedRole = $state('coordinator');
	let submitting = $state(false);
	let searchQuery = $state('');
	let filterRole = $state('all');

	const roleColors: Record<string, string> = {
		super_admin: 'purple',
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

	$effect(() => {
		if (form?.success) {
			showModal = false;
		}
	});
</script>

<svelte:head>
	<title>Users — Super Admin | GPGC Portal</title>
</svelte:head>

<div class="page">
	<div class="page-header">
		<div>
			<h1 class="page-title">👥 User Management</h1>
			<p class="page-subtitle">Create and manage all portal users across all roles.</p>
		</div>
		<button onclick={() => (showModal = true)} class="btn-primary">+ Add User</button>
	</div>

	{#if form?.error}
		<div class="alert alert-error">❌ {form.error}</div>
	{/if}
	{#if form?.success}
		<div class="alert alert-success">
			✅ User {form.action === 'create' ? 'created' : form.action === 'delete' ? 'deleted' : 'updated'} successfully.
		</div>
	{/if}

	<!-- Filters -->
	<div class="filters">
		<input
			type="search"
			bind:value={searchQuery}
			placeholder="Search by name or email…"
			class="filter-input"
		/>
		<div class="role-filters">
			{#each ['all', 'coordinator', 'faculty', 'student'] as role}
				<button
					onclick={() => (filterRole = role)}
					class="role-filter-btn {filterRole === role ? 'active' : ''}"
				>
					{role === 'all' ? 'All' : roleLabels[role]}
					<span class="role-count">
						{role === 'all' ? data.users.length : data.users.filter((u) => u.role === role).length}
					</span>
				</button>
			{/each}
		</div>
	</div>

	<!-- Users Table -->
	<div class="card">
		{#if filteredUsers.length > 0}
			<table class="data-table">
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Email</th>
						<th>Role</th>
						<th>Status</th>
						<th>Created</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each filteredUsers as user, i}
						<tr>
							<td class="td-num">{i + 1}</td>
							<td>
								<div class="user-cell">
									<div class="user-avatar avatar-{roleColors[user.role]}">
										{user.name.charAt(0).toUpperCase()}
									</div>
									<span class="user-name">{user.name}</span>
								</div>
							</td>
							<td class="td-email">{user.email}</td>
							<td>
								<span class="badge badge-{roleColors[user.role]}">{roleLabels[user.role]}</span>
							</td>
							<td>
								<span class="status-dot {user.is_active ? 'active' : 'inactive'}">
									{user.is_active ? '● Active' : '● Inactive'}
								</span>
							</td>
							<td class="td-date">
								{new Date(user.created_at).toLocaleDateString('en-PK')}
							</td>
							<td>
								<div class="action-btns">
									{#if user.role === 'super_admin'}
										<span class="badge badge-gray" title="Super admin accounts are always active">🔒 Protected</span>
									{:else}
										<form method="POST" action="?/toggle_active" use:enhance>
											<input type="hidden" name="id" value={user.id} />
											<input type="hidden" name="is_active" value={user.is_active} />
											<button type="submit" class="btn-sm {user.is_active ? 'btn-warn' : 'btn-success'}">
												{user.is_active ? 'Deactivate' : 'Activate'}
											</button>
										</form>
										<form
											method="POST"
											action="?/delete"
											use:enhance
										>
											<input type="hidden" name="id" value={user.id} />
											<button
												type="submit"
												class="btn-sm btn-danger"
												onclick={(e) => {
													if (!confirm(`Delete "${user.name}"? This cannot be undone.`)) e.preventDefault();
												}}
											>
												Delete
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
			<div class="empty-state">
				<span class="empty-icon">👥</span>
				<h3>No users found</h3>
				<p>{searchQuery ? 'Try adjusting your search.' : 'Click "Add User" to create the first portal user.'}</p>
			</div>
		{/if}
	</div>
</div>

<!-- Add User Modal -->
{#if showModal}
	<div class="modal-overlay" onclick={() => (showModal = false)} role="presentation">
		<div class="modal" onclick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
			<div class="modal-header">
				<h2 class="modal-title">+ Add New User</h2>
				<button onclick={() => (showModal = false)} class="modal-close">✕</button>
			</div>

			<form
				method="POST"
				action="?/create"
				use:enhance={() => {
					submitting = true;
					return async ({ update }) => {
						submitting = false;
						await update();
					};
				}}
				class="modal-form"
			>
				<div class="form-row">
					<div class="form-group">
						<label for="user-name" class="form-label">Full Name *</label>
						<input id="user-name" type="text" name="name" required placeholder="Muhammad Ali" class="form-input" />
					</div>
					<div class="form-group">
						<label for="user-email" class="form-label">Email *</label>
						<input id="user-email" type="email" name="email" required placeholder="ali@gpgc.edu.pk" class="form-input" />
					</div>
				</div>

				<div class="form-row">
					<div class="form-group">
						<label for="user-password" class="form-label">Password *</label>
						<input id="user-password" type="password" name="password" required minlength="6" placeholder="Min. 6 characters" class="form-input" />
					</div>
					<div class="form-group">
						<label for="user-role" class="form-label">Role *</label>
						<select
							id="user-role"
							name="role"
							class="form-input form-select"
							bind:value={selectedRole}
						>
							<option value="coordinator">Coordinator</option>
							<option value="faculty">Faculty</option>
							<option value="student">Student</option>
						</select>
					</div>
				</div>

				{#if selectedRole === 'faculty' || selectedRole === 'coordinator' || selectedRole === 'student'}
					<div class="form-group">
						<label for="user-dept" class="form-label">Department *</label>
						<select id="user-dept" name="department_id" class="form-input form-select" required>
							<option value="">— Select Department —</option>
							{#each data.departments as dept}
								<option value={dept.id}>{dept.name}</option>
							{/each}
						</select>
					</div>
				{/if}

				{#if selectedRole === 'faculty'}
					<div class="form-group">
						<label for="user-designation" class="form-label">Designation</label>
						<input id="user-designation" type="text" name="designation" placeholder="Lecturer" class="form-input" />
					</div>
				{/if}

				{#if selectedRole === 'student'}
					<div class="form-row">
						<div class="form-group">
							<label for="user-roll" class="form-label">Roll Number *</label>
							<input id="user-roll" type="text" name="roll_number" required placeholder="CS-2022-001" class="form-input" />
						</div>
						<div class="form-group">
							<label for="user-semester" class="form-label">Semester</label>
							<select id="user-semester" name="semester" class="form-input form-select">
								{#each [1,2,3,4,5,6,7,8] as s}
									<option value={s}>Semester {s}</option>
								{/each}
							</select>
						</div>
					</div>
					<div class="form-group">
						<label for="user-session" class="form-label">Session *</label>
						<input id="user-session" type="text" name="session" required placeholder="2022-2026" class="form-input" />
					</div>
				{/if}

				<div class="modal-footer">
					<button type="button" onclick={() => (showModal = false)} class="btn-secondary">Cancel</button>
					<button type="submit" class="btn-primary" disabled={submitting}>
						{#if submitting}<span class="btn-spinner"></span>{/if}
						Create User
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
	.page { display: flex; flex-direction: column; gap: 1.25rem; }
	.page-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }
	.page-title { font-size: 1.4rem; font-weight: 700; color: #0f172a; margin: 0 0 0.25rem; }
	.page-subtitle { font-size: 0.875rem; color: #64748b; margin: 0; }

	.alert { padding: 0.85rem 1rem; border-radius: 10px; font-size: 0.875rem; font-weight: 500; }
	.alert-error { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }
	.alert-success { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }

	.filters { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
	.filter-input {
		flex: 1; min-width: 200px; padding: 0.6rem 0.9rem;
		border: 1.5px solid #e2e8f0; border-radius: 9px; font-size: 0.875rem;
		font-family: inherit; color: #0f172a;
	}
	.filter-input:focus { outline: none; border-color: #7c3aed; }

	.role-filters { display: flex; gap: 0.4rem; flex-wrap: wrap; }
	.role-filter-btn {
		display: flex; align-items: center; gap: 0.4rem;
		padding: 0.5rem 0.9rem; border: 1.5px solid #e2e8f0; border-radius: 999px;
		background: white; font-size: 0.8rem; font-weight: 600; cursor: pointer;
		color: #64748b; font-family: inherit; transition: all 0.2s;
	}
	.role-filter-btn.active { background: #7c3aed; border-color: #7c3aed; color: white; }
	.role-count { background: rgba(0,0,0,0.1); padding: 0.1rem 0.4rem; border-radius: 999px; font-size: 0.7rem; }

	.card { background: white; border-radius: 14px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.06); overflow: hidden; }
	.data-table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
	.data-table th { background: #f8fafc; padding: 0.75rem 1rem; text-align: left; font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #e2e8f0; }
	.data-table td { padding: 0.9rem 1rem; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
	.data-table tr:last-child td { border-bottom: none; }
	.data-table tr:hover td { background: #fafafa; }

	.td-num { color: #94a3b8; font-size: 0.8rem; width: 40px; }
	.td-email { color: #475569; font-size: 0.82rem; }
	.td-date { color: #94a3b8; font-size: 0.8rem; }

	.user-cell { display: flex; align-items: center; gap: 0.65rem; }
	.user-avatar {
		width: 32px; height: 32px; border-radius: 50%;
		display: flex; align-items: center; justify-content: center;
		font-size: 0.8rem; font-weight: 700; color: white; flex-shrink: 0;
	}
	.avatar-purple { background: linear-gradient(135deg, #7c3aed, #a855f7); }
	.avatar-blue { background: linear-gradient(135deg, #1d4ed8, #3b82f6); }
	.avatar-green { background: linear-gradient(135deg, #059669, #10b981); }
	.avatar-orange { background: linear-gradient(135deg, #d97706, #f59e0b); }
	.user-name { font-weight: 600; color: #0f172a; }

	.badge { padding: 0.25rem 0.6rem; border-radius: 999px; font-size: 0.73rem; font-weight: 700; }
	.badge-purple { background: #ede9fe; color: #5b21b6; }
	.badge-blue { background: #dbeafe; color: #1d4ed8; }
	.badge-green { background: #d1fae5; color: #065f46; }
	.badge-orange { background: #fef3c7; color: #92400e; }
	.badge-gray { background: #f1f5f9; color: #64748b; }

	.status-dot { font-size: 0.78rem; font-weight: 600; }
	.status-dot.active { color: #059669; }
	.status-dot.inactive { color: #94a3b8; }

	.action-btns { display: flex; gap: 0.4rem; }
	.btn-sm { padding: 0.3rem 0.65rem; border-radius: 7px; font-size: 0.75rem; font-weight: 600; cursor: pointer; border: none; font-family: inherit; transition: opacity 0.2s; }
	.btn-warn { background: #fffbeb; color: #92400e; border: 1px solid #fde68a; }
	.btn-success { background: #d1fae5; color: #065f46; }
	.btn-danger { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }
	.btn-sm:hover { opacity: 0.8; }

	.btn-primary {
		display: inline-flex; align-items: center; gap: 0.4rem;
		padding: 0.65rem 1.2rem; background: linear-gradient(135deg, #7c3aed, #6d28d9);
		color: white; border: none; border-radius: 10px; font-size: 0.875rem;
		font-weight: 600; font-family: inherit; cursor: pointer; transition: opacity 0.2s; text-decoration: none;
	}
	.btn-primary:hover { opacity: 0.9; }
	.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

	.btn-secondary {
		padding: 0.65rem 1.2rem; background: white; border: 1.5px solid #e2e8f0;
		border-radius: 10px; font-size: 0.875rem; font-weight: 600; color: #374151;
		font-family: inherit; cursor: pointer;
	}

	.empty-state { text-align: center; padding: 3rem 1rem; color: #64748b; }
	.empty-icon { font-size: 3rem; display: block; margin-bottom: 0.75rem; }
	.empty-state h3 { font-size: 1.1rem; color: #0f172a; margin: 0 0 0.4rem; }
	.empty-state p { font-size: 0.875rem; margin: 0; }

	.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 1rem; }
	.modal { background: white; border-radius: 16px; width: 100%; max-width: 540px; box-shadow: 0 20px 60px rgba(0,0,0,0.25); animation: modalIn 0.2s ease-out; max-height: 90vh; overflow-y: auto; }
	@keyframes modalIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
	.modal-header { display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 1.5rem; border-bottom: 1px solid #e2e8f0; }
	.modal-title { font-size: 1.1rem; font-weight: 700; color: #0f172a; margin: 0; }
	.modal-close { background: none; border: none; font-size: 1rem; cursor: pointer; color: #64748b; padding: 0.25rem; border-radius: 6px; }
	.modal-form { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
	.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
	.form-group { display: flex; flex-direction: column; gap: 0.4rem; }
	.form-label { font-size: 0.82rem; font-weight: 600; color: #374151; }
	.form-input { padding: 0.65rem 0.9rem; border: 1.5px solid #e2e8f0; border-radius: 9px; font-size: 0.875rem; font-family: inherit; color: #0f172a; }
	.form-input:focus { outline: none; border-color: #7c3aed; }
	.form-select { cursor: pointer; }
	.modal-footer { display: flex; justify-content: flex-end; gap: 0.75rem; padding-top: 0.5rem; border-top: 1px solid #f1f5f9; }
	.btn-spinner { width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.4); border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; }
	@keyframes spin { to { transform: rotate(360deg); } }
</style>
