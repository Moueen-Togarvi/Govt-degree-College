<script lang="ts">
	import type { LayoutData } from './$types';
	import PortalShell from '$lib/components/PortalShell.svelte';
	import type { Icon } from 'lucide-svelte';

	import House from 'lucide-svelte/icons/house';
	import UserCircle from 'lucide-svelte/icons/user-circle';
	import CalendarDays from 'lucide-svelte/icons/calendar-days';
	import ClipboardCheck from 'lucide-svelte/icons/clipboard-check';
	import ChartColumn from 'lucide-svelte/icons/chart-column';
	import Wallet from 'lucide-svelte/icons/wallet';
	import BookOpen from 'lucide-svelte/icons/book-open';
	import Folder from 'lucide-svelte/icons/folder';
	import Bell from 'lucide-svelte/icons/bell';
	import GraduationCap from 'lucide-svelte/icons/graduation-cap';

	type NavItem = { href: string; icon: typeof Icon; label: string };

	let { data, children }: { data: LayoutData; children: import('svelte').Snippet } = $props();

	const navGroups: { label?: string; items: NavItem[] }[] = [
		{
			label: 'Overview',
			items: [{ href: '/student/dashboard', icon: House, label: 'Dashboard' }]
		},
		{
			label: 'Academics',
			items: [
				{ href: '/student/timetable', icon: CalendarDays, label: 'Timetable' },
				{ href: '/student/attendance', icon: ClipboardCheck, label: 'Attendance' },
				{ href: '/student/results', icon: ChartColumn, label: 'Results & GPA' },
				{ href: '/student/courses', icon: BookOpen, label: 'My Courses' }
			]
		},
		{
			label: 'Records',
			items: [
				{ href: '/student/fees', icon: Wallet, label: 'Fee Status' },
				{ href: '/student/documents', icon: Folder, label: 'Documents' },
				{ href: '/student/notifications', icon: Bell, label: 'Notifications' }
			]
		},
		{
			label: 'Account',
			items: [{ href: '/student/profile', icon: UserCircle, label: 'My Profile' }]
		}
	];
</script>

<PortalShell
	roleLabel="Student"
	brandHref="/student/dashboard"
	{navGroups}
	userName={data.user.name}
	userEmail={data.profile?.department_name ?? data.user.email}
>
	{#snippet sidebarInfo()}
		{#if data.profile}
			<div class="info-card">
				<span class="info-icon"><GraduationCap size={15} stroke-width={1.75} /></span>
				<div class="info-body">
					<div class="info-roll">{data.profile.roll_number}</div>
					<div class="info-meta">
						Semester {data.profile.semester}{data.profile.session
							? ` · ${data.profile.session}`
							: ''}
					</div>
				</div>
			</div>
		{/if}
	{/snippet}

	{@render children()}
</PortalShell>

<style>
	.info-card {
		margin: 0.6rem 0.75rem;
		padding: 0.6rem 0.8rem;
		background: rgba(247, 148, 29, 0.14);
		border: 1px solid rgba(247, 148, 29, 0.22);
		border-radius: 10px;
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}

	.info-icon {
		display: grid;
		place-items: center;
		width: 30px;
		height: 30px;
		border-radius: 8px;
		background: rgba(247, 148, 29, 0.2);
		color: #fcd9b6;
		flex-shrink: 0;
	}

	.info-body {
		min-width: 0;
	}

	.info-roll {
		font-size: 0.82rem;
		font-weight: 700;
		color: #fcd9b6;
	}

	.info-meta {
		font-size: 0.68rem;
		color: #c7a98f;
		margin-top: 2px;
	}
</style>
