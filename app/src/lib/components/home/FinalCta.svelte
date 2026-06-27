<script lang="ts">
	import { ArrowRight, PhoneCall } from 'lucide-svelte';
</script>

<section class="relative overflow-hidden bg-neutral-soft py-24">
	<div class="container mx-auto px-4 lg:px-8">
		<div
			class="motion-glow relative overflow-hidden rounded-[2.5rem] bg-primary px-6 py-12 text-white shadow-[0_30px_90px_rgba(13,93,86,0.26)] lg:px-12 lg:py-14"
		>
			<div
				class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(247,148,29,0.3),_transparent_32%)]"
			></div>
			<div
				class="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between"
			>
				<div class="motion-rise max-w-3xl">
					<p class="mb-4 text-sm font-black tracking-[0.35em] text-secondary uppercase">
						Ready To Apply
					</p>
					<h2 class="text-4xl leading-tight font-black lg:text-5xl">
						Begin your academic journey with GPGC Bahawalnagar.
					</h2>
					<p class="mt-5 text-base leading-8 font-medium text-white/78 lg:text-lg">
						Free intermediate education and KFUEIT-affiliated BS classes come together in one
						trusted Government of Punjab institution.
					</p>
				</div>

				<div class="flex flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row">
					<a
						href="/admissions/how-to-apply"
						class="inline-flex items-center justify-center gap-3 rounded-full bg-secondary px-7 py-4 font-black text-white transition-all hover:-translate-y-1 hover:bg-secondary/90"
					>
						Apply Now
						<ArrowRight size={18} />
					</a>
					<a
						href="/contact"
						class="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/8 px-7 py-4 font-black text-white backdrop-blur transition-all hover:-translate-y-1 hover:bg-white/12"
					>
						Contact College
						<PhoneCall size={18} />
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
