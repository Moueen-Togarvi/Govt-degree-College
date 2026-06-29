<script lang="ts">
	import type { PageData } from './$types';
	import { reveal, lift } from '$lib/admin/motion';
	import CalendarDays from 'lucide-svelte/icons/calendar-days';
	import User from 'lucide-svelte/icons/user';
	import MapPin from 'lucide-svelte/icons/map-pin';

	let { data }: { data: PageData } = $props();

	// Group timetable by day
	const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	const groupedTimetable = $derived(() => {
		const grouped: Record<string, any[]> = {};
		days.forEach((d) => (grouped[d] = []));

		data.timetable.forEach((entry) => {
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

<div class="adm-page" use:reveal={{ y: 12 }}>
	<div class="adm-head">
		<div>
			<h1 class="adm-title">
				<CalendarDays size={22} stroke-width={2} /> Weekly Class Timetable
			</h1>
			<p class="adm-sub">Academic schedule plan for Semester {data.profile?.semester}</p>
		</div>
	</div>

	{#if data.timetable.length === 0}
		<div class="adm-card" use:reveal={{ delay: 120, y: 12 }}>
			<div class="adm-empty">
				<div class="adm-empty__icon"><CalendarDays size={24} /></div>
				<h3>No Class Schedule Set</h3>
				<p>There are no timetable lecture entries configured for your current semester yet.</p>
			</div>
		</div>
	{:else}
		<div class="timetable-grid">
			{#each days as day, di}
				{@const classes = groupedTimetable()[day]}
				{#if classes.length > 0}
					<div class="adm-card day-card" use:reveal={{ delay: 50 * di, y: 12 }}>
						<div class="adm-card__head">
							<h2 class="adm-card__title">
								<span>{day}</span>
								<span class="adm-badge adm-badge--gray">{classes.length} Classes</span>
							</h2>
						</div>
						<div class="adm-card__body p-0">
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
												<span class="adm-code">{cls.course_code}</span>
												<span
													class="adm-badge {cls.class_type === 'lab'
														? 'adm-badge--amber'
														: 'adm-badge--gray'}"
												>
													{cls.class_type.toUpperCase()}
												</span>
											</div>
											<h4 class="course-title">{cls.course_title}</h4>
											<div class="course-meta">
												<span class="teacher-name">
													<User size={12} class="mr-1" /> {cls.teacher_name}
												</span>
												{#if cls.room}
													<span class="room-tag">
														<MapPin size={12} class="mr-1" /> Room {cls.room}
													</span>
												{/if}
											</div>
										</div>
									</div>
								{/each}
							</div>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	{/if}
</div>

<style>
	.p-0 {
		padding: 0 !important;
	}
	.mr-1 {
		margin-right: 0.25rem;
		display: inline-block;
		vertical-align: middle;
	}

	.timetable-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
		gap: 1.25rem;
		align-items: start;
	}

	.class-list {
		display: flex;
		flex-direction: column;
	}
	.class-item {
		display: flex;
		gap: 1rem;
		padding: 1.1rem 1.25rem;
		border-bottom: 1px solid var(--adm-line-soft);
	}
	.class-item:last-child {
		border-bottom: none;
	}
	.class-item.is-lab {
		background: #fefdf0;
	}

	.time-col {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-width: 75px;
		flex-shrink: 0;
		border-right: 1.5px dashed var(--adm-line);
		padding-right: 0.85rem;
	}
	.time {
		font-size: 0.82rem;
		font-weight: 700;
		color: var(--adm-ink);
		white-space: nowrap;
	}
	.time-to {
		font-size: 0.62rem;
		color: var(--adm-muted);
		text-transform: uppercase;
		margin: 0.15rem 0;
		font-weight: 700;
	}

	.info-col {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		justify-content: center;
		min-width: 0;
	}
	.course-header {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.course-title {
		font-size: 0.9rem;
		font-weight: 700;
		color: var(--adm-ink);
		margin: 0;
		line-height: 1.3;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.course-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.65rem;
		font-size: 0.74rem;
		color: var(--adm-muted);
		align-items: center;
	}
	.teacher-name {
		font-weight: 600;
		color: var(--adm-ink-2);
	}
	.room-tag {
		background: var(--adm-line-soft);
		border: 1px solid var(--adm-line);
		padding: 0.1rem 0.35rem;
		border-radius: 4px;
		color: var(--adm-ink-2);
		font-weight: 500;
	}
</style>
