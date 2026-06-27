<script lang="ts">
	import type { PageData } from './$types';
	import type { Icon } from 'lucide-svelte';
	import { reveal, lift } from '$lib/admin/motion';

	type IconComponent = typeof Icon;

	import Building2 from 'lucide-svelte/icons/building-2';
	import Users from 'lucide-svelte/icons/users';
	import BookOpen from 'lucide-svelte/icons/book-open';
	import GraduationCap from 'lucide-svelte/icons/graduation-cap';
	import ArrowUpRight from 'lucide-svelte/icons/arrow-up-right';
	import UserPlus from 'lucide-svelte/icons/user-plus';
	import Megaphone from 'lucide-svelte/icons/megaphone';
	import CalendarPlus from 'lucide-svelte/icons/calendar-plus';
	import Zap from 'lucide-svelte/icons/zap';
	import ShieldCheck from 'lucide-svelte/icons/shield-check';
	import CircleCheck from 'lucide-svelte/icons/circle-check';
	import Circle from 'lucide-svelte/icons/circle';
	import Pencil from 'lucide-svelte/icons/pencil';

	let { data }: { data: PageData } = $props();

	let totalUsers = $derived(
		(data.userCounts?.coordinator ?? 0) +
			(data.userCounts?.faculty ?? 0) +
			(data.userCounts?.student ?? 0)
	);

	type Stat = {
		icon: IconComponent;
		label: string;
		value: number;
		tone: 'teal' | 'orange';
		href: string;
	};

	let statsCards = $derived<Stat[]>([
		{
			icon: Building2,
			label: 'Departments',
			value: data.departments?.length ?? 0,
			tone: 'teal',
			href: '/super-admin/departments'
		},
		{
			icon: Users,
			label: 'Total Users',
			value: totalUsers,
			tone: 'teal',
			href: '/super-admin/users'
		},
		{
			icon: BookOpen,
			label: 'Faculty',
			value: data.userCounts?.faculty ?? 0,
			tone: 'teal',
			href: '/super-admin/users'
		},
		{
			icon: GraduationCap,
			label: 'Students',
			value: data.userCounts?.student ?? 0,
			tone: 'orange',
			href: '/super-admin/users'
		}
	]);

	type Action = {
		icon: IconComponent;
		label: string;
		href: string;
		desc: string;
	};

	const quickActions: Action[] = [
		{
			icon: Building2,
			label: 'Add Department',
			href: '/super-admin/departments',
			desc: 'Create a new academic department'
		},
		{
			icon: UserPlus,
			label: 'Add User',
			href: '/super-admin/users',
			desc: 'Create coordinator, faculty or student account'
		},
		{
			icon: Megaphone,
			label: 'Post Announcement',
			href: '/super-admin/announcements',
			desc: 'Send a global or department-wide notice'
		},
		{
			icon: CalendarPlus,
			label: 'Add Event',
			href: '/super-admin/events',
			desc: 'Schedule an upcoming campus event'
		}
	];

	const setupSteps = $derived([
		{
			label: 'Create at least one department',
			done: (data.departments?.length ?? 0) > 0
		},
		{ label: 'Add department coordinators', done: (data.userCounts?.coordinator ?? 0) > 0 },
		{ label: 'Register faculty members', done: (data.userCounts?.faculty ?? 0) > 0 },
		{ label: 'Enroll students', done: (data.userCounts?.student ?? 0) > 0 }
	]);
</script>

<svelte:head>
	<title>Dashboard — Super Admin | GPGC Portal</title>
</svelte:head>

<div class="adm-page">
	<!-- Welcome Header -->
	<div class="dash-head">
		<div>
			<h1 class="adm-title">Super Admin Dashboard</h1>
			<p class="adm-sub">Welcome back — here is an overview of the university system.</p>
		</div>
		<div class="head-date">
			{new Date().toLocaleDateString('en-PK', {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})}
		</div>
	</div>

	<!-- Stats Grid -->
	<div class="stats-grid">
		{#each statsCards as card, i (card.label)}
			{@const Icon = card.icon}
			<a
				href={card.href}
				class="stat-card tone-{card.tone}"
				use:reveal={{ delay: i * 80, y: 18 }}
				use:lift
			>
				<span class="stat-icon tone-{card.tone}">
					<Icon size={22} stroke-width={1.75} />
				</span>
				<div class="stat-body">
					<div class="stat-value">{card.value}</div>
					<div class="stat-label">{card.label}</div>
				</div>
				<ArrowUpRight class="stat-arrow" size={18} stroke-width={2} />
			</a>
		{/each}
	</div>

	<!-- Content Grid -->
	<div class="content-grid">
		<!-- Departments List -->
		<div class="adm-card" use:reveal={{ delay: 120, y: 20 }}>
			<div class="adm-card__head">
				<h2 class="adm-card__title"><Building2 size={18} stroke-width={1.75} /> Departments</h2>
				<a href="/super-admin/departments" class="card-action">
					Manage all <ArrowUpRight size={13} stroke-width={2.25} />
				</a>
			</div>
			<div class="adm-card__body dept-list">
				{#if data.departments && data.departments.length > 0}
					{#each data.departments as dept (dept.id)}
						<div class="dept-item">
							<span class="dept-icon"><Building2 size={16} stroke-width={1.75} /></span>
							<div class="dept-info">
								<div class="dept-name">{dept.name}</div>
								<div class="dept-coordinator">
									{dept.coordinator_name
										? `Coordinator: ${dept.coordinator_name}`
										: 'No coordinator assigned'}
								</div>
							</div>
							<a href="/super-admin/departments" class="dept-edit" title="Edit">
								<Pencil size={15} stroke-width={1.75} />
							</a>
						</div>
					{/each}
				{:else}
					<div class="adm-empty" style="padding:2rem 1rem">
						<div class="adm-empty__icon"><Building2 size={24} stroke-width={1.75} /></div>
						<h3>No departments yet</h3>
						<p>Create your first academic department to get started.</p>
						<a href="/super-admin/departments" class="adm-btn adm-btn--primary adm-btn--sm">
							Add Department
						</a>
					</div>
				{/if}
			</div>
		</div>

		<!-- Quick Actions -->
		<div class="adm-card" use:reveal={{ delay: 180, y: 20 }}>
			<div class="adm-card__head">
				<h2 class="adm-card__title"><Zap size={18} stroke-width={1.75} /> Quick Actions</h2>
			</div>
			<div class="adm-card__body actions-grid">
				{#each quickActions as action (action.label)}
					{@const Icon = action.icon}
					<a href={action.href} class="action-card">
						<span class="action-icon"><Icon size={18} stroke-width={1.75} /></span>
						<div class="action-text">
							<div class="action-label">{action.label}</div>
							<div class="action-desc">{action.desc}</div>
						</div>
						<ArrowUpRight class="action-arrow" size={15} stroke-width={2} />
					</a>
				{/each}
			</div>
		</div>

		<!-- System Status -->
		<div class="adm-card status-card" use:reveal={{ delay: 240, y: 20 }}>
			<div class="adm-card__head">
				<h2 class="adm-card__title">
					<ShieldCheck size={18} stroke-width={1.75} /> System Status
				</h2>
			</div>
			<div class="adm-card__body">
				<div class="status-list">
					<div class="status-item">
						<span class="adm-status-dot adm-status-dot--green"></span>
						<span class="status-label">Database Connection</span>
						<span class="status-value">Active</span>
					</div>
					<div class="status-item">
						<span class="adm-status-dot adm-status-dot--green"></span>
						<span class="status-label">Authentication System</span>
						<span class="status-value">Online</span>
					</div>
					<div class="status-item">
						<span
							class="adm-status-dot {(data.userCounts?.coordinator ?? 0) > 0
								? 'adm-status-dot--green'
								: 'adm-status-dot--amber'}"
						></span>
						<span class="status-label">Coordinators Assigned</span>
						<span class="status-value">{data.userCounts?.coordinator ?? 0} Active</span>
					</div>
					<div class="status-item">
						<span
							class="adm-status-dot {(data.departments?.length ?? 0) > 0
								? 'adm-status-dot--green'
								: 'adm-status-dot--red'}"
						></span>
						<span class="status-label">Departments Configured</span>
						<span class="status-value">{data.departments?.length ?? 0} Total</span>
					</div>
				</div>

				<div class="setup-guide">
					<h3 class="setup-title">Setup Checklist</h3>
					<div class="setup-steps">
						{#each setupSteps as step (step.label)}
							<div class="setup-step {step.done ? 'done' : 'todo'}">
								<span class="step-check">
									{#if step.done}
										<CircleCheck size={16} stroke-width={2} class="check-done" />
									{:else}
										<Circle size={16} stroke-width={1.75} class="check-todo" />
									{/if}
								</span>
								<span>{step.label}</span>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.dash-head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.head-date {
		font-size: 0.82rem;
		color: #94a3b8;
		white-space: nowrap;
		padding-top: 0.4rem;
		background: #fff;
		border: 1px solid var(--adm-line);
		padding: 0.45rem 0.8rem;
		border-radius: 8px;
	}

	/* ─── Stats Grid ─── */
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
	}

	.stat-card {
		background: #fff;
		border-radius: 14px;
		padding: 1.25rem;
		display: flex;
		align-items: center;
		gap: 1rem;
		text-decoration: none;
		border: 1px solid var(--adm-line);
		box-shadow: var(--adm-shadow);
		position: relative;
		overflow: hidden;
	}

	.stat-card::after {
		content: '';
		position: absolute;
		inset: auto -30% -60% auto;
		width: 60%;
		height: 100%;
		background: radial-gradient(circle, rgba(13, 93, 86, 0.05), transparent 70%);
		pointer-events: none;
	}

	.stat-icon {
		width: 48px;
		height: 48px;
		border-radius: 12px;
		display: grid;
		place-items: center;
		flex-shrink: 0;
	}

	.stat-icon.tone-teal {
		background: #e6f2f0;
		color: #0d5d56;
	}

	.stat-icon.tone-orange {
		background: #fef0dd;
		color: #b45f00;
	}

	.stat-body {
		flex: 1;
		min-width: 0;
	}

	.stat-value {
		font-size: 1.85rem;
		font-weight: 700;
		color: #0f172a;
		line-height: 1;
		letter-spacing: -0.02em;
	}

	.stat-label {
		font-size: 0.74rem;
		color: #64748b;
		font-weight: 600;
		margin-top: 0.3rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.stat-card :global(.stat-arrow) {
		color: #cbd5e1;
		transition:
			transform 0.2s,
			color 0.2s;
	}

	.stat-card:hover :global(.stat-arrow) {
		color: #0d5d56;
		transform: translate(2px, -2px);
	}

	/* ─── Content Grid ─── */
	.content-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.25rem;
		align-items: start;
	}

	.status-card {
		grid-column: 1 / -1;
	}

	.card-action {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		font-size: 0.8rem;
		color: #0d5d56;
		text-decoration: none;
		font-weight: 600;
		transition: color 0.15s;
	}

	.card-action:hover {
		color: #0a4a44;
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
		background: var(--adm-bg);
		border: 1px solid var(--adm-line);
		transition:
			border-color 0.15s,
			background 0.15s;
	}

	.dept-item:hover {
		border-color: #cdeae6;
		background: #fbfdfc;
	}

	.dept-icon {
		display: grid;
		place-items: center;
		width: 32px;
		height: 32px;
		border-radius: 8px;
		background: #e6f2f0;
		color: #0d5d56;
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
		display: grid;
		place-items: center;
		width: 30px;
		height: 30px;
		border-radius: 7px;
		color: #94a3b8;
		text-decoration: none;
		transition:
			background 0.15s,
			color 0.15s;
	}

	.dept-edit:hover {
		background: #e6f2f0;
		color: #0d5d56;
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
		background: var(--adm-bg);
		border: 1px solid var(--adm-line);
		text-decoration: none;
		transition:
			border-color 0.15s,
			background 0.15s,
			transform 0.15s;
	}

	.action-card:hover {
		border-color: #cdeae6;
		background: #fbfdfc;
	}

	.action-icon {
		display: grid;
		place-items: center;
		width: 36px;
		height: 36px;
		border-radius: 9px;
		background: #e6f2f0;
		color: #0d5d56;
		flex-shrink: 0;
	}

	.action-text {
		flex: 1;
		min-width: 0;
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

	.action-card :global(.action-arrow) {
		color: #cbd5e1;
		transition:
			transform 0.2s,
			color 0.2s;
	}

	.action-card:hover :global(.action-arrow) {
		color: #0d5d56;
		transform: translate(2px, -2px);
	}

	/* ─── Status List ─── */
	.status-list {
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
		margin-bottom: 1.25rem;
	}

	.status-item {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		font-size: 0.875rem;
		padding: 0.35rem 0;
	}

	.status-label {
		flex: 1;
		color: #475569;
	}

	.status-value {
		color: #0f172a;
		font-weight: 600;
		font-size: 0.82rem;
	}

	/* ─── Setup Guide ─── */
	.setup-guide {
		background: var(--adm-bg);
		border-radius: 10px;
		padding: 1rem;
		border: 1px solid var(--adm-line);
	}

	.setup-title {
		font-size: 0.78rem;
		font-weight: 700;
		color: #0f172a;
		margin: 0 0 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.setup-steps {
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
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

	.step-check :global(.check-done) {
		color: #0d5d56;
	}

	.step-check :global(.check-todo) {
		color: #cbd5e1;
	}

	/* ─── Responsive ─── */
	@media (max-width: 1024px) {
		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
		}
		.content-grid {
			grid-template-columns: 1fr;
		}
		.status-card {
			grid-column: auto;
		}
	}

	@media (max-width: 520px) {
		.stats-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
