<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let selectedOffering = $state(data.selectedOfferingId?.toString() ?? '');
	let submitting = $state(false);

	// Build marks map
	const marksMap = $derived(() => {
		const m: Record<number, typeof data.marks[0]> = {};
		for (const mk of data.marks) m[mk.student_id] = mk;
		return m;
	});

	const isPublished = $derived(() => data.marks.length > 0 && data.marks[0].is_published);

	function navigate() {
		goto(`/faculty/marks?offering=${selectedOffering}`);
	}

	function getTotal(studentId: number): number {
		const m = marksMap()[studentId];
		if (!m) return 0;
		return (m.midterm ?? 0) + (m.finals ?? 0) + (m.quizzes ?? 0) + (m.assignments ?? 0) + (m.practical ?? 0);
	}
</script>

<svelte:head><title>Marks Entry — Faculty | GPGC Portal</title></svelte:head>

<div class="page">
	<div class="page-header">
		<div>
			<h1 class="page-title">📊 Marks Entry</h1>
			<p class="page-subtitle">Enter and manage student marks per course</p>
		</div>
	</div>

	{#if form?.error}
		<div class="alert alert-error">❌ {form.error}</div>
	{/if}
	{#if form?.success}
		<div class="alert alert-success">✅ {form.message}</div>
	{/if}

	<!-- Course Selector -->
	<div class="controls-card">
		<div class="control-group">
			<label class="control-label">Select Course</label>
			<select bind:value={selectedOffering} class="control-select" onchange={navigate}>
				<option value="">— Select a course to enter marks —</option>
				{#each data.offerings as o}
					<option value={o.id}>{o.course_code} — {o.course_title} (Sem {o.semester})</option>
				{/each}
			</select>
		</div>
	</div>

	{#if !selectedOffering}
		<div class="select-prompt">
			<span>📊</span>
			<p>Select a course above to enter or view marks.</p>
		</div>
	{:else}
		<!-- Marks Table -->
		<div class="table-card">
			<div class="table-toolbar">
				<div class="table-info">
					📚 {data.selectedOffering?.course_code} — {data.selectedOffering?.course_title}
					· {data.students.length} students
					{#if isPublished()}<span class="published-tag">🌐 Published</span>{/if}
				</div>
				<div class="toolbar-actions">
					<form method="POST" action="?/publish">
						<input type="hidden" name="offering_id" value={selectedOffering} />
						<input type="hidden" name="publish" value={isPublished() ? 'false' : 'true'} />
						<button type="submit" class="btn-publish {isPublished() ? 'unpublish' : 'publish'}">
							{isPublished() ? '🔒 Unpublish' : '🌐 Publish Results'}
						</button>
					</form>
				</div>
			</div>

			{#if data.students.length === 0}
				<div class="empty-msg">No students enrolled in this course.</div>
			{:else}
				<form method="POST" action="?/saveMarks"
					use:enhance={() => { submitting = true; return async ({ update }) => { submitting = false; await update(); }; }}>

					<input type="hidden" name="offering_id" value={selectedOffering} />

					<div class="table-scroll">
						<table class="table">
							<thead>
								<tr>
									<th>#</th>
									<th>Roll No.</th>
									<th>Student</th>
									<th class="marks-col">Midterm<br><small>/30</small></th>
									<th class="marks-col">Finals<br><small>/50</small></th>
									<th class="marks-col">Quizzes<br><small>/10</small></th>
									<th class="marks-col">Assign.<br><small>/5</small></th>
									<th class="marks-col">Practical<br><small>/5</small></th>
									<th class="marks-col">Total<br><small>/100</small></th>
									<th>Grade</th>
								</tr>
							</thead>
							<tbody>
								{#each data.students as student, i}
									{@const mk = marksMap()[student.student_id as number]}
									<tr>
										<td class="row-num">{i + 1}</td>
										<td><span class="roll">{student.roll_number}</span></td>
										<td class="student-name">{student.name}</td>
										<input type="hidden" name="student_id" value={student.student_id} />
										<td><input type="number" name="midterm" min="0" max="30" step="0.5" value={mk?.midterm ?? 0} class="marks-input" /></td>
										<td><input type="number" name="finals" min="0" max="50" step="0.5" value={mk?.finals ?? 0} class="marks-input" /></td>
										<td><input type="number" name="quizzes" min="0" max="10" step="0.5" value={mk?.quizzes ?? 0} class="marks-input" /></td>
										<td><input type="number" name="assignments" min="0" max="5" step="0.5" value={mk?.assignments ?? 0} class="marks-input" /></td>
										<td><input type="number" name="practical" min="0" max="5" step="0.5" value={mk?.practical ?? 0} class="marks-input" /></td>
										<td class="text-center">
											<span class="total-val">{mk ? getTotal(student.student_id as number) : '—'}</span>
										</td>
										<td class="text-center">
											{#if mk?.grade}
												<span class="grade-badge grade-{mk.grade.replace('+','p').replace('-','m')}">{mk.grade}</span>
											{:else}
												<span class="grade-none">—</span>
											{/if}
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>

					<div class="form-footer">
						<button type="submit" class="btn-save" disabled={submitting}>
							{#if submitting}<span class="spinner"></span>{/if}
							💾 Save All Marks
						</button>
					</div>
				</form>
			{/if}
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

	.controls-card { background: white; border-radius: 14px; padding: 1.25rem 1.5rem; border: 1px solid #e2e8f0; }
	.control-group { display: flex; flex-direction: column; gap: 0.4rem; max-width: 480px; }
	.control-label { font-size: 0.78rem; font-weight: 600; color: #374151; }
	.control-select { padding: 0.6rem 0.875rem; border: 1px solid #e2e8f0; border-radius: 9px; font-size: 0.88rem; font-family: inherit; outline: none; }
	.control-select:focus { border-color: #7dd3fc; }

	.select-prompt { text-align: center; padding: 3rem; color: #94a3b8; }
	.select-prompt span { font-size: 3rem; display: block; margin-bottom: 0.75rem; }
	.select-prompt p { font-size: 0.9rem; margin: 0; }

	.table-card { background: white; border-radius: 14px; border: 1px solid #e2e8f0; overflow: hidden; }
	.table-toolbar { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.25rem; background: #f8fafc; border-bottom: 1px solid #e2e8f0; gap: 1rem; flex-wrap: wrap; }
	.table-info { font-size: 0.85rem; color: #475569; font-weight: 500; display: flex; align-items: center; gap: 0.75rem; }
	.published-tag { background: #d1fae5; color: #065f46; padding: 0.2rem 0.6rem; border-radius: 999px; font-size: 0.75rem; font-weight: 600; }
	.toolbar-actions { display: flex; gap: 0.5rem; }
	.btn-publish { padding: 0.5rem 1rem; border-radius: 8px; border: none; font-size: 0.82rem; font-weight: 600; cursor: pointer; font-family: inherit; transition: all 0.2s; }
	.btn-publish.publish { background: #d1fae5; color: #065f46; border: 1px solid #a7f3d0; }
	.btn-publish.unpublish { background: #fee2e2; color: #dc2626; border: 1px solid #fecaca; }
	.empty-msg { text-align: center; color: #94a3b8; padding: 2rem; font-size: 0.9rem; }

	.table-scroll { overflow-x: auto; }
	.table { width: 100%; border-collapse: collapse; min-width: 760px; }
	.table th { background: #f8fafc; padding: 0.6rem 0.7rem; text-align: center; font-size: 0.72rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.03em; border-bottom: 1px solid #e2e8f0; line-height: 1.3; }
	.table th:nth-child(1), .table th:nth-child(2), .table th:nth-child(3) { text-align: left; }
	.table td { padding: 0.6rem 0.7rem; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
	.table tbody tr:last-child td { border-bottom: none; }
	.table tbody tr:hover { background: #f8fafc; }
	.text-center { text-align: center; }
	.row-num { color: #94a3b8; font-size: 0.8rem; }
	.roll { background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; padding: 0.15rem 0.45rem; border-radius: 5px; font-size: 0.75rem; font-weight: 700; font-family: monospace; }
	.student-name { font-size: 0.85rem; font-weight: 600; color: #0f172a; }
	.marks-col { min-width: 70px; }
	.marks-input { width: 60px; padding: 0.35rem 0.4rem; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 0.85rem; text-align: center; font-family: inherit; outline: none; }
	.marks-input:focus { border-color: #7dd3fc; box-shadow: 0 0 0 2px rgba(125,211,252,0.2); }
	.total-val { font-weight: 700; color: #0f172a; font-size: 0.9rem; }
	.grade-badge { padding: 0.2rem 0.5rem; border-radius: 5px; font-size: 0.75rem; font-weight: 700; }
	.grade-Ap, .grade-A { background: #d1fae5; color: #065f46; }
	.grade-Am, .grade-Bp { background: #dcfce7; color: #166534; }
	.grade-B, .grade-Bm { background: #d1fae5; color: #065f46; }
	.grade-Cp, .grade-C { background: #fef3c7; color: #92400e; }
	.grade-Cm, .grade-Dp { background: #fed7aa; color: #9a3412; }
	.grade-D, .grade-F { background: #fee2e2; color: #991b1b; }
	.grade-none { color: #94a3b8; font-size: 0.82rem; }

	.form-footer { padding: 1rem 1.25rem; border-top: 1px solid #f1f5f9; display: flex; justify-content: flex-end; }
	.btn-save { background: linear-gradient(135deg, #0284c7, #0369a1); color: white; border: none; border-radius: 10px; padding: 0.65rem 1.5rem; font-size: 0.9rem; font-weight: 600; cursor: pointer; font-family: inherit; display: flex; align-items: center; gap: 0.5rem; }
	.btn-save:disabled { opacity: 0.6; cursor: not-allowed; }
	.spinner { width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; }
	@keyframes spin { to { transform: rotate(360deg); } }
</style>
