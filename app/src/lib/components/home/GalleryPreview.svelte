<script lang="ts">
	import { ArrowRight } from 'lucide-svelte';
	import { onMount } from 'svelte';

	const galleryItems = [
		{
			src: '/images/gallery/Gemini_Generated_Image_hwtnmyhwtnmyhwtn.png',
			title: 'Open-Air Academic Session',
			tag: 'Campus Life'
		},
		{
			src: '/images/gallery/Gemini_Generated_Image_jec4ltjec4ltjec4.png',
			title: 'Courtyard Garden',
			tag: 'Campus'
		},
		{
			src: '/images/gallery/Gemini_Generated_Image_kgigjckgigjckgig.png',
			title: 'Mathematics Weekly Test',
			tag: 'Academics'
		},
		{
			src: '/images/gallery/Gemini_Generated_Image_dcuevidcuevidcue.png',
			title: 'Hockey Team Spirit',
			tag: 'Sports'
		},
		{
			src: '/images/gallery/Gemini_Generated_Image_v7frg0v7frg0v7fr.png',
			title: 'Promotion Award Ceremony',
			tag: 'Events'
		},
		{
			src: '/images/gallery/Gemini_Generated_Image_kbyw6zkbyw6zkbyw.png',
			title: 'Football Team Gathering',
			tag: 'Students'
		},
		{
			src: '/images/gallery/Gemini_Generated_Image_5tkvlb5tkvlb5tkv.png',
			title: 'Achievement Recognition',
			tag: 'Honours'
		},
		{
			src: '/images/gallery/opst1.png',
			title: 'Sports Week Participation',
			tag: 'Activities'
		}
	];

	let activeIndex = $state(0);

	const visibleItems = $derived(
		Array.from(
			{ length: 5 },
			(_, offset) => galleryItems[(activeIndex + offset) % galleryItems.length]
		)
	);

	onMount(() => {
		const interval = window.setInterval(() => {
			activeIndex = (activeIndex + 1) % galleryItems.length;
		}, 5000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<section class="relative overflow-hidden bg-neutral-soft py-24">
	<div
		class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(247,148,29,0.10),_transparent_26%)]"
	></div>
	<div
		class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(13,93,86,0.08),_transparent_26%)]"
	></div>

	<div class="relative z-10 container mx-auto px-4 lg:px-8">
		<div class="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
			<div class="motion-rise max-w-3xl">
				<p class="mb-4 text-sm font-black tracking-[0.35em] text-secondary uppercase">
					Campus Life
				</p>
				<h2 class="text-4xl font-black text-primary lg:text-5xl">
					A premium grid shaped around real moments from campus.
				</h2>
				<p class="mt-5 text-base leading-8 font-medium text-primary/65 lg:text-lg">
					Images now rotate every 5 seconds with smooth transitions, while the layout keeps one
					large campus frame and compact square highlights.
				</p>
			</div>

			<a
				href="/news/gallery"
				class="motion-rise inline-flex items-center gap-3 self-start rounded-full border border-primary/15 bg-white px-6 py-3 font-black text-primary shadow-sm transition-all hover:-translate-y-1 hover:text-secondary"
			>
				View Full Gallery
				<ArrowRight size={18} />
			</a>
		</div>

		<div class="grid gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-stretch">
			<div
				class="group relative isolate h-[420px] overflow-hidden rounded-[2rem] border border-white/60 bg-white shadow-[0_24px_70px_rgba(13,93,86,0.10)] lg:h-[470px]"
			>
				{#each [visibleItems[0]] as item (item.src)}
					<div class="absolute inset-0 transition-opacity duration-700">
						<img
							src={item.src}
							alt={item.title}
							class="absolute inset-0 h-full w-full object-cover object-center [image-rendering:auto]"
							fetchpriority="high"
							decoding="async"
						/>
						<div
							class="absolute inset-0 bg-gradient-to-t from-primary via-primary/18 to-transparent"
						></div>
						<div class="absolute inset-x-0 bottom-0 p-8 text-white">
							<p class="text-xs font-black tracking-[0.28em] text-secondary uppercase">
								{item.tag}
							</p>
							<h3 class="mt-3 text-3xl font-black lg:text-4xl">{item.title}</h3>
						</div>
					</div>
				{/each}
			</div>

			<div class="grid gap-5 sm:grid-cols-2 lg:h-[470px] lg:grid-cols-2 lg:grid-rows-2">
				{#each visibleItems.slice(1) as item, i (item.src)}
					<div
						class="group relative isolate aspect-square overflow-hidden rounded-[1.7rem] border border-white/60 bg-white shadow-[0_18px_50px_rgba(13,93,86,0.08)] lg:h-full"
					>
						<div class="absolute inset-0 transition-opacity duration-700">
							<img
								src={item.src}
								alt={item.title}
								class="absolute inset-0 h-full w-full object-cover object-center [image-rendering:auto]"
								loading="lazy"
								decoding="async"
							/>
							<div
								class="absolute inset-0 bg-gradient-to-t from-primary/88 via-primary/8 to-transparent"
							></div>
							<div class="absolute inset-x-0 bottom-0 p-4 text-white">
								<p class="text-[11px] font-black tracking-[0.22em] text-secondary uppercase">
									{item.tag}
								</p>
								<h3 class="mt-2 text-lg leading-tight font-black lg:text-xl">{item.title}</h3>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
