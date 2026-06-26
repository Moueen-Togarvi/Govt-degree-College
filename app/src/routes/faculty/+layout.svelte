<script lang="ts">
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: import('svelte').Snippet } = $props();
	let sidebarOpen = $state(true);

	const navItems = [
		{ href: '/faculty/dashboard', icon: '🏠', label: 'Dashboard' },
		{ href: '/faculty/attendance', icon: '✅', label: 'Attendance' },
		{ href: '/faculty/marks', icon: '📊', label: 'Marks Entry' },
	];

	function isActive(href: string) { return $page.url.pathname.startsWith(href); }
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
</svelte:head>

<div class="portal-root">
	<aside class="sidebar {sidebarOpen ? 'open' : 'collapsed'}">
		<div class="sidebar-header">
			<div class="sidebar-logo">
				<img src="/images/logos/degree4k-removebg-preview.png" alt="Logo" class="logo-img" />
				{#if sidebarOpen}
					<div>
						<div class="title">GPGC Portal</div>
						<div class="role-badge">Faculty</div>
					</div>
				{/if}
			</div>
			<button onclick={() => (sidebarOpen = !sidebarOpen)} class="toggle-btn">{sidebarOpen ? '◀' : '▶'}</button>
		</div>
		<nav class="sidebar-nav">
			{#each navItems as item}
				<a href={item.href} class="nav-item {isActive(item.href) ? 'active' : ''}" title={!sidebarOpen ? item.label : ''}>
					<span>{item.icon}</span>
					{#if sidebarOpen}<span>{item.label}</span>{/if}
				</a>
			{/each}
		</nav>
		<div class="sidebar-footer">
			<div class="user-info">
				<div class="avatar">{data.user.name.charAt(0).toUpperCase()}</div>
				{#if sidebarOpen}
					<div>
						<div class="uname">{data.user.name}</div>
						<div class="uemail">{data.profile?.designation ?? 'Faculty'}</div>
					</div>
				{/if}
			</div>
			<form method="POST" action="/logout">
				<button type="submit" class="logout-btn">🚪 {#if sidebarOpen}Sign Out{/if}</button>
			</form>
		</div>
	</aside>

	<div class="main-content">
		<header class="topbar">
			<span class="breadcrumb">Faculty › <strong>{navItems.find(n => isActive(n.href))?.label ?? 'Dashboard'}</strong></span>
		</header>
		<main class="page-content">{@render children()}</main>
	</div>
</div>

<style>
	:global(body) { margin: 0; font-family: 'Inter', sans-serif; background: #f1f5f9; }
	.portal-root { display: flex; min-height: 100vh; }
	.sidebar { width: 240px; background: linear-gradient(180deg, #064e3b, #065f46); display: flex; flex-direction: column; position: fixed; top: 0; left: 0; height: 100vh; z-index: 100; transition: width 0.25s; overflow: hidden; }
	.sidebar.collapsed { width: 68px; }
	.sidebar-header { padding: 1.1rem; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.08); min-height: 65px; }
	.sidebar-logo { display: flex; align-items: center; gap: 0.65rem; overflow: hidden; }
	.logo-img { width: 34px; height: 34px; object-fit: contain; filter: brightness(0) invert(1); flex-shrink: 0; }
	.title { font-size: 0.86rem; font-weight: 700; color: white; }
	.role-badge { font-size: 0.65rem; background: rgba(52,211,153,0.2); color: #6ee7b7; padding: 0.1rem 0.4rem; border-radius: 4px; font-weight: 700; text-transform: uppercase; }
	.toggle-btn { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 7px; color: #94a3b8; cursor: pointer; font-size: 0.65rem; padding: 0.3rem 0.45rem; flex-shrink: 0; }
	.sidebar-nav { flex: 1; padding: 0.6rem 0.65rem; display: flex; flex-direction: column; gap: 0.15rem; overflow-y: auto; }
	.nav-item { display: flex; align-items: center; gap: 0.7rem; padding: 0.6rem 0.8rem; border-radius: 8px; text-decoration: none; color: #94a3b8; font-size: 0.85rem; font-weight: 500; transition: all 0.2s; white-space: nowrap; }
	.nav-item:hover { background: rgba(255,255,255,0.07); color: white; }
	.nav-item.active { background: rgba(52,211,153,0.2); color: #a7f3d0; border: 1px solid rgba(52,211,153,0.25); }
	.sidebar-footer { padding: 0.65rem; border-top: 1px solid rgba(255,255,255,0.07); display: flex; flex-direction: column; gap: 0.4rem; }
	.user-info { display: flex; align-items: center; gap: 0.55rem; padding: 0.55rem 0.7rem; background: rgba(255,255,255,0.04); border-radius: 8px; }
	.avatar { width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg, #059669, #34d399); color: white; font-weight: 700; font-size: 0.75rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
	.uname { font-size: 0.78rem; font-weight: 600; color: white; }
	.uemail { font-size: 0.65rem; color: #64748b; }
	.logout-btn { width: 100%; display: flex; align-items: center; gap: 0.4rem; justify-content: center; padding: 0.5rem; background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.2); border-radius: 8px; color: #f87171; cursor: pointer; font-size: 0.8rem; font-family: inherit; }
	.main-content { margin-left: 240px; flex: 1; display: flex; flex-direction: column; min-height: 100vh; }
	.topbar { height: 58px; background: white; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; padding: 0 1.5rem; font-size: 0.85rem; color: #64748b; }
	.breadcrumb strong { color: #0f172a; }
	.page-content { flex: 1; padding: 1.75rem; }
</style>
