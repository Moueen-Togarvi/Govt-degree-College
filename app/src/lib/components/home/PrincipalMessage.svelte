<script lang="ts">
	import { ArrowRight, Quote, ShieldCheck } from 'lucide-svelte';
</script>

<section class="relative overflow-hidden bg-white py-18 lg:py-24">
	<div
		class="absolute inset-0 bg-[radial-gradient(circle_at_left,_rgba(13,93,86,0.06),_transparent_40%)]"
	></div>

	<div class="relative z-10 container mx-auto px-4 lg:px-8">
		<div class="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
			<div class="relative mx-auto w-full max-w-md lg:max-w-none">
				<div class="absolute top-10 -left-4 h-28 w-28 rounded-full bg-secondary/15 blur-3xl"></div>
				<div
					class="absolute right-10 -bottom-10 h-36 w-36 rounded-full bg-primary/10 blur-3xl"
				></div>

				<div
					class="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white p-3 shadow-[0_28px_80px_rgba(13,93,86,0.12)]"
				>
					<img
						src="/images/logos/image%20copy%202.png"
						alt="Prof. Wajahat Majeed"
						loading="lazy"
						decoding="async"
						class="h-full w-full rounded-[1.5rem] object-cover"
					/>
				</div>

				<div
					class="absolute inset-x-4 bottom-4 mx-auto max-w-[calc(100%-2rem)] rounded-[1.5rem] border border-white/20 bg-primary/90 px-5 py-4 text-center text-white shadow-2xl shadow-primary/30 backdrop-blur sm:right-8 sm:bottom-8 sm:left-0 sm:max-w-xs sm:px-6 sm:py-5 sm:text-left"
				>
					<div class="mb-3 flex items-center justify-center gap-2 text-secondary sm:justify-start">
						<ShieldCheck size={18} />
						<span class="text-xs font-black tracking-[0.28em] uppercase">Accessible Learning</span>
					</div>
					<p class="text-base leading-7 font-black sm:text-lg">
						Education from intermediate to BS level with a public-sector foundation.
					</p>
				</div>
			</div>

			<div class="space-y-8 text-center lg:text-left">
				<div class="space-y-4">
					<p class="text-sm font-black tracking-[0.35em] text-secondary uppercase">
						Principal's Message
					</p>
					<p
						class="mx-auto max-w-2xl text-base leading-8 font-medium text-primary/65 lg:mx-0 lg:text-lg"
					>
						Our mission is to keep quality education within reach for the students of Bahawalnagar,
						from free intermediate classes to guided BS pathways.
					</p>
				</div>

				<div
					class="relative overflow-hidden rounded-[2rem] border border-border-soft bg-neutral-soft/80 p-6 shadow-[0_20px_60px_rgba(13,93,86,0.08)] sm:p-8"
				>
					<Quote size={42} class="mx-auto mb-5 text-secondary/70 lg:mx-0" />
					<p class="text-lg leading-8 font-medium text-primary/80">
						It is a privilege to welcome students and families to Govt Post Graduate College
						Bahawalnagar. We are committed to an environment where ambition is supported by strong
						teaching, clear guidance, and public trust.
					</p>
					<p class="mt-5 text-base leading-8 font-medium text-primary/65">
						Our 11th and 12th classes open the door to free intermediate education, while our BS
						programs extend that journey through KFUEIT-affiliated study in both morning and evening
						shifts.
					</p>
				</div>

				<div class="pt-2">
					<h4 class="text-2xl font-black text-primary">Prof. Wajahat Majeed</h4>
					<p class="font-bold text-secondary">Principal, GPGC Bahawalnagar</p>
				</div>

				<a
					href="/about/administration"
					class="group inline-flex items-center justify-center gap-3 font-black text-primary transition-all hover:text-secondary lg:justify-start"
				>
					Read Full Biography
					<div
						class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 transition-all group-hover:bg-secondary group-hover:text-white"
					>
						<ArrowRight size={18} />
					</div>
				</a>
			</div>
		</div>
	</div>
</section>
