<script lang="ts">
	import type { LayoutData } from './$types';
	import PortalShell from '$lib/components/PortalShell.svelte';
	import type { Icon } from 'lucide-svelte';

	import LayoutDashboard from 'lucide-svelte/icons/layout-dashboard';
	import Users from 'lucide-svelte/icons/users';
	import GraduationCap from 'lucide-svelte/icons/graduation-cap';
	import BookOpen from 'lucide-svelte/icons/book-open';
	import CalendarDays from 'lucide-svelte/icons/calendar-days';
	import FlaskConical from 'lucide-svelte/icons/flask-conical';
	import Folder from 'lucide-svelte/icons/folder';
	import Sparkles from 'lucide-svelte/icons/sparkles';
	import Building2 from 'lucide-svelte/icons/building-2';

	type NavItem = { href: string; icon: typeof Icon; label: string };

	let { data, children }: { data: LayoutData; children: import('svelte').Snippet } = $props();

	const navGroups: { label?: string; items: NavItem[] }[] = [
		{
			label: 'Overview',
			items: [{ href: '/coordinator/dashboard', icon: LayoutDashboard, label: 'Dashboard' }]
		},
		{
			label: 'People',
			items: [
				{ href: '/coordinator/faculty', icon: Users, label: 'Faculty' },
				{ href: '/coordinator/students', icon: GraduationCap, label: 'Students' }
			]
		},
		{
			label: 'Academics',
			items: [
				{ href: '/coordinator/courses', icon: BookOpen, label: 'Courses' },
				{ href: '/coordinator/timetable', icon: CalendarDays, label: 'Timetable' },
				{ href: '/coordinator/fyp', icon: FlaskConical, label: 'FYP' }
			]
		},
		{
			label: 'Tools',
			items: [
				{ href: '/coordinator/documents', icon: Folder, label: 'Documents' },
				{ href: '/coordinator/ai-entry', icon: Sparkles, label: 'AI Assistant' }
			]
		}
	];
</script>

<PortalShell
	roleLabel="Coordinator"
	brandHref="/coordinator/dashboard"
	{navGroups}
	userName={data.user.name}
	userEmail={data.user.email}
>
	{#snippet sidebarInfo()}
		{#if data.department}
			<div class="dept-card">
				<span class="dept-icon"><Building2 size={15} stroke-width={1.75} /></span>
				<span class="dept-name">{data.department.name}</span>
			</div>
		{/if}
	{/snippet}

	{@render children()}
</PortalShell>

<style>
	.dept-card {
		margin: 0.6rem 0.75rem;
		padding: 0.6rem 0.8rem;
		background: rgba(17, 125, 116, 0.2);
		border: 1px solid rgba(17, 125, 116, 0.3);
		border-radius: 10px;
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}

	.dept-icon {
		display: grid;
		place-items: center;
		width: 30px;
		height: 30px;
		border-radius: 8px;
		background: rgba(17, 125, 116, 0.25);
		color: #9fe7df;
		flex-shrink: 0;
	}

	.dept-name {
		font-size: 0.8rem;
		font-weight: 600;
		color: #cdeae6;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
