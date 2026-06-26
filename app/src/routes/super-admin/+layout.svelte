<script lang="ts">
	import { page } from '$app/stores';
	import './admin.css';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: import('svelte').Snippet } = $props();

	let sidebarOpen = $state(true);

	const navGroups = [
		{
			label: 'Overview',
			items: [{ href: '/super-admin/dashboard', icon: '🏠', label: 'Dashboard' }]
		},
		{
			label: 'Structure',
			items: [
				{ href: '/super-admin/departments', icon: '🏛️', label: 'Departments' },
				{ href: '/super-admin/users', icon: '👥', label: 'Users' }
			]
		},
		{
			label: 'Content',
			items: [
				{ href: '/super-admin/announcements', icon: '📢', label: 'Announcements' },
				{ href: '/super-admin/events', icon: '📅', label: 'Events' },
				{ href: '/super-admin/notices', icon: '📋', label: 'Notice Board' },
				{ href: '/super-admin/news', icon: '📰', label: 'News Ticker' },
				{ href: '/super-admin/results', icon: '🏆', label: 'Results' }
			]
		},
		{
			label: 'System',
			items: [{ href: '/super-admin/settings', icon: '⚙️', label: 'Settings' }]
		}
	];

	const flatItems = navGroups.flatMap((g) => g.items);

	function isActive(href: string) {
		return $page.url.pathname.startsWith(href);
	}
	function activeLabel() {
		return flatItems.find((n) => isActive(n.href))?.label ?? 'Dashboard';
	}
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="portal-root adm">
	<!-- Mobile backdrop -->
	{#if sidebarOpen}
		<div class="backdrop" onclick={() => (sidebarOpen = false)} role="presentation"></div>
	{/if}

	<!-- Sidebar -->
	<aside class="sidebar {sidebarOpen ? 'open' : 'collapsed'}">
		<div class="sidebar-header">
			<div class="sidebar-logo">
				<img
					src="/images/logos/degree4k-removebg-preview.png"
					alt="Logo"
					class="sidebar-logo-img"
				/>
				{#if sidebarOpen}
					<div class="sidebar-title-group">
						<span class="sidebar-title">GPGC Portal</span>
						<span class="sidebar-role">Super Admin</span>
					</div>
				{/if}
			</div>
			<button
				class="sidebar-toggle"
				onclick={() => (sidebarOpen = !sidebarOpen)}
				aria-label="Toggle sidebar"
				title="Toggle sidebar"
			>
				{sidebarOpen ? '◀' : '▶'}
			</button>
		</div>

		<nav class="sidebar-nav">
			{#each navGroups as group}
				{#if sidebarOpen}
					<div class="nav-group-label">{group.label}</div>
				{/if}
				{#each group.items as item}
					<a
						href={item.href}
						class="nav-item {isActive(item.href) ? 'active' : ''}"
						title={!sidebarOpen ? item.label : ''}
					>
						<span class="nav-icon">{item.icon}</span>
						{#if sidebarOpen}<span class="nav-label">{item.label}</span>{/if}
					</a>
				{/each}
			{/each}
		</nav>

		<div class="sidebar-footer">
			<div class="user-info {sidebarOpen ? '' : 'compact'}">
				<div class="user-avatar">{data.user.name.charAt(0).toUpperCase()}</div>
				{#if sidebarOpen}
					<div class="user-details">
						<span class="user-name">{data.user.name}</span>
						<span class="user-email">{data.user.email}</span>
					</div>
				{/if}
			</div>
			<form method="POST" action="/logout">
				<button type="submit" class="logout-btn {sidebarOpen ? '' : 'compact'}" title="Sign out">
					<span>🚪</span>
					{#if sidebarOpen}<span>Sign Out</span>{/if}
				</button>
			</form>
		</div>
	</aside>

	<!-- Main Content -->
	<div class="main-content">
		<header class="topbar">
			<div class="topbar-left">
				<button
					class="mobile-menu-btn"
					onclick={() => (sidebarOpen = !sidebarOpen)}
					aria-label="Menu">☰</button
				>
				<nav class="breadcrumb">
					<span class="breadcrumb-home">Super Admin</span>
					<span class="breadcrumb-sep">›</span>
					<span class="breadcrumb-current">{activeLabel()}</span>
				</nav>
			</div>
			<div class="topbar-right">
				<a href="/" class="topbar-link" target="_blank" rel="noopener" title="Open public site"
					>↗ View site</a
				>
				<div class="topbar-user">
					<div class="topbar-avatar">{data.user.name.charAt(0).toUpperCase()}</div>
					<span class="topbar-name">{data.user.name}</span>
				</div>
			</div>
		</header>

		<main class="page-content">
			{@render children()}
		</main>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: 'Inter', sans-serif;
		background: #f1f5f9;
	}

	.portal-root {
		display: flex;
		min-height: 100vh;
	}

	.backdrop {
		display: none;
	}

	/* ─── Sidebar ─── */
	.sidebar {
		width: 260px;
		background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
		display: flex;
		flex-direction: column;
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		z-index: 100;
		transition: width 0.25s ease;
		overflow: hidden;
	}

	.sidebar.collapsed {
		width: 76px;
	}

	.sidebar-header {
		padding: 1.1rem 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid rgba(255, 255, 255, 0.07);
		gap: 0.5rem;
		min-height: 68px;
	}

	.sidebar-logo {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		overflow: hidden;
	}

	.sidebar-logo-img {
		width: 38px;
		height: 38px;
		object-fit: contain;
		filter: brightness(0) invert(1);
		flex-shrink: 0;
	}

	.sidebar-title-group {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}

	.sidebar-title {
		font-size: 0.9rem;
		font-weight: 700;
		color: white;
		white-space: nowrap;
	}

	.sidebar-role {
		font-size: 0.62rem;
		color: #c4b5fd;
		background: rgba(124, 58, 237, 0.22);
		padding: 0.12rem 0.45rem;
		border-radius: 4px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		width: fit-content;
		margin-top: 2px;
	}

	.sidebar-toggle {
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		color: #94a3b8;
		cursor: pointer;
		font-size: 0.68rem;
		padding: 0.35rem 0.5rem;
		flex-shrink: 0;
		transition: background 0.2s;
	}

	.sidebar-toggle:hover {
		background: rgba(255, 255, 255, 0.12);
	}

	/* ─── Nav ─── */
	.sidebar-nav {
		flex: 1;
		padding: 0.75rem 0.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		overflow-y: auto;
	}

	.nav-group-label {
		font-size: 0.62rem;
		font-weight: 700;
		color: #64748b;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		padding: 0.85rem 0.9rem 0.35rem;
	}

	.nav-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.6rem 0.9rem;
		border-radius: 10px;
		text-decoration: none;
		color: #94a3b8;
		font-size: 0.875rem;
		font-weight: 500;
		transition: all 0.18s;
		white-space: nowrap;
		overflow: hidden;
		border: 1px solid transparent;
	}

	.nav-item:hover {
		background: rgba(255, 255, 255, 0.07);
		color: white;
	}

	.nav-item.active {
		background: linear-gradient(135deg, rgba(124, 58, 237, 0.32), rgba(139, 92, 246, 0.18));
		color: white;
		border-color: rgba(124, 58, 237, 0.35);
	}

	.nav-icon {
		font-size: 1.05rem;
		flex-shrink: 0;
		width: 22px;
		text-align: center;
	}

	.nav-label {
		font-size: 0.875rem;
	}

	/* ─── Sidebar Footer ─── */
	.sidebar-footer {
		padding: 0.75rem;
		border-top: 1px solid rgba(255, 255, 255, 0.07);
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.user-info {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.6rem 0.75rem;
		background: rgba(255, 255, 255, 0.04);
		border-radius: 10px;
	}

	.user-info.compact {
		justify-content: center;
	}

	.user-avatar {
		width: 34px;
		height: 34px;
		border-radius: 50%;
		background: linear-gradient(135deg, #7c3aed, #a855f7);
		color: white;
		font-weight: 700;
		font-size: 0.85rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.user-details {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}

	.user-name {
		font-size: 0.82rem;
		font-weight: 600;
		color: white;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.user-email {
		font-size: 0.68rem;
		color: #64748b;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.logout-btn {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.55rem;
		background: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.2);
		border-radius: 10px;
		color: #f87171;
		cursor: pointer;
		font-size: 0.82rem;
		font-weight: 500;
		font-family: inherit;
		transition: background 0.2s;
	}

	.logout-btn:hover {
		background: rgba(239, 68, 68, 0.2);
	}

	/* ─── Main Content ─── */
	.main-content {
		margin-left: 260px;
		flex: 1;
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		transition: margin-left 0.25s ease;
	}

	/* ─── Topbar ─── */
	.topbar {
		height: 62px;
		background: white;
		border-bottom: 1px solid #e2e8f0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 1.5rem;
		position: sticky;
		top: 0;
		z-index: 50;
		gap: 1rem;
	}

	.topbar-left {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.mobile-menu-btn {
		display: none;
		background: none;
		border: none;
		cursor: pointer;
		font-size: 1.2rem;
	}

	.breadcrumb {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.85rem;
	}

	.breadcrumb-home {
		color: #64748b;
	}

	.breadcrumb-sep {
		color: #cbd5e1;
	}

	.breadcrumb-current {
		color: #0f172a;
		font-weight: 600;
	}

	.topbar-right {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.topbar-link {
		font-size: 0.8rem;
		font-weight: 600;
		color: #6d28d9;
		text-decoration: none;
		padding: 0.4rem 0.75rem;
		border-radius: 8px;
		background: #ede9fe;
		transition: background 0.15s;
	}

	.topbar-link:hover {
		background: #ddd6fe;
	}

	.topbar-user {
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}

	.topbar-avatar {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: linear-gradient(135deg, #7c3aed, #a855f7);
		color: white;
		font-weight: 700;
		font-size: 0.8rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.topbar-name {
		font-size: 0.85rem;
		font-weight: 600;
		color: #0f172a;
	}

	/* ─── Page Content ─── */
	.page-content {
		flex: 1;
		padding: 1.75rem;
		max-width: 1400px;
		width: 100%;
		box-sizing: border-box;
	}

	/* ─── Responsive ─── */
	@media (max-width: 900px) {
		.sidebar {
			transform: translateX(-100%);
			box-shadow: 0 0 50px rgba(0, 0, 0, 0.4);
		}

		.sidebar.open {
			transform: translateX(0);
			width: 260px;
		}

		.main-content {
			margin-left: 0;
		}

		.mobile-menu-btn {
			display: block;
		}

		.backdrop {
			display: block;
			position: fixed;
			inset: 0;
			background: rgba(15, 23, 42, 0.45);
			z-index: 90;
		}

		.topbar-name {
			display: none;
		}
	}

	@media (max-width: 560px) {
		.page-content {
			padding: 1rem;
		}
	}
</style>
