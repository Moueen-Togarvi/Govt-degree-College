<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { PageData, ActionData } from './$types';

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
		selects.forEach(s => (s.value = status));
	}
</script>

<svelte:head><title>Attendance — Faculty | GPGC Portal</title></svelte:head>

<div class="page">
	<div class="page-header">
		<div>
			<h1 class="page-title">✅ Attendance</h1>
			<p class="page-subtitle">Mark or view student attendance by course and date</p>
		</div>
	</div>

	{#if form?.error}
		<div class="alert alert-error">❌ {form.error}</div>
	{/if}
	{#if form?.success}
		<div class="alert alert-success">✅ {form.message}</div>
	{/if}

	<!-- Controls -->
	<div class="controls-card">
		<div class="controls">
			<div class="control-group">
				<label class="control-label">Course</label>
				<select bind:value={selectedOffering} class="control-select" onchange={navigate}>
					<option value="">— Select Course —</option>
					{#each data.offerings as o}
						<option value={o.id}>{o.course_code} — {o.course_title} (Sem {o.semester})</option>
					{/each}
				</select>
			</div>
			<div class="control-group">
				<label class="control-label">Date</label>
				<input type="date" bind:value={selectedDate} class="control-input" onchange={navigate} />
			</div>
			<div class="control-group">
				<label class="control-label">View</label>
				<div class="view-toggle">
					<button class="view-btn {view === 'mark' ? 'active' : ''}" onclick={() => { view = 'mark'; navigate(); }}>Mark</button>
					<button class="view-btn {view === 'summary' ? 'active' : ''}" onclick={() => { view = 'summary'; navigate(); }}>Summary</button>
				</div>
			</div>
		</div>
	</div>

	{#if !selectedOffering}
		<div class="select-prompt">
			<span>📚</span>
			<p>Select a course above to begin marking attendance.</p>
		</div>

	<!-- Mark Attendance View -->
	{:else if view === 'mark'}
		<div class="table-card">
			<div class="table-toolbar">
				<div class="table-info">
					📅 {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-PK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
					· {data.students?.length ?? 0} students
				</div>
				<div class="quick-mark">
					Mark All:
					<button class="quick-btn present" onclick={() => setAllStatus('present')}>Present</button>
					<button class="quick-btn absent" onclick={() => setAllStatus('absent')}>Absent</button>
				</div>
			</div>

			{#if !data.students || data.students.length === 0}
				<div class="empty-row-msg">No students enrolled in this course yet.</div>
			{:else}
				<form method="POST" action="?/mark"
					use:enhance={() => { submitting = true; return async ({ update }) => { submitting = false; await update(); }; }}>

					<input type="hidden" name="offering_id" value={selectedOffering} />
					<input type="hidden" name="date" value={selectedDate} />

					<table class="table">
						<thead>
							<tr>
								<th>#</th>
								<th>Roll No.</th>
								<th>Student Name</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							{#each data.students as student, i}
								<tr>
									<td class="row-num">{i + 1}</td>
									<td><span class="roll">{student.roll_number}</span></td>
									<td class="student-name">{student.name}</td>
									<td>
										<input type="hidden" name="student_id" value={student.student_id} />
										<select name="status" class="status-select"
											value={existingMap()[student.student_id as number] ?? 'present'}>
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

					<div class="form-footer">
						<button type="submit" class="btn-save" disabled={submitting}>
							{#if submitting}<span class="spinner"></span>{/if}
							💾 Save Attendance
						</button>
					</div>
				</form>
			{/if}
		</div>

	<!-- Summary View -->
	{:else if view === 'summary'}
		<div class="table-card">
			<table class="table">
				<thead>
					<tr>
						<th>#</th>
						<th>Roll No.</th>
						<th>Student</th>
						<th class="text-center">Total</th>
						<th class="text-center">Present</th>
						<th class="text-center">Absent</th>
						<th class="text-center">Late</th>
						<th class="text-center">%</th>
					</tr>
				</thead>
				<tbody>
					{#if data.summary.length === 0}
						<tr><td colspan="8" class="empty-row">No attendance records yet.</td></tr>
					{:else}
						{#each data.summary as s, i}
							<tr>
								<td class="row-num">{i + 1}</td>
								<td><span class="roll">{s.roll_number}</span></td>
								<td class="student-name">{s.student_name}</td>
								<td class="text-center">{s.total}</td>
								<td class="text-center text-green">{s.present}</td>
								<td class="text-center text-red">{s.absent}</td>
								<td class="text-center text-orange">{s.late}</td>
								<td class="text-center">
									<span class="percent-badge {s.percentage >= 75 ? 'good' : s.percentage >= 60 ? 'warn' : 'bad'}">
										{s.percentage}%
									</span>
								</td>
							</tr>
						{/each}
					{/if}
				</tbody>
			</table>
		</div>
	{/if}
</div>

<style>
	.page { display: flex; flex-direction: column; gap: 1.25rem; }
	.page-header { display: flex; align-items: flex-start; justify-content: space-between; }
	.page-title { font-size: 1.5rem; font-weight: 700; color: #0f172a; margin: 0 0 0.25rem; }
	.page-subtitle { font-size: 0.85rem; color: #64748b; margin: 0; }
	.alert { padding: 0.75rem 1rem; border-radius: 10px; font-size: 0.88rem; font-weight: 500; }
	.alert-error { background: #fee2e2; color: #dc2626; border: 1px solid #fecaca; }
	.alert-success { background: #d1fae5; color: #065f46; border: 1px solid #a7f3d0; }

	/* Controls */
	.controls-card { background: white; border-radius: 14px; padding: 1.25rem 1.5rem; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
	.controls { display: flex; gap: 1.25rem; align-items: flex-end; flex-wrap: wrap; }
	.control-group { display: flex; flex-direction: column; gap: 0.4rem; flex: 1; min-width: 160px; }
	.control-label { font-size: 0.78rem; font-weight: 600; color: #374151; }
	.control-select, .control-input { padding: 0.6rem 0.875rem; border: 1px solid #e2e8f0; border-radius: 9px; font-size: 0.88rem; font-family: inherit; outline: none; background: white; }
	.control-select:focus, .control-input:focus { border-color: #7dd3fc; box-shadow: 0 0 0 3px rgba(125,211,252,0.2); }
	.view-toggle { display: flex; background: #f1f5f9; border-radius: 9px; padding: 0.25rem; }
	.view-btn { flex: 1; padding: 0.45rem 0.75rem; border: none; background: none; font-size: 0.83rem; font-weight: 600; color: #64748b; border-radius: 7px; cursor: pointer; font-family: inherit; transition: all 0.2s; }
	.view-btn.active { background: white; color: #0284c7; box-shadow: 0 1px 4px rgba(0,0,0,0.1); }

	.select-prompt { text-align: center; padding: 3rem; color: #94a3b8; }
	.select-prompt span { font-size: 3rem; display: block; margin-bottom: 0.75rem; }
	.select-prompt p { font-size: 0.9rem; margin: 0; }

	/* Table */
	.table-card { background: white; border-radius: 14px; border: 1px solid #e2e8f0; overflow: hidden; }
	.table-toolbar { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.25rem; background: #f8fafc; border-bottom: 1px solid #e2e8f0; gap: 1rem; flex-wrap: wrap; }
	.table-info { font-size: 0.85rem; color: #475569; font-weight: 500; }
	.quick-mark { display: flex; align-items: center; gap: 0.5rem; font-size: 0.82rem; color: #64748b; }
	.quick-btn { padding: 0.35rem 0.75rem; border: none; border-radius: 6px; font-size: 0.8rem; font-weight: 600; cursor: pointer; font-family: inherit; }
	.quick-btn.present { background: #d1fae5; color: #065f46; }
	.quick-btn.absent { background: #fee2e2; color: #dc2626; }
	.table { width: 100%; border-collapse: collapse; }
	.table th { background: #f8fafc; padding: 0.75rem 1rem; text-align: left; font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #e2e8f0; }
	.table td { padding: 0.75rem 1rem; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
	.table tbody tr:last-child td { border-bottom: none; }
	.table tbody tr:hover { background: #f8fafc; }
	.text-center { text-align: center; }
	.row-num { color: #94a3b8; font-size: 0.8rem; }
	.empty-row { text-align: center; color: #94a3b8; padding: 2.5rem; font-size: 0.9rem; }
	.empty-row-msg { text-align: center; color: #94a3b8; padding: 2rem; font-size: 0.9rem; }
	.roll { background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; padding: 0.2rem 0.5rem; border-radius: 5px; font-size: 0.78rem; font-weight: 600; font-family: monospace; }
	.student-name { font-size: 0.88rem; font-weight: 600; color: #0f172a; }
	.status-select { padding: 0.45rem 0.7rem; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 0.85rem; font-family: inherit; outline: none; cursor: pointer; background: white; }
	.status-select:focus { border-color: #7dd3fc; }
	.text-green { color: #059669; font-weight: 600; }
	.text-red { color: #dc2626; font-weight: 600; }
	.text-orange { color: #d97706; font-weight: 600; }
	.percent-badge { padding: 0.25rem 0.6rem; border-radius: 999px; font-size: 0.78rem; font-weight: 700; }
	.percent-badge.good { background: #d1fae5; color: #065f46; }
	.percent-badge.warn { background: #fef3c7; color: #92400e; }
	.percent-badge.bad { background: #fee2e2; color: #991b1b; }

	.form-footer { padding: 1rem 1.25rem; border-top: 1px solid #f1f5f9; display: flex; justify-content: flex-end; }
	.btn-save { background: linear-gradient(135deg, #059669, #047857); color: white; border: none; border-radius: 10px; padding: 0.65rem 1.5rem; font-size: 0.9rem; font-weight: 600; cursor: pointer; font-family: inherit; display: flex; align-items: center; gap: 0.5rem; }
	.btn-save:disabled { opacity: 0.6; cursor: not-allowed; }
	.spinner { width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; }
	@keyframes spin { to { transform: rotate(360deg); } }
</style>
