<script lang="ts">
	import { page } from '$app/stores';
	import { reveal } from '$lib/admin/motion';
	import '$lib/styles/portal.css';
	import type { Icon } from 'lucide-svelte';

	import PanelLeftClose from 'lucide-svelte/icons/panel-left-close';
	import PanelLeftOpen from 'lucide-svelte/icons/panel-left-open';
	import Menu from 'lucide-svelte/icons/menu';
	import LogOut from 'lucide-svelte/icons/log-out';
	import ExternalLink from 'lucide-svelte/icons/external-link';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';

	type NavItem = { href: string; icon: typeof Icon; label: string };
	type NavGroup = { label?: string; items: NavItem[] };

	let {
		roleLabel,
		brandHref,
		navGroups,
		userName,
		userEmail,
		subtitle = '',
		children,
		sidebarInfo
	}: {
		roleLabel: string;
		brandHref: string;
		navGroups: NavGroup[];
		userName: string;
		userEmail?: string;
		subtitle?: string;
		children: import('svelte').Snippet;
		sidebarInfo?: import('svelte').Snippet;
	} = $props();

	let sidebarOpen = $state(true);
	let mobileOpen = $state(false);

	const flatItems: NavItem[] = $derived(navGroups.flatMap((g) => g.items));

	function isActive(href: string) {
		return $page.url.pathname.startsWith(href);
	}
	function activeLabel() {
		return flatItems.find((n) => isActive(n.href))?.label ?? 'Dashboard';
	}
	function initials(name: string) {
		return name.charAt(0).toUpperCase();
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
	{#if mobileOpen}
		<button
			class="backdrop"
			onclick={() => (mobileOpen = false)}
			aria-label="Close menu"
			tabindex="-1"
		></button>
	{/if}

	<!-- Sidebar -->
	<aside class="sidebar {sidebarOpen ? 'open' : 'collapsed'} mobile-{mobileOpen ? 'show' : 'hide'}">
		<div class="sidebar-header">
			<a href={brandHref} class="sidebar-logo" title="GPGC Portal">
				{#if sidebarOpen}
					<div class="sidebar-title-group">
						<span class="sidebar-title">GPGC Portal</span>
					</div>
				{/if}
			</a>
			<button
				class="sidebar-toggle"
				onclick={() => (sidebarOpen = !sidebarOpen)}
				aria-label="Toggle sidebar"
				title="Toggle sidebar"
			>
				{#if sidebarOpen}
					<PanelLeftClose size={16} stroke-width={1.75} />
				{:else}
					<PanelLeftOpen size={16} stroke-width={1.75} />
				{/if}
			</button>
		</div>

		{#if sidebarInfo && sidebarOpen}
			{@render sidebarInfo()}
		{/if}

		<nav class="sidebar-nav">
			{#each navGroups as group, gi}
				{#if group.label && sidebarOpen}
					<div class="nav-group-label">{group.label}</div>
				{/if}
				{#each group.items as item, ii}
					{@const Icon = item.icon}
					{@const active = isActive(item.href)}
					<a
						href={item.href}
						class="nav-item {active ? 'active' : ''}"
						title={!sidebarOpen ? item.label : ''}
						aria-current={active ? 'page' : undefined}
						onclick={() => (mobileOpen = false)}
						use:reveal={{ delay: 60 * (gi + ii), y: 10, duration: 420 }}
					>
						<span class="nav-icon {active ? 'is-active' : ''}">
							<Icon size={19} stroke-width={active ? 2.1 : 1.75} />
						</span>
						{#if sidebarOpen}<span class="nav-label">{item.label}</span>{/if}
						{#if active && sidebarOpen}<span class="nav-active-bar"></span>{/if}
					</a>
				{/each}
			{/each}
		</nav>

		<div class="sidebar-footer">
			<div class="user-info {sidebarOpen ? '' : 'compact'}">
				<div class="user-avatar">{initials(userName)}</div>
				{#if sidebarOpen}
					<div class="user-details">
						<span class="user-name">{userName}</span>
						<span class="user-email">{userEmail ?? roleLabel}</span>
					</div>
				{/if}
			</div>
			<form method="POST" action="/logout">
				<button type="submit" class="logout-btn {sidebarOpen ? '' : 'compact'}" title="Sign out">
					<LogOut size={17} stroke-width={1.75} />
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
					class="icon-btn mobile-menu-btn"
					onclick={() => (mobileOpen = !mobileOpen)}
					aria-label="Open menu"
				>
					<Menu size={20} stroke-width={1.75} />
				</button>
				<button
					class="icon-btn collapse-btn"
					onclick={() => (sidebarOpen = !sidebarOpen)}
					aria-label="Collapse sidebar"
					title="Toggle sidebar"
				>
					<PanelLeftClose size={18} stroke-width={1.75} />
				</button>
				<nav class="breadcrumb" aria-label="Breadcrumb">
					<span class="breadcrumb-home">{roleLabel}</span>
					<ChevronRight size={14} stroke-width={2} class="breadcrumb-sep" />
					<span class="breadcrumb-current">{activeLabel()}</span>
				</nav>
			</div>
			<div class="topbar-right">
				<a href="/" class="topbar-link" target="_blank" rel="noopener" title="Open public site">
					<ExternalLink size={14} stroke-width={2} />
					<span>View site</span>
				</a>
				<div class="topbar-user">
					<div class="topbar-avatar">{initials(userName)}</div>
					<span class="topbar-name">{userName}</span>
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
		background: linear-gradient(180deg, #0d4a44 0%, #08332e 100%);
		display: flex;
		flex-direction: column;
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		z-index: 100;
		transition: width 0.26s cubic-bezier(0.22, 1, 0.36, 1);
		overflow: hidden;
		border-right: 1px solid rgba(255, 255, 255, 0.05);
	}

	.sidebar.collapsed {
		width: 78px;
	}

	.sidebar-header {
		padding: 1.1rem 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid rgba(255, 255, 255, 0.07);
		gap: 0.5rem;
		min-height: 70px;
	}

	.sidebar-logo {
		display: flex;
		align-items: center;
		gap: 0.7rem;
		overflow: hidden;
		text-decoration: none;
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
		font-size: 0.92rem;
		font-weight: 700;
		color: #fff;
		white-space: nowrap;
		letter-spacing: -0.01em;
	}

	.sidebar-role {
		font-size: 0.62rem;
		color: #fcd9b6;
		background: rgba(247, 148, 29, 0.18);
		padding: 0.14rem 0.5rem;
		border-radius: 5px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		width: fit-content;
		margin-top: 3px;
	}

	.sidebar-toggle {
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		color: #b8c6c4;
		cursor: pointer;
		display: grid;
		place-items: center;
		width: 32px;
		height: 32px;
		flex-shrink: 0;
		transition:
			background 0.2s,
			color 0.2s;
	}

	.sidebar-toggle:hover {
		background: rgba(255, 255, 255, 0.12);
		color: #fff;
	}

	/* ─── Nav ─── */
	.sidebar-nav {
		flex: 1;
		padding: 0.75rem 0.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.nav-group-label {
		font-size: 0.62rem;
		font-weight: 700;
		color: #6b8a86;
		text-transform: uppercase;
		letter-spacing: 0.09em;
		padding: 0.85rem 0.9rem 0.35rem;
	}

	.nav-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.68rem 0.9rem;
		border-radius: 10px;
		text-decoration: none;
		color: #a9bfbb;
		font-size: 0.875rem;
		font-weight: 500;
		transition:
			background 0.18s,
			color 0.18s;
		white-space: nowrap;
		overflow: hidden;
		border: 1px solid transparent;
		position: relative;
	}

	.nav-item:hover {
		background: rgba(255, 255, 255, 0.06);
		color: #fff;
	}

	.nav-item.active {
		background: linear-gradient(135deg, rgba(17, 125, 116, 0.55), rgba(17, 125, 116, 0.2));
		color: #fff;
		border-color: rgba(17, 125, 116, 0.5);
	}

	.nav-item.active::before {
		content: '';
		position: absolute;
		left: -0.75rem;
		top: 50%;
		transform: translateY(-50%);
		width: 3px;
		height: 22px;
		border-radius: 0 3px 3px 0;
		background: #f7941d;
	}

	.nav-icon {
		flex-shrink: 0;
		display: grid;
		place-items: center;
		width: 22px;
		height: 22px;
		transition: color 0.18s;
	}

	.nav-item.active .nav-icon {
		color: #fff;
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
		padding: 0.6rem 0.7rem;
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
		background: linear-gradient(135deg, #117d74, #0d5d56);
		color: #fff;
		font-weight: 700;
		font-size: 0.85rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		border: 1px solid rgba(255, 255, 255, 0.12);
	}

	.user-details {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}

	.user-name {
		font-size: 0.82rem;
		font-weight: 600;
		color: #fff;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.user-email {
		font-size: 0.68rem;
		color: #7a9591;
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
		padding: 0.6rem;
		background: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.2);
		border-radius: 10px;
		color: #fca5a5;
		cursor: pointer;
		font-size: 0.82rem;
		font-weight: 500;
		font-family: inherit;
		transition:
			background 0.2s,
			color 0.2s;
	}

	.logout-btn:hover {
		background: rgba(239, 68, 68, 0.2);
		color: #fff;
	}

	/* ─── Main Content ─── */
	.main-content {
		margin-left: 260px;
		flex: 1;
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		transition: margin-left 0.26s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.sidebar.collapsed ~ .main-content {
		margin-left: 78px;
	}

	/* ─── Topbar ─── */
	.topbar {
		height: 64px;
		background: #fff;
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
		gap: 0.65rem;
	}

	.icon-btn {
		display: grid;
		place-items: center;
		width: 38px;
		height: 38px;
		border-radius: 9px;
		border: 1px solid transparent;
		background: transparent;
		color: #475569;
		cursor: pointer;
		transition:
			background 0.15s,
			color 0.15s,
			border-color 0.15s;
	}

	.icon-btn:hover {
		background: #f1f5f9;
		color: #0d5d56;
	}

	.mobile-menu-btn {
		display: none;
	}

	.breadcrumb {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.875rem;
		margin-left: 0.25rem;
	}

	.breadcrumb-home {
		color: #64748b;
	}

	.breadcrumb :global(.breadcrumb-sep) {
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
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.8rem;
		font-weight: 600;
		color: #0d5d56;
		text-decoration: none;
		padding: 0.45rem 0.8rem;
		border-radius: 8px;
		background: #e6f2f0;
		border: 1px solid #cdeae6;
		transition: background 0.15s;
	}

	.topbar-link:hover {
		background: #d7ebe8;
	}

	.topbar-user {
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}

	.topbar-avatar {
		width: 34px;
		height: 34px;
		border-radius: 50%;
		background: linear-gradient(135deg, #117d74, #0d5d56);
		color: #fff;
		font-weight: 700;
		font-size: 0.82rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.topbar-name {
		font-size: 0.875rem;
		font-weight: 600;
		color: #0f172a;
	}

	/* ─── Page Content ─── */
	.page-content {
		flex: 1;
		padding: 1.75rem;
		max-width: 1440px;
		width: 100%;
		box-sizing: border-box;
	}

	/* ─── Responsive ─── */
	@media (max-width: 980px) {
		.sidebar {
			transform: translateX(-100%);
			box-shadow: 0 0 50px rgba(0, 0, 0, 0.4);
		}

		.sidebar.mobile-show {
			transform: translateX(0);
			width: 260px;
		}

		.main-content {
			margin-left: 0 !important;
		}

		.mobile-menu-btn {
			display: grid;
		}

		.collapse-btn {
			display: none;
		}

		.backdrop {
			display: block;
			position: fixed;
			inset: 0;
			background: rgba(8, 51, 46, 0.5);
			backdrop-filter: blur(2px);
			z-index: 90;
			border: none;
		}

		.topbar-name {
			display: none;
		}
	}

	@media (max-width: 560px) {
		.page-content {
			padding: 1rem;
		}

		.topbar {
			padding: 0 1rem;
		}

		.topbar-link span {
			display: none;
		}
	}
</style>
