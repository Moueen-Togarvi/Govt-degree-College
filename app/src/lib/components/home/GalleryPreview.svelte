<script lang="ts">
	import { ArrowRight } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	const galleryItems = [
		{
			src: '/images/gallery/543459255_1288642623274041_7370685911892750194_n.jpg',
			title: 'Campus Entrance',
			tag: 'Campus'
		},
		{
			src: '/images/gallery/489290757_1152937760177862_1944043555997507703_n.jpg',
			title: 'Student Community',
			tag: 'Students'
		},
		{
			src: '/images/gallery/544756802_1288642559940714_7566178749056628309_n.jpg',
			title: 'Academic Blocks',
			tag: 'Departments'
		},
		{
			src: '/images/gallery/497498149_1184322940372677_5964474392879878424_n.jpg',
			title: 'Classroom Focus',
			tag: 'Learning'
		},
		{
			src: '/images/gallery/488504405_1150873360384302_7113898617720777839_n.jpg',
			title: 'Student Participation',
			tag: 'Classes'
		},
		{
			src: '/images/gallery/474603261_1114315973721488_3688329175050708929_n.jpg',
			title: 'Campus Events',
			tag: 'Events'
		},
		{
			src: '/images/gallery/543406756_1287667523371551_8002641646226004304_n.jpg',
			title: 'College Sessions',
			tag: 'Activities'
		},
		{
			src: '/images/gallery/474603631_1113700027116416_3753317337439731517_n.jpg',
			title: 'Faculty Presence',
			tag: 'Faculty'
		}
	];

	let activeIndex = $state(0);

	const visibleItems = $derived(
		Array.from({ length: 5 }, (_, offset) => galleryItems[(activeIndex + offset) % galleryItems.length])
	);

	onMount(() => {
		const interval = window.setInterval(() => {
			activeIndex = (activeIndex + 1) % galleryItems.length;
		}, 5000);

		return () => window.clearInterval(interval);
	});
</script>

<section class="relative overflow-hidden bg-neutral-soft py-24">
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(247,148,29,0.10),_transparent_26%)]"></div>
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(13,93,86,0.08),_transparent_26%)]"></div>

	<div class="container relative z-10 mx-auto px-4 lg:px-8">
		<div class="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
			<div class="max-w-3xl motion-rise">
				<p class="mb-4 text-sm font-black uppercase tracking-[0.35em] text-secondary">Campus Life</p>
				<h2 class="text-4xl font-black text-primary lg:text-5xl">
					A premium grid shaped around real moments from campus.
				</h2>
				<p class="mt-5 text-base font-medium leading-8 text-primary/65 lg:text-lg">
					Images now rotate every 5 seconds with smooth transitions, while the layout keeps one large campus frame and compact square highlights.
				</p>
			</div>

			<a
				href="/news/gallery"
				class="inline-flex items-center gap-3 self-start rounded-full border border-primary/15 bg-white px-6 py-3 font-black text-primary shadow-sm transition-all hover:-translate-y-1 hover:text-secondary motion-rise"
			>
				View Full Gallery
				<ArrowRight size={18} />
			</a>
		</div>

		<div class="grid gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-stretch">
			<div class="group relative isolate h-[420px] overflow-hidden rounded-[2rem] border border-white/60 bg-white shadow-[0_24px_70px_rgba(13,93,86,0.10)] lg:h-[470px]">
				{#key visibleItems[0].src}
					<div class="absolute inset-0" in:fade={{ duration: 550 }}>
						<img
							src={visibleItems[0].src}
							alt={visibleItems[0].title}
							class="absolute inset-0 h-full w-full object-cover object-center"
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-primary via-primary/18 to-transparent"></div>
						<div class="absolute inset-x-0 bottom-0 p-8 text-white">
							<p class="text-xs font-black uppercase tracking-[0.28em] text-secondary">
								{visibleItems[0].tag}
							</p>
							<h3 class="mt-3 text-3xl font-black lg:text-4xl">{visibleItems[0].title}</h3>
						</div>
					</div>
				{/key}
			</div>

			<div class="grid gap-5 sm:grid-cols-2 lg:h-[470px] lg:grid-cols-2 lg:grid-rows-2">
				{#each visibleItems.slice(1) as item (item.src)}
					<div class="group relative isolate aspect-square overflow-hidden rounded-[1.7rem] border border-white/60 bg-white shadow-[0_18px_50px_rgba(13,93,86,0.08)] lg:h-full">
						{#key item.src}
							<div class="absolute inset-0" in:fade={{ duration: 550 }}>
								<img
									src={item.src}
									alt={item.title}
									class="absolute inset-0 h-full w-full object-cover object-center"
								/>
								<div class="absolute inset-0 bg-gradient-to-t from-primary/88 via-primary/8 to-transparent"></div>
								<div class="absolute inset-x-0 bottom-0 p-4 text-white">
									<p class="text-[11px] font-black uppercase tracking-[0.22em] text-secondary">
										{item.tag}
									</p>
									<h3 class="mt-2 text-lg font-black leading-tight lg:text-xl">{item.title}</h3>
								</div>
							</div>
						{/key}
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
