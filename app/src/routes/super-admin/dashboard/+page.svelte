<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let totalUsers = $derived(
		(data.userCounts?.coordinator ?? 0) +
		(data.userCounts?.faculty ?? 0) +
		(data.userCounts?.student ?? 0)
	);

	let statsCards = $derived([
		{
			icon: '🏛️',
			label: 'Departments',
			value: data.departments?.length ?? 0,
			color: 'blue',
			href: '/super-admin/departments'
		},
		{
			icon: '👥',
			label: 'Total Users',
			value: totalUsers,
			color: 'purple',
			href: '/super-admin/users'
		},
		{
			icon: '👨‍🏫',
			label: 'Faculty',
			value: data.userCounts?.faculty ?? 0,
			color: 'green',
			href: '/super-admin/users'
		},
		{
			icon: '🎓',
			label: 'Students',
			value: data.userCounts?.student ?? 0,
			color: 'orange',
			href: '/super-admin/users'
		}
	]);

	const quickActions = [
		{ icon: '🏛️', label: 'Add Department', href: '/super-admin/departments', desc: 'Create a new academic department' },
		{ icon: '👤', label: 'Add User', href: '/super-admin/users', desc: 'Create coordinator, faculty or student account' },
		{ icon: '📢', label: 'Post Announcement', href: '/super-admin/announcements', desc: 'Send a global or department-wide notice' },
		{ icon: '📅', label: 'Add Event', href: '/super-admin/events', desc: 'Schedule an upcoming campus event' }
	];
</script>

<svelte:head>
	<title>Dashboard — Super Admin | GPGC Portal</title>
</svelte:head>

<div class="dashboard">
	<!-- Welcome Header -->
	<div class="page-header">
		<div>
			<h1 class="page-title">Super Admin Dashboard</h1>
			<p class="page-subtitle">Welcome back! Here's an overview of the university system.</p>
		</div>
		<div class="header-date">
			{new Date().toLocaleDateString('en-PK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
		</div>
	</div>

	<!-- Stats Grid -->
	<div class="stats-grid">
		{#each statsCards as card}
			<a href={card.href} class="stat-card color-{card.color}">
				<div class="stat-icon">{card.icon}</div>
				<div class="stat-body">
					<div class="stat-value">{card.value}</div>
					<div class="stat-label">{card.label}</div>
				</div>
				<div class="stat-arrow">→</div>
			</a>
		{/each}
	</div>

	<!-- Content Grid -->
	<div class="content-grid">
		<!-- Departments List -->
		<div class="card">
			<div class="card-header">
				<h2 class="card-title">📚 Departments</h2>
				<a href="/super-admin/departments" class="card-action">Manage All →</a>
			</div>
			<div class="dept-list">
				{#if data.departments && data.departments.length > 0}
					{#each data.departments as dept}
						<div class="dept-item">
							<div class="dept-icon">🏛️</div>
							<div class="dept-info">
								<div class="dept-name">{dept.name}</div>
								<div class="dept-coordinator">
									{dept.coordinator_name ? `Coordinator: ${dept.coordinator_name}` : 'No coordinator assigned'}
								</div>
							</div>
							<a href="/super-admin/departments" class="dept-edit">✏️</a>
						</div>
					{/each}
				{:else}
					<div class="empty-state">
						<span>🏛️</span>
						<p>No departments yet. <a href="/super-admin/departments">Create one →</a></p>
					</div>
				{/if}
			</div>
		</div>

		<!-- Quick Actions -->
		<div class="card">
			<div class="card-header">
				<h2 class="card-title">⚡ Quick Actions</h2>
			</div>
			<div class="actions-grid">
				{#each quickActions as action}
					<a href={action.href} class="action-card">
						<span class="action-icon">{action.icon}</span>
						<div>
							<div class="action-label">{action.label}</div>
							<div class="action-desc">{action.desc}</div>
						</div>
					</a>
				{/each}
			</div>
		</div>

		<!-- System Status -->
		<div class="card">
			<div class="card-header">
				<h2 class="card-title">🔧 System Status</h2>
			</div>
			<div class="status-list">
				<div class="status-item">
					<span class="status-dot green"></span>
					<span class="status-label">Database Connection</span>
					<span class="status-value">Active</span>
				</div>
				<div class="status-item">
					<span class="status-dot green"></span>
					<span class="status-label">Authentication System</span>
					<span class="status-value">Online</span>
				</div>
				<div class="status-item">
					<span class="status-dot {(data.userCounts?.coordinator ?? 0) > 0 ? 'green' : 'yellow'}"></span>
					<span class="status-label">Coordinators Assigned</span>
					<span class="status-value">{data.userCounts?.coordinator ?? 0} Active</span>
				</div>
				<div class="status-item">
					<span class="status-dot {data.departments?.length > 0 ? 'green' : 'red'}"></span>
					<span class="status-label">Departments Configured</span>
					<span class="status-value">{data.departments?.length ?? 0} Total</span>
				</div>
			</div>

			<div class="setup-guide">
				<h3 class="setup-title">📋 Setup Checklist</h3>
				<div class="setup-steps">
					<div class="setup-step {data.departments?.length > 0 ? 'done' : 'todo'}">
						<span class="step-check">{data.departments?.length > 0 ? '✅' : '⭕'}</span>
						<span>Create at least one department</span>
					</div>
					<div class="setup-step {(data.userCounts?.coordinator ?? 0) > 0 ? 'done' : 'todo'}">
						<span class="step-check">{(data.userCounts?.coordinator ?? 0) > 0 ? '✅' : '⭕'}</span>
						<span>Add department coordinators</span>
					</div>
					<div class="setup-step {(data.userCounts?.faculty ?? 0) > 0 ? 'done' : 'todo'}">
						<span class="step-check">{(data.userCounts?.faculty ?? 0) > 0 ? '✅' : '⭕'}</span>
						<span>Register faculty members</span>
					</div>
					<div class="setup-step {(data.userCounts?.student ?? 0) > 0 ? 'done' : 'todo'}">
						<span class="step-check">{(data.userCounts?.student ?? 0) > 0 ? '✅' : '⭕'}</span>
						<span>Enroll students</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.dashboard {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	/* ─── Page Header ─── */
	.page-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
	}

	.page-title {
		font-size: 1.6rem;
		font-weight: 700;
		color: #0f172a;
		margin: 0 0 0.3rem;
	}

	.page-subtitle {
		font-size: 0.9rem;
		color: #64748b;
		margin: 0;
	}

	.header-date {
		font-size: 0.82rem;
		color: #94a3b8;
		white-space: nowrap;
		padding-top: 0.4rem;
	}

	/* ─── Stats Grid ─── */
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
	}

	.stat-card {
		background: white;
		border-radius: 14px;
		padding: 1.25rem;
		display: flex;
		align-items: center;
		gap: 1rem;
		text-decoration: none;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
		border: 1px solid #e2e8f0;
		transition: transform 0.2s, box-shadow 0.2s;
		position: relative;
		overflow: hidden;
	}

	.stat-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
	}

	.stat-card.color-blue::before { background: linear-gradient(90deg, #3b82f6, #1d4ed8); }
	.stat-card.color-purple::before { background: linear-gradient(90deg, #8b5cf6, #7c3aed); }
	.stat-card.color-green::before { background: linear-gradient(90deg, #10b981, #059669); }
	.stat-card.color-orange::before { background: linear-gradient(90deg, #f59e0b, #d97706); }

	.stat-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.stat-icon {
		font-size: 1.75rem;
		flex-shrink: 0;
	}

	.stat-body {
		flex: 1;
	}

	.stat-value {
		font-size: 1.8rem;
		font-weight: 700;
		color: #0f172a;
		line-height: 1;
	}

	.stat-label {
		font-size: 0.78rem;
		color: #64748b;
		font-weight: 500;
		margin-top: 0.25rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.stat-arrow {
		color: #cbd5e1;
		font-size: 1rem;
	}

	/* ─── Content Grid ─── */
	.content-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.25rem;
	}

	/* ─── Card ─── */
	.card {
		background: white;
		border-radius: 14px;
		padding: 1.5rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
		border: 1px solid #e2e8f0;
	}

	.card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1.25rem;
	}

	.card-title {
		font-size: 1rem;
		font-weight: 700;
		color: #0f172a;
		margin: 0;
	}

	.card-action {
		font-size: 0.8rem;
		color: #6366f1;
		text-decoration: none;
		font-weight: 500;
		transition: color 0.2s;
	}

	.card-action:hover {
		color: #4f46e5;
	}

	/* ─── Dept List ─── */
	.dept-list {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.dept-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.7rem 0.9rem;
		border-radius: 10px;
		background: #f8fafc;
		border: 1px solid #e2e8f0;
	}

	.dept-icon {
		font-size: 1.2rem;
		flex-shrink: 0;
	}

	.dept-info {
		flex: 1;
		min-width: 0;
	}

	.dept-name {
		font-size: 0.88rem;
		font-weight: 600;
		color: #0f172a;
	}

	.dept-coordinator {
		font-size: 0.75rem;
		color: #64748b;
	}

	.dept-edit {
		text-decoration: none;
		font-size: 0.9rem;
		opacity: 0.5;
		transition: opacity 0.2s;
	}

	.dept-edit:hover { opacity: 1; }

	.empty-state {
		text-align: center;
		padding: 1.5rem;
		color: #94a3b8;
		font-size: 0.9rem;
	}

	.empty-state span {
		font-size: 2rem;
		display: block;
		margin-bottom: 0.5rem;
	}

	.empty-state a {
		color: #6366f1;
		text-decoration: none;
	}

	/* ─── Quick Actions ─── */
	.actions-grid {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.action-card {
		display: flex;
		align-items: center;
		gap: 0.9rem;
		padding: 0.75rem 1rem;
		border-radius: 10px;
		background: #f8fafc;
		border: 1px solid #e2e8f0;
		text-decoration: none;
		transition: all 0.2s;
	}

	.action-card:hover {
		background: #ede9fe;
		border-color: #c4b5fd;
	}

	.action-icon {
		font-size: 1.3rem;
		flex-shrink: 0;
	}

	.action-label {
		font-size: 0.875rem;
		font-weight: 600;
		color: #0f172a;
	}

	.action-desc {
		font-size: 0.75rem;
		color: #64748b;
		margin-top: 0.1rem;
	}

	/* ─── Status List ─── */
	.status-list {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		margin-bottom: 1.25rem;
	}

	.status-item {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		font-size: 0.85rem;
	}

	.status-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.status-dot.green { background: #10b981; }
	.status-dot.yellow { background: #f59e0b; }
	.status-dot.red { background: #ef4444; }

	.status-label {
		flex: 1;
		color: #475569;
	}

	.status-value {
		color: #0f172a;
		font-weight: 600;
		font-size: 0.8rem;
	}

	/* ─── Setup Guide ─── */
	.setup-guide {
		background: #f8fafc;
		border-radius: 10px;
		padding: 1rem;
		border: 1px solid #e2e8f0;
	}

	.setup-title {
		font-size: 0.85rem;
		font-weight: 700;
		color: #0f172a;
		margin: 0 0 0.75rem;
	}

	.setup-steps {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.setup-step {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		font-size: 0.82rem;
	}

	.setup-step.done {
		color: #64748b;
	}

	.setup-step.todo {
		color: #0f172a;
		font-weight: 500;
	}

	.step-check {
		font-size: 0.9rem;
	}

	/* ─── Responsive ─── */
	@media (max-width: 1024px) {
		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
		}
		.content-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
