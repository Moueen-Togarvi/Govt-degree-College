<script lang="ts">
	import type { LayoutData } from './$types';
	import PortalShell from '$lib/components/PortalShell.svelte';
	import type { Icon } from 'lucide-svelte';

	import House from 'lucide-svelte/icons/house';
	import ClipboardCheck from 'lucide-svelte/icons/clipboard-check';
	import FilePenLine from 'lucide-svelte/icons/file-pen-line';

	type NavItem = { href: string; icon: typeof Icon; label: string };

	let { data, children }: { data: LayoutData; children: import('svelte').Snippet } = $props();

	const navGroups: { label?: string; items: NavItem[] }[] = [
		{
			label: 'Overview',
			items: [{ href: '/faculty/dashboard', icon: House, label: 'Dashboard' }]
		},
		{
			label: 'Academics',
			items: [
				{ href: '/faculty/attendance', icon: ClipboardCheck, label: 'Attendance' },
				{ href: '/faculty/marks', icon: FilePenLine, label: 'Marks Entry' }
			]
		}
	];
</script>

<PortalShell
	roleLabel="Faculty"
	brandHref="/faculty/dashboard"
	{navGroups}
	userName={data.user.name}
	userEmail={data.profile?.designation ?? data.user.email}
>
	{@render children()}
</PortalShell>
