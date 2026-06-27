<script lang="ts">
	import PageHero from '$lib/components/shared/PageHero.svelte';
	import { Library, FileText, Download, ScrollText, ArrowRight } from 'lucide-svelte';

	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Resources', href: '/resources' }
	];

	const resourceCards = [
		{ title: 'Digital Library', icon: Library, count: '50,000+ Books', color: 'bg-blue-600' },
		{ title: 'Past Papers', icon: ScrollText, count: 'BISE & KFUEIT', color: 'bg-teal-600' },
		{ title: 'Academic Notes', icon: FileText, count: 'All Subjects', color: 'bg-orange-600' },
		{ title: 'Useful Downloads', icon: Download, count: 'Forms & Guides', color: 'bg-purple-600' }
	];
</script>

<svelte:head>
	<title>Resource Center | GPGC Bahawalnagar</title>
</svelte:head>

<PageHero
	title="Resource Center"
	subtitle="Everything you need for your academic success in one place."
	{breadcrumbs}
	image="/images/gallery/491999992_1166947772110194_8921941246071863873_n.jpg"
/>

<section class="bg-white py-24">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="mb-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
			{#each resourceCards as card}
				<div
					class="group relative overflow-hidden rounded-3xl border border-border-soft bg-neutral-soft p-8 transition-all hover:border-secondary hover:shadow-xl"
				>
					<div
						class="absolute top-0 right-0 h-24 w-24 {card.color} -mt-12 -mr-12 rounded-full opacity-5 transition-transform group-hover:scale-150"
					></div>
					<div class="relative z-10 space-y-6">
						<div
							class="h-14 w-14 {card.color} flex items-center justify-center rounded-2xl text-white shadow-lg transition-transform group-hover:scale-110"
						>
							<card.icon size={28} />
						</div>
						<div class="space-y-1">
							<h3 class="text-xl font-black text-primary">{card.title}</h3>
							<p class="text-xs font-bold tracking-widest text-secondary uppercase">{card.count}</p>
						</div>
						<button
							class="flex items-center gap-2 text-xs font-black tracking-widest text-primary uppercase transition-colors hover:text-secondary"
						>
							Explore <ArrowRight size={14} />
						</button>
					</div>
				</div>
			{/each}
		</div>

		<div class="relative overflow-hidden rounded-3xl bg-primary p-12 text-white">
			<div
				class="absolute right-0 bottom-0 -mr-48 -mb-48 h-96 w-96 rounded-full bg-secondary/10 blur-3xl"
			></div>
			<div class="relative z-10 max-w-3xl space-y-6">
				<h2 class="text-4xl font-black italic">Need specialized help?</h2>
				<p class="text-lg leading-relaxed font-medium text-white/70">
					Our IT department and library staff are available during college hours to help you find
					the resources you need. Visit the central library for offline access to journals and rare
					manuscripts.
				</p>
				<div class="pt-4">
					<a
						href="/about/administration"
						class="inline-block rounded-xl bg-secondary px-10 py-4 font-black text-white shadow-xl shadow-secondary/20 transition-all hover:scale-105"
					>
						Contact Librarian
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
