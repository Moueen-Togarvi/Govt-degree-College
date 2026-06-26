<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let showModal = $state(false);
	let submitting = $state(false);

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

<svelte:head><title>Timetable Builder — Coordinator | GPGC Portal</title></svelte:head>

<div class="page">
	<div class="page-header">
		<div>
			<h1 class="page-title">🗓️ Timetable Builder</h1>
			<p class="page-subtitle">{data.department?.name ?? ''} Department</p>
		</div>
		<button class="btn-primary" onclick={() => showModal = true}>+ Add Class Slot</button>
	</div>

	{#if form?.error}
		<div class="alert alert-error">❌ {form.error}</div>
	{/if}
	{#if form?.success}
		<div class="alert alert-success">✅ {form.message}</div>
	{/if}

	{#if data.timetable.length === 0}
		<div class="empty-state">
			<span>🗓️</span>
			<h3>No Classes Scheduled</h3>
			<p>Click "Add Class Slot" to build the timetable for your department.</p>
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
											<span class="semester">Sem {cls.semester}</span>
										</div>
									</div>
									<div class="action-col">
										<form method="POST" action="?/delete" use:enhance={() => {
											if (!confirm(`Remove this class slot?`)) return () => {};
											return async ({ update }) => update();
										}}>
											<input type="hidden" name="id" value={cls.id} />
											<button class="btn-icon btn-delete" type="submit" title="Remove Slot">🗑️</button>
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
	<div class="modal-overlay" onclick={() => showModal = false} role="presentation" onkeydown={() => {}}>
		<div class="modal" onclick={e => e.stopPropagation()} role="dialog" aria-modal="true" tabindex="-1">
			<div class="modal-header">
				<h2 class="modal-title">+ Add Class Slot</h2>
				<button onclick={() => showModal = false} class="modal-close">✕</button>
			</div>
			<form method="POST" action="?/create"
				use:enhance={() => { submitting = true; return async ({ update }) => { submitting = false; await update(); showModal = false; }; }}
				class="modal-form">
				
				<div class="form-group">
					<label class="form-label" for="course_offering_id">Course Assignment *</label>
					<select id="course_offering_id" name="course_offering_id" required class="form-input">
						<option value="">— Select Assigned Course —</option>
						{#each data.offerings as o}
							<option value={o.id}>{o.course_code} — {o.course_title} (Sem {o.semester}, {o.teacher_name})</option>
						{/each}
					</select>
					<p class="form-hint">Note: You must assign teachers to courses first.</p>
				</div>

				<div class="form-row">
					<div class="form-group">
						<label class="form-label" for="day">Day *</label>
						<select id="day" name="day" required class="form-input">
							{#each days as d}
								<option value={d}>{d}</option>
							{/each}
						</select>
					</div>
					<div class="form-group">
						<label class="form-label" for="class_type">Class Type *</label>
						<select id="class_type" name="class_type" required class="form-input">
							<option value="lecture">Lecture</option>
							<option value="lab">Lab / Practical</option>
						</select>
					</div>
				</div>

				<div class="form-row">
					<div class="form-group">
						<label class="form-label" for="start_time">Start Time *</label>
						<input type="time" id="start_time" name="start_time" required class="form-input" />
					</div>
					<div class="form-group">
						<label class="form-label" for="end_time">End Time *</label>
						<input type="time" id="end_time" name="end_time" required class="form-input" />
					</div>
				</div>

				<div class="form-group">
					<label class="form-label" for="room">Room / Venue</label>
					<input type="text" id="room" name="room" placeholder="e.g. Room 101, Computer Lab" class="form-input" />
				</div>

				<div class="modal-footer">
					<button type="button" onclick={() => showModal = false} class="btn-secondary">Cancel</button>
					<button type="submit" class="btn-primary" disabled={submitting}>
						{#if submitting}<span class="spinner"></span>{/if}
						Save Slot
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
	.page { display: flex; flex-direction: column; gap: 1.5rem; }
	.page-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }
	.page-title { font-size: 1.5rem; font-weight: 700; color: #0f172a; margin: 0 0 0.25rem; }
	.page-subtitle { font-size: 0.85rem; color: #64748b; margin: 0; }
	
	.alert { padding: 0.75rem 1rem; border-radius: 10px; font-size: 0.88rem; font-weight: 500; }
	.alert-error { background: #fee2e2; color: #dc2626; border: 1px solid #fecaca; }
	.alert-success { background: #d1fae5; color: #065f46; border: 1px solid #a7f3d0; }

	.empty-state { text-align: center; padding: 4rem 2rem; background: white; border-radius: 14px; border: 1px solid #e2e8f0; }
	.empty-state span { font-size: 3rem; display: block; margin-bottom: 1rem; }
	.empty-state h3 { font-size: 1.1rem; color: #0f172a; margin: 0 0 0.5rem; }
	.empty-state p { font-size: 0.9rem; color: #64748b; margin: 0; }

	.timetable-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 1.5rem; align-items: start; }
	
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
	.teacher { font-weight: 500; color: #475569; }
	.room { background: #f1f5f9; padding: 0.1rem 0.4rem; border-radius: 4px; color: #334155; }
	.semester { font-weight: 600; color: #0284c7; }

	.action-col { display: flex; align-items: center; justify-content: center; padding-left: 0.5rem; }
	.btn-icon { background: none; border: 1px solid #e2e8f0; border-radius: 7px; padding: 0.4rem; cursor: pointer; font-size: 0.9rem; transition: all 0.2s; }
	.btn-delete:hover { background: #fee2e2; border-color: #fca5a5; }

	/* Button Styles */
	.btn-primary { background: linear-gradient(135deg, #0284c7, #0369a1); color: white; border: none; border-radius: 10px; padding: 0.65rem 1.25rem; font-size: 0.9rem; font-weight: 600; cursor: pointer; font-family: inherit; display: flex; align-items: center; gap: 0.5rem; }
	.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
	.btn-secondary { background: white; color: #475569; border: 1px solid #e2e8f0; border-radius: 10px; padding: 0.65rem 1.25rem; font-size: 0.9rem; font-weight: 600; cursor: pointer; font-family: inherit; }

	/* Modal Styles */
	.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 200; padding: 1rem; }
	.modal { background: white; border-radius: 16px; width: 100%; max-width: 520px; max-height: 90vh; overflow-y: auto; box-shadow: 0 25px 60px rgba(0,0,0,0.2); }
	.modal-header { display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 1.5rem; border-bottom: 1px solid #e2e8f0; }
	.modal-title { font-size: 1.1rem; font-weight: 700; color: #0f172a; margin: 0; }
	.modal-close { background: none; border: none; font-size: 1.1rem; cursor: pointer; color: #94a3b8; padding: 0.25rem; border-radius: 5px; }
	.modal-form { padding: 1.5rem; display: flex; flex-direction: column; gap: 1.15rem; }
	.modal-footer { display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 0.5rem; padding-top: 1.25rem; border-top: 1px solid #e2e8f0; }
	
	.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
	.form-group { display: flex; flex-direction: column; gap: 0.4rem; }
	.form-label { font-size: 0.85rem; font-weight: 600; color: #374151; }
	.form-input { padding: 0.65rem 0.875rem; border: 1px solid #e2e8f0; border-radius: 9px; font-size: 0.9rem; font-family: inherit; outline: none; background: #fff; }
	.form-input:focus { border-color: #7dd3fc; box-shadow: 0 0 0 3px rgba(125,211,252,0.2); }
	.form-hint { font-size: 0.75rem; color: #64748b; margin: 0; }

	.spinner { width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; }
	@keyframes spin { to { transform: rotate(360deg); } }
</style>
