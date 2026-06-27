<script lang="ts">
	import { BadgeCheck, Clock3, GraduationCap, Landmark } from 'lucide-svelte';

	const facts = [
		{
			icon: Landmark,
			title: 'Government of Punjab',
			description: 'Public-sector trust for intermediate education.'
		},
		{
			icon: BadgeCheck,
			title: '11th & 12th Free',
			description: 'Intermediate classes are completely free.'
		},
		{
			icon: GraduationCap,
			title: 'BS with KFUEIT',
			description: 'Affiliation applies to BS programs only.'
		},
		{
			icon: Clock3,
			title: 'Morning & Evening',
			description: 'BS classes run in two shift options.'
		}
	];
</script>

<section class="relative overflow-hidden border-y border-border-soft bg-white py-8">
	<div
		class="absolute inset-0 bg-[linear-gradient(120deg,_rgba(13,93,86,0.03),_transparent_40%,_rgba(247,148,29,0.08))]"
	></div>

	<div class="relative z-10 container mx-auto px-4 lg:px-8">
		<div class="grid items-center gap-5 xl:grid-cols-[1.15fr_1.85fr]">
			<div class="motion-slide">
				<div
					class="motion-glow flex items-center gap-4 overflow-hidden rounded-[2rem] border border-border-soft bg-neutral-soft/80 px-5 py-4 shadow-[0_18px_50px_rgba(13,93,86,0.08)]"
				>
					<div
						class="flex h-20 w-20 shrink-0 items-center justify-center rounded-[1.6rem] bg-white shadow-sm"
					>
						<img
							src="/images/logos/image.png"
							alt="Government of Punjab logo"
							class="h-16 w-16 object-contain"
						/>
					</div>
					<div>
						<p class="text-xs font-black tracking-[0.28em] text-secondary uppercase">
							Official Identity
						</p>
						<h2 class="mt-2 text-2xl font-black text-primary">
							Government of Punjab college with KFUEIT-affiliated BS programs.
						</h2>
					</div>
				</div>
			</div>

			<div class="grid gap-4 md:grid-cols-2">
				{#each facts as fact, index}
					<div
						class="motion-rise rounded-[1.5rem] border border-border-soft bg-white/90 p-5 shadow-[0_16px_40px_rgba(13,93,86,0.06)]"
						style={`animation-delay: ${index * 120}ms`}
					>
						<div
							class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white"
						>
							<fact.icon size={22} />
						</div>
						<h3 class="text-base font-black text-primary">{fact.title}</h3>
						<p class="mt-2 text-sm leading-7 font-medium text-primary/65">{fact.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
