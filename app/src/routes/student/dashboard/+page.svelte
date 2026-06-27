<script lang="ts">
	import type { PageData } from './$types';
	import { reveal, lift } from '$lib/admin/motion';

	import CalendarCheck from 'lucide-svelte/icons/calendar-check';
	import BookOpen from 'lucide-svelte/icons/book-open';
	import ChartColumn from 'lucide-svelte/icons/chart-column';
	import ArrowUpRight from 'lucide-svelte/icons/arrow-up-right';
	import Megaphone from 'lucide-svelte/icons/megaphone';
	import TriangleAlert from 'lucide-svelte/icons/triangle-alert';
	import TrendingUp from 'lucide-svelte/icons/trending-up';

	let { data }: { data: PageData } = $props();

	function gradeClass(g: string | null) {
		if (!g) return 'adm-badge adm-badge--gray';
		if (['A+', 'A', 'A-'].includes(g)) return 'adm-badge adm-badge--green';
		if (['B+', 'B', 'B-'].includes(g)) return 'adm-badge adm-badge--teal';
		if (['C+', 'C', 'C-'].includes(g)) return 'adm-badge adm-badge--amber';
		if (['D+', 'D'].includes(g)) return 'adm-badge adm-badge--orange';
		return 'adm-badge adm-badge--red';
	}
</script>

<svelte:head><title>My Portal — Student | GPGC</title></svelte:head>

<div class="adm-page">
	<div class="dash-head">
		<div>
			<h1 class="adm-title">Welcome, {data.user?.name}</h1>
			<p class="adm-sub">
				{data.profile?.department_name} · Semester {data.profile?.semester} · {data.profile
					?.session}
			</p>
		</div>
		<div class="roll-tag">Roll: {data.profile?.roll_number}</div>
	</div>

	{#if !data.profile}
		<div class="adm-alert adm-alert--error">
			<TriangleAlert size={18} stroke-width={2} />
			<span>Your student profile is not set up yet. Contact your Coordinator.</span>
		</div>
	{:else}
		<!-- Stats -->
		<div class="stats-grid">
			<a href="/student/attendance" class="stat-card" use:reveal={{ y: 16 }} use:lift>
				<span
					class="stat-icon {data.stats.overallAttendance >= 75
						? 'tone-teal'
						: data.stats.overallAttendance >= 60
							? 'tone-amber'
							: 'tone-red'}"
				>
					<CalendarCheck size={22} stroke-width={1.75} />
				</span>
				<div class="stat-body">
					<div class="stat-value">{data.stats.overallAttendance}%</div>
					<div class="stat-label">Overall Attendance</div>
				</div>
				<ArrowUpRight class="stat-arrow" size={18} stroke-width={2} />
			</a>
			<a href="/student/courses" class="stat-card" use:reveal={{ delay: 80, y: 16 }} use:lift>
				<span class="stat-icon tone-teal"><BookOpen size={22} stroke-width={1.75} /></span>
				<div class="stat-body">
					<div class="stat-value">{data.stats.courses}</div>
					<div class="stat-label">Enrolled Courses</div>
				</div>
				<ArrowUpRight class="stat-arrow" size={18} stroke-width={2} />
			</a>
			<a href="/student/results" class="stat-card" use:reveal={{ delay: 160, y: 16 }} use:lift>
				<span class="stat-icon tone-orange"><ChartColumn size={22} stroke-width={1.75} /></span>
				<div class="stat-body">
					<div class="stat-value">{data.stats.results}</div>
					<div class="stat-label">Results Available</div>
				</div>
				<ArrowUpRight class="stat-arrow" size={18} stroke-width={2} />
			</a>
		</div>

		<div class="content-grid">
			<!-- Attendance Summary -->
			<div class="adm-card" use:reveal={{ delay: 120, y: 18 }}>
				<div class="adm-card__head">
					<h2 class="adm-card__title">
						<CalendarCheck size={18} stroke-width={1.75} /> Attendance
					</h2>
					<a href="/student/attendance" class="card-action">
						View detail <ArrowUpRight size={13} stroke-width={2.25} />
					</a>
				</div>
				<div class="adm-card__body">
					{#if data.attendance.length === 0}
						<div class="adm-empty">No attendance records yet.</div>
					{:else}
						<div class="att-list">
							{#each data.attendance as att (att.course_code)}
								<div class="att-row">
									<div class="att-course">
										<span class="att-code">{att.course_code}</span>
										<span class="att-title">{att.course_title}</span>
									</div>
									<div class="att-bar-wrap">
										<div class="att-bar">
											<div
												class="att-fill {att.percentage >= 75
													? 'fill-good'
													: att.percentage >= 60
														? 'fill-warn'
														: 'fill-bad'}"
												style="width: {att.percentage}%"
											></div>
										</div>
										<span
											class="att-pct {att.percentage >= 75
												? 'pct-good'
												: att.percentage >= 60
													? 'pct-warn'
													: 'pct-bad'}"
										>
											{att.percentage}%
										</span>
									</div>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			</div>

			<!-- Results -->
			<div class="adm-card" use:reveal={{ delay: 180, y: 18 }}>
				<div class="adm-card__head">
					<h2 class="adm-card__title"><ChartColumn size={18} stroke-width={1.75} /> My Results</h2>
					<a href="/student/results" class="card-action">
						View all <ArrowUpRight size={13} stroke-width={2.25} />
					</a>
				</div>
				<div class="adm-card__body">
					{#if data.results.length === 0}
						<div class="adm-empty">No results published yet.</div>
					{:else}
						<div class="results-list">
							{#each data.results as result (result.course_code)}
								<div class="result-row">
									<div class="result-info">
										<span class="result-code">{result.course_code}</span>
										<span class="result-title">{result.course_title}</span>
									</div>
									<div class="result-right">
										<span class="result-total">{result.total}/100</span>
										<span class={gradeClass(result.grade)}>{result.grade ?? '—'}</span>
									</div>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			</div>

			<!-- Announcements -->
			<div class="adm-card span-2" use:reveal={{ delay: 240, y: 18 }}>
				<div class="adm-card__head">
					<h2 class="adm-card__title"><Megaphone size={18} stroke-width={1.75} /> Announcements</h2>
				</div>
				<div class="adm-card__body">
					{#if data.announcements.length === 0}
						<div class="adm-empty">No announcements yet.</div>
					{:else}
						<div class="ann-list">
							{#each data.announcements as ann (ann.title)}
								<div class="ann-item">
									<div class="ann-category">
										<TrendingUp size={11} stroke-width={2} />
										{ann.category}
									</div>
									<div class="ann-title">{ann.title}</div>
									<div class="ann-desc">{ann.description}</div>
									<div class="ann-date">
										{new Date(ann.created_at).toLocaleDateString('en-PK', {
											day: 'numeric',
											month: 'short',
											year: 'numeric'
										})}
									</div>
								</div>
							{/each}
						</div>
					{/if}
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

	.roll-tag {
		background: #e6f2f0;
		color: #0a4a44;
		padding: 0.45rem 0.9rem;
		border-radius: 999px;
		font-size: 0.8rem;
		font-weight: 700;
		white-space: nowrap;
		border: 1px solid #cdeae6;
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
		position: relative;
		overflow: hidden;
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
	.stat-icon.tone-amber {
		background: #fef3c7;
		color: #92400e;
	}
	.stat-icon.tone-red {
		background: #fee2e2;
		color: #991b1b;
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

	/* Attendance */
	.att-list {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
	}

	.att-row {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.att-course {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.att-code {
		font-size: 0.72rem;
		font-weight: 700;
		background: #e6f2f0;
		color: #0a4a44;
		padding: 0.15rem 0.45rem;
		border-radius: 5px;
		font-family: ui-monospace, monospace;
	}

	.att-title {
		font-size: 0.84rem;
		font-weight: 600;
		color: var(--adm-ink);
	}

	.att-bar-wrap {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.att-bar {
		flex: 1;
		height: 8px;
		background: var(--adm-line-soft);
		border-radius: 999px;
		overflow: hidden;
	}

	.att-fill {
		height: 100%;
		border-radius: 999px;
		transition: width 0.3s ease;
	}

	.att-fill.fill-good {
		background: linear-gradient(90deg, #10b981, #34d399);
	}
	.att-fill.fill-warn {
		background: linear-gradient(90deg, #f59e0b, #fbbf24);
	}
	.att-fill.fill-bad {
		background: linear-gradient(90deg, #ef4444, #f87171);
	}

	.att-pct {
		font-size: 0.78rem;
		font-weight: 700;
		min-width: 38px;
		text-align: right;
	}

	.pct-good {
		color: #059669;
	}
	.pct-warn {
		color: #d97706;
	}
	.pct-bad {
		color: #dc2626;
	}

	/* Results */
	.results-list {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.result-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.7rem 0.85rem;
		background: var(--adm-bg);
		border-radius: 10px;
		border: 1px solid var(--adm-line);
		transition: border-color 0.15s;
	}

	.result-row:hover {
		border-color: #cdeae6;
	}

	.result-info {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex: 1;
		min-width: 0;
	}

	.result-code {
		font-size: 0.72rem;
		font-weight: 700;
		background: #e6f2f0;
		color: #0a4a44;
		padding: 0.15rem 0.45rem;
		border-radius: 5px;
		font-family: ui-monospace, monospace;
		flex-shrink: 0;
	}

	.result-title {
		font-size: 0.84rem;
		font-weight: 600;
		color: var(--adm-ink);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.result-right {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-shrink: 0;
	}

	.result-total {
		font-size: 0.82rem;
		font-weight: 700;
		color: var(--adm-ink-2);
	}

	/* Announcements */
	.ann-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 0.85rem;
	}

	.ann-item {
		padding: 1rem;
		background: var(--adm-bg);
		border-radius: 11px;
		border: 1px solid var(--adm-line);
		border-left: 3px solid var(--adm-accent);
	}

	.ann-category {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		font-size: 0.68rem;
		font-weight: 700;
		color: var(--adm-accent);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 0.4rem;
	}

	.ann-title {
		font-size: 0.9rem;
		font-weight: 700;
		color: var(--adm-ink);
		margin-bottom: 0.25rem;
	}

	.ann-desc {
		font-size: 0.8rem;
		color: var(--adm-ink-2);
		line-height: 1.45;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.ann-date {
		font-size: 0.72rem;
		color: var(--adm-muted);
		margin-top: 0.55rem;
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
	}
</style>
