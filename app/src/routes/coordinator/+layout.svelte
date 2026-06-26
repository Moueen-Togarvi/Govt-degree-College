<script lang="ts">
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: import('svelte').Snippet } = $props();
	let sidebarOpen = $state(true);

	const navItems = [
		{ href: '/coordinator/dashboard', icon: '🏠', label: 'Dashboard' },
		{ href: '/coordinator/faculty', icon: '👨‍🏫', label: 'Faculty' },
		{ href: '/coordinator/students', icon: '🎓', label: 'Students' },
		{ href: '/coordinator/courses', icon: '📚', label: 'Courses' },
		{ href: '/coordinator/timetable', icon: '🗓️', label: 'Timetable' },
		{ href: '/coordinator/attendance', icon: '✅', label: 'Attendance' },
		{ href: '/coordinator/results', icon: '📊', label: 'Results' },
		{ href: '/coordinator/fyp', icon: '🔬', label: 'FYP' },
		{ href: '/coordinator/documents', icon: '📁', label: 'Documents' },
		{ href: '/coordinator/notices', icon: '📢', label: 'Notices' },
		{ href: '/coordinator/ai-entry', icon: '✨', label: 'AI Assistant' }
	];

	function isActive(href: string) {
		return $page.url.pathname.startsWith(href);
	}
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
</svelte:head>

<div class="portal-root">
	<aside class="sidebar {sidebarOpen ? 'open' : 'collapsed'}">
		<div class="sidebar-header">
			<div class="sidebar-logo">
				<img src="/images/logos/degree4k-removebg-preview.png" alt="Logo" class="sidebar-logo-img" />
				{#if sidebarOpen}
					<div>
						<div class="sidebar-title">GPGC Portal</div>
						<div class="sidebar-role">Coordinator</div>
					</div>
				{/if}
			</div>
			<button class="sidebar-toggle" onclick={() => (sidebarOpen = !sidebarOpen)}>
				{sidebarOpen ? '◀' : '▶'}
			</button>
		</div>

		{#if sidebarOpen && data.department}
			<div class="dept-badge">
				<span class="dept-badge-icon">🏛️</span>
				<span class="dept-badge-name">{data.department.name}</span>
			</div>
		{/if}

		<nav class="sidebar-nav">
			{#each navItems as item}
				<a href={item.href} class="nav-item {isActive(item.href) ? 'active' : ''}" title={!sidebarOpen ? item.label : ''}>
					<span class="nav-icon">{item.icon}</span>
					{#if sidebarOpen}<span class="nav-label">{item.label}</span>{/if}
				</a>
			{/each}
		</nav>

		<div class="sidebar-footer">
			<div class="user-info">
				<div class="user-avatar">{data.user.name.charAt(0).toUpperCase()}</div>
				{#if sidebarOpen}
					<div>
						<div class="user-name">{data.user.name}</div>
						<div class="user-role">Coordinator</div>
					</div>
				{/if}
			</div>
			<form method="POST" action="/logout">
				<button type="submit" class="logout-btn" title="Sign out">
					<span>🚪</span>
					{#if sidebarOpen}<span>Sign Out</span>{/if}
				</button>
			</form>
		</div>
	</aside>

	<div class="main-content">
		<header class="topbar">
			<div class="topbar-left">
				<nav class="breadcrumb">
					<span>Coordinator</span>
					<span class="sep">›</span>
					<span class="current">{navItems.find(n => isActive(n.href))?.label ?? 'Dashboard'}</span>
				</nav>
			</div>
			<div class="topbar-right">
				{#if data.department}
					<span class="dept-chip">🏛️ {data.department.name}</span>
				{/if}
			</div>
		</header>
		<main class="page-content">
			{@render children()}
		</main>
	</div>
</div>

<style>
	:global(body) { margin: 0; font-family: 'Inter', sans-serif; background: #f1f5f9; }
	.portal-root { display: flex; min-height: 100vh; }
	.sidebar { width: 250px; background: linear-gradient(180deg, #0c4a6e 0%, #075985 100%); display: flex; flex-direction: column; position: fixed; top: 0; left: 0; height: 100vh; z-index: 100; transition: width 0.25s ease; overflow: hidden; }
	.sidebar.collapsed { width: 72px; }
	.sidebar-header { padding: 1.25rem 1rem; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.07); gap: 0.5rem; min-height: 68px; }
	.sidebar-logo { display: flex; align-items: center; gap: 0.75rem; overflow: hidden; }
	.sidebar-logo-img { width: 36px; height: 36px; object-fit: contain; filter: brightness(0) invert(1); flex-shrink: 0; }
	.sidebar-title { font-size: 0.88rem; font-weight: 700; color: white; }
	.sidebar-role { font-size: 0.68rem; color: #38bdf8; background: rgba(56,189,248,0.15); padding: 0.1rem 0.4rem; border-radius: 4px; font-weight: 600; text-transform: uppercase; }
	.sidebar-toggle { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #94a3b8; cursor: pointer; font-size: 0.7rem; padding: 0.35rem 0.5rem; flex-shrink: 0; }
	.dept-badge { margin: 0.75rem; padding: 0.6rem 0.9rem; background: rgba(56,189,248,0.15); border: 1px solid rgba(56,189,248,0.25); border-radius: 8px; display: flex; align-items: center; gap: 0.5rem; }
	.dept-badge-icon { font-size: 1rem; }
	.dept-badge-name { font-size: 0.78rem; font-weight: 600; color: #bae6fd; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
	.sidebar-nav { flex: 1; padding: 0.5rem 0.75rem; display: flex; flex-direction: column; gap: 0.15rem; overflow-y: auto; }
	.nav-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.6rem 0.85rem; border-radius: 9px; text-decoration: none; color: #94a3b8; font-size: 0.86rem; font-weight: 500; transition: all 0.2s; white-space: nowrap; }
	.nav-item:hover { background: rgba(255,255,255,0.07); color: white; }
	.nav-item.active { background: rgba(56,189,248,0.2); color: white; border: 1px solid rgba(56,189,248,0.3); }
	.nav-icon { font-size: 1rem; flex-shrink: 0; width: 20px; text-align: center; }
	.sidebar-footer { padding: 0.75rem; border-top: 1px solid rgba(255,255,255,0.07); display: flex; flex-direction: column; gap: 0.5rem; }
	.user-info { display: flex; align-items: center; gap: 0.6rem; padding: 0.6rem 0.75rem; background: rgba(255,255,255,0.04); border-radius: 9px; }
	.user-avatar { width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #0284c7, #38bdf8); color: white; font-weight: 700; font-size: 0.8rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
	.user-name { font-size: 0.8rem; font-weight: 600; color: white; }
	.user-role { font-size: 0.68rem; color: #64748b; }
	.logout-btn { width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.55rem; background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.2); border-radius: 9px; color: #f87171; cursor: pointer; font-size: 0.82rem; font-weight: 500; font-family: inherit; }
	.main-content { margin-left: 250px; flex: 1; display: flex; flex-direction: column; min-height: 100vh; }
	.topbar { height: 60px; background: white; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; padding: 0 1.5rem; }
	.breadcrumb { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: #64748b; }
	.sep { color: #cbd5e1; }
	.current { color: #0f172a; font-weight: 600; }
	.dept-chip { background: #e0f2fe; color: #0369a1; padding: 0.3rem 0.75rem; border-radius: 999px; font-size: 0.78rem; font-weight: 600; }
	.page-content { flex: 1; padding: 1.75rem; }
</style>
