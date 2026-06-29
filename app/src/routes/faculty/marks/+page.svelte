<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { PageData, ActionData } from './$types';
	import { reveal, lift } from '$lib/admin/motion';

	import FilePenLine from 'lucide-svelte/icons/file-pen-line';
	import BookOpen from 'lucide-svelte/icons/book-open';
	import Check from 'lucide-svelte/icons/check';
	import CircleAlert from 'lucide-svelte/icons/circle-alert';
	import Save from 'lucide-svelte/icons/save';
	import Eye from 'lucide-svelte/icons/eye';
	import EyeOff from 'lucide-svelte/icons/eye-off';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let selectedOffering = $state(data.selectedOfferingId?.toString() ?? '');
	let submitting = $state(false);

	// Build marks map
	const marksMap = $derived(() => {
		const m: Record<number, (typeof data.marks)[0]> = {};
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
		return (
			(m.midterm ?? 0) +
			(m.finals ?? 0) +
			(m.quizzes ?? 0) +
			(m.assignments ?? 0) +
			(m.practical ?? 0)
		);
	}
</script>

<svelte:head><title>Marks Entry — Faculty | GPGC Portal</title></svelte:head>

<div class="adm-page" use:reveal={{ y: 12 }}>
	<div class="adm-head">
		<div>
			<h1 class="adm-title">
				<FilePenLine size={22} stroke-width={2} /> Student Marks Entry
			</h1>
			<p class="adm-sub">Record midterm, final, quiz, assignment, and practical marks with dynamic GPA calculation</p>
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

	<!-- Course Selector -->
	<div class="adm-card" use:reveal={{ delay: 60, y: 12 }}>
		<div class="adm-card__body">
			<div class="adm-field" style="max-width: 540px;">
				<label class="adm-label" for="course-select">Select Assigned Course</label>
				<select id="course-select" bind:value={selectedOffering} class="adm-select" onchange={navigate}>
					<option value="">— Choose Course to Enter Marks —</option>
					{#each data.offerings as o}
						<option value={o.id}>{o.course_code} — {o.course_title} (Sem {o.semester})</option>
					{/each}
				</select>
			</div>
		</div>
	</div>

	{#if !selectedOffering}
		<div class="adm-card" use:reveal={{ delay: 120, y: 12 }}>
			<div class="adm-empty">
				<div class="adm-empty__icon"><FilePenLine size={24} /></div>
				<h3>No Course Selected</h3>
				<p>Please select an academic course from the list above to record or update semester results.</p>
			</div>
		</div>
	{:else}
		<!-- Marks Table -->
		<div class="adm-card" use:reveal={{ delay: 120, y: 12 }}>
			<div class="adm-card__head">
				<h2 class="adm-card__title">
					<BookOpen size={18} />
					<span>{data.selectedOffering?.course_code} — {data.selectedOffering?.course_title}</span>
					<span class="adm-badge adm-badge--gray">{data.students.length} Students</span>
					{#if isPublished()}
						<span class="adm-badge adm-badge--green">🌐 Results Published</span>
					{:else}
						<span class="adm-badge adm-badge--gray">🔒 Draft Mode</span>
					{/if}
				</h2>

				<div class="toolbar-actions">
					<form method="POST" action="?/publish" use:enhance>
						<input type="hidden" name="offering_id" value={selectedOffering} />
						<input type="hidden" name="publish" value={isPublished() ? 'false' : 'true'} />
						<button type="submit" class="adm-btn {isPublished() ? 'adm-btn--ghost' : 'adm-btn--good'} adm-btn--sm">
							{#if isPublished()}
								<EyeOff size={13} /> Unpublish Results
							{:else}
								<Eye size={13} /> Publish Results to Students
							{/if}
						</button>
					</form>
				</div>
			</div>

			<div class="adm-card__body p-0">
				{#if data.students.length === 0}
					<div class="adm-empty">
						<p>No students enrolled in this course.</p>
					</div>
				{:else}
					<form
						method="POST"
						action="?/saveMarks"
						use:enhance={() => {
							submitting = true;
							return async ({ update }) => {
								submitting = false;
								await update();
							};
						}}
					>
						<input type="hidden" name="offering_id" value={selectedOffering} />

						<div class="adm-table-wrap">
							<table class="adm-table">
								<thead>
									<tr>
										<th style="width: 50px;">#</th>
										<th style="width: 120px;">Roll No.</th>
										<th>Student Name</th>
										<th class="marks-header">Midterm<br /><small>/30</small></th>
										<th class="marks-header">Finals<br /><small>/50</small></th>
										<th class="marks-header">Quizzes<br /><small>/10</small></th>
										<th class="marks-header">Assign.<br /><small>/5</small></th>
										<th class="marks-header">Practical<br /><small>/5</small></th>
										<th class="marks-header">Total<br /><small>/100</small></th>
										<th class="text-center" style="width: 100px;">Grade</th>
									</tr>
								</thead>
								<tbody>
									{#each data.students as student, i}
										{@const mk = marksMap()[student.student_id as number]}
										<tr>
											<td class="row-index">{i + 1}</td>
											<td><span class="adm-code">{student.roll_number}</span></td>
											<td class="student-name">
												{student.name}
												<input type="hidden" name="student_id" value={student.student_id} />
											</td>
											<td class="text-center">
												<input
													type="number"
													name="midterm"
													min="0"
													max="30"
													step="0.5"
													value={mk?.midterm ?? 0}
													class="adm-input marks-input"
												/>
											</td>
											<td class="text-center">
												<input
													type="number"
													name="finals"
													min="0"
													max="50"
													step="0.5"
													value={mk?.finals ?? 0}
													class="adm-input marks-input"
												/>
											</td>
											<td class="text-center">
												<input
													type="number"
													name="quizzes"
													min="0"
													max="10"
													step="0.5"
													value={mk?.quizzes ?? 0}
													class="adm-input marks-input"
												/>
											</td>
											<td class="text-center">
												<input
													type="number"
													name="assignments"
													min="0"
													max="5"
													step="0.5"
													value={mk?.assignments ?? 0}
													class="adm-input marks-input"
												/>
											</td>
											<td class="text-center">
												<input
													type="number"
													name="practical"
													min="0"
													max="5"
													step="0.5"
													value={mk?.practical ?? 0}
													class="adm-input marks-input"
												/>
											</td>
											<td class="text-center font-bold text-slate-900">
												{mk ? getTotal(student.student_id as number) : '—'}
											</td>
											<td class="text-center">
												{#if mk?.grade}
													<span
														class="adm-badge {['A+', 'A', 'A-'].includes(mk.grade)
															? 'adm-badge--green'
															: ['B+', 'B', 'B-'].includes(mk.grade)
																? 'adm-badge--teal'
																: ['C+', 'C', 'C-'].includes(mk.grade)
																	? 'adm-badge--amber'
																	: 'adm-badge--red'}"
													>
														{mk.grade}
													</span>
												{:else}
													<span class="is-muted">—</span>
												{/if}
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
								Save Student Grades
							</button>
						</div>
					</form>
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	.p-0 {
		padding: 0 !important;
	}
	.toolbar-actions {
		display: flex;
		align-items: center;
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

	.marks-header {
		text-align: center !important;
		width: 90px;
	}

	.marks-input {
		width: 70px;
		padding: 0.4rem 0.5rem;
		font-size: 0.85rem;
		text-align: center;
		margin: 0 auto;
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
	.font-bold {
		font-weight: 700;
	}
	.text-slate-900 {
		color: var(--adm-ink);
	}
	.is-muted {
		color: var(--adm-muted);
	}
</style>
