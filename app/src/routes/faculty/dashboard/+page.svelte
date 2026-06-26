<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	const today = new Date().toLocaleDateString('en-PK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
</script>

<svelte:head><title>Dashboard — Faculty | GPGC Portal</title></svelte:head>

<div class="dashboard">
	<div class="page-header">
		<div>
			<h1 class="page-title">Welcome, {data.user?.name}</h1>
			<p class="page-subtitle">
				{data.profile?.designation ?? 'Faculty'} · {data.profile?.department_name ?? ''}
			</p>
		</div>
		<div class="header-date">{today}</div>
	</div>

	{#if !data.profile}
		<div class="no-profile-banner">
			⚠️ Your faculty profile has not been set up yet. Contact your Coordinator.
		</div>
	{:else}
		<!-- Stats -->
		<div class="stats-grid">
			<div class="stat-card color-blue">
				<div class="stat-icon">📚</div>
				<div class="stat-body">
					<div class="stat-value">{data.stats.courses}</div>
					<div class="stat-label">My Courses</div>
				</div>
			</div>
			<div class="stat-card color-green">
				<div class="stat-icon">🎓</div>
				<div class="stat-body">
					<div class="stat-value">{data.stats.students}</div>
					<div class="stat-label">Total Students</div>
				</div>
			</div>
			<div class="stat-card color-purple">
				<div class="stat-icon">✅</div>
				<div class="stat-body">
					<div class="stat-value">{data.stats.markedToday}</div>
					<div class="stat-label">Attendance Marked Today</div>
				</div>
			</div>
		</div>

		<!-- Assigned Courses -->
		<div class="card">
			<div class="card-header">
				<h2 class="card-title">📚 My Courses This Semester</h2>
				<a href="/faculty/attendance" class="card-action">Mark Attendance →</a>
			</div>

			{#if data.offerings.length === 0}
				<div class="empty">
					<span>📚</span>
					<p>No courses assigned yet. Contact your Department Coordinator.</p>
				</div>
			{:else}
				<div class="courses-grid">
					{#each data.offerings as offering}
						<div class="course-card">
							<div class="course-header">
								<span class="course-code">{offering.course_code}</span>
								<span class="sem-badge">Sem {offering.semester}</span>
							</div>
							<div class="course-title">{offering.course_title}</div>
							<div class="course-meta">
								<span>👥 {offering.student_count} students</span>
								<span>📅 {offering.session}</span>
							</div>
							<div class="course-actions">
								<a href="/faculty/attendance?offering={offering.id}" class="course-btn">✅ Attendance</a>
								<a href="/faculty/marks?offering={offering.id}" class="course-btn">📊 Marks</a>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Quick Links -->
		<div class="card">
			<div class="card-header">
				<h2 class="card-title">⚡ Quick Actions</h2>
			</div>
			<div class="quick-grid">
				<a href="/faculty/attendance" class="quick-card">
					<span class="quick-icon">✅</span>
					<div>
						<div class="quick-label">Mark Attendance</div>
						<div class="quick-desc">Take today's class attendance</div>
					</div>
				</a>
				<a href="/faculty/marks" class="quick-card">
					<span class="quick-icon">📊</span>
					<div>
						<div class="quick-label">Enter Marks</div>
						<div class="quick-desc">Add or update student marks</div>
					</div>
				</a>
				<a href="/faculty/attendance?view=summary" class="quick-card">
					<span class="quick-icon">📋</span>
					<div>
						<div class="quick-label">Attendance Report</div>
						<div class="quick-desc">View attendance summary</div>
					</div>
				</a>
			</div>
		</div>
	{/if}
</div>

<style>
	.dashboard { display: flex; flex-direction: column; gap: 1.5rem; }
	.page-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }
	.page-title { font-size: 1.55rem; font-weight: 700; color: #0f172a; margin: 0 0 0.3rem; }
	.page-subtitle { font-size: 0.88rem; color: #64748b; margin: 0; }
	.header-date { font-size: 0.8rem; color: #94a3b8; padding-top: 0.4rem; white-space: nowrap; }
	.no-profile-banner { background: #fef9c3; border: 1px solid #fde047; color: #713f12; padding: 1rem 1.25rem; border-radius: 12px; font-weight: 500; font-size: 0.9rem; }

	/* Stats */
	.stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
	.stat-card { background: white; border-radius: 14px; padding: 1.25rem; display: flex; align-items: center; gap: 1rem; box-shadow: 0 1px 3px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; position: relative; overflow: hidden; }
	.stat-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; }
	.stat-card.color-blue::before { background: linear-gradient(90deg, #3b82f6, #1d4ed8); }
	.stat-card.color-green::before { background: linear-gradient(90deg, #10b981, #059669); }
	.stat-card.color-purple::before { background: linear-gradient(90deg, #8b5cf6, #7c3aed); }
	.stat-icon { font-size: 1.75rem; flex-shrink: 0; }
	.stat-body { flex: 1; }
	.stat-value { font-size: 1.8rem; font-weight: 700; color: #0f172a; line-height: 1; }
	.stat-label { font-size: 0.75rem; color: #64748b; font-weight: 500; margin-top: 0.25rem; text-transform: uppercase; letter-spacing: 0.04em; }

	/* Card */
	.card { background: white; border-radius: 14px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
	.card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; }
	.card-title { font-size: 0.95rem; font-weight: 700; color: #0f172a; margin: 0; }
	.card-action { font-size: 0.8rem; color: #0284c7; text-decoration: none; font-weight: 500; }

	/* Courses Grid */
	.courses-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; }
	.course-card { border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.1rem; display: flex; flex-direction: column; gap: 0.6rem; transition: box-shadow 0.2s; }
	.course-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
	.course-header { display: flex; align-items: center; justify-content: space-between; }
	.course-code { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; padding: 0.2rem 0.5rem; border-radius: 5px; font-size: 0.75rem; font-weight: 700; font-family: monospace; }
	.sem-badge { background: #f0f9ff; color: #075985; border: 1px solid #bae6fd; padding: 0.2rem 0.5rem; border-radius: 5px; font-size: 0.73rem; font-weight: 600; }
	.course-title { font-size: 0.88rem; font-weight: 600; color: #0f172a; line-height: 1.3; }
	.course-meta { display: flex; gap: 0.75rem; font-size: 0.75rem; color: #64748b; }
	.course-actions { display: flex; gap: 0.5rem; margin-top: 0.25rem; }
	.course-btn { flex: 1; text-align: center; padding: 0.45rem; border-radius: 8px; background: #f0f9ff; color: #0284c7; border: 1px solid #bae6fd; font-size: 0.78rem; font-weight: 600; text-decoration: none; transition: all 0.2s; }
	.course-btn:hover { background: #0284c7; color: white; }

	.empty { text-align: center; padding: 2rem; color: #94a3b8; }
	.empty span { font-size: 2.5rem; display: block; margin-bottom: 0.75rem; }
	.empty p { font-size: 0.9rem; margin: 0; }

	/* Quick Grid */
	.quick-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
	.quick-card { display: flex; align-items: center; gap: 0.75rem; padding: 0.875rem; border-radius: 10px; background: #f8fafc; border: 1px solid #e2e8f0; text-decoration: none; transition: all 0.2s; }
	.quick-card:hover { background: #e0f2fe; border-color: #7dd3fc; }
	.quick-icon { font-size: 1.4rem; flex-shrink: 0; }
	.quick-label { font-size: 0.83rem; font-weight: 600; color: #0f172a; }
	.quick-desc { font-size: 0.73rem; color: #64748b; margin-top: 0.1rem; }

	@media (max-width: 1024px) {
		.stats-grid { grid-template-columns: 1fr 1fr; }
		.quick-grid { grid-template-columns: 1fr 1fr; }
	}
</style>
