<script lang="ts">
	import PageHero from '$lib/components/shared/PageHero.svelte';

	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'About', href: '/about/overview' },
		{ label: 'History', href: '/about/history' }
	];

	const timeline = [
		{ year: '1945', event: 'Foundation of the college as an intermediate institution.' },
		{ year: '1960', event: 'Upgraded to a degree-granting college for undergraduate studies.' },
		{ year: '1985', event: 'Inauguration of the modern science block and laboratories.' },
		{ year: '2010', event: 'Started post-graduate programs in major disciplines.' },
		{ year: '2021', event: 'Establishment of affiliation with KFUEIT for BS programs.' }
	];
</script>

<svelte:head>
	<title>History | About Us | GPGC Bahawalnagar</title>
</svelte:head>

<PageHero
	title="Our History"
	subtitle="A legacy of excellence spanning over seven decades."
	{breadcrumbs}
	image="/images/gallery/491999992_1166947772110194_8921941246071863873_n.jpg"
/>

<section class="bg-white py-24">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="mx-auto max-w-4xl">
			<div class="space-y-12">
				<div class="space-y-6">
					<h2 class="border-l-8 border-secondary pl-6 text-3xl font-black text-primary">
						Decades of Legacy
					</h2>
					<p class="text-lg leading-relaxed text-primary/70">
						Govt Post Graduate College Bahawalnagar has a rich history that mirrors the growth and
						development of the region itself. What started as a modest building has transformed into
						a sprawling campus that serves thousands of students every year.
					</p>
				</div>

				<!-- Timeline -->
				<div
					class="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-neutral-300 before:to-transparent md:before:mx-auto md:before:translate-x-0"
				>
					{#each timeline as item}
						<div
							class="group is-active relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse"
						>
							<!-- Icon -->
							<div
								class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white bg-secondary text-white shadow md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"
							>
								<span class="h-2 w-2 rounded-full bg-white"></span>
							</div>
							<!-- Content -->
							<div
								class="w-[calc(100%-4rem)] rounded-3xl border border-border-soft bg-neutral-soft p-6 shadow-sm transition-all group-hover:border-secondary md:w-[calc(50%-2.5rem)]"
							>
								<div class="mb-2 flex items-center justify-between space-x-2">
									<div class="text-2xl font-black text-primary">{item.year}</div>
								</div>
								<div class="text-primary/70">{item.event}</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
