<script lang="ts">
	import type { PageData } from './$types';
	import { reveal, lift } from '$lib/admin/motion';
	import CalendarCheck from 'lucide-svelte/icons/calendar-check';
	import CircleCheck from 'lucide-svelte/icons/circle-check';
	import ClipboardList from 'lucide-svelte/icons/clipboard-list';
	import BookOpen from 'lucide-svelte/icons/book-open';

	let { data }: { data: PageData } = $props();

	const statusConfig: Record<string, { label: string; class: string }> = {
		present: { label: '✅ Present', class: 'adm-badge--green' },
		absent: { label: '❌ Absent', class: 'adm-badge--red' },
		late: { label: '⏰ Late', class: 'adm-badge--amber' },
		leave: { label: '📋 Leave', class: 'adm-badge--blue' }
	};

	const overallTotal = data.attendance.reduce((s, a) => s + a.total, 0);
	const overallPresent = data.attendance.reduce((s, a) => s + a.present, 0);
	const overallPct = overallTotal > 0 ? Math.round((overallPresent / overallTotal) * 100) : 0;
</script>

<svelte:head><title>My Attendance — Student Portal | GPGC</title></svelte:head>

<div class="adm-page" use:reveal={{ y: 12 }}>
	<div class="adm-head">
		<div>
			<h1 class="adm-title">
				<CalendarCheck size={22} stroke-width={2} /> My Attendance
			</h1>
			<p class="adm-sub">
				Overall Academic Attendance: 
				<strong
					class="pct-text {overallPct >= 75 ? 'text-emerald' : overallPct >= 60 ? 'text-amber' : 'text-rose'}"
				>
					{overallPct}%
				</strong>
			</p>
		</div>
	</div>

	<!-- Course Summary Cards -->
	<div class="summary-grid">
		{#each data.attendance as att, i}
			<div class="adm-card" use:reveal={{ delay: 50 * i, y: 12 }} use:lift>
				<div class="adm-card__body flex-col">
					<div class="card-top">
						<span class="adm-code">{att.course_code}</span>
						<span
							class="adm-badge {att.percentage >= 75
								? 'adm-badge--green'
								: att.percentage >= 60
									? 'adm-badge--amber'
									: 'adm-badge--red'}"
						>
							{att.percentage}%
						</span>
					</div>

					<h3 class="course-name">{att.course_title}</h3>

					<div class="att-progress">
						<div
							class="progress-fill {att.percentage >= 75
								? 'fill-good'
								: att.percentage >= 60
									? 'fill-warn'
									: 'fill-bad'}"
							style="width: {att.percentage}%"
						></div>
					</div>

					<div class="summary-metrics">
						<span class="metric text-emerald">✅ {att.present} Present</span>
						<span class="metric text-rose">❌ {att.absent} Absent</span>
						{#if att.late > 0}
							<span class="metric text-amber">⏰ {att.late} Late</span>
						{/if}
						<span class="metric text-muted">Total: {att.total}</span>
					</div>

					{#if att.percentage < 75}
						<div class="shortage-warning">
							⚠️ Attendance below 75% limit (shortage risk)
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>

	<!-- Recent Attendance Log -->
	{#if data.detail.length > 0}
		<div class="adm-card" use:reveal={{ delay: 180, y: 12 }}>
			<div class="adm-card__head">
				<h2 class="adm-card__title">
					<ClipboardList size={18} />
					<span>Recent Attendance Log</span>
				</h2>
			</div>
			<div class="adm-card__body p-0">
				<div class="adm-table-wrap">
					<table class="adm-table">
						<thead>
							<tr>
								<th style="width: 180px;">Date</th>
								<th>Course</th>
								<th style="width: 180px;">Status</th>
							</tr>
						</thead>
						<tbody>
							{#each data.detail as entry}
								<tr>
									<td class="date-cell">
										{new Date(entry.date + 'T00:00:00').toLocaleDateString('en-PK', {
											weekday: 'short',
											day: 'numeric',
											month: 'short'
										})}
									</td>
									<td>
										<span class="adm-code mr-2">{entry.course_code}</span>
										<span class="course-label">{entry.course_title}</span>
									</td>
									<td>
										<span class="adm-badge {statusConfig[entry.status]?.class}">
											{statusConfig[entry.status]?.label ?? entry.status}
										</span>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.p-0 {
		padding: 0 !important;
	}
	.mr-2 {
		margin-right: 0.5rem;
	}
	.pct-text {
		font-weight: 800;
		font-size: 1.1rem;
	}
	.text-emerald {
		color: #059669;
	}
	.text-amber {
		color: #d97706;
	}
	.text-rose {
		color: #e11d48;
	}
	.text-muted {
		color: var(--adm-muted);
	}

	/* Summary Grid */
	.summary-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1.25rem;
	}

	.flex-col {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.card-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.course-name {
		font-size: 0.95rem;
		font-weight: 700;
		color: var(--adm-ink);
		margin: 0;
		line-height: 1.35;
	}

	.att-progress {
		height: 8px;
		background: var(--adm-line-soft);
		border-radius: 999px;
		overflow: hidden;
		margin-top: 0.25rem;
	}

	.progress-fill {
		height: 100%;
		border-radius: 999px;
		transition: width 0.4s ease;
	}
	.progress-fill.fill-good {
		background: linear-gradient(90deg, #10b981, #34d399);
	}
	.progress-fill.fill-warn {
		background: linear-gradient(90deg, #f59e0b, #fbbf24);
	}
	.progress-fill.fill-bad {
		background: linear-gradient(90deg, #ef4444, #f87171);
	}

	.summary-metrics {
		display: flex;
		gap: 0.65rem;
		flex-wrap: wrap;
	}
	.metric {
		font-size: 0.74rem;
		font-weight: 600;
	}

	.shortage-warning {
		background: #fffbeb;
		border: 1px solid #fde68a;
		color: #92400e;
		padding: 0.5rem 0.75rem;
		border-radius: 8px;
		font-size: 0.78rem;
		font-weight: 600;
		display: flex;
		align-items: center;
		gap: 0.35rem;
	}

	.date-cell {
		font-weight: 600;
		color: var(--adm-muted);
	}
	.course-label {
		font-weight: 600;
		color: var(--adm-ink);
	}
</style>
