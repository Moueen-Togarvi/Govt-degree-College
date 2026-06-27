<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<svelte:head><title>My Courses — Student Portal | GPGC</title></svelte:head>

<div class="page">
	<div class="page-header">
		<div>
			<h1 class="page-title">📚 My Courses</h1>
			<p class="page-subtitle">Currently enrolled courses for Semester {data.profile?.semester}</p>
		</div>
	</div>

	{#if data.courses.length === 0}
		<div class="empty-state">
			<span>📚</span>
			<h3>No Courses Found</h3>
			<p>You are not enrolled in any courses for the current semester.</p>
		</div>
	{:else}
		<div class="courses-grid">
			{#each data.courses as course}
				<div class="course-card">
					<div class="course-header">
						<span class="course-code">{course.code}</span>
						<span class="credit-badge">{course.credit_hours} Cr</span>
					</div>
					<h2 class="course-title">{course.title}</h2>
					<p class="course-desc">
						{course.description || 'No description available for this course.'}
					</p>

					<div class="course-footer">
						<div class="teacher-info">
							<div class="teacher-avatar">{course.teacher_name.charAt(0)}</div>
							<div>
								<div class="teacher-name">{course.teacher_name}</div>
								<div class="teacher-role">{course.designation}</div>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	.page-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
	}
	.page-title {
		font-size: 1.5rem;
		font-weight: 700;
		color: #0f172a;
		margin: 0 0 0.25rem;
	}
	.page-subtitle {
		font-size: 0.85rem;
		color: #64748b;
		margin: 0;
	}

	.empty-state {
		text-align: center;
		padding: 4rem 2rem;
		background: white;
		border-radius: 14px;
		border: 1px solid #e2e8f0;
	}
	.empty-state span {
		font-size: 3rem;
		display: block;
		margin-bottom: 1rem;
	}
	.empty-state h3 {
		font-size: 1.1rem;
		color: #0f172a;
		margin: 0 0 0.5rem;
	}
	.empty-state p {
		font-size: 0.9rem;
		color: #64748b;
		margin: 0;
	}

	.courses-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1.25rem;
	}
	.course-card {
		background: white;
		border-radius: 14px;
		padding: 1.5rem;
		border: 1px solid #e2e8f0;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
		display: flex;
		flex-direction: column;
		transition:
			transform 0.2s,
			box-shadow 0.2s;
	}
	.course-card:hover {
		transform: translateY(-2px);
		box-shadow:
			0 10px 25px -5px rgba(0, 0, 0, 0.1),
			0 8px 10px -6px rgba(0, 0, 0, 0.1);
	}

	.course-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.75rem;
	}
	.course-code {
		font-size: 0.75rem;
		font-weight: 700;
		background: #eff6ff;
		color: #1d4ed8;
		padding: 0.2rem 0.5rem;
		border-radius: 6px;
		font-family: monospace;
	}
	.credit-badge {
		font-size: 0.75rem;
		font-weight: 600;
		color: #64748b;
		background: #f8fafc;
		padding: 0.2rem 0.5rem;
		border-radius: 6px;
		border: 1px solid #e2e8f0;
	}

	.course-title {
		font-size: 1.1rem;
		font-weight: 700;
		color: #0f172a;
		margin: 0 0 0.5rem;
		line-height: 1.3;
	}
	.course-desc {
		font-size: 0.85rem;
		color: #64748b;
		margin: 0 0 1.5rem;
		line-height: 1.5;
		flex: 1;
	}

	.course-footer {
		border-top: 1px solid #f1f5f9;
		padding-top: 1rem;
		margin-top: auto;
	}
	.teacher-info {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}
	.teacher-avatar {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: linear-gradient(135deg, #1e1b4b, #4c1d95);
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.8rem;
		font-weight: 700;
	}
	.teacher-name {
		font-size: 0.85rem;
		font-weight: 600;
		color: #0f172a;
	}
	.teacher-role {
		font-size: 0.7rem;
		color: #64748b;
		margin-top: 0.1rem;
	}
</style>
