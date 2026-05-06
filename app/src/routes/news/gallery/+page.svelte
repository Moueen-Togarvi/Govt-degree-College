<script lang="ts">
	import PageHero from '$lib/components/shared/PageHero.svelte';
	import { Maximize2 } from 'lucide-svelte';
	
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'News', href: '/news/announcements' },
		{ label: 'Gallery', href: '/news/gallery' }
	];

	const images = [
		{ src: "/images/gallery/682757218_1491086206363014_2879876708562002240_n.jpg", title: "College Campus" },
		{ src: "/images/gallery/547755271_1299324492205854_5011253499358894922_n.jpg", title: "Science Block" },
		{ src: "/images/gallery/491999992_1166947772110194_8921941246071863873_n.jpg", title: "Library Hall" },
		{ src: "/images/gallery/497498149_1184322940372677_5964474392879878424_n.jpg", title: "Main Gate" },
		{ src: "/images/gallery/474603631_1113700027116416_3753317337439731517_n.jpg", title: "Academic Block" },
		{ src: "/images/gallery/488504405_1150873360384302_7113898617720777839_n.jpg", title: "Admin Office" },
		{ src: "/images/gallery/488936577_1152937786844526_8441555087243500544_n.jpg", title: "Auditorium" },
		{ src: "/images/gallery/489370014_1155981606540144_7733475266851659714_n.jpg", title: "Sports Complex" }
	];
</script>

<svelte:head>
	<title>Gallery | News | GPGC Bahawalnagar</title>
</svelte:head>

<PageHero 
	title="Campus Gallery" 
	subtitle="A visual journey through our campus and academic life."
	{breadcrumbs}
	image="/images/gallery/682757218_1491086206363014_2879876708562002240_n.jpg"
/>

<section class="py-24 bg-white">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
			{#each images as image}
				<div class="group relative aspect-square overflow-hidden rounded-3xl bg-neutral-soft border border-border-soft hover:shadow-2xl transition-all duration-500 cursor-pointer">
					<img src={image.src} alt={image.title} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
					<div class="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
						<div class="space-y-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
							<p class="text-secondary font-black uppercase tracking-widest text-xs">Category</p>
							<h3 class="text-xl font-black text-white">{image.title}</h3>
							<div class="pt-2">
								<div class="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center shadow-lg">
									<Maximize2 size={18} />
								</div>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
