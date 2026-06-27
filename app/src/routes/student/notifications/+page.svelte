<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	function getBadgeClass(category: string) {
		const cat = category.toLowerCase();
		if (cat.includes('exam') || cat.includes('result')) return 'badge-red';
		if (cat.includes('fee') || cat.includes('finance')) return 'badge-yellow';
		if (cat.includes('event') || cat.includes('holiday')) return 'badge-green';
		return 'badge-blue';
	}
</script>

<svelte:head><title>Notifications — Student Portal | GPGC</title></svelte:head>

<div class="page">
	<div class="page-header">
		<div>
			<h1 class="page-title">🔔 Notifications</h1>
			<p class="page-subtitle">Stay updated with department announcements and notices</p>
		</div>
	</div>

	<div class="layout-grid">
		<!-- Left Col: Notice Board -->
		<div class="notices-section">
			<h2 class="section-title">📌 Notice Board</h2>
			{#if data.notices.length === 0}
				<div class="empty-card">
					<p>No active notices right now.</p>
				</div>
			{:else}
				<div class="notice-list">
					{#each data.notices as notice}
						<div class="notice-card">
							<div class="notice-header">
								<span class="notice-tag">{notice.tag}</span>
								<span class="notice-date">{new Date(notice.notice_date).toLocaleDateString()}</span>
							</div>
							<h3 class="notice-title">{notice.title}</h3>
							<p class="notice-message">{notice.message}</p>
							<div class="notice-author">By {notice.author_name}</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Right Col: Announcements -->
		<div class="announcements-section">
			<h2 class="section-title">📢 General Announcements</h2>
			{#if data.announcements.length === 0}
				<div class="empty-card">
					<p>No announcements found.</p>
				</div>
			{:else}
				<div class="announcement-list">
					{#each data.announcements as ann}
						<div class="announcement-card">
							<div class="ann-icon">
								{#if ann.department_id === null}🌐{:else}🏛️{/if}
							</div>
							<div class="ann-content">
								<div class="ann-meta">
									<span class="ann-badge {getBadgeClass(ann.category)}">{ann.category}</span>
									<span class="ann-date">{new Date(ann.created_at).toLocaleDateString()}</span>
								</div>
								<h3 class="ann-title">{ann.title}</h3>
								<p class="ann-desc">{ann.description}</p>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
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

	.section-title {
		font-size: 1.1rem;
		font-weight: 700;
		color: #1e293b;
		margin: 0 0 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 2px solid #e2e8f0;
	}

	.layout-grid {
		display: grid;
		grid-template-columns: 1fr 1.5fr;
		gap: 2rem;
		align-items: start;
	}
	@media (max-width: 900px) {
		.layout-grid {
			grid-template-columns: 1fr;
		}
	}

	.empty-card {
		background: white;
		border: 1px dashed #cbd5e1;
		border-radius: 12px;
		padding: 2rem;
		text-align: center;
		color: #64748b;
		font-size: 0.9rem;
	}

	/* Notice Board Styles */
	.notice-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.notice-card {
		background: linear-gradient(to bottom right, #fff, #f8fafc);
		border: 1px solid #e2e8f0;
		border-left: 4px solid #0284c7;
		border-radius: 12px;
		padding: 1.25rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
		transition: transform 0.2s;
	}
	.notice-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
	}
	.notice-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.75rem;
	}
	.notice-tag {
		background: #e0f2fe;
		color: #0369a1;
		padding: 0.15rem 0.5rem;
		border-radius: 4px;
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	.notice-date {
		font-size: 0.75rem;
		color: #64748b;
		font-weight: 500;
	}
	.notice-title {
		font-size: 1rem;
		font-weight: 700;
		color: #0f172a;
		margin: 0 0 0.5rem;
	}
	.notice-message {
		font-size: 0.85rem;
		color: #475569;
		margin: 0 0 1rem;
		line-height: 1.5;
	}
	.notice-author {
		font-size: 0.75rem;
		color: #94a3b8;
		text-align: right;
		font-style: italic;
	}

	/* Announcement Styles */
	.announcement-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.announcement-card {
		background: white;
		border: 1px solid #e2e8f0;
		border-radius: 12px;
		padding: 1.25rem;
		display: flex;
		gap: 1.25rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
	}
	.ann-icon {
		width: 40px;
		height: 40px;
		border-radius: 10px;
		background: #f1f5f9;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.2rem;
		flex-shrink: 0;
	}
	.ann-content {
		flex: 1;
	}
	.ann-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.4rem;
	}
	.ann-date {
		font-size: 0.75rem;
		color: #94a3b8;
		font-weight: 500;
	}
	.ann-title {
		font-size: 1.05rem;
		font-weight: 700;
		color: #0f172a;
		margin: 0 0 0.4rem;
	}
	.ann-desc {
		font-size: 0.9rem;
		color: #475569;
		margin: 0;
		line-height: 1.5;
	}

	.ann-badge {
		padding: 0.15rem 0.5rem;
		border-radius: 4px;
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	.badge-red {
		background: #fee2e2;
		color: #991b1b;
		border: 1px solid #fecaca;
	}
	.badge-yellow {
		background: #fef3c7;
		color: #92400e;
		border: 1px solid #fde68a;
	}
	.badge-green {
		background: #dcfce3;
		color: #166534;
		border: 1px solid #bbf7d0;
	}
	.badge-blue {
		background: #eff6ff;
		color: #1d4ed8;
		border: 1px solid #bfdbfe;
	}
</style>
