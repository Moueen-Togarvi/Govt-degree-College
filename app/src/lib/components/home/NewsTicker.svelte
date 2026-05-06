<script lang="ts">
	import { BellRing } from 'lucide-svelte';

	const announcements = [
		"Admissions for BS Programs (Affiliated with KFUEIT) are now open for Fall 2026.",
		"Annual Sports Day scheduled for next Monday. All students are invited.",
		"Library membership drive starts from June 1st. Get your cards ready.",
		"Mid-term examination results for Inter classes have been uploaded to the portal."
	];
</script>

<div class="bg-secondary/10 border-y border-secondary/20 py-2 overflow-hidden flex items-center">
	<div class="container mx-auto px-4 lg:px-8 flex items-center">
		<div class="flex items-center gap-2 bg-secondary text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-tighter whitespace-nowrap z-10 shadow-sm">
			<BellRing size={14} />
			<span>Latest News</span>
		</div>
		
		<div class="flex-1 overflow-hidden ml-4 relative">
			<div class="flex animate-marquee whitespace-nowrap gap-12">
				{#each announcements as news}
					<span class="text-sm font-bold text-primary flex items-center gap-2">
						<span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>
						{news}
					</span>
				{/each}
				<!-- Duplicate for seamless scroll -->
				{#each announcements as news}
					<span class="text-sm font-bold text-primary flex items-center gap-2">
						<span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>
						{news}
					</span>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.animate-marquee {
		display: inline-flex;
		animation: marquee 30s linear infinite;
	}

	@keyframes marquee {
		from { transform: translateX(0); }
		to { transform: translateX(-50%); }
	}

	.animate-marquee:hover {
		animation-play-state: paused;
	}
</style>
