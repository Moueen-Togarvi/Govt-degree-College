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

<section class="py-24 bg-white">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
			<!-- Mission -->
			<div class="space-y-6 p-10 rounded-3xl bg-neutral-soft border border-border-soft group hover:border-secondary transition-all">
				<div class="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
					<Target size={32} />
				</div>
				<h2 class="text-3xl font-black text-primary">Our Mission</h2>
				<p class="text-lg text-primary/70 leading-relaxed">
					To provide affordable and quality education to students, enabling them to realize their full potential and contribute meaningfully to society as responsible and ethically strong citizens.
				</p>
			</div>

			<!-- Vision -->
			<div class="space-y-6 p-10 rounded-3xl bg-neutral-soft border border-border-soft group hover:border-secondary transition-all">
				<div class="w-16 h-16 bg-secondary text-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
					<Eye size={32} />
				</div>
				<h2 class="text-3xl font-black text-primary">Our Vision</h2>
				<p class="text-lg text-primary/70 leading-relaxed">
					To be a leading center of academic excellence in the region, recognized for innovation in teaching, research, and for producing graduates who are leaders in their respective fields.
				</p>
			</div>

			<!-- Values -->
			<div class="space-y-6 p-10 rounded-3xl bg-neutral-soft border border-border-soft group hover:border-secondary transition-all">
				<div class="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
					<Heart size={32} />
				</div>
				<h2 class="text-3xl font-black text-primary">Core Values</h2>
				<ul class="space-y-3 text-lg text-primary/70">
					<li class="flex items-center gap-2 font-bold"><span class="w-1.5 h-1.5 bg-secondary rounded-full"></span> Integrity</li>
					<li class="flex items-center gap-2 font-bold"><span class="w-1.5 h-1.5 bg-secondary rounded-full"></span> Excellence</li>
					<li class="flex items-center gap-2 font-bold"><span class="w-1.5 h-1.5 bg-secondary rounded-full"></span> Inclusivity</li>
					<li class="flex items-center gap-2 font-bold"><span class="w-1.5 h-1.5 bg-secondary rounded-full"></span> Discipline</li>
				</ul>
			</div>
		</div>
	</div>
</section>
