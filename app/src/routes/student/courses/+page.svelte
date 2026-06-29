<script lang="ts">
	import type { PageData } from './$types';
	import { reveal, lift } from '$lib/admin/motion';
	import BookOpen from 'lucide-svelte/icons/book-open';
	import User from 'lucide-svelte/icons/user';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head><title>My Courses — Student Portal | GPGC</title></svelte:head>

<div class="adm-page" use:reveal={{ y: 12 }}>
	<div class="adm-head">
		<div>
			<h1 class="adm-title">
				<BookOpen size={22} stroke-width={2} /> Enrolled Courses
			</h1>
			<p class="adm-sub">Academic curriculum courses assigned for Semester {data.profile?.semester}</p>
		</div>
	</div>

	{#if data.courses.length === 0}
		<div class="adm-card" use:reveal={{ delay: 120, y: 12 }}>
			<div class="adm-empty">
				<div class="adm-empty__icon"><BookOpen size={24} /></div>
				<h3>No Enrolled Courses Found</h3>
				<p>You have not been assigned to any courses for the current academic semester yet.</p>
			</div>
		</div>
	{:else}
		<div class="courses-grid">
			{#each data.courses as course, i}
				<div class="adm-card course-card" use:reveal={{ delay: 50 * i, y: 12 }} use:lift>
					<div class="adm-card__body flex-col">
						<div class="card-top">
							<span class="adm-code">{course.code}</span>
							<span class="adm-badge adm-badge--gray">{course.credit_hours} Credit Hours</span>
						</div>

						<h3 class="course-title">{course.title}</h3>

						<p class="course-desc">
							{course.description || 'No detailed course description has been uploaded for this curriculum syllabus.'}
						</p>

						<div class="teacher-box">
							<div class="avatar">
								{#if course.teacher_name}
									{course.teacher_name.charAt(0).toUpperCase()}
								{:else}
									<User size={14} />
								{/if}
							</div>
							<div class="teacher-details">
								<div class="name">{course.teacher_name || 'No Faculty Assigned'}</div>
								<div class="role">{course.designation || 'Lecturer'}</div>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.courses-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 1.25rem;
	}

	.course-card {
		height: 100%;
	}

	.flex-col {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		height: 100%;
		box-sizing: border-box;
	}

	.card-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.course-title {
		font-size: 1.05rem;
		font-weight: 700;
		color: var(--adm-ink);
		margin: 0;
		line-height: 1.35;
	}

	.course-desc {
		font-size: 0.84rem;
		color: var(--adm-ink-2);
		line-height: 1.5;
		margin: 0;
		flex: 1;
	}

	.teacher-box {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		padding-top: 0.75rem;
		border-top: 1px solid var(--adm-line-soft);
	}

	.avatar {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--adm-accent), var(--adm-accent-2));
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.78rem;
		font-weight: 700;
		flex-shrink: 0;
	}

	.teacher-details {
		min-width: 0;
	}
	.teacher-details .name {
		font-size: 0.82rem;
		font-weight: 600;
		color: var(--adm-ink);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.teacher-details .role {
		font-size: 0.68rem;
		color: var(--adm-muted);
		margin-top: 1px;
	}
</style>
