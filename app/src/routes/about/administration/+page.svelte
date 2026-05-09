<script lang="ts">
	import PageHero from '$lib/components/shared/PageHero.svelte';
	import { Mail, Phone } from 'lucide-svelte';
	
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'About', href: '/about/overview' },
		{ label: 'Administration', href: '/about/administration' }
	];

	const admin = [
		{
			role: "Principal",
			name: "Prof. Wajahat Majeed",
			photo: "/images/logos/image copy 2.png",
			email: "principal@gpgcbwn.edu.pk",
			phone: "+92 63 9240123"
		},
		{
			role: "Vice Principal",
			name: "Prof. Muhammad Akram",
			photo: "/images/gallery/488936577_1152937786844526_8441555087243500544_n.jpg",
			email: "viceprincipal@gpgcbwn.edu.pk",
			phone: "+92 63 9240124"
		}
	];
</script>

<svelte:head>
	<title>Administration | About Us | GPGC Bahawalnagar</title>
</svelte:head>

<PageHero 
	title="College Administration" 
	subtitle="The dedicated team leading our institution towards excellence."
	{breadcrumbs}
	image="/images/gallery/497498149_1184322940372677_5964474392879878424_n.jpg"
/>

<section class="py-24 bg-white">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-12">
			{#each admin as person}
				<div class="flex flex-col lg:flex-row gap-8 bg-neutral-soft p-8 rounded-3xl border border-border-soft hover:shadow-xl transition-all group">
					<div class="w-full lg:w-48 h-64 overflow-hidden rounded-2xl shrink-0">
						<img src={person.photo} alt={person.name} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
					</div>
					<div class="flex flex-col justify-center space-y-4">
						<div class="space-y-1">
							<p class="text-secondary font-black uppercase tracking-widest text-xs">{person.role}</p>
							<h3 class="text-2xl font-black text-primary">{person.name}</h3>
						</div>
						<div class="space-y-2">
							<div class="flex items-center gap-3 text-primary/70">
								<Mail size={16} class="text-secondary" />
								<span class="text-sm font-medium">{person.email}</span>
							</div>
							<div class="flex items-center gap-3 text-primary/70">
								<Phone size={16} class="text-secondary" />
								<span class="text-sm font-medium">{person.phone}</span>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
