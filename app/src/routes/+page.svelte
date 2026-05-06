<script lang="ts">
	import Hero from '$lib/components/home/Hero.svelte';
	import NewsTicker from '$lib/components/home/NewsTicker.svelte';
	import QuickLinks from '$lib/components/home/QuickLinks.svelte';
	import PrincipalMessage from '$lib/components/home/PrincipalMessage.svelte';
	import Stats from '$lib/components/home/Stats.svelte';
</script>

<svelte:head>
	<title>Home | Govt Post Graduate College Bahawalnagar</title>
	<meta name="description" content="Welcome to the official portal of Govt Post Graduate College Bahawalnagar. Explore our BS programs affiliated with KFUEIT." />
</svelte:head>

<NewsTicker />
<Hero />
<QuickLinks />
<PrincipalMessage />
<Stats />

<section class="py-24 bg-white">
	<div class="container mx-auto px-4 text-center space-y-8">
		<h2 class="text-4xl font-black text-primary italic">"Quality Education, Affordable for All"</h2>
		<p class="text-xl text-primary/60 font-medium">Affiliated with Khawaja Fareed University of Engineering & IT (KFUEIT)</p>
	</div>
</section>
