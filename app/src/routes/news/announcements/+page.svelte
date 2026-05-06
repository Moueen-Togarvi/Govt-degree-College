<script lang="ts">
	import PageHero from '$lib/components/shared/PageHero.svelte';
	import { Calendar, ChevronRight } from 'lucide-svelte';
	
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'News', href: '/news/announcements' },
		{ label: 'Announcements', href: '/news/announcements' }
	];

	let { data } = $props();
</script>

<svelte:head>
	<title>Announcements | News | GPGC Bahawalnagar</title>
</svelte:head>

<PageHero 
	title="Latest Announcements" 
	subtitle="Stay updated with the latest news and official notices from the college."
	{breadcrumbs}
	image="/images/gallery/682757218_1491086206363014_2879876708562002240_n.jpg"
/>

<section class="py-24 bg-white">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="max-w-4xl mx-auto space-y-8">
			{#each data.announcements as item}
				<div class="p-8 bg-neutral-soft rounded-3xl border border-border-soft hover:border-secondary hover:shadow-xl transition-all group flex flex-col md:flex-row gap-8 items-start">
					<div class="flex-shrink-0 w-24 h-24 bg-primary rounded-2xl flex flex-col items-center justify-center text-white shadow-lg">
						<span class="text-xs font-bold uppercase tracking-tighter opacity-70">{item.date.split(' ')[0]}</span>
						<span class="text-2xl font-black">{item.date.split(' ')[1].replace(',', '')}</span>
						<span class="text-xs font-bold uppercase tracking-tighter opacity-70">{item.date.split(' ')[2]}</span>
					</div>
					
					<div class="flex-grow space-y-4">
						<div class="flex items-center gap-3">
							<span class="px-3 py-1 bg-secondary/10 text-secondary text-xs font-black uppercase tracking-widest rounded-full">
								{item.category}
							</span>
							<div class="flex items-center gap-2 text-primary/50 text-xs font-bold">
								<Calendar size={14} />
								<span>{item.date}</span>
							</div>
						</div>
						<h3 class="text-2xl font-black text-primary group-hover:text-secondary transition-colors leading-tight">
							{item.title}
						</h3>
						<p class="text-primary/70 leading-relaxed font-medium">
							{item.description}
						</p>
						<div class="inline-flex items-center gap-2 text-sm font-black text-primary/70">
							Official Notice <ChevronRight size={16} />
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
