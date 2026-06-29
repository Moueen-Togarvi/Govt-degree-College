<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { PageData, ActionData } from './$types';
	import { reveal, lift } from '$lib/admin/motion';

	import ClipboardCheck from 'lucide-svelte/icons/clipboard-check';
	import CalendarDays from 'lucide-svelte/icons/calendar-days';
	import BookOpen from 'lucide-svelte/icons/book-open';
	import ArrowLeftRight from 'lucide-svelte/icons/arrow-left-right';
	import CircleAlert from 'lucide-svelte/icons/circle-alert';
	import Check from 'lucide-svelte/icons/check';
	import X from 'lucide-svelte/icons/x';
	import Save from 'lucide-svelte/icons/save';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let selectedOffering = $state(data.selectedOfferingId?.toString() ?? '');
	let selectedDate = $state(data.selectedDate ?? new Date().toISOString().split('T')[0]);
	let view = $state(data.view ?? 'mark');
	let submitting = $state(false);

	// Build attendance status map from existing records
	const existingMap = $derived(() => {
		const m: Record<number, string> = {};
		for (const a of data.attendance) {
			m[a.student_id] = a.status;
		}
		return m;
	});

	function navigate() {
		goto(`/faculty/attendance?offering=${selectedOffering}&date=${selectedDate}&view=${view}`);
	}

	function setAllStatus(status: string) {
		const selects = document.querySelectorAll<HTMLSelectElement>('.status-select');
		selects.forEach((s) => (s.value = status));
	}
</script>

<svelte:head><title>Attendance — Faculty | GPGC Portal</title></svelte:head>

<div class="adm-page" use:reveal={{ y: 12 }}>
	<div class="adm-head">
		<div>
			<h1 class="adm-title">
				<ClipboardCheck size={22} stroke-width={2} /> Attendance Management
			</h1>
			<p class="adm-sub">Track and update daily lecture attendance for assigned BS semesters</p>
		</div>
	</div>

	{#if form?.error}
		<div class="adm-alert adm-alert--error" use:reveal={{ y: 8 }}>
			<CircleAlert size={18} />
			<span>{form.error}</span>
		</div>
	{/if}
	{#if form?.success}
		<div class="adm-alert adm-alert--success" use:reveal={{ y: 8 }}>
			<Check size={18} />
			<span>{form.message}</span>
		</div>
	{/if}

	<!-- Filter Controls -->
	<div class="adm-card" use:reveal={{ delay: 60, y: 12 }}>
		<div class="adm-card__body">
			<div class="controls-grid">
				<div class="adm-field">
					<label class="adm-label" for="course-select">Select Course</label>
					<select id="course-select" bind:value={selectedOffering} class="adm-select" onchange={navigate}>
						<option value="">— Choose Course —</option>
						{#each data.offerings as o}
							<option value={o.id}>{o.course_code} — {o.course_title} (Sem {o.semester})</option>
						{/each}
					</select>
				</div>
				<div class="adm-field">
					<label class="adm-label" for="date-select">Lecture Date</label>
					<input type="date" id="date-select" bind:value={selectedDate} class="adm-input" onchange={navigate} />
				</div>
				<div class="adm-field">
					<label class="adm-label" for="view-toggle">Display Mode</label>
					<div class="view-toggle-container">
						<button
							class="toggle-btn {view === 'mark' ? 'active' : ''}"
							onclick={() => {
								view = 'mark';
								navigate();
							}}
						>
							<ClipboardCheck size={14} /> Mark Attendance
						</button>
						<button
							class="toggle-btn {view === 'summary' ? 'active' : ''}"
							onclick={() => {
								view = 'summary';
								navigate();
							}}
						>
							<BookOpen size={14} /> Summary Report
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	{#if !selectedOffering}
		<div class="adm-card" use:reveal={{ delay: 120, y: 12 }}>
			<div class="adm-empty">
				<div class="adm-empty__icon"><BookOpen size={24} /></div>
				<h3>No Course Selected</h3>
				<p>Please choose a course and date from the selector above to manage class attendance logs.</p>
			</div>
		</div>

	{:else if view === 'mark'}
		<div class="adm-card" use:reveal={{ delay: 120, y: 12 }}>
			<div class="adm-card__head">
				<h2 class="adm-card__title">
					<CalendarDays size={18} />
					<span>
						{new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-PK', {
							weekday: 'long',
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</span>
					<span class="adm-badge adm-badge--gray">{data.students?.length ?? 0} Students</span>
				</h2>

				<div class="toolbar-actions">
					<span class="action-label">Bulk Mark:</span>
					<button class="adm-btn adm-btn--good adm-btn--sm" onclick={() => setAllStatus('present')}>
						<Check size={12} /> Present
					</button>
					<button class="adm-btn adm-btn--danger adm-btn--sm" onclick={() => setAllStatus('absent')}>
						<X size={12} /> Absent
					</button>
				</div>
			</div>

			<div class="adm-card__body p-0">
				{#if !data.students || data.students.length === 0}
					<div class="adm-empty">
						<p>No students enrolled in this course yet.</p>
					</div>
				{:else}
					<form
						method="POST"
						action="?/mark"
						use:enhance={() => {
							submitting = true;
							return async ({ update }) => {
								submitting = false;
								await update();
							};
						}}
					>
						<input type="hidden" name="offering_id" value={selectedOffering} />
						<input type="hidden" name="date" value={selectedDate} />

						<div class="adm-table-wrap">
							<table class="adm-table">
								<thead>
									<tr>
										<th style="width: 60px;">#</th>
										<th style="width: 150px;">Roll No.</th>
										<th>Student Name</th>
										<th style="width: 220px;">Attendance Status</th>
									</tr>
								</thead>
								<tbody>
									{#each data.students as student, i}
										<tr>
											<td class="row-index">{i + 1}</td>
											<td><span class="adm-code">{student.roll_number}</span></td>
											<td class="student-name">{student.name}</td>
											<td>
												<input type="hidden" name="student_id" value={student.student_id} />
												<select
													name="status"
													class="adm-select status-select"
													value={existingMap()[student.student_id as number] ?? 'present'}
												>
													<option value="present">✅ Present</option>
													<option value="absent">❌ Absent</option>
													<option value="late">⏰ Late</option>
													<option value="leave">📋 Leave</option>
												</select>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>

						<div class="form-actions">
							<button type="submit" class="adm-btn adm-btn--primary" disabled={submitting}>
								{#if submitting}
									<span class="adm-spin"></span>
								{:else}
									<Save size={16} />
								{/if}
								Save Attendance Records
							</button>
						</div>
					</form>
				{/if}
			</div>
		</div>

	{:else if view === 'summary'}
		<div class="adm-card" use:reveal={{ delay: 120, y: 12 }}>
			<div class="adm-card__head">
				<h2 class="adm-card__title">
					<BookOpen size={18} /> Attendance Summary Report
				</h2>
			</div>
			<div class="adm-card__body p-0">
				<div class="adm-table-wrap">
					<table class="adm-table">
						<thead>
							<tr>
								<th style="width: 60px;">#</th>
								<th style="width: 150px;">Roll No.</th>
								<th>Student</th>
								<th class="text-center" style="width: 100px;">Total Lectures</th>
								<th class="text-center" style="width: 100px;">Present</th>
								<th class="text-center" style="width: 100px;">Absent</th>
								<th class="text-center" style="width: 100px;">Late</th>
								<th class="text-center" style="width: 140px;">Percentage</th>
							</tr>
						</thead>
						<tbody>
							{#if data.summary.length === 0}
								<tr>
									<td colspan="8" class="text-center is-muted" style="padding: 3rem;">
										No attendance records found for this course.
									</td>
								</tr>
							{:else}
								{#each data.summary as s, i}
									<tr>
										<td class="row-index">{i + 1}</td>
										<td><span class="adm-code">{s.roll_number}</span></td>
										<td class="student-name">{s.student_name}</td>
										<td class="text-center">{s.total}</td>
										<td class="text-center font-semibold text-emerald-600">{s.present}</td>
										<td class="text-center font-semibold text-rose-600">{s.absent}</td>
										<td class="text-center font-semibold text-amber-600">{s.late}</td>
										<td class="text-center">
											<span
												class="adm-badge {s.percentage >= 75
													? 'adm-badge--green'
													: s.percentage >= 60
														? 'adm-badge--amber'
														: 'adm-badge--red'}"
											>
												{s.percentage}%
											</span>
										</td>
									</tr>
								{/each}
							{/if}
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
	.controls-grid {
		display: grid;
		grid-template-columns: 2fr 1fr 1.5fr;
		gap: 1.25rem;
		align-items: flex-end;
	}
	@media (max-width: 768px) {
		.controls-grid {
			grid-template-columns: 1fr;
		}
	}

	.view-toggle-container {
		display: flex;
		background: var(--adm-line-soft);
		border-radius: 10px;
		padding: 0.25rem;
		border: 1px solid var(--adm-line);
	}
	.toggle-btn {
		flex: 1;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		padding: 0.55rem 0.85rem;
		border: none;
		background: none;
		font-size: 0.82rem;
		font-weight: 600;
		color: var(--adm-muted);
		border-radius: 8px;
		cursor: pointer;
		font-family: inherit;
		transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
	}
	.toggle-btn.active {
		background: #fff;
		color: var(--adm-accent);
		box-shadow: var(--adm-shadow);
	}

	.toolbar-actions {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.action-label {
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--adm-muted);
		margin-right: 0.25rem;
	}

	.row-index {
		color: var(--adm-muted);
		font-size: 0.8rem;
		font-weight: 600;
	}
	.student-name {
		font-weight: 600;
		color: var(--adm-ink);
	}

	.status-select {
		padding: 0.45rem 0.75rem;
		font-size: 0.85rem;
		border-radius: 8px;
	}

	.form-actions {
		padding: 1.25rem 1.4rem;
		border-top: 1px solid var(--adm-line-soft);
		display: flex;
		justify-content: flex-end;
		background: var(--adm-bg);
	}

	.text-center {
		text-align: center !important;
	}
	.font-semibold {
		font-weight: 600;
	}
	.text-emerald-600 {
		color: #059669;
	}
	.text-rose-600 {
		color: #e11d48;
	}
	.text-amber-600 {
		color: #d97706;
	}
</style>
