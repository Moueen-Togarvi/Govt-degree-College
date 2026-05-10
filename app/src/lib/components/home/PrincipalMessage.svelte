<script lang="ts">
	import { ArrowRight, Quote, ShieldCheck } from 'lucide-svelte';
</script>

<section class="relative overflow-hidden bg-white py-24">
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_left,_rgba(13,93,86,0.06),_transparent_40%)]"></div>

	<div class="container relative z-10 mx-auto px-4 lg:px-8">
		<div class="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
			<div class="relative">
				<div class="absolute -left-4 top-10 h-28 w-28 rounded-full bg-secondary/15 blur-3xl"></div>
				<div class="absolute -bottom-10 right-10 h-36 w-36 rounded-full bg-primary/10 blur-3xl"></div>

				<div class="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white p-3 shadow-[0_28px_80px_rgba(13,93,86,0.12)]">
					<img
						src="/images/logos/image%20copy%202.png"
						alt="Prof. Wajahat Majeed"
						loading="lazy"
						decoding="async"
						class="h-full w-full rounded-[1.5rem] object-cover"
					/>
				</div>

				<div class="absolute bottom-8 left-0 right-8 mx-auto max-w-xs rounded-[1.5rem] border border-white/20 bg-primary/90 px-6 py-5 text-white shadow-2xl shadow-primary/30 backdrop-blur">
					<div class="mb-3 flex items-center gap-2 text-secondary">
						<ShieldCheck size={18} />
						<span class="text-xs font-black uppercase tracking-[0.28em]">Accessible Learning</span>
					</div>
					<p class="text-lg font-black leading-7">Education from intermediate to BS level with a public-sector foundation.</p>
				</div>
			</div>

			<div class="space-y-8">
				<div class="space-y-4">
					<p class="text-sm font-black uppercase tracking-[0.35em] text-secondary">Principal's Message</p>
					<p class="max-w-2xl text-base font-medium leading-8 text-primary/65 lg:text-lg">
						Our mission is to keep quality education within reach for the students of Bahawalnagar, from free intermediate classes to guided BS pathways.
					</p>
				</div>

				<div class="relative overflow-hidden rounded-[2rem] border border-border-soft bg-neutral-soft/80 p-8 shadow-[0_20px_60px_rgba(13,93,86,0.08)]">
					<Quote size={42} class="mb-5 text-secondary/70" />
					<p class="text-lg font-medium leading-8 text-primary/80">
						It is a privilege to welcome students and families to Govt Post Graduate College Bahawalnagar. We are committed to an environment where ambition is supported by strong teaching, clear guidance, and public trust.
					</p>
					<p class="mt-5 text-base font-medium leading-8 text-primary/65">
						Our 11th and 12th classes open the door to free intermediate education, while our BS programs extend that journey through KFUEIT-affiliated study in both morning and evening shifts.
					</p>
				</div>

				<div class="pt-2">
					<h4 class="text-2xl font-black text-primary">Prof. Wajahat Majeed</h4>
					<p class="font-bold text-secondary">Principal, GPGC Bahawalnagar</p>
				</div>

				<a href="/about/administration" class="inline-flex items-center gap-3 font-black text-primary transition-all group hover:text-secondary">
					Read Full Biography
					<div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 transition-all group-hover:bg-secondary group-hover:text-white">
						<ArrowRight size={18} />
					</div>
				</a>
			</div>
		</div>
	</div>
</section>
