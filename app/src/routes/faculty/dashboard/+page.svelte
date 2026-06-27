<script lang="ts">
	import type { PageData } from './$types';
	import { reveal, lift } from '$lib/admin/motion';

	import BookOpen from 'lucide-svelte/icons/book-open';
	import GraduationCap from 'lucide-svelte/icons/graduation-cap';
	import ClipboardCheck from 'lucide-svelte/icons/clipboard-check';
	import FilePenLine from 'lucide-svelte/icons/file-pen-line';
	import FileText from 'lucide-svelte/icons/file-text';
	import Users from 'lucide-svelte/icons/users';
	import CalendarDays from 'lucide-svelte/icons/calendar-days';
	import Zap from 'lucide-svelte/icons/zap';
	import ArrowUpRight from 'lucide-svelte/icons/arrow-up-right';
	import TriangleAlert from 'lucide-svelte/icons/triangle-alert';

	let { data }: { data: PageData } = $props();

	const today = new Date().toLocaleDateString('en-PK', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
</script>

<svelte:head><title>Dashboard — Faculty | GPGC Portal</title></svelte:head>

<div class="adm-page">
	<div class="dash-head">
		<div>
			<h1 class="adm-title">Welcome, {data.user?.name}</h1>
			<p class="adm-sub">
				{data.profile?.designation ?? 'Faculty'} · {data.profile?.department_name ?? ''}
			</p>
		</div>
		<div class="head-date">{today}</div>
	</div>

	{#if !data.profile}
		<div class="adm-alert adm-alert--error">
			<TriangleAlert size={18} stroke-width={2} />
			<span>Your faculty profile has not been set up yet. Contact your Coordinator.</span>
		</div>
	{:else}
		<!-- Stats -->
		<div class="stats-grid">
			<div class="stat-card" use:reveal={{ y: 16 }}>
				<span class="stat-icon tone-teal"><BookOpen size={22} stroke-width={1.75} /></span>
				<div class="stat-body">
					<div class="stat-value">{data.stats.courses}</div>
					<div class="stat-label">My Courses</div>
				</div>
			</div>
			<div class="stat-card" use:reveal={{ delay: 80, y: 16 }}>
				<span class="stat-icon tone-orange"><GraduationCap size={22} stroke-width={1.75} /></span>
				<div class="stat-body">
					<div class="stat-value">{data.stats.students}</div>
					<div class="stat-label">Total Students</div>
				</div>
			</div>
			<div class="stat-card" use:reveal={{ delay: 160, y: 16 }}>
				<span class="stat-icon tone-green"><ClipboardCheck size={22} stroke-width={1.75} /></span>
				<div class="stat-body">
					<div class="stat-value">{data.stats.markedToday}</div>
					<div class="stat-label">Attendance Marked Today</div>
				</div>
			</div>
		</div>

		<!-- Assigned Courses -->
		<div class="adm-card" use:reveal={{ delay: 120, y: 18 }}>
			<div class="adm-card__head">
				<h2 class="adm-card__title">
					<BookOpen size={18} stroke-width={1.75} /> My Courses This Semester
				</h2>
				<a href="/faculty/attendance" class="card-action">
					Mark attendance <ArrowUpRight size={13} stroke-width={2.25} />
				</a>
			</div>
			<div class="adm-card__body">
				{#if data.offerings.length === 0}
					<div class="adm-empty">
						<div class="adm-empty__icon"><BookOpen size={24} stroke-width={1.75} /></div>
						<h3>No courses assigned yet</h3>
						<p>Contact your Department Coordinator to get courses assigned.</p>
					</div>
				{:else}
					<div class="courses-grid">
						{#each data.offerings as offering (offering.id)}
							<div class="course-card" use:lift>
								<div class="course-header">
									<span class="course-code">{offering.course_code}</span>
									<span class="sem-badge">Sem {offering.semester}</span>
								</div>
								<div class="course-title">{offering.course_title}</div>
								<div class="course-meta">
									<span><Users size={12} stroke-width={2} /> {offering.student_count}</span>
									<span><CalendarDays size={12} stroke-width={2} /> {offering.session}</span>
								</div>
								<div class="course-actions">
									<a href="/faculty/attendance?offering={offering.id}" class="course-btn">
										<ClipboardCheck size={13} stroke-width={2} /> Attendance
									</a>
									<a href="/faculty/marks?offering={offering.id}" class="course-btn">
										<FilePenLine size={13} stroke-width={2} /> Marks
									</a>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>

		<!-- Quick Links -->
		<div class="adm-card" use:reveal={{ delay: 180, y: 18 }}>
			<div class="adm-card__head">
				<h2 class="adm-card__title"><Zap size={18} stroke-width={1.75} /> Quick Actions</h2>
			</div>
			<div class="adm-card__body">
				<div class="quick-grid">
					<a href="/faculty/attendance" class="quick-card">
						<span class="quick-icon"><ClipboardCheck size={18} stroke-width={1.75} /></span>
						<div>
							<div class="quick-label">Mark Attendance</div>
							<div class="quick-desc">Take today's class attendance</div>
						</div>
					</a>
					<a href="/faculty/marks" class="quick-card">
						<span class="quick-icon"><FilePenLine size={18} stroke-width={1.75} /></span>
						<div>
							<div class="quick-label">Enter Marks</div>
							<div class="quick-desc">Add or update student marks</div>
						</div>
					</a>
					<a href="/faculty/attendance?view=summary" class="quick-card">
						<span class="quick-icon"><FileText size={18} stroke-width={1.75} /></span>
						<div>
							<div class="quick-label">Attendance Report</div>
							<div class="quick-desc">View attendance summary</div>
						</div>
					</a>
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

	/* Courses Grid */
	.courses-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
		gap: 1rem;
	}

	.course-card {
		border: 1px solid var(--adm-line);
		border-radius: 12px;
		padding: 1.1rem;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		background: #fff;
		transition:
			box-shadow 0.2s,
			border-color 0.2s;
	}

	.course-card:hover {
		border-color: #cdeae6;
		box-shadow: 0 4px 12px rgba(13, 93, 86, 0.08);
	}

	.course-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.course-code {
		background: #e6f2f0;
		color: #0a4a44;
		border: 1px solid #cdeae6;
		padding: 0.2rem 0.5rem;
		border-radius: 6px;
		font-size: 0.74rem;
		font-weight: 700;
		font-family: ui-monospace, monospace;
	}

	.sem-badge {
		background: #fef0dd;
		color: #b45f00;
		border: 1px solid #fde4c1;
		padding: 0.2rem 0.5rem;
		border-radius: 6px;
		font-size: 0.72rem;
		font-weight: 600;
	}

	.course-title {
		font-size: 0.88rem;
		font-weight: 600;
		color: var(--adm-ink);
		line-height: 1.3;
	}

	.course-meta {
		display: flex;
		gap: 0.75rem;
		font-size: 0.74rem;
		color: var(--adm-muted);
	}

	.course-meta span {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
	}

	.course-actions {
		display: flex;
		gap: 0.5rem;
		margin-top: 0.25rem;
	}

	.course-btn {
		flex: 1;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.35rem;
		padding: 0.5rem;
		border-radius: 8px;
		background: #e6f2f0;
		color: #0a4a44;
		border: 1px solid #cdeae6;
		font-size: 0.76rem;
		font-weight: 600;
		text-decoration: none;
		transition:
			background 0.15s,
			color 0.15s;
	}

	.course-btn:hover {
		background: var(--adm-accent);
		color: #fff;
	}

	/* Quick Grid */
	.quick-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.85rem;
	}

	.quick-card {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		padding: 0.9rem 1rem;
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

	@media (max-width: 1024px) {
		.stats-grid {
			grid-template-columns: 1fr 1fr;
		}
		.quick-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 560px) {
		.stats-grid,
		.quick-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
