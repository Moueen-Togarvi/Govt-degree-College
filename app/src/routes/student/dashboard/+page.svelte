<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	function gradeColor(g: string | null) {
		if (!g) return 'grade-none';
		if (['A+','A','A-'].includes(g)) return 'grade-a';
		if (['B+','B','B-'].includes(g)) return 'grade-b';
		if (['C+','C','C-'].includes(g)) return 'grade-c';
		if (['D+','D'].includes(g)) return 'grade-d';
		return 'grade-f';
	}
</script>

<svelte:head><title>My Portal — Student | GPGC</title></svelte:head>

<div class="dashboard">
	<div class="page-header">
		<div>
			<h1 class="page-title">Welcome, {data.user?.name} 👋</h1>
			<p class="page-subtitle">
				{data.profile?.department_name} · Semester {data.profile?.semester} · {data.profile?.session}
			</p>
		</div>
		<div class="roll-tag">Roll: {data.profile?.roll_number}</div>
	</div>

	{#if !data.profile}
		<div class="warn-banner">⚠️ Your student profile is not set up yet. Contact your Coordinator.</div>
	{:else}
		<!-- Stats -->
		<div class="stats-grid">
			<div class="stat-card {data.stats.overallAttendance >= 75 ? 'color-green' : data.stats.overallAttendance >= 60 ? 'color-yellow' : 'color-red'}">
				<div class="stat-icon">📅</div>
				<div class="stat-body">
					<div class="stat-value">{data.stats.overallAttendance}%</div>
					<div class="stat-label">Overall Attendance</div>
				</div>
			</div>
			<div class="stat-card color-blue">
				<div class="stat-icon">📚</div>
				<div class="stat-body">
					<div class="stat-value">{data.stats.courses}</div>
					<div class="stat-label">Enrolled Courses</div>
				</div>
			</div>
			<div class="stat-card color-purple">
				<div class="stat-icon">📊</div>
				<div class="stat-body">
					<div class="stat-value">{data.stats.results}</div>
					<div class="stat-label">Results Available</div>
				</div>
			</div>
		</div>

		<div class="content-grid">
			<!-- Attendance Summary -->
			<div class="card">
				<div class="card-header">
					<h2 class="card-title">📅 Attendance</h2>
					<a href="/student/attendance" class="card-action">View Detail →</a>
				</div>
				{#if data.attendance.length === 0}
					<div class="empty">No attendance records yet.</div>
				{:else}
					<div class="att-list">
						{#each data.attendance as att}
							<div class="att-row">
								<div class="att-course">
									<span class="att-code">{att.course_code}</span>
									<span class="att-title">{att.course_title}</span>
								</div>
								<div class="att-bar-wrap">
									<div class="att-bar">
										<div class="att-fill {att.percentage >= 75 ? 'fill-good' : att.percentage >= 60 ? 'fill-warn' : 'fill-bad'}"
											style="width: {att.percentage}%">
										</div>
									</div>
									<span class="att-pct {att.percentage >= 75 ? 'pct-good' : att.percentage >= 60 ? 'pct-warn' : 'pct-bad'}">
										{att.percentage}%
									</span>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Results -->
			<div class="card">
				<div class="card-header">
					<h2 class="card-title">📊 My Results</h2>
					<a href="/student/results" class="card-action">View All →</a>
				</div>
				{#if data.results.length === 0}
					<div class="empty">No results published yet.</div>
				{:else}
					<div class="results-list">
						{#each data.results as result}
							<div class="result-row">
								<div class="result-info">
									<span class="result-code">{result.course_code}</span>
									<span class="result-title">{result.course_title}</span>
								</div>
								<div class="result-right">
									<span class="result-total">{result.total}/100</span>
									<span class="grade-badge {gradeColor(result.grade)}">{result.grade ?? '—'}</span>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Announcements -->
			<div class="card span-2">
				<div class="card-header">
					<h2 class="card-title">📢 Announcements</h2>
				</div>
				{#if data.announcements.length === 0}
					<div class="empty">No announcements yet.</div>
				{:else}
					<div class="ann-list">
						{#each data.announcements as ann}
							<div class="ann-item">
								<div class="ann-category">{ann.category}</div>
								<div class="ann-title">{ann.title}</div>
								<div class="ann-desc">{ann.description}</div>
								<div class="ann-date">{new Date(ann.created_at).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	.dashboard { display: flex; flex-direction: column; gap: 1.5rem; }
	.page-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }
	.page-title { font-size: 1.55rem; font-weight: 700; color: #0f172a; margin: 0 0 0.3rem; }
	.page-subtitle { font-size: 0.88rem; color: #64748b; margin: 0; }
	.roll-tag { background: #e0f2fe; color: #0369a1; padding: 0.4rem 0.9rem; border-radius: 999px; font-size: 0.82rem; font-weight: 700; white-space: nowrap; align-self: flex-start; margin-top: 0.4rem; }
	.warn-banner { background: #fef9c3; border: 1px solid #fde047; color: #713f12; padding: 1rem 1.25rem; border-radius: 12px; font-weight: 500; }

	/* Stats */
	.stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
	.stat-card { background: white; border-radius: 14px; padding: 1.25rem; display: flex; align-items: center; gap: 1rem; box-shadow: 0 1px 3px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; position: relative; overflow: hidden; }
	.stat-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; }
	.stat-card.color-green::before { background: linear-gradient(90deg, #10b981, #059669); }
	.stat-card.color-yellow::before { background: linear-gradient(90deg, #f59e0b, #d97706); }
	.stat-card.color-red::before { background: linear-gradient(90deg, #ef4444, #dc2626); }
	.stat-card.color-blue::before { background: linear-gradient(90deg, #3b82f6, #1d4ed8); }
	.stat-card.color-purple::before { background: linear-gradient(90deg, #8b5cf6, #7c3aed); }
	.stat-icon { font-size: 1.75rem; flex-shrink: 0; }
	.stat-value { font-size: 1.8rem; font-weight: 700; color: #0f172a; line-height: 1; }
	.stat-label { font-size: 0.75rem; color: #64748b; font-weight: 500; margin-top: 0.25rem; text-transform: uppercase; letter-spacing: 0.04em; }

	/* Content Grid */
	.content-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
	.card { background: white; border-radius: 14px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
	.span-2 { grid-column: span 2; }
	.card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
	.card-title { font-size: 0.95rem; font-weight: 700; color: #0f172a; margin: 0; }
	.card-action { font-size: 0.8rem; color: #6366f1; text-decoration: none; font-weight: 500; }
	.empty { text-align: center; color: #94a3b8; padding: 1.25rem; font-size: 0.88rem; }

	/* Attendance */
	.att-list { display: flex; flex-direction: column; gap: 0.75rem; }
	.att-row { display: flex; flex-direction: column; gap: 0.3rem; }
	.att-course { display: flex; align-items: center; gap: 0.5rem; }
	.att-code { font-size: 0.73rem; font-weight: 700; background: #eff6ff; color: #1d4ed8; padding: 0.15rem 0.4rem; border-radius: 4px; font-family: monospace; }
	.att-title { font-size: 0.83rem; font-weight: 600; color: #0f172a; }
	.att-bar-wrap { display: flex; align-items: center; gap: 0.75rem; }
	.att-bar { flex: 1; height: 8px; background: #f1f5f9; border-radius: 999px; overflow: hidden; }
	.att-fill { height: 100%; border-radius: 999px; transition: width 0.3s ease; }
	.att-fill.fill-good { background: linear-gradient(90deg, #10b981, #34d399); }
	.att-fill.fill-warn { background: linear-gradient(90deg, #f59e0b, #fbbf24); }
	.att-fill.fill-bad { background: linear-gradient(90deg, #ef4444, #f87171); }
	.att-pct { font-size: 0.78rem; font-weight: 700; min-width: 36px; text-align: right; }
	.pct-good { color: #059669; }
	.pct-warn { color: #d97706; }
	.pct-bad { color: #dc2626; }

	/* Results */
	.results-list { display: flex; flex-direction: column; gap: 0.6rem; }
	.result-row { display: flex; align-items: center; justify-content: space-between; padding: 0.65rem 0.8rem; background: #f8fafc; border-radius: 9px; border: 1px solid #e2e8f0; }
	.result-info { display: flex; align-items: center; gap: 0.5rem; flex: 1; min-width: 0; }
	.result-code { font-size: 0.73rem; font-weight: 700; background: #eff6ff; color: #1d4ed8; padding: 0.15rem 0.4rem; border-radius: 4px; font-family: monospace; flex-shrink: 0; }
	.result-title { font-size: 0.83rem; font-weight: 600; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
	.result-right { display: flex; align-items: center; gap: 0.5rem; flex-shrink: 0; }
	.result-total { font-size: 0.82rem; font-weight: 700; color: #475569; }
	.grade-badge { padding: 0.2rem 0.55rem; border-radius: 6px; font-size: 0.75rem; font-weight: 700; }
	.grade-a { background: #d1fae5; color: #065f46; }
	.grade-b { background: #d1fae5; color: #166534; }
	.grade-c { background: #fef3c7; color: #92400e; }
	.grade-d { background: #fed7aa; color: #9a3412; }
	.grade-f { background: #fee2e2; color: #991b1b; }
	.grade-none { background: #f1f5f9; color: #94a3b8; }

	/* Announcements */
	.ann-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 0.75rem; }
	.ann-item { padding: 1rem; background: #f8fafc; border-radius: 10px; border: 1px solid #e2e8f0; border-left: 3px solid #6366f1; }
	.ann-category { font-size: 0.7rem; font-weight: 700; color: #6366f1; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.35rem; }
	.ann-title { font-size: 0.88rem; font-weight: 700; color: #0f172a; margin-bottom: 0.25rem; }
	.ann-desc { font-size: 0.8rem; color: #475569; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
	.ann-date { font-size: 0.72rem; color: #94a3b8; margin-top: 0.5rem; }

	@media (max-width: 1024px) {
		.stats-grid { grid-template-columns: 1fr 1fr; }
		.content-grid { grid-template-columns: 1fr; }
		.span-2 { grid-column: span 1; }
	}
</style>
