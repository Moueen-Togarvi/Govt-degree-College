<script lang="ts">
	import PageHero from '$lib/components/shared/PageHero.svelte';
	import { MapPin, Calendar, Clock } from 'lucide-svelte';

	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'News', href: '/news/announcements' },
		{ label: 'Events', href: '/news/events' }
	];

	let { data } = $props();
</script>

<svelte:head>
	<title>Events | News | GPGC Bahawalnagar</title>
</svelte:head>

<PageHero
	title="Upcoming Events"
	subtitle="Join us in celebrating academic and extracurricular achievements."
	{breadcrumbs}
	image="/images/gallery/547755271_1299324492205854_5011253499358894922_n.jpg"
/>

<section class="bg-white py-24">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="grid grid-cols-1 gap-12 md:grid-cols-2">
			{#each data.events as event}
				<div
					class="group flex flex-col overflow-hidden rounded-3xl border border-border-soft bg-neutral-soft transition-all hover:shadow-2xl"
				>
					<div class="relative h-64 overflow-hidden">
						<img
							src={event.imageUrl}
							alt={event.title}
							class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
							loading="lazy"
							decoding="async"
						/>
						<div
							class="absolute top-6 left-6 rounded-full bg-secondary px-4 py-1.5 text-xs font-black tracking-widest text-white uppercase shadow-lg"
						>
							{event.status}
						</div>
					</div>
					<div class="space-y-6 p-10">
						<h3
							class="text-3xl leading-tight font-black text-primary transition-colors group-hover:text-secondary"
						>
							{event.title}
						</h3>
						<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<div class="flex items-center gap-3 text-sm font-bold text-primary/60">
								<Calendar size={18} class="text-secondary" />
								<span>{event.date}</span>
							</div>
							<div class="flex items-center gap-3 text-sm font-bold text-primary/60">
								<Clock size={18} class="text-secondary" />
								<span>{event.time}</span>
							</div>
							<div class="flex items-center gap-3 text-sm font-bold text-primary/60 sm:col-span-2">
								<MapPin size={18} class="text-secondary" />
								<span>{event.location}</span>
							</div>
						</div>
						<div class="pt-4">
							<button
								class="rounded-xl bg-primary px-8 py-3 font-black text-white shadow-xl shadow-primary/10 transition-all hover:bg-secondary"
							>
								Event Details
							</button>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
