<script lang="ts">
	import PageHero from '$lib/components/shared/PageHero.svelte';
	import { Library, FileText, Download, ScrollText, ArrowRight } from 'lucide-svelte';
	
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Resources', href: '/resources' }
	];

	const resourceCards = [
		{ title: "Digital Library", icon: Library, count: "50,000+ Books", color: "bg-blue-600" },
		{ title: "Past Papers", icon: ScrollText, count: "BISE & KFUEIT", color: "bg-teal-600" },
		{ title: "Academic Notes", icon: FileText, count: "All Subjects", color: "bg-orange-600" },
		{ title: "Useful Downloads", icon: Download, count: "Forms & Guides", color: "bg-purple-600" }
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

<section class="py-24 bg-white">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
			{#each resourceCards as card}
				<div class="p-8 bg-neutral-soft rounded-3xl border border-border-soft hover:border-secondary hover:shadow-xl transition-all group relative overflow-hidden">
					<div class="absolute top-0 right-0 w-24 h-24 {card.color} opacity-5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150"></div>
					<div class="space-y-6 relative z-10">
						<div class="w-14 h-14 {card.color} text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
							<card.icon size={28} />
						</div>
						<div class="space-y-1">
							<h3 class="text-xl font-black text-primary">{card.title}</h3>
							<p class="text-xs font-bold text-secondary uppercase tracking-widest">{card.count}</p>
						</div>
						<button class="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:text-secondary transition-colors">
							Explore <ArrowRight size={14} />
						</button>
					</div>
				</div>
			{/each}
		</div>

		<div class="bg-primary p-12 rounded-3xl text-white relative overflow-hidden">
			<div class="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -mr-48 -mb-48"></div>
			<div class="max-w-3xl space-y-6 relative z-10">
				<h2 class="text-4xl font-black italic">Need specialized help?</h2>
				<p class="text-white/70 text-lg font-medium leading-relaxed">
					Our IT department and library staff are available during college hours to help you find the resources you need. Visit the central library for offline access to journals and rare manuscripts.
				</p>
				<div class="pt-4">
					<a href="/about/administration" class="inline-block px-10 py-4 bg-secondary text-white rounded-xl font-black shadow-xl shadow-secondary/20 hover:scale-105 transition-all">
						Contact Librarian
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
