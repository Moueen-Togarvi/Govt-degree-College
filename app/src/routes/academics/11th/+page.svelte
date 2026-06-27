<script lang="ts">
	import PageHero from '$lib/components/shared/PageHero.svelte';
	import { CheckCircle } from 'lucide-svelte';

	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Academics', href: '/academics/programs' },
		{ label: '11th Class', href: '/academics/11th' }
	];

	const groups = [
		{
			name: 'FSc Pre-Medical',
			subjects: ['Biology', 'Chemistry', 'Physics', 'English', 'Urdu', 'Islamiyat']
		},
		{
			name: 'FSc Pre-Engineering',
			subjects: ['Mathematics', 'Chemistry', 'Physics', 'English', 'Urdu', 'Islamiyat']
		},
		{
			name: 'ICS',
			subjects: ['Computer Science', 'Mathematics', 'Physics/Stats', 'English', 'Urdu', 'Islamiyat']
		},
		{
			name: 'FA (General)',
			subjects: ['English Literature', 'Fine Arts', 'Education', 'English', 'Urdu', 'Islamiyat']
		}
	];
</script>

<svelte:head>
	<title>11th Class (Inter Part-I) | GPGC Bahawalnagar</title>
</svelte:head>

<PageHero
	title="Intermediate Part-I"
	subtitle="The foundation of your higher education journey."
	{breadcrumbs}
	image="/images/gallery/488504405_1150873360384302_7113898617720777839_n.jpg"
/>

<section class="bg-white py-24">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
			{#each groups as group}
				<div
					class="group space-y-8 rounded-3xl border border-border-soft bg-neutral-soft p-10 transition-all hover:border-secondary hover:shadow-xl"
				>
					<h3 class="border-l-8 border-secondary pl-6 text-3xl font-black text-primary">
						{group.name}
					</h3>
					<div class="grid grid-cols-2 gap-4">
						{#each group.subjects as subject}
							<div class="flex items-center gap-3 font-bold text-primary/70">
								<CheckCircle size={18} class="text-secondary" />
								<span>{subject}</span>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
