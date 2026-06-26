<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	function gradeClass(g: string | null) {
		if (!g) return 'grade-none';
		if (['A+','A','A-'].includes(g)) return 'grade-a';
		if (['B+','B','B-'].includes(g)) return 'grade-b';
		if (['C+','C','C-'].includes(g)) return 'grade-c';
		if (['D+','D'].includes(g)) return 'grade-d';
		return 'grade-f';
	}
</script>

<svelte:head><title>Results & GPA — Student Portal | GPGC</title></svelte:head>

<div class="page">
	<div class="page-header">
		<div>
			<h1 class="page-title">📊 Results & GPA</h1>
			<p class="page-subtitle">{data.profile?.department_name} · Semester {data.profile?.semester}</p>
		</div>
		{#if data.results.length > 0}
			<div class="cgpa-badge">
				<div class="cgpa-label">CGPA</div>
				<div class="cgpa-value">{data.cgpa.toFixed(2)}</div>
			</div>
		{/if}
	</div>

	{#if data.results.length === 0}
		<div class="empty-state">
			<span>📊</span>
			<h3>No Results Yet</h3>
			<p>Your results will appear here once they are published by your faculty.</p>
		</div>
	{:else}
		<div class="table-card">
			<table class="table">
				<thead>
					<tr>
						<th>#</th>
						<th>Course</th>
						<th class="text-center">Credits</th>
						<th class="text-center">Midterm<br><small>/30</small></th>
						<th class="text-center">Finals<br><small>/50</small></th>
						<th class="text-center">Quizzes<br><small>/10</small></th>
						<th class="text-center">Assign.<br><small>/5</small></th>
						<th class="text-center">Practical<br><small>/5</small></th>
						<th class="text-center">Total<br><small>/100</small></th>
						<th class="text-center">Grade</th>
						<th class="text-center">GPA</th>
					</tr>
				</thead>
				<tbody>
					{#each data.results as result, i}
						<tr>
							<td class="row-num">{i + 1}</td>
							<td>
								<div class="course-cell">
									<span class="course-code">{result.course_code}</span>
									<span class="course-title">{result.course_title}</span>
								</div>
							</td>
							<td class="text-center num">{result.credit_hours}</td>
							<td class="text-center num">{result.midterm}</td>
							<td class="text-center num">{result.finals}</td>
							<td class="text-center num">{result.quizzes}</td>
							<td class="text-center num">{result.assignments}</td>
							<td class="text-center num">{result.practical}</td>
							<td class="text-center">
								<strong class="total-val">{result.total}</strong>
							</td>
							<td class="text-center">
								<span class="grade-badge {gradeClass(result.grade)}">{result.grade ?? '—'}</span>
							</td>
							<td class="text-center num">{result.gpa_points?.toFixed(1) ?? '—'}</td>
						</tr>
					{/each}
				</tbody>
				<tfoot>
					<tr class="cgpa-row">
						<td colspan="2" class="cgpa-label-cell">Cumulative GPA</td>
						<td class="text-center">{data.results.reduce((s,r) => s + r.credit_hours, 0)}</td>
						<td colspan="7"></td>
						<td class="text-center cgpa-final">{data.cgpa.toFixed(2)}</td>
					</tr>
				</tfoot>
			</table>
		</div>
	{/if}
</div>

<style>
	.page { display: flex; flex-direction: column; gap: 1.5rem; }
	.page-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }
	.page-title { font-size: 1.5rem; font-weight: 700; color: #0f172a; margin: 0 0 0.25rem; }
	.page-subtitle { font-size: 0.85rem; color: #64748b; margin: 0; }

	.cgpa-badge { background: linear-gradient(135deg, #1e1b4b, #4c1d95); color: white; padding: 0.75rem 1.25rem; border-radius: 14px; text-align: center; min-width: 90px; }
	.cgpa-label { font-size: 0.7rem; font-weight: 700; opacity: 0.7; text-transform: uppercase; letter-spacing: 0.05em; }
	.cgpa-value { font-size: 1.75rem; font-weight: 800; line-height: 1.1; }

	.empty-state { text-align: center; padding: 4rem 2rem; background: white; border-radius: 14px; border: 1px solid #e2e8f0; }
	.empty-state span { font-size: 3rem; display: block; margin-bottom: 1rem; }
	.empty-state h3 { font-size: 1.1rem; color: #0f172a; margin: 0 0 0.5rem; }
	.empty-state p { font-size: 0.9rem; color: #64748b; margin: 0; }

	.table-card { background: white; border-radius: 14px; border: 1px solid #e2e8f0; overflow: hidden; }
	.table { width: 100%; border-collapse: collapse; }
	.table th { background: #f8fafc; padding: 0.65rem 0.75rem; text-align: center; font-size: 0.7rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.04em; border-bottom: 1px solid #e2e8f0; line-height: 1.3; }
	.table th:nth-child(1), .table th:nth-child(2) { text-align: left; }
	.table td { padding: 0.75rem 0.75rem; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
	.table tbody tr:last-child td { border-bottom: none; }
	.table tbody tr:hover { background: #f8fafc; }
	.text-center { text-align: center; }
	.row-num { color: #94a3b8; font-size: 0.8rem; }
	.num { font-size: 0.88rem; color: #475569; }
	.course-cell { display: flex; align-items: center; gap: 0.5rem; }
	.course-code { font-size: 0.72rem; font-weight: 700; background: #eff6ff; color: #1d4ed8; padding: 0.15rem 0.4rem; border-radius: 4px; font-family: monospace; flex-shrink: 0; }
	.course-title { font-size: 0.85rem; font-weight: 600; color: #0f172a; }
	.total-val { font-size: 0.95rem; color: #0f172a; }
	.grade-badge { padding: 0.25rem 0.6rem; border-radius: 6px; font-size: 0.78rem; font-weight: 700; }
	.grade-a { background: #d1fae5; color: #065f46; }
	.grade-b { background: #dbeafe; color: #1e40af; }
	.grade-c { background: #fef3c7; color: #92400e; }
	.grade-d { background: #fed7aa; color: #9a3412; }
	.grade-f { background: #fee2e2; color: #991b1b; }
	.grade-none { background: #f1f5f9; color: #94a3b8; }

	tfoot .cgpa-row td { padding: 0.875rem 0.75rem; background: #f0f9ff; border-top: 2px solid #bae6fd; font-weight: 600; }
	.cgpa-label-cell { font-size: 0.88rem; color: #0369a1; }
	.cgpa-final { font-size: 1.1rem; font-weight: 800; color: #1e1b4b; }
</style>
