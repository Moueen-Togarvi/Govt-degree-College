<script lang="ts">
	import PageHero from '$lib/components/shared/PageHero.svelte';
	import { Target, Eye, Heart } from 'lucide-svelte';

	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'About', href: '/about/overview' },
		{ label: 'Mission & Vision', href: '/about/mission-vision' }
	];
</script>

<svelte:head>
	<title>Mission & Vision | About Us | GPGC Bahawalnagar</title>
</svelte:head>

<PageHero
	title="Mission & Vision"
	subtitle="Defining our purpose and our future path."
	{breadcrumbs}
	image="/images/gallery/547755271_1299324492205854_5011253499358894922_n.jpg"
/>

<section class="bg-white py-24">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="grid grid-cols-1 gap-12 lg:grid-cols-3">
			<!-- Mission -->
			<div
				class="group space-y-6 rounded-3xl border border-border-soft bg-neutral-soft p-10 transition-all hover:border-secondary"
			>
				<div
					class="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white transition-transform group-hover:scale-110"
				>
					<Target size={32} />
				</div>
				<h2 class="text-3xl font-black text-primary">Our Mission</h2>
				<p class="text-lg leading-relaxed text-primary/70">
					To provide affordable and quality education to students, enabling them to realize their
					full potential and contribute meaningfully to society as responsible and ethically strong
					citizens.
				</p>
			</div>

			<!-- Vision -->
			<div
				class="group space-y-6 rounded-3xl border border-border-soft bg-neutral-soft p-10 transition-all hover:border-secondary"
			>
				<div
					class="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-white transition-transform group-hover:scale-110"
				>
					<Eye size={32} />
				</div>
				<h2 class="text-3xl font-black text-primary">Our Vision</h2>
				<p class="text-lg leading-relaxed text-primary/70">
					To be a leading center of academic excellence in the region, recognized for innovation in
					teaching, research, and for producing graduates who are leaders in their respective
					fields.
				</p>
			</div>

			<!-- Values -->
			<div
				class="group space-y-6 rounded-3xl border border-border-soft bg-neutral-soft p-10 transition-all hover:border-secondary"
			>
				<div
					class="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white transition-transform group-hover:scale-110"
				>
					<Heart size={32} />
				</div>
				<h2 class="text-3xl font-black text-primary">Core Values</h2>
				<ul class="space-y-3 text-lg text-primary/70">
					<li class="flex items-center gap-2 font-bold">
						<span class="h-1.5 w-1.5 rounded-full bg-secondary"></span> Integrity
					</li>
					<li class="flex items-center gap-2 font-bold">
						<span class="h-1.5 w-1.5 rounded-full bg-secondary"></span> Excellence
					</li>
					<li class="flex items-center gap-2 font-bold">
						<span class="h-1.5 w-1.5 rounded-full bg-secondary"></span> Inclusivity
					</li>
					<li class="flex items-center gap-2 font-bold">
						<span class="h-1.5 w-1.5 rounded-full bg-secondary"></span> Discipline
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>
