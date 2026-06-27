<script lang="ts">
	import PageHero from '$lib/components/shared/PageHero.svelte';

	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'About', href: '/about/overview' },
		{ label: 'Overview', href: '/about/overview' }
	];
</script>

<svelte:head>
	<title>Overview | About Us | GPGC Bahawalnagar</title>
</svelte:head>

<PageHero
	title="College Overview"
	subtitle="Leading the way in quality higher education and academic excellence in Bahawalnagar."
	{breadcrumbs}
	image="/images/gallery/682757218_1491086206363014_2879876708562002240_n.jpg"
/>

<section class="bg-white py-24">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="mx-auto max-w-4xl space-y-12">
			<div class="space-y-6">
				<h2 class="border-l-8 border-secondary pl-6 text-3xl font-black text-primary">
					Introduction
				</h2>
				<p class="text-lg leading-relaxed text-primary/70">
					Govt Post Graduate College Bahawalnagar is a premier educational institution dedicated to
					providing high-quality education to the youth of Bahawalnagar and surrounding areas.
					Founded with a vision to empower students through knowledge, the college has grown into a
					hub of academic and extracurricular excellence.
				</p>
			</div>

			<div class="grid grid-cols-1 gap-12 md:grid-cols-2">
				<div class="space-y-4">
					<h3 class="text-xl font-bold text-primary">Academic Excellence</h3>
					<p class="leading-relaxed text-primary/70">
						We offer a wide range of programs, including Intermediate (FA/FSc) and various BS
						programs affiliated with the prestigious KFUEIT Rahim Yar Khan. Our curriculum is
						designed to meet modern standards and prepare students for global challenges.
					</p>
				</div>
				<div class="space-y-4">
					<h3 class="text-xl font-bold text-primary">Modern Facilities</h3>
					<p class="leading-relaxed text-primary/70">
						Our campus is equipped with state-of-the-art laboratories, a well-stocked central
						library, and modern classrooms. We believe in providing a conducive environment for both
						teaching and learning.
					</p>
				</div>
			</div>

			<div class="rounded-3xl border border-border-soft bg-neutral-soft p-10">
				<h3 class="mb-6 text-2xl font-black text-primary">Affiliation with KFUEIT</h3>
				<p class="mb-6 leading-relaxed text-primary/70">
					All our BS programs are affiliated with Khawaja Fareed University of Engineering &
					Information Technology (KFUEIT), Rahim Yar Khan. This affiliation ensures that our
					students receive degrees that are recognized and respected nationwide, backed by the
					academic rigor of a leading engineering university.
				</p>
				<a
					href="https://kfueit.edu.pk"
					target="_blank"
					class="font-bold text-secondary hover:underline">Learn more about KFUEIT affiliation →</a
				>
			</div>
		</div>
	</div>
</section>
