<script lang="ts">
	import PageHero from '$lib/components/shared/PageHero.svelte';
	import { Maximize2 } from 'lucide-svelte';

	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'News', href: '/news/announcements' },
		{ label: 'Gallery', href: '/news/gallery' }
	];

	const images = [
		{
			src: '/images/gallery/Gemini_Generated_Image_hwtnmyhwtnmyhwtn.png',
			title: 'Open-Air Academic Session'
		},
		{
			src: '/images/gallery/Gemini_Generated_Image_jec4ltjec4ltjec4.png',
			title: 'Courtyard Garden'
		},
		{
			src: '/images/gallery/Gemini_Generated_Image_kgigjckgigjckgig.png',
			title: 'Mathematics Weekly Test'
		},
		{
			src: '/images/gallery/Gemini_Generated_Image_dcuevidcuevidcue.png',
			title: 'Hockey Team Spirit'
		},
		{
			src: '/images/gallery/Gemini_Generated_Image_v7frg0v7frg0v7fr.png',
			title: 'Promotion Award Ceremony'
		},
		{
			src: '/images/gallery/Gemini_Generated_Image_kbyw6zkbyw6zkbyw.png',
			title: 'Football Team Gathering'
		},
		{
			src: '/images/gallery/Gemini_Generated_Image_5tkvlb5tkvlb5tkv.png',
			title: 'Achievement Recognition'
		},
		{ src: '/images/gallery/opst1.png', title: 'Sports Week Participation' },
		{
			src: '/images/gallery/Gemini_Generated_Image_iyh10xiyh10xiyh1.png',
			title: 'Campus Gathering'
		},
		{
			src: '/images/gallery/Gemini_Generated_Image_t8ri2ct8ri2ct8ri.png',
			title: 'Student Activity Moment'
		}
	];
</script>

<svelte:head>
	<title>Gallery | News | GPGC Bahawalnagar</title>
</svelte:head>

<PageHero
	title="Campus Gallery"
	subtitle="A visual journey through our campus and academic life."
	{breadcrumbs}
	image="/images/gallery/Gemini_Generated_Image_hwtnmyhwtnmyhwtn.png"
/>

<section class="bg-white py-24">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each images as image}
				<div
					class="group relative aspect-square cursor-pointer overflow-hidden rounded-3xl border border-border-soft bg-neutral-soft transition-all duration-500 hover:shadow-2xl"
				>
					<img
						src={image.src}
						alt={image.title}
						loading="lazy"
						decoding="async"
						class="h-full w-full object-cover object-center transition-transform duration-700 [image-rendering:auto] group-hover:scale-110"
					/>
					<div
						class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary/90 via-primary/20 to-transparent p-8 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
					>
						<div
							class="translate-y-4 space-y-2 transition-transform duration-500 group-hover:translate-y-0"
						>
							<p class="text-xs font-black tracking-widest text-secondary uppercase">Category</p>
							<h3 class="text-xl font-black text-white">{image.title}</h3>
							<div class="pt-2">
								<div
									class="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-white shadow-lg"
								>
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
