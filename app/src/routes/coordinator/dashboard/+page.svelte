<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	const stats = [
		{ icon: '👨‍🏫', label: 'Faculty', value: data.stats.faculty, href: '/coordinator/faculty', color: 'blue' },
		{ icon: '🎓', label: 'Students', value: data.stats.students, href: '/coordinator/students', color: 'green' },
		{ icon: '📚', label: 'Courses', value: data.stats.courses, href: '/coordinator/courses', color: 'purple' },
	];

	const quickLinks = [
		{ icon: '👨‍🏫', label: 'Add Faculty', href: '/coordinator/faculty', desc: 'Register a new teacher' },
		{ icon: '🎓', label: 'Add Student', href: '/coordinator/students', desc: 'Enroll a new student' },
		{ icon: '📚', label: 'Manage Courses', href: '/coordinator/courses', desc: 'Add or assign courses' },
		{ icon: '🗓️', label: 'Timetable', href: '/coordinator/timetable', desc: 'View class schedule' },
	];
</script>

<svelte:head><title>Dashboard — Coordinator | GPGC Portal</title></svelte:head>

<div class="dashboard">
	<div class="page-header">
		<div>
			<h1 class="page-title">Welcome, {data.user?.name ?? 'Coordinator'}</h1>
			<p class="page-subtitle">
				{data.department?.name ?? 'No department assigned'} · Overview
			</p>
		</div>
		<div class="header-date">
			{new Date().toLocaleDateString('en-PK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
		</div>
	</div>

	{#if !data.department}
		<div class="no-dept-banner">
			⚠️ You have not been assigned to a department yet. Contact the Super Admin.
		</div>
	{:else}
		<!-- Stats -->
		<div class="stats-grid">
			{#each stats as s}
				<a href={s.href} class="stat-card color-{s.color}">
					<div class="stat-icon">{s.icon}</div>
					<div class="stat-body">
						<div class="stat-value">{s.value}</div>
						<div class="stat-label">{s.label}</div>
					</div>
					<div class="stat-arrow">→</div>
				</a>
			{/each}
		</div>

		<!-- Content Grid -->
		<div class="content-grid">
			<!-- Recent Faculty -->
			<div class="card">
				<div class="card-header">
					<h2 class="card-title">👨‍🏫 Recent Faculty</h2>
					<a href="/coordinator/faculty" class="card-action">View All →</a>
				</div>
				{#if data.recentFaculty.length > 0}
					<div class="list">
						{#each data.recentFaculty as member}
							<div class="list-item">
								<div class="list-avatar">{(member.name ?? '?').charAt(0).toUpperCase()}</div>
								<div class="list-info">
									<div class="list-name">{member.name}</div>
									<div class="list-sub">{member.designation}</div>
								</div>
								{#if member.is_hod}
									<span class="badge badge-gold">HOD</span>
								{/if}
							</div>
						{/each}
					</div>
				{:else}
					<div class="empty">No faculty added yet. <a href="/coordinator/faculty">Add one →</a></div>
				{/if}
			</div>

			<!-- Recent Students -->
			<div class="card">
				<div class="card-header">
					<h2 class="card-title">🎓 Recent Students</h2>
					<a href="/coordinator/students" class="card-action">View All →</a>
				</div>
				{#if data.recentStudents.length > 0}
					<div class="list">
						{#each data.recentStudents as student}
							<div class="list-item">
								<div class="list-avatar blue">{(student.name ?? '?').charAt(0).toUpperCase()}</div>
								<div class="list-info">
									<div class="list-name">{student.name}</div>
									<div class="list-sub">{student.roll_number} · Semester {student.semester}</div>
								</div>
							</div>
						{/each}
					</div>
				{:else}
					<div class="empty">No students enrolled yet. <a href="/coordinator/students">Add one →</a></div>
				{/if}
			</div>

			<!-- Quick Links -->
			<div class="card">
				<div class="card-header">
					<h2 class="card-title">⚡ Quick Actions</h2>
				</div>
				<div class="quick-grid">
					{#each quickLinks as link}
						<a href={link.href} class="quick-card">
							<span class="quick-icon">{link.icon}</span>
							<div>
								<div class="quick-label">{link.label}</div>
								<div class="quick-desc">{link.desc}</div>
							</div>
						</a>
					{/each}
				</div>
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
	.no-dept-banner { background: #fef9c3; border: 1px solid #fde047; color: #713f12; padding: 1rem 1.25rem; border-radius: 12px; font-weight: 500; font-size: 0.9rem; }

	/* Stats */
	.stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
	.stat-card { background: white; border-radius: 14px; padding: 1.25rem; display: flex; align-items: center; gap: 1rem; text-decoration: none; box-shadow: 0 1px 3px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; transition: transform 0.2s, box-shadow 0.2s; position: relative; overflow: hidden; }
	.stat-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; }
	.stat-card.color-blue::before { background: linear-gradient(90deg, #3b82f6, #1d4ed8); }
	.stat-card.color-green::before { background: linear-gradient(90deg, #10b981, #059669); }
	.stat-card.color-purple::before { background: linear-gradient(90deg, #8b5cf6, #7c3aed); }
	.stat-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
	.stat-icon { font-size: 1.75rem; flex-shrink: 0; }
	.stat-body { flex: 1; }
	.stat-value { font-size: 1.8rem; font-weight: 700; color: #0f172a; line-height: 1; }
	.stat-label { font-size: 0.75rem; color: #64748b; font-weight: 500; margin-top: 0.25rem; text-transform: uppercase; letter-spacing: 0.04em; }
	.stat-arrow { color: #cbd5e1; font-size: 1rem; }

	/* Content Grid */
	.content-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
	.card { background: white; border-radius: 14px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
	.card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
	.card-title { font-size: 0.95rem; font-weight: 700; color: #0f172a; margin: 0; }
	.card-action { font-size: 0.8rem; color: #6366f1; text-decoration: none; font-weight: 500; }

	/* List */
	.list { display: flex; flex-direction: column; gap: 0.5rem; }
	.list-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.6rem 0.75rem; border-radius: 9px; background: #f8fafc; border: 1px solid #e2e8f0; }
	.list-avatar { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, #0ea5e9, #38bdf8); color: white; font-weight: 700; font-size: 0.85rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
	.list-avatar.blue { background: linear-gradient(135deg, #8b5cf6, #a78bfa); }
	.list-info { flex: 1; min-width: 0; }
	.list-name { font-size: 0.85rem; font-weight: 600; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
	.list-sub { font-size: 0.73rem; color: #64748b; margin-top: 0.1rem; }
	.badge { padding: 0.2rem 0.55rem; border-radius: 999px; font-size: 0.68rem; font-weight: 700; text-transform: uppercase; }
	.badge-gold { background: #fef3c7; color: #d97706; border: 1px solid #fde68a; }
	.empty { text-align: center; padding: 1.25rem; color: #94a3b8; font-size: 0.85rem; }
	.empty a { color: #6366f1; text-decoration: none; }

	/* Quick Actions */
	.quick-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; }
	.quick-card { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; border-radius: 10px; background: #f8fafc; border: 1px solid #e2e8f0; text-decoration: none; transition: all 0.2s; }
	.quick-card:hover { background: #e0f2fe; border-color: #7dd3fc; }
	.quick-icon { font-size: 1.3rem; flex-shrink: 0; }
	.quick-label { font-size: 0.83rem; font-weight: 600; color: #0f172a; }
	.quick-desc { font-size: 0.72rem; color: #64748b; margin-top: 0.1rem; }

	@media (max-width: 1024px) {
		.stats-grid { grid-template-columns: 1fr 1fr; }
		.content-grid { grid-template-columns: 1fr; }
	}
</style>
