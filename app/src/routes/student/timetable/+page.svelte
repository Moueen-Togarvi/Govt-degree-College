<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	// Group timetable by day
	const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	
	const groupedTimetable = $derived(() => {
		const grouped: Record<string, typeof data.timetable> = {};
		days.forEach(d => grouped[d] = []);
		
		data.timetable.forEach(entry => {
			if (grouped[entry.day]) {
				grouped[entry.day].push(entry);
			}
		});
		return grouped;
	});

	function formatTime(timeStr: string) {
		const [h, m] = timeStr.split(':');
		const hour = parseInt(h);
		const ampm = hour >= 12 ? 'PM' : 'AM';
		const hour12 = hour % 12 || 12;
		return `${hour12}:${m} ${ampm}`;
	}
</script>

<svelte:head><title>Timetable — Student Portal | GPGC</title></svelte:head>

<div class="page">
	<div class="page-header">
		<div>
			<h1 class="page-title">🗓️ Class Timetable</h1>
			<p class="page-subtitle">Weekly schedule for Semester {data.profile?.semester}</p>
		</div>
	</div>

	{#if data.timetable.length === 0}
		<div class="empty-state">
			<span>🗓️</span>
			<h3>No Timetable Found</h3>
			<p>Your weekly schedule has not been set up yet. Contact your coordinator.</p>
		</div>
	{:else}
		<div class="timetable-grid">
			{#each days as day}
				{@const classes = groupedTimetable()[day]}
				{#if classes.length > 0}
					<div class="day-card">
						<h2 class="day-header">{day}</h2>
						<div class="class-list">
							{#each classes as cls}
								<div class="class-item {cls.class_type === 'lab' ? 'is-lab' : ''}">
									<div class="time-col">
										<div class="time">{formatTime(cls.start_time)}</div>
										<div class="time-to">to</div>
										<div class="time">{formatTime(cls.end_time)}</div>
									</div>
									<div class="info-col">
										<div class="course-header">
											<span class="course-code">{cls.course_code}</span>
											<span class="type-badge {cls.class_type}">{cls.class_type}</span>
										</div>
										<div class="course-title">{cls.course_title}</div>
										<div class="course-meta">
											<span class="teacher">👨‍🏫 {cls.teacher_name}</span>
											{#if cls.room}
												<span class="room">📍 {cls.room}</span>
											{/if}
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			{/each}
		</div>
	{/if}
</div>

<style>
	.page { display: flex; flex-direction: column; gap: 1.5rem; }
	.page-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }
	.page-title { font-size: 1.5rem; font-weight: 700; color: #0f172a; margin: 0 0 0.25rem; }
	.page-subtitle { font-size: 0.85rem; color: #64748b; margin: 0; }

	.empty-state { text-align: center; padding: 4rem 2rem; background: white; border-radius: 14px; border: 1px solid #e2e8f0; }
	.empty-state span { font-size: 3rem; display: block; margin-bottom: 1rem; }
	.empty-state h3 { font-size: 1.1rem; color: #0f172a; margin: 0 0 0.5rem; }
	.empty-state p { font-size: 0.9rem; color: #64748b; margin: 0; }

	.timetable-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1.5rem; align-items: start; }
	
	.day-card { background: white; border-radius: 14px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05); overflow: hidden; }
	.day-header { font-size: 1.05rem; font-weight: 700; color: #1e1b4b; margin: 0; padding: 1rem 1.25rem; background: #f8fafc; border-bottom: 1px solid #e2e8f0; }
	
	.class-list { display: flex; flex-direction: column; }
	.class-item { display: flex; gap: 1rem; padding: 1.25rem; border-bottom: 1px solid #f1f5f9; }
	.class-item:last-child { border-bottom: none; }
	.class-item.is-lab { background: #fefce8; }
	
	.time-col { display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 75px; flex-shrink: 0; border-right: 2px dashed #e2e8f0; padding-right: 1rem; }
	.time { font-size: 0.85rem; font-weight: 700; color: #0f172a; white-space: nowrap; }
	.time-to { font-size: 0.65rem; color: #94a3b8; text-transform: uppercase; margin: 0.2rem 0; font-weight: 600; }
	
	.info-col { flex: 1; display: flex; flex-direction: column; gap: 0.4rem; justify-content: center; }
	.course-header { display: flex; align-items: center; gap: 0.5rem; }
	.course-code { font-size: 0.72rem; font-weight: 700; background: #eff6ff; color: #1d4ed8; padding: 0.15rem 0.4rem; border-radius: 4px; font-family: monospace; }
	
	.type-badge { font-size: 0.65rem; font-weight: 700; padding: 0.15rem 0.4rem; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.05em; }
	.type-badge.lecture { background: #f1f5f9; color: #475569; }
	.type-badge.lab { background: #fef3c7; color: #92400e; }
	
	.course-title { font-size: 0.95rem; font-weight: 600; color: #0f172a; line-height: 1.3; }
	.course-meta { display: flex; flex-wrap: wrap; gap: 0.75rem; font-size: 0.75rem; color: #64748b; margin-top: 0.2rem; }
	.teacher { font-weight: 500; }
	.room { background: #f1f5f9; padding: 0.1rem 0.4rem; border-radius: 4px; color: #334155; }
</style>
