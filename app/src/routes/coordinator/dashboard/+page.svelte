<script lang="ts">
	import type { PageData } from './$types';
	import type { Icon } from 'lucide-svelte';
	import { reveal, lift } from '$lib/admin/motion';

	import Users from 'lucide-svelte/icons/users';
	import GraduationCap from 'lucide-svelte/icons/graduation-cap';
	import BookOpen from 'lucide-svelte/icons/book-open';
	import CalendarDays from 'lucide-svelte/icons/calendar-days';
	import UserPlus from 'lucide-svelte/icons/user-plus';
	import Zap from 'lucide-svelte/icons/zap';
	import ArrowUpRight from 'lucide-svelte/icons/arrow-up-right';
	import TriangleAlert from 'lucide-svelte/icons/triangle-alert';

	let { data }: { data: PageData } = $props();

	type Stat = {
		icon: typeof Icon;
		label: string;
		value: number;
		href: string;
		tone: 'teal' | 'orange' | 'green';
	};

	const stats: Stat[] = [
		{
			icon: Users,
			label: 'Faculty',
			value: data.stats.faculty,
			href: '/coordinator/faculty',
			tone: 'teal'
		},
		{
			icon: GraduationCap,
			label: 'Students',
			value: data.stats.students,
			href: '/coordinator/students',
			tone: 'orange'
		},
		{
			icon: BookOpen,
			label: 'Courses',
			value: data.stats.courses,
			href: '/coordinator/courses',
			tone: 'green'
		}
	];

	type QuickLink = { icon: typeof Icon; label: string; href: string; desc: string };

	const quickLinks: QuickLink[] = [
		{
			icon: UserPlus,
			label: 'Add Faculty',
			href: '/coordinator/faculty',
			desc: 'Register a new teacher'
		},
		{
			icon: UserPlus,
			label: 'Add Student',
			href: '/coordinator/students',
			desc: 'Enroll a new student'
		},
		{
			icon: BookOpen,
			label: 'Manage Courses',
			href: '/coordinator/courses',
			desc: 'Add or assign courses'
		},
		{
			icon: CalendarDays,
			label: 'Timetable',
			href: '/coordinator/timetable',
			desc: 'View class schedule'
		}
	];
</script>

<svelte:head><title>Dashboard — Coordinator | GPGC Portal</title></svelte:head>

<div class="adm-page">
	<div class="dash-head">
		<div>
			<h1 class="adm-title">Welcome, {data.user?.name ?? 'Coordinator'}</h1>
			<p class="adm-sub">{data.department?.name ?? 'No department assigned'} · Overview</p>
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

	{#if !data.department}
		<div class="adm-alert adm-alert--error">
			<TriangleAlert size={18} stroke-width={2} />
			<span>You have not been assigned to a department yet. Contact the Super Admin.</span>
		</div>
	{:else}
		<!-- Stats -->
		<div class="stats-grid">
			{#each stats as s, i (s.label)}
				{@const Icon = s.icon}
				<a href={s.href} class="stat-card" use:reveal={{ delay: i * 80, y: 16 }} use:lift>
					<span class="stat-icon tone-{s.tone}"><Icon size={22} stroke-width={1.75} /></span>
					<div class="stat-body">
						<div class="stat-value">{s.value}</div>
						<div class="stat-label">{s.label}</div>
					</div>
					<ArrowUpRight class="stat-arrow" size={18} stroke-width={2} />
				</a>
			{/each}
		</div>

		<!-- Content Grid -->
		<div class="content-grid">
			<!-- Recent Faculty -->
			<div class="adm-card" use:reveal={{ delay: 120, y: 18 }}>
				<div class="adm-card__head">
					<h2 class="adm-card__title"><Users size={18} stroke-width={1.75} /> Recent Faculty</h2>
					<a href="/coordinator/faculty" class="card-action">
						View all <ArrowUpRight size={13} stroke-width={2.25} />
					</a>
				</div>
				<div class="adm-card__body">
					{#if data.recentFaculty.length > 0}
						<div class="list">
							{#each data.recentFaculty as member (member.id ?? member.name)}
								<div class="list-item">
									<div class="list-avatar">{(member.name ?? '?').charAt(0).toUpperCase()}</div>
									<div class="list-info">
										<div class="list-name">{member.name}</div>
										<div class="list-sub">{member.designation}</div>
									</div>
									{#if member.is_hod}
										<span class="adm-badge adm-badge--amber">HOD</span>
									{/if}
								</div>
							{/each}
						</div>
					{:else}
						<div class="adm-empty">
							<div class="adm-empty__icon"><Users size={24} stroke-width={1.75} /></div>
							<h3>No faculty added yet</h3>
							<p>Start by registering your first teacher.</p>
							<a href="/coordinator/faculty" class="adm-btn adm-btn--primary adm-btn--sm">
								Add Faculty
							</a>
						</div>
					{/if}
				</div>
			</div>

			<!-- Recent Students -->
			<div class="adm-card" use:reveal={{ delay: 180, y: 18 }}>
				<div class="adm-card__head">
					<h2 class="adm-card__title">
						<GraduationCap size={18} stroke-width={1.75} /> Recent Students
					</h2>
					<a href="/coordinator/students" class="card-action">
						View all <ArrowUpRight size={13} stroke-width={2.25} />
					</a>
				</div>
				<div class="adm-card__body">
					{#if data.recentStudents.length > 0}
						<div class="list">
							{#each data.recentStudents as student (student.id ?? student.roll_number)}
								<div class="list-item">
									<div class="list-avatar alt">
										{(student.name ?? '?').charAt(0).toUpperCase()}
									</div>
									<div class="list-info">
										<div class="list-name">{student.name}</div>
										<div class="list-sub">{student.roll_number} · Semester {student.semester}</div>
									</div>
								</div>
							{/each}
						</div>
					{:else}
						<div class="adm-empty">
							<div class="adm-empty__icon"><GraduationCap size={24} stroke-width={1.75} /></div>
							<h3>No students enrolled yet</h3>
							<p>Enroll your first student to get started.</p>
							<a href="/coordinator/students" class="adm-btn adm-btn--primary adm-btn--sm">
								Add Student
							</a>
						</div>
					{/if}
				</div>
			</div>

			<!-- Quick Links -->
			<div class="adm-card span-2" use:reveal={{ delay: 240, y: 18 }}>
				<div class="adm-card__head">
					<h2 class="adm-card__title"><Zap size={18} stroke-width={1.75} /> Quick Actions</h2>
				</div>
				<div class="adm-card__body">
					<div class="quick-grid">
						{#each quickLinks as link (link.label)}
							{@const Icon = link.icon}
							<a href={link.href} class="quick-card">
								<span class="quick-icon"><Icon size={18} stroke-width={1.75} /></span>
								<div class="quick-text">
									<div class="quick-label">{link.label}</div>
									<div class="quick-desc">{link.desc}</div>
								</div>
								<ArrowUpRight class="quick-arrow" size={15} stroke-width={2} />
							</a>
						{/each}
					</div>
				</div>
			</div>
		</div>
	{/if}
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
		color: var(--adm-muted);
		white-space: nowrap;
		background: #fff;
		border: 1px solid var(--adm-line);
		padding: 0.45rem 0.8rem;
		border-radius: 8px;
	}

	/* Stats */
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
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
	.stat-icon.tone-green {
		background: #d1fae5;
		color: #065f46;
	}

	.stat-body {
		flex: 1;
		min-width: 0;
	}

	.stat-value {
		font-size: 1.85rem;
		font-weight: 700;
		color: var(--adm-ink);
		line-height: 1;
		letter-spacing: -0.02em;
	}

	.stat-label {
		font-size: 0.74rem;
		color: var(--adm-muted);
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
		color: var(--adm-accent);
		transform: translate(2px, -2px);
	}

	/* Content Grid */
	.content-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.25rem;
		align-items: start;
	}

	.span-2 {
		grid-column: 1 / -1;
	}

	.card-action {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		font-size: 0.8rem;
		color: var(--adm-accent);
		text-decoration: none;
		font-weight: 600;
		transition: color 0.15s;
	}

	.card-action:hover {
		color: var(--adm-accent-dark);
	}

	/* List */
	.list {
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
	}

	.list-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.65rem 0.8rem;
		border-radius: 10px;
		background: var(--adm-bg);
		border: 1px solid var(--adm-line);
		transition: border-color 0.15s;
	}

	.list-item:hover {
		border-color: #cdeae6;
	}

	.list-avatar {
		width: 34px;
		height: 34px;
		border-radius: 50%;
		background: linear-gradient(135deg, #117d74, #0d5d56);
		color: #fff;
		font-weight: 700;
		font-size: 0.85rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.list-avatar.alt {
		background: linear-gradient(135deg, #f7941d, #d97706);
	}

	.list-info {
		flex: 1;
		min-width: 0;
	}

	.list-name {
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--adm-ink);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.list-sub {
		font-size: 0.73rem;
		color: var(--adm-muted);
		margin-top: 0.1rem;
	}

	/* Quick Actions */
	.quick-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.7rem;
	}

	.quick-card {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		padding: 0.85rem 1rem;
		border-radius: 11px;
		background: var(--adm-bg);
		border: 1px solid var(--adm-line);
		text-decoration: none;
		transition:
			border-color 0.15s,
			background 0.15s;
	}

	.quick-card:hover {
		border-color: #cdeae6;
		background: #fbfdfc;
	}

	.quick-icon {
		display: grid;
		place-items: center;
		width: 38px;
		height: 38px;
		border-radius: 10px;
		background: #e6f2f0;
		color: var(--adm-accent);
		flex-shrink: 0;
	}

	.quick-text {
		flex: 1;
		min-width: 0;
	}

	.quick-label {
		font-size: 0.84rem;
		font-weight: 600;
		color: var(--adm-ink);
	}

	.quick-desc {
		font-size: 0.73rem;
		color: var(--adm-muted);
		margin-top: 0.1rem;
	}

	.quick-card :global(.quick-arrow) {
		color: #cbd5e1;
		transition:
			transform 0.2s,
			color 0.2s;
	}

	.quick-card:hover :global(.quick-arrow) {
		color: var(--adm-accent);
		transform: translate(2px, -2px);
	}

	@media (max-width: 1024px) {
		.stats-grid {
			grid-template-columns: 1fr 1fr;
		}
		.content-grid {
			grid-template-columns: 1fr;
		}
		.span-2 {
			grid-column: auto;
		}
	}

	@media (max-width: 560px) {
		.stats-grid {
			grid-template-columns: 1fr;
		}
		.quick-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
