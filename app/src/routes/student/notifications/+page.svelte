<script lang="ts">
	import type { PageData } from './$types';
	import { reveal, lift } from '$lib/admin/motion';
	import Bell from 'lucide-svelte/icons/bell';
	import Pin from 'lucide-svelte/icons/pin';
	import Megaphone from 'lucide-svelte/icons/megaphone';
	import Globe from 'lucide-svelte/icons/globe';
	import Building from 'lucide-svelte/icons/building';
	import CalendarDays from 'lucide-svelte/icons/calendar-days';
	import Clock from 'lucide-svelte/icons/clock';

	let { data }: { data: PageData } = $props();

	function getBadgeClass(category: string) {
		const cat = category.toLowerCase();
		if (cat.includes('exam') || cat.includes('result')) return 'adm-badge--red';
		if (cat.includes('fee') || cat.includes('finance')) return 'adm-badge--amber';
		if (cat.includes('event') || cat.includes('holiday')) return 'adm-badge--green';
		return 'adm-badge--blue';
	}
</script>

<svelte:head><title>Notifications — Student Portal | GPGC</title></svelte:head>

<div class="adm-page" use:reveal={{ y: 12 }}>
	<div class="adm-head">
		<div>
			<h1 class="adm-title">
				<Bell size={22} stroke-width={2} /> Notifications
			</h1>
			<p class="adm-sub">Stay updated with department announcements and notices</p>
		</div>
	</div>

	<div class="layout-grid">
		<!-- Left Col: Notice Board -->
		<div class="notices-section">
			<h2 class="section-title">
				<Pin size={16} class="mr-1 text-teal" /> Notice Board
			</h2>
			{#if data.notices.length === 0}
				<div class="adm-card" use:reveal={{ delay: 100, y: 12 }}>
					<div class="adm-empty">
						<div class="adm-empty__icon"><Pin size={24} /></div>
						<h3>No Active Notices</h3>
						<p>There are no active notices right now.</p>
					</div>
				</div>
			{:else}
				<div class="notice-list">
					{#each data.notices as notice, ni}
						<div class="adm-card notice-card" use:reveal={{ delay: 50 * ni, y: 12 }} use:lift>
							<div class="adm-card__body p-4 flex-col">
								<div class="notice-header">
									<span class="adm-badge adm-badge--blue">{notice.tag}</span>
									<span class="notice-date">
										<CalendarDays size={12} class="mr-1" />
										{new Date(notice.notice_date).toLocaleDateString('en-PK', {
											day: 'numeric',
											month: 'short',
											year: 'numeric'
										})}
									</span>
								</div>
								<h3 class="notice-title">{notice.title}</h3>
								<p class="notice-message">{notice.message}</p>
								<div class="notice-author">By {notice.author_name}</div>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Right Col: Announcements -->
		<div class="announcements-section">
			<h2 class="section-title">
				<Megaphone size={16} class="mr-1 text-teal" /> General Announcements
			</h2>
			{#if data.announcements.length === 0}
				<div class="adm-card" use:reveal={{ delay: 100, y: 12 }}>
					<div class="adm-empty">
						<div class="adm-empty__icon"><Megaphone size={24} /></div>
						<h3>No Announcements</h3>
						<p>No general announcements found.</p>
					</div>
				</div>
			{:else}
				<div class="announcement-list">
					{#each data.announcements as ann, ai}
						<div class="adm-card announcement-card" use:reveal={{ delay: 50 * ai, y: 12 }} use:lift>
							<div class="adm-card__body p-4 flex gap-4 items-start">
								<div class="ann-icon {ann.department_id === null ? 'global-icon' : 'dept-icon'}">
									{#if ann.department_id === null}
										<Globe size={18} />
									{:else}
										<Building size={18} />
									{/if}
								</div>
								<div class="ann-content">
									<div class="ann-meta">
										<span class="adm-badge {getBadgeClass(ann.category)}">{ann.category}</span>
										<span class="ann-date">
											<Clock size={12} class="mr-1" />
											{new Date(ann.created_at).toLocaleDateString('en-PK', {
												day: 'numeric',
												month: 'short',
												year: 'numeric'
											})}
										</span>
									</div>
									<h3 class="ann-title">{ann.title}</h3>
									<p class="ann-desc">{ann.description}</p>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.mr-1 {
		margin-right: 0.25rem;
		display: inline-block;
		vertical-align: middle;
	}
	.p-4 {
		padding: 1.1rem !important;
	}
	.flex {
		display: flex;
	}
	.flex-col {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.gap-4 {
		gap: 1rem;
	}
	.items-start {
		align-items: flex-start;
	}
	.text-teal {
		color: var(--adm-accent) !important;
	}

	.section-title {
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--adm-ink);
		margin: 0 0 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 2px solid var(--adm-line);
		display: flex;
		align-items: center;
	}

	.layout-grid {
		display: grid;
		grid-template-columns: 1fr 1.3fr;
		gap: 1.5rem;
		align-items: start;
	}
	@media (max-width: 900px) {
		.layout-grid {
			grid-template-columns: 1fr;
		}
	}

	/* Notice Board Styles */
	.notice-list {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
	}
	.notice-card {
		border-left: 4px solid var(--adm-accent);
		transition: border-color 0.2s;
	}
	.notice-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.65rem;
	}
	.notice-date {
		font-size: 0.75rem;
		color: var(--adm-muted);
		font-weight: 600;
	}
	.notice-title {
		font-size: 0.95rem;
		font-weight: 700;
		color: var(--adm-ink);
		margin: 0 0 0.4rem;
	}
	.notice-message {
		font-size: 0.84rem;
		color: var(--adm-ink-2);
		margin: 0 0 0.85rem;
		line-height: 1.5;
	}
	.notice-author {
		font-size: 0.74rem;
		color: var(--adm-muted);
		text-align: right;
		font-style: italic;
		font-weight: 600;
	}

	/* Announcement Styles */
	.announcement-list {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
	}
	.announcement-card {
		transition: border-color 0.2s;
	}
	.announcement-card:hover {
		border-color: #cdeae6;
	}
	.ann-icon {
		width: 38px;
		height: 38px;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}
	.ann-icon.global-icon {
		background: #e0f2fe;
		color: #0369a1;
	}
	.ann-icon.dept-icon {
		background: #e6f2f0;
		color: var(--adm-accent);
	}
	.ann-content {
		flex: 1;
		min-width: 0;
	}
	.ann-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.4rem;
	}
	.ann-date {
		font-size: 0.74rem;
		color: var(--adm-muted);
		font-weight: 600;
	}
	.ann-title {
		font-size: 0.95rem;
		font-weight: 700;
		color: var(--adm-ink);
		margin: 0 0 0.35rem;
	}
	.ann-desc {
		font-size: 0.84rem;
		color: var(--adm-ink-2);
		margin: 0;
		line-height: 1.5;
	}
</style>
