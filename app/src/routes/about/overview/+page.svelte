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

<section class="py-24 bg-white">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="max-w-4xl mx-auto space-y-12">
			<div class="space-y-6">
				<h2 class="text-3xl font-black text-primary border-l-8 border-secondary pl-6">Introduction</h2>
				<p class="text-lg text-primary/70 leading-relaxed">
					Govt Post Graduate College Bahawalnagar is a premier educational institution dedicated to providing high-quality education to the youth of Bahawalnagar and surrounding areas. Founded with a vision to empower students through knowledge, the college has grown into a hub of academic and extracurricular excellence.
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-12">
				<div class="space-y-4">
					<h3 class="text-xl font-bold text-primary">Academic Excellence</h3>
					<p class="text-primary/70 leading-relaxed">
						We offer a wide range of programs, including Intermediate (FA/FSc) and various BS programs affiliated with the prestigious KFUEIT Rahim Yar Khan. Our curriculum is designed to meet modern standards and prepare students for global challenges.
					</p>
				</div>
				<div class="space-y-4">
					<h3 class="text-xl font-bold text-primary">Modern Facilities</h3>
					<p class="text-primary/70 leading-relaxed">
						Our campus is equipped with state-of-the-art laboratories, a well-stocked central library, and modern classrooms. We believe in providing a conducive environment for both teaching and learning.
					</p>
				</div>
			</div>

			<div class="bg-neutral-soft p-10 rounded-3xl border border-border-soft">
				<h3 class="text-2xl font-black text-primary mb-6">Affiliation with KFUEIT</h3>
				<p class="text-primary/70 leading-relaxed mb-6">
					All our BS programs are affiliated with Khawaja Fareed University of Engineering & Information Technology (KFUEIT), Rahim Yar Khan. This affiliation ensures that our students receive degrees that are recognized and respected nationwide, backed by the academic rigor of a leading engineering university.
				</p>
				<a href="https://kfueit.edu.pk" target="_blank" class="text-secondary font-bold hover:underline">Learn more about KFUEIT affiliation →</a>
			</div>
		</div>
	</div>
</section>
