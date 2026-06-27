<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import { reveal } from '$lib/admin/motion';

	import CalendarDays from 'lucide-svelte/icons/calendar-days';
	import Plus from 'lucide-svelte/icons/plus';
	import TriangleAlert from 'lucide-svelte/icons/triangle-alert';
	import Check from 'lucide-svelte/icons/check';
	import Clock from 'lucide-svelte/icons/clock';
	import User from 'lucide-svelte/icons/user';
	import MapPin from 'lucide-svelte/icons/map-pin';
	import Trash2 from 'lucide-svelte/icons/trash-2';
	import X from 'lucide-svelte/icons/x';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let showModal = $state(false);
	let submitting = $state(false);

	const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	const groupedTimetable = $derived(() => {
		const grouped: Record<string, typeof data.timetable> = {};
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

<svelte:head><title>Timetable Builder — Coordinator | GPGC Portal</title></svelte:head>

<div class="adm-page">
	<div class="adm-head">
		<div>
			<h1 class="adm-title"><CalendarDays size={20} stroke-width={1.75} /> Timetable Builder</h1>
			<p class="adm-sub">{data.department?.name ?? ''} Department</p>
		</div>
		<button class="adm-btn adm-btn--primary" onclick={() => (showModal = true)}>
			<Plus size={16} stroke-width={2} /> Add Class Slot
		</button>
	</div>

	{#if form?.error}
		<div class="adm-alert adm-alert--error">
			<TriangleAlert size={18} stroke-width={2} />
			<span>{form.error}</span>
		</div>
	{/if}
	{#if form?.success}
		<div class="adm-alert adm-alert--success">
			<Check size={18} stroke-width={2} />
			<span>{form.message}</span>
		</div>
	{/if}

	{#if data.timetable.length === 0}
		<div class="adm-card" use:reveal={{ y: 16 }}>
			<div class="adm-empty">
				<div class="adm-empty__icon"><CalendarDays size={26} stroke-width={1.75} /></div>
				<h3>No Classes Scheduled</h3>
				<p>Click "Add Class Slot" to build the timetable for your department.</p>
				<button class="adm-btn adm-btn--primary adm-btn--sm" onclick={() => (showModal = true)}>
					<Plus size={15} stroke-width={2} /> Add Class Slot
				</button>
			</div>
		</div>
	{:else}
		<div class="timetable-grid">
			{#each days as day}
				{@const classes = groupedTimetable()[day]}
				{#if classes.length > 0}
					<div class="adm-card day-card" use:reveal={{ y: 16 }}>
						<div class="adm-card__head">
							<h2 class="adm-card__title">{day}</h2>
							<span class="adm-badge adm-badge--teal">
								{classes.length} class{classes.length !== 1 ? 'es' : ''}
							</span>
						</div>
						<div class="class-list">
							{#each classes as cls}
								<div class="class-item {cls.class_type === 'lab' ? 'is-lab' : ''}">
									<div class="time-col">
										<Clock size={14} stroke-width={1.75} />
										<div class="time">{formatTime(cls.start_time)}</div>
										<div class="time-to">to</div>
										<div class="time">{formatTime(cls.end_time)}</div>
									</div>
									<div class="info-col">
										<div class="course-header">
											<span class="course-code">{cls.course_code}</span>
											<span
												class="adm-badge {cls.class_type === 'lab'
													? 'adm-badge--amber'
													: 'adm-badge--gray'}"
											>
												{cls.class_type}
											</span>
										</div>
										<div class="course-title">{cls.course_title}</div>
										<div class="course-meta">
											<span class="teacher">
												<User size={13} stroke-width={1.75} />
												{cls.teacher_name}
											</span>
											{#if cls.room}
												<span class="room">
													<MapPin size={13} stroke-width={1.75} />
													{cls.room}
												</span>
											{/if}
											<span class="semester">Sem {cls.semester}</span>
										</div>
									</div>
									<div class="action-col">
										<form
											method="POST"
											action="?/delete"
											use:enhance={() => {
												if (!confirm(`Remove this class slot?`)) return () => {};
												return async ({ update }) => update();
											}}
										>
											<input type="hidden" name="id" value={cls.id} />
											<button
												class="btn-icon btn-delete"
												type="submit"
												title="Remove Slot"
												aria-label="Remove slot"
											>
												<Trash2 size={15} stroke-width={1.75} />
											</button>
										</form>
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

<!-- Add Modal -->
{#if showModal}
	<div
		class="adm-overlay"
		onclick={() => (showModal = false)}
		role="presentation"
		onkeydown={() => {}}
	>
		<div
			class="adm-modal"
			onclick={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
			tabindex="-1"
		>
			<div class="adm-modal__head">
				<h2 class="adm-modal__title"><Plus size={18} stroke-width={1.75} /> Add Class Slot</h2>
				<button onclick={() => (showModal = false)} class="adm-modal__close" aria-label="Close">
					<X size={18} stroke-width={2} />
				</button>
			</div>
			<form
				method="POST"
				action="?/create"
				use:enhance={() => {
					submitting = true;
					return async ({ update }) => {
						submitting = false;
						await update();
						showModal = false;
					};
				}}
			>
				<div class="adm-modal__body">
					<div class="adm-form">
						<div class="adm-field">
							<label class="adm-label" for="course_offering_id">Course Assignment *</label>
							<select id="course_offering_id" name="course_offering_id" required class="adm-select">
								<option value="">— Select Assigned Course —</option>
								{#each data.offerings as o}
									<option value={o.id}>
										{o.course_code} — {o.course_title} (Sem {o.semester}, {o.teacher_name})
									</option>
								{/each}
							</select>
							<p class="adm-hint">Note: You must assign teachers to courses first.</p>
						</div>

						<div class="adm-grid-2">
							<div class="adm-field">
								<label class="adm-label" for="day">Day *</label>
								<select id="day" name="day" required class="adm-select">
									{#each days as d}
										<option value={d}>{d}</option>
									{/each}
								</select>
							</div>
							<div class="adm-field">
								<label class="adm-label" for="class_type">Class Type *</label>
								<select id="class_type" name="class_type" required class="adm-select">
									<option value="lecture">Lecture</option>
									<option value="lab">Lab / Practical</option>
								</select>
							</div>
						</div>

						<div class="adm-grid-2">
							<div class="adm-field">
								<label class="adm-label" for="start_time">Start Time *</label>
								<input type="time" id="start_time" name="start_time" required class="adm-input" />
							</div>
							<div class="adm-field">
								<label class="adm-label" for="end_time">End Time *</label>
								<input type="time" id="end_time" name="end_time" required class="adm-input" />
							</div>
						</div>

						<div class="adm-field">
							<label class="adm-label" for="room">Room / Venue</label>
							<input
								type="text"
								id="room"
								name="room"
								placeholder="e.g. Room 101, Computer Lab"
								class="adm-input"
							/>
						</div>
					</div>
				</div>

				<div class="adm-modal__foot">
					<button type="button" onclick={() => (showModal = false)} class="adm-btn adm-btn--ghost">
						Cancel
					</button>
					<button type="submit" class="adm-btn adm-btn--primary" disabled={submitting}>
						{#if submitting}<span class="adm-spin"></span>{/if}
						Save Slot
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
	.timetable-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
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
		background: #fffdf3;
	}

	.time-col {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-width: 72px;
		flex-shrink: 0;
		gap: 0.05rem;
		color: var(--adm-muted);
		border-right: 2px dashed var(--adm-line);
		padding-right: 1rem;
	}
	.time {
		font-size: 0.82rem;
		font-weight: 700;
		color: var(--adm-ink);
		white-space: nowrap;
	}
	.time-to {
		font-size: 0.62rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--adm-muted);
		font-weight: 600;
		margin: 0.15rem 0;
	}

	.info-col {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		justify-content: center;
		min-width: 0;
	}

	.course-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
	}
	.course-code {
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.02em;
		font-family: ui-monospace, monospace;
		background: #e6f2f0;
		color: var(--adm-accent-dark);
		padding: 0.18rem 0.5rem;
		border-radius: 5px;
	}

	.course-title {
		font-size: 0.95rem;
		font-weight: 600;
		line-height: 1.3;
		color: var(--adm-ink);
	}

	.course-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		font-size: 0.76rem;
		margin-top: 0.15rem;
		color: var(--adm-muted);
	}
	.teacher {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		font-weight: 500;
		color: var(--adm-ink-2);
	}
	.room {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		background: var(--adm-line-soft);
		color: var(--adm-ink-2);
		padding: 0.12rem 0.45rem;
		border-radius: 5px;
	}
	.semester {
		font-weight: 600;
		color: var(--adm-accent);
	}

	.action-col {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-left: 0.25rem;
	}
	.btn-icon {
		display: grid;
		place-items: center;
		background: none;
		border: 1px solid var(--adm-line);
		border-radius: 8px;
		padding: 0.4rem;
		cursor: pointer;
		color: var(--adm-muted);
		transition:
			background 0.15s,
			border-color 0.15s,
			color 0.15s;
	}
	.btn-delete:hover {
		background: #fee2e2;
		border-color: #fca5a5;
		color: #b91c1c;
	}

	@media (max-width: 720px) {
		.timetable-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
