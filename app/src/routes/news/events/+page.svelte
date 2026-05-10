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

<section class="py-24 bg-white">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-12">
			{#each data.events as event}
				<div class="flex flex-col bg-neutral-soft rounded-3xl border border-border-soft overflow-hidden hover:shadow-2xl transition-all group">
					<div class="relative h-64 overflow-hidden">
						<img src={event.imageUrl} alt={event.title} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" decoding="async" />
						<div class="absolute top-6 left-6 bg-secondary text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
							{event.status}
						</div>
					</div>
					<div class="p-10 space-y-6">
						<h3 class="text-3xl font-black text-primary leading-tight group-hover:text-secondary transition-colors">
							{event.title}
						</h3>
						<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div class="flex items-center gap-3 text-primary/60 font-bold text-sm">
								<Calendar size={18} class="text-secondary" />
								<span>{event.date}</span>
							</div>
							<div class="flex items-center gap-3 text-primary/60 font-bold text-sm">
								<Clock size={18} class="text-secondary" />
								<span>{event.time}</span>
							</div>
							<div class="flex items-center gap-3 text-primary/60 font-bold text-sm sm:col-span-2">
								<MapPin size={18} class="text-secondary" />
								<span>{event.location}</span>
							</div>
						</div>
						<div class="pt-4">
							<button class="px-8 py-3 bg-primary text-white rounded-xl font-black hover:bg-secondary transition-all shadow-xl shadow-primary/10">
								Event Details
							</button>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
