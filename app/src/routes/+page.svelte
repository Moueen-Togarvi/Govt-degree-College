<script lang="ts">
	import Hero from '$lib/components/home/Hero.svelte';
	import NewsTicker from '$lib/components/home/NewsTicker.svelte';
	import HomeLogos from '$lib/components/home/HomeLogos.svelte';
	import ImportantNotices from '$lib/components/home/ImportantNotices.svelte';
	import PrincipalMessage from '$lib/components/home/PrincipalMessage.svelte';
	import Stats from '$lib/components/home/Stats.svelte';
	import FeaturedPrograms from '$lib/components/home/FeaturedPrograms.svelte';
	import GalleryPreview from '$lib/components/home/GalleryPreview.svelte';
	import AdmissionsJourney from '$lib/components/home/AdmissionsJourney.svelte';
	import FinalCta from '$lib/components/home/FinalCta.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Home | Govt Post Graduate College Bahawalnagar</title>
	<meta
		name="description"
		content="Govt Post Graduate College Bahawalnagar offers free 11th and 12th classes under the Government of Punjab and BS programs affiliated with KFUEIT."
	/>
</svelte:head>

<NewsTicker announcements={data.tickerAnnouncements} />
<Hero />
<Stats />
<FeaturedPrograms />
<HomeLogos />
<ImportantNotices notices={data.noticeBoardItems} />
<PrincipalMessage />
<GalleryPreview />
<AdmissionsJourney />
<FinalCta />
