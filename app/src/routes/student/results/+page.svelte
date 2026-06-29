<script lang="ts">
	import type { PageData } from './$types';
	import { reveal } from '$lib/admin/motion';
	import ChartColumn from 'lucide-svelte/icons/chart-column';
	import Award from 'lucide-svelte/icons/award';
	import BookOpen from 'lucide-svelte/icons/book-open';

	let { data }: { data: PageData } = $props();

	function gradeClass(g: string | null) {
		if (!g) return 'adm-badge--gray';
		if (['A+', 'A', 'A-'].includes(g)) return 'adm-badge--green';
		if (['B+', 'B', 'B-'].includes(g)) return 'adm-badge--teal';
		if (['C+', 'C', 'C-'].includes(g)) return 'adm-badge--amber';
		if (['D+', 'D'].includes(g)) return 'adm-badge--orange';
		return 'adm-badge--red';
	}
</script>

<svelte:head><title>Results & GPA — Student Portal | GPGC</title></svelte:head>

<div class="adm-page" use:reveal={{ y: 12 }}>
	<div class="adm-head">
		<div>
			<h1 class="adm-title">
				<ChartColumn size={22} stroke-width={2} /> Academic Results & GPA
			</h1>
			<p class="adm-sub">
				{data.profile?.department_name} · Current semester: Semester {data.profile?.semester}
			</p>
		</div>
		{#if data.results.length > 0}
			<div class="cgpa-badge" use:reveal={{ delay: 80, scale: 0.9 }}>
				<div class="cgpa-label">Cumulative GPA</div>
				<div class="cgpa-value">{data.cgpa.toFixed(2)}</div>
			</div>
		{/if}
	</div>

	{#if data.results.length === 0}
		<div class="adm-card" use:reveal={{ delay: 120, y: 12 }}>
			<div class="adm-empty">
				<div class="adm-empty__icon"><ChartColumn size={24} /></div>
				<h3>No Results Published Yet</h3>
				<p>Your semester results and subject GPA will be visible here once released by the department faculty.</p>
			</div>
		</div>
	{:else}
		<div class="adm-card" use:reveal={{ delay: 120, y: 12 }}>
			<div class="adm-card__head">
				<h2 class="adm-card__title">
					<Award size={18} />
					<span>Semester Grade Sheet</span>
				</h2>
			</div>
			<div class="adm-card__body p-0">
				<div class="adm-table-wrap">
					<table class="adm-table">
						<thead>
							<tr>
								<th style="width: 60px;">#</th>
								<th>Course Details</th>
								<th class="text-center" style="width: 100px;">Credits</th>
								<th class="text-center" style="width: 100px;">Midterm<br /><small>/30</small></th>
								<th class="text-center" style="width: 100px;">Finals<br /><small>/50</small></th>
								<th class="text-center" style="width: 100px;">Quizzes<br /><small>/10</small></th>
								<th class="text-center" style="width: 90px;">Assign.<br /><small>/5</small></th>
								<th class="text-center" style="width: 90px;">Practical<br /><small>/5</small></th>
								<th class="text-center" style="width: 110px;">Total<br /><small>/100</small></th>
								<th class="text-center" style="width: 110px;">Grade</th>
								<th class="text-center" style="width: 100px;">GPA</th>
							</tr>
						</thead>
						<tbody>
							{#each data.results as result, i}
								<tr>
									<td class="row-index">{i + 1}</td>
									<td>
										<div class="course-cell">
											<span class="adm-code">{result.course_code}</span>
											<span class="course-title">{result.course_title}</span>
										</div>
									</td>
									<td class="text-center font-medium">{result.credit_hours}</td>
									<td class="text-center text-slate">{result.midterm}</td>
									<td class="text-center text-slate">{result.finals}</td>
									<td class="text-center text-slate">{result.quizzes}</td>
									<td class="text-center text-slate">{result.assignments}</td>
									<td class="text-center text-slate">{result.practical}</td>
									<td class="text-center font-bold text-dark">
										{result.total}
									</td>
									<td class="text-center">
										<span class="adm-badge {gradeClass(result.grade)}">{result.grade ?? '—'}</span>
									</td>
									<td class="text-center font-bold text-dark">
										{result.gpa_points?.toFixed(1) ?? '—'}
									</td>
								</tr>
							{/each}
						</tbody>
						<tfoot>
							<tr class="cgpa-row">
								<td colspan="2" class="cgpa-row-label">Total Credits Earned</td>
								<td class="text-center font-bold text-dark">{data.results.reduce((s, r) => s + r.credit_hours, 0)}</td>
								<td colspan="7"></td>
								<td class="text-center cgpa-row-value">{data.cgpa.toFixed(2)}</td>
							</tr>
						</tfoot>
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
	.cgpa-badge {
		background: linear-gradient(135deg, var(--adm-accent-dark), var(--adm-accent-2));
		color: white;
		padding: 0.6rem 1.2rem;
		border-radius: 12px;
		text-align: center;
		min-width: 100px;
		box-shadow: 0 4px 12px rgba(13, 93, 86, 0.18);
	}
	.cgpa-label {
		font-size: 0.65rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		opacity: 0.85;
		margin-bottom: 2px;
	}
	.cgpa-value {
		font-size: 1.6rem;
		font-weight: 800;
		line-height: 1.1;
	}

	.row-index {
		color: var(--adm-muted);
		font-size: 0.8rem;
		font-weight: 600;
	}
	.course-cell {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.course-title {
		font-weight: 600;
		color: var(--adm-ink);
	}

	.font-medium {
		font-weight: 500;
	}
	.font-bold {
		font-weight: 700;
	}
	.text-slate {
		color: var(--adm-ink-2);
	}
	.text-dark {
		color: var(--adm-ink);
	}

	.text-center {
		text-align: center !important;
	}

	.cgpa-row td {
		padding: 1rem 1.1rem !important;
		background: var(--adm-line-soft);
		border-top: 2px solid var(--adm-line) !important;
	}
	.cgpa-row-label {
		font-weight: 700;
		color: var(--adm-accent);
		font-size: 0.85rem;
	}
	.cgpa-row-value {
		font-size: 1rem;
		font-weight: 800;
		color: var(--adm-accent-dark);
	}
</style>
