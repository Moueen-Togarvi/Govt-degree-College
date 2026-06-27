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

<section class="bg-white py-24">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="mx-auto max-w-4xl space-y-8">
			{#each data.announcements as item}
				<div
					class="group flex flex-col items-start gap-8 rounded-3xl border border-border-soft bg-neutral-soft p-8 transition-all hover:border-secondary hover:shadow-xl md:flex-row"
				>
					<div
						class="flex h-24 w-24 flex-shrink-0 flex-col items-center justify-center rounded-2xl bg-primary text-white shadow-lg"
					>
						<span class="text-xs font-bold tracking-tighter uppercase opacity-70"
							>{item.date.split(' ')[0]}</span
						>
						<span class="text-2xl font-black">{item.date.split(' ')[1].replace(',', '')}</span>
						<span class="text-xs font-bold tracking-tighter uppercase opacity-70"
							>{item.date.split(' ')[2]}</span
						>
					</div>

					<div class="flex-grow space-y-4">
						<div class="flex items-center gap-3">
							<span
								class="rounded-full bg-secondary/10 px-3 py-1 text-xs font-black tracking-widest text-secondary uppercase"
							>
								{item.category}
							</span>
							<div class="flex items-center gap-2 text-xs font-bold text-primary/50">
								<Calendar size={14} />
								<span>{item.date}</span>
							</div>
						</div>
						<h3
							class="text-2xl leading-tight font-black text-primary transition-colors group-hover:text-secondary"
						>
							{item.title}
						</h3>
						<p class="leading-relaxed font-medium text-primary/70">
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
