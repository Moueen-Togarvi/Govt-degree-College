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
			role: 'Principal',
			name: 'Prof. Wajahat Majeed',
			photo: '/images/logos/image copy 2.png',
			email: 'principal@gpgcbwn.edu.pk',
			phone: '+92 63 9240123'
		},
		{
			role: 'Vice Principal',
			name: 'Prof. Muhammad Akram',
			photo: '/images/gallery/488936577_1152937786844526_8441555087243500544_n.jpg',
			email: 'viceprincipal@gpgcbwn.edu.pk',
			phone: '+92 63 9240124'
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

<section class="bg-white py-24">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="grid grid-cols-1 gap-12 md:grid-cols-2">
			{#each admin as person}
				<div
					class="group flex flex-col gap-8 rounded-3xl border border-border-soft bg-neutral-soft p-8 transition-all hover:shadow-xl lg:flex-row"
				>
					<div class="h-64 w-full shrink-0 overflow-hidden rounded-2xl lg:w-48">
						<img
							src={person.photo}
							alt={person.name}
							class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
						/>
					</div>
					<div class="flex flex-col justify-center space-y-4">
						<div class="space-y-1">
							<p class="text-xs font-black tracking-widest text-secondary uppercase">
								{person.role}
							</p>
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
