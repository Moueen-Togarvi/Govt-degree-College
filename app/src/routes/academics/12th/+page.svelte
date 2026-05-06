<script lang="ts">
	import PageHero from '$lib/components/shared/PageHero.svelte';
	import { CheckCircle } from 'lucide-svelte';
	
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Academics', href: '/academics/programs' },
		{ label: '12th Class', href: '/academics/12th' }
	];

	const groups = [
		{ name: "FSc Pre-Medical", subjects: ["Biology", "Chemistry", "Physics", "English", "Urdu", "Pak Studies"] },
		{ name: "FSc Pre-Engineering", subjects: ["Mathematics", "Chemistry", "Physics", "English", "Urdu", "Pak Studies"] },
		{ name: "ICS", subjects: ["Computer Science", "Mathematics", "Physics/Stats", "English", "Urdu", "Pak Studies"] },
		{ name: "FA (General)", subjects: ["English Literature", "Fine Arts", "Education", "English", "Urdu", "Pak Studies"] }
	];
</script>

<svelte:head>
	<title>12th Class (Inter Part-II) | GPGC Bahawalnagar</title>
</svelte:head>

<PageHero 
	title="Intermediate Part-II" 
	subtitle="Achieve excellence in your final year of college education."
	{breadcrumbs}
	image="/images/gallery/488936577_1152937786844526_8441555087243500544_n.jpg"
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
