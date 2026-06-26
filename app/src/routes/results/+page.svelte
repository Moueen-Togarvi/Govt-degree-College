<script lang="ts">
	import { page } from '$app/stores';
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

	let rollNumber = $state($page.url.searchParams.get('roll_number') ?? '');
</script>

<svelte:head>
	<title>Public Results Search | GPGC</title>
</svelte:head>

<div class="results-container">
	<div class="search-section">
		<div class="header-text">
			<h1>🎓 GPGC Results Portal</h1>
			<p>Search for your published academic results using your Roll Number.</p>
		</div>

		<form class="search-box" method="GET">
			<div class="input-wrapper">
				<span class="search-icon">🔍</span>
				<input 
					type="text" 
					name="roll_number" 
					bind:value={rollNumber} 
					placeholder="Enter Roll Number (e.g. CS-2022-001)" 
					required 
				/>
			</div>
			<button type="submit" class="btn-search">Search Results</button>
		</form>
	</div>

	{#if data.searched}
		<div class="results-content">
			{#if !data.student}
				<div class="alert-box error">
					<span class="icon">⚠️</span>
					<div>
						<strong>Student Not Found</strong>
						<p>No student found with the roll number "{$page.url.searchParams.get('roll_number')}". Please check your roll number and try again.</p>
					</div>
				</div>
			{:else}
				<div class="student-card">
					<div class="student-header">
						<div class="avatar">{data.student.name?.charAt(0) || '?'}</div>
						<div class="student-details">
							<h2>{data.student.name}</h2>
							<div class="badges">
								<span class="badge roll-badge">{data.student.roll_number}</span>
								<span class="badge dept-badge">{data.student.department_name}</span>
								<span class="badge sem-badge">Semester {data.student.semester}</span>
							</div>
						</div>
					</div>
					
					<div class="cgpa-highlight">
						<div class="cgpa-label">Cumulative GPA</div>
						<div class="cgpa-value">{data.cgpa.toFixed(2)}</div>
					</div>
				</div>

				{#if data.results.length === 0}
					<div class="alert-box warning">
						<span class="icon">⏳</span>
						<div>
							<strong>No Results Published</strong>
							<p>Results for this semester have not been published yet.</p>
						</div>
					</div>
				{:else}
					<div class="table-card">
						<div class="table-header">
							<h3>Semester Results</h3>
						</div>
						<div class="table-responsive">
							<table class="table">
								<thead>
									<tr>
										<th>Course</th>
										<th class="text-center">Credits</th>
										<th class="text-center">Marks<br><small>(/100)</small></th>
										<th class="text-center">Grade</th>
										<th class="text-center">GPA</th>
									</tr>
								</thead>
								<tbody>
									{#each data.results as result}
										<tr>
											<td>
												<div class="course-cell">
													<span class="course-code">{result.course_code}</span>
													<span class="course-title">{result.course_title}</span>
												</div>
											</td>
											<td class="text-center num">{result.credit_hours}</td>
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
							</table>
						</div>
					</div>
					
					<div class="print-actions">
						<button class="btn-print" onclick={() => window.print()}>🖨️ Print Transcript</button>
					</div>
				{/if}
			{/if}
		</div>
	{/if}
</div>

<style>
	.results-container {
		max-width: 900px;
		margin: 0 auto;
		padding: 3rem 1.5rem;
		font-family: 'Inter', sans-serif;
	}

	.search-section {
		text-align: center;
		margin-bottom: 3rem;
	}

	.header-text h1 {
		font-size: 2.2rem;
		font-weight: 800;
		color: #0f172a;
		margin: 0 0 0.5rem;
		letter-spacing: -0.02em;
	}

	.header-text p {
		color: #64748b;
		font-size: 1.1rem;
		max-width: 500px;
		margin: 0 auto 2rem;
	}

	.search-box {
		display: flex;
		gap: 1rem;
		max-width: 600px;
		margin: 0 auto;
		background: white;
		padding: 0.5rem;
		border-radius: 99px;
		box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.01);
		border: 1px solid #e2e8f0;
	}

	.input-wrapper {
		display: flex;
		align-items: center;
		flex: 1;
		padding-left: 1.25rem;
	}

	.search-icon {
		font-size: 1.2rem;
		color: #94a3b8;
		margin-right: 0.75rem;
	}

	.search-box input {
		flex: 1;
		border: none;
		outline: none;
		font-size: 1.05rem;
		color: #0f172a;
		background: transparent;
		font-family: inherit;
	}

	.search-box input::placeholder {
		color: #94a3b8;
	}

	.btn-search {
		background: linear-gradient(135deg, #0284c7, #0369a1);
		color: white;
		border: none;
		padding: 0.75rem 1.75rem;
		border-radius: 99px;
		font-weight: 600;
		font-size: 1rem;
		cursor: pointer;
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.btn-search:hover {
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);
	}

	.results-content {
		animation: slideUp 0.4s ease-out;
	}

	@keyframes slideUp {
		from { opacity: 0; transform: translateY(20px); }
		to { opacity: 1; transform: translateY(0); }
	}

	.alert-box {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		padding: 1.25rem 1.5rem;
		border-radius: 12px;
		margin-bottom: 2rem;
	}

	.alert-box .icon {
		font-size: 1.5rem;
	}

	.alert-box strong {
		display: block;
		font-size: 1.05rem;
		margin-bottom: 0.25rem;
	}

	.alert-box p {
		margin: 0;
		font-size: 0.95rem;
	}

	.alert-box.error {
		background: #fef2f2;
		border: 1px solid #fecaca;
		color: #991b1b;
	}
	
	.alert-box.warning {
		background: #fffbeb;
		border: 1px solid #fde68a;
		color: #92400e;
	}

	.student-card {
		background: white;
		border-radius: 16px;
		padding: 2rem;
		border: 1px solid #e2e8f0;
		box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
		flex-wrap: wrap;
		gap: 2rem;
	}

	.student-header {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.avatar {
		width: 72px;
		height: 72px;
		border-radius: 50%;
		background: linear-gradient(135deg, #1e1b4b, #4c1d95);
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
		font-weight: 700;
	}

	.student-details h2 {
		margin: 0 0 0.5rem;
		font-size: 1.5rem;
		color: #0f172a;
	}

	.badges {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.badge {
		padding: 0.25rem 0.75rem;
		border-radius: 99px;
		font-size: 0.8rem;
		font-weight: 600;
	}

	.roll-badge { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; font-family: monospace; }
	.dept-badge { background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; }
	.sem-badge { background: #f8fafc; color: #475569; border: 1px solid #e2e8f0; }

	.cgpa-highlight {
		text-align: center;
		background: #f8fafc;
		padding: 1rem 2rem;
		border-radius: 12px;
		border: 2px solid #e2e8f0;
	}

	.cgpa-label {
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #64748b;
		font-weight: 700;
		margin-bottom: 0.25rem;
	}

	.cgpa-value {
		font-size: 2.5rem;
		font-weight: 800;
		color: #0f172a;
		line-height: 1;
	}

	.table-card {
		background: white;
		border-radius: 16px;
		border: 1px solid #e2e8f0;
		box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
		overflow: hidden;
		margin-bottom: 2rem;
	}

	.table-header {
		padding: 1.5rem 1.5rem 1rem;
		border-bottom: 1px solid #e2e8f0;
		background: #f8fafc;
	}

	.table-header h3 {
		margin: 0;
		font-size: 1.1rem;
		color: #0f172a;
	}

	.table-responsive {
		overflow-x: auto;
	}

	.table {
		width: 100%;
		border-collapse: collapse;
		min-width: 600px;
	}

	.table th {
		background: white;
		padding: 1rem 1.5rem;
		text-align: left;
		font-size: 0.75rem;
		font-weight: 700;
		color: #64748b;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		border-bottom: 2px solid #e2e8f0;
	}

	.table td {
		padding: 1rem 1.5rem;
		border-bottom: 1px solid #f1f5f9;
		vertical-align: middle;
	}

	.table tbody tr:last-child td { border-bottom: none; }
	.table tbody tr:hover { background: #f8fafc; }

	.text-center { text-align: center; }
	.num { font-size: 0.95rem; color: #475569; font-weight: 500; }

	.course-cell {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.course-code {
		font-size: 0.75rem;
		font-weight: 700;
		color: #64748b;
		font-family: monospace;
	}

	.course-title {
		font-size: 1rem;
		font-weight: 600;
		color: #0f172a;
	}

	.total-val {
		font-size: 1.1rem;
		color: #0f172a;
	}

	.grade-badge {
		padding: 0.35rem 0.75rem;
		border-radius: 8px;
		font-size: 0.85rem;
		font-weight: 700;
		display: inline-block;
		min-width: 45px;
	}

	.grade-a { background: #d1fae5; color: #065f46; }
	.grade-b { background: #dbeafe; color: #1e40af; }
	.grade-c { background: #fef3c7; color: #92400e; }
	.grade-d { background: #fed7aa; color: #9a3412; }
	.grade-f { background: #fee2e2; color: #991b1b; }
	.grade-none { background: #f1f5f9; color: #94a3b8; }

	.print-actions {
		display: flex;
		justify-content: flex-end;
	}

	.btn-print {
		background: white;
		border: 1px solid #e2e8f0;
		color: #475569;
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		font-weight: 600;
		font-size: 0.95rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		transition: all 0.2s;
		box-shadow: 0 1px 2px rgba(0,0,0,0.05);
	}

	.btn-print:hover {
		background: #f8fafc;
		border-color: #cbd5e1;
		color: #0f172a;
	}

	@media (max-width: 768px) {
		.search-box { flex-direction: column; padding: 1rem; border-radius: 16px; }
		.btn-search { border-radius: 8px; width: 100%; }
		.student-card { flex-direction: column; text-align: center; }
		.student-header { flex-direction: column; }
		.badges { justify-content: center; }
	}

	@media print {
		.search-section, .print-actions, .topbar, .sidebar, header, footer { display: none !important; }
		.results-container { padding: 0; max-width: 100%; }
		.student-card { border: none; box-shadow: none; padding: 0; margin-bottom: 2rem; border-bottom: 2px solid #000; border-radius: 0; }
		.table-card { border: none; box-shadow: none; }
		.table th { border-bottom: 2px solid #000; color: #000; }
		.table td { border-bottom: 1px solid #ccc; color: #000; }
		.badge, .grade-badge, .cgpa-highlight { background: transparent !important; color: #000 !important; border: 1px solid #000 !important; }
		body { background: white; }
	}
</style>
