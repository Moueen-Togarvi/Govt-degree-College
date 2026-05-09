<script lang="ts">
	import PageHero from '$lib/components/shared/PageHero.svelte';
	import { CheckCircle } from 'lucide-svelte';
	
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Academics', href: '/academics/programs' },
		{ label: '11th Class', href: '/academics/11th' }
	];

	const groups = [
		{ name: "FSc Pre-Medical", subjects: ["Biology", "Chemistry", "Physics", "English", "Urdu", "Islamiyat"] },
		{ name: "FSc Pre-Engineering", subjects: ["Mathematics", "Chemistry", "Physics", "English", "Urdu", "Islamiyat"] },
		{ name: "ICS", subjects: ["Computer Science", "Mathematics", "Physics/Stats", "English", "Urdu", "Islamiyat"] },
		{ name: "FA (General)", subjects: ["English Literature", "Fine Arts", "Education", "English", "Urdu", "Islamiyat"] }
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

<section class="py-24 bg-white">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			{#each groups as group}
				<div class="p-10 bg-neutral-soft rounded-3xl border border-border-soft hover:border-secondary hover:shadow-xl transition-all space-y-8 group">
					<h3 class="text-3xl font-black text-primary border-l-8 border-secondary pl-6">{group.name}</h3>
					<div class="grid grid-cols-2 gap-4">
						{#each group.subjects as subject}
							<div class="flex items-center gap-3 text-primary/70 font-bold">
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
