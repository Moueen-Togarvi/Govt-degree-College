<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	const statusConfig: Record<string, { label: string; class: string }> = {
		present: { label: '✅ Present', class: 'status-present' },
		absent: { label: '❌ Absent', class: 'status-absent' },
		late: { label: '⏰ Late', class: 'status-late' },
		leave: { label: '📋 Leave', class: 'status-leave' }
	};

	const overallTotal = data.attendance.reduce((s, a) => s + a.total, 0);
	const overallPresent = data.attendance.reduce((s, a) => s + a.present, 0);
	const overallPct = overallTotal > 0 ? Math.round((overallPresent / overallTotal) * 100) : 0;
</script>

<svelte:head><title>Attendance — Student Portal | GPGC</title></svelte:head>

<div class="page">
	<div class="page-header">
		<div>
			<h1 class="page-title">📅 My Attendance</h1>
			<p class="page-subtitle">Overall attendance: <strong class="{overallPct >= 75 ? 'text-green' : overallPct >= 60 ? 'text-yellow' : 'text-red'}">{overallPct}%</strong></p>
		</div>
	</div>

	<!-- Course Summary Cards -->
	<div class="summary-grid">
		{#each data.attendance as att}
			<div class="summary-card">
				<div class="summary-header">
					<span class="course-code">{att.course_code}</span>
					<span class="pct-badge {att.percentage >= 75 ? 'pct-good' : att.percentage >= 60 ? 'pct-warn' : 'pct-bad'}">{att.percentage}%</span>
				</div>
				<div class="course-title">{att.course_title}</div>
				<div class="att-bar">
					<div class="att-fill {att.percentage >= 75 ? 'fill-good' : att.percentage >= 60 ? 'fill-warn' : 'fill-bad'}"
						style="width: {att.percentage}%">
					</div>
				</div>
				<div class="summary-stats">
					<span class="stat-item text-green">✅ {att.present} Present</span>
					<span class="stat-item text-red">❌ {att.absent} Absent</span>
					{#if att.late > 0}<span class="stat-item text-orange">⏰ {att.late} Late</span>{/if}
					<span class="stat-item text-muted">Total: {att.total}</span>
				</div>
				{#if att.percentage < 75}
					<div class="low-warn">⚠️ Below 75% — Risk of shortage</div>
				{/if}
			</div>
		{/each}
	</div>

	<!-- Recent Attendance Log -->
	{#if data.detail.length > 0}
		<div class="card">
			<h2 class="card-title">📋 Recent Attendance Log</h2>
			<div class="log-table-wrap">
				<table class="table">
					<thead>
						<tr>
							<th>Date</th>
							<th>Course</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{#each data.detail as entry}
							<tr>
								<td class="date-cell">{new Date(entry.date + 'T00:00:00').toLocaleDateString('en-PK', { weekday: 'short', day: 'numeric', month: 'short' })}</td>
								<td>
									<span class="code-sm">{entry.course_code}</span>
									<span class="course-sm">{entry.course_title}</span>
								</td>
								<td><span class="status-pill {statusConfig[entry.status]?.class}">{statusConfig[entry.status]?.label ?? entry.status}</span></td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/if}
</div>

<style>
	.page { display: flex; flex-direction: column; gap: 1.5rem; }
	.page-header { display: flex; align-items: flex-start; justify-content: space-between; }
	.page-title { font-size: 1.5rem; font-weight: 700; color: #0f172a; margin: 0 0 0.25rem; }
	.page-subtitle { font-size: 0.9rem; color: #64748b; margin: 0; }
	.text-green { color: #059669; }
	.text-yellow { color: #d97706; }
	.text-red { color: #dc2626; }
	.text-orange { color: #ea580c; }
	.text-muted { color: #64748b; }

	/* Summary Grid */
	.summary-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem; }
	.summary-card { background: white; border-radius: 14px; padding: 1.25rem; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05); display: flex; flex-direction: column; gap: 0.6rem; }
	.summary-header { display: flex; align-items: center; justify-content: space-between; }
	.course-code { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; padding: 0.2rem 0.5rem; border-radius: 5px; font-size: 0.75rem; font-weight: 700; font-family: monospace; }
	.pct-badge { padding: 0.25rem 0.65rem; border-radius: 999px; font-size: 0.8rem; font-weight: 700; }
	.pct-good { background: #d1fae5; color: #065f46; }
	.pct-warn { background: #fef3c7; color: #92400e; }
	.pct-bad { background: #fee2e2; color: #991b1b; }
	.course-title { font-size: 0.9rem; font-weight: 600; color: #0f172a; }
	.att-bar { height: 8px; background: #f1f5f9; border-radius: 999px; overflow: hidden; }
	.att-fill { height: 100%; border-radius: 999px; transition: width 0.4s ease; }
	.att-fill.fill-good { background: linear-gradient(90deg, #10b981, #34d399); }
	.att-fill.fill-warn { background: linear-gradient(90deg, #f59e0b, #fbbf24); }
	.att-fill.fill-bad { background: linear-gradient(90deg, #ef4444, #f87171); }
	.summary-stats { display: flex; gap: 0.75rem; flex-wrap: wrap; }
	.stat-item { font-size: 0.75rem; font-weight: 600; }
	.low-warn { background: #fff7ed; border: 1px solid #fed7aa; color: #9a3412; padding: 0.45rem 0.75rem; border-radius: 7px; font-size: 0.78rem; font-weight: 600; }

	/* Card */
	.card { background: white; border-radius: 14px; padding: 1.5rem; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
	.card-title { font-size: 0.95rem; font-weight: 700; color: #0f172a; margin: 0 0 1rem; }

	/* Table */
	.log-table-wrap { overflow-x: auto; }
	.table { width: 100%; border-collapse: collapse; }
	.table th { background: #f8fafc; padding: 0.65rem 1rem; text-align: left; font-size: 0.73rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #e2e8f0; }
	.table td { padding: 0.7rem 1rem; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
	.table tbody tr:last-child td { border-bottom: none; }
	.table tbody tr:hover { background: #f8fafc; }
	.date-cell { font-size: 0.82rem; color: #64748b; font-weight: 500; white-space: nowrap; }
	.code-sm { font-size: 0.72rem; font-weight: 700; background: #eff6ff; color: #1d4ed8; padding: 0.1rem 0.35rem; border-radius: 4px; font-family: monospace; margin-right: 0.4rem; }
	.course-sm { font-size: 0.83rem; color: #0f172a; font-weight: 500; }
	.status-pill { padding: 0.25rem 0.65rem; border-radius: 999px; font-size: 0.75rem; font-weight: 600; }
	.status-present { background: #d1fae5; color: #065f46; }
	.status-absent { background: #fee2e2; color: #991b1b; }
	.status-late { background: #fef3c7; color: #92400e; }
	.status-leave { background: #e0f2fe; color: #075985; }
</style>
