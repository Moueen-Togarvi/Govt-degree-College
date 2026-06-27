<script lang="ts">
	import { ArrowRight, BookOpen, Building2, GraduationCap, Users } from 'lucide-svelte';

	const highlights = [
		{
			title: 'Intermediate Pathway',
			description:
				'11th and 12th classes keep education accessible with a strong public-sector foundation.',
			icon: BookOpen
		},
		{
			title: 'BS Progression',
			description:
				'Students can continue into KFUEIT-affiliated BS study through morning and evening options.',
			icon: GraduationCap
		}
	];

	const supportPoints = [
		{
			title: 'Experienced Teaching Support',
			description: 'Teachers and lecturers guide students across core academic disciplines.',
			icon: Users
		},
		{
			title: 'Campus Learning Environment',
			description: 'Classrooms, laboratories, and library resources support everyday study needs.',
			icon: Building2
		}
	];
</script>

<section class="relative overflow-hidden bg-white py-24">
	<div
		class="absolute inset-0 bg-[linear-gradient(180deg,_rgba(13,93,86,0.02),_transparent_35%,_rgba(247,148,29,0.06))]"
	></div>

	<div class="relative z-10 container mx-auto px-4 lg:px-8">
		<div class="motion-rise mx-auto mb-14 max-w-3xl text-center">
			<p class="mb-4 text-sm font-black tracking-[0.35em] text-secondary uppercase">
				Student Support
			</p>
			<h2 class="text-4xl leading-tight font-black text-primary lg:text-5xl">
				A practical academic environment for students of Bahawalnagar.
			</h2>
			<p class="mt-5 text-base leading-8 font-medium text-primary/68 lg:text-lg">
				This college offers a clear study journey: start with intermediate classes, continue into BS
				programs, and learn in a campus environment built around access, guidance, and steady
				academic progress.
			</p>
		</div>

		<div class="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
			<div class="motion-slide space-y-6">
				<div class="grid gap-6 md:grid-cols-2">
					{#each highlights as item, index}
						<div
							class="group motion-rise relative overflow-hidden rounded-[2rem] border border-border-soft bg-neutral-soft/80 p-7 shadow-[0_18px_55px_rgba(13,93,86,0.08)] transition-transform duration-300 hover:-translate-y-1"
							style={`animation-delay: ${index * 120}ms`}
						>
							<div
								class="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-secondary/10 blur-2xl transition-transform duration-500 group-hover:scale-125"
							></div>
							<div class="relative">
								<div
									class="motion-float mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-white"
								>
									<item.icon size={24} />
								</div>
								<h3 class="text-2xl font-black text-primary">{item.title}</h3>
								<p class="mt-3 text-sm leading-7 font-medium text-primary/65">{item.description}</p>
							</div>
						</div>
					{/each}
				</div>

				<div
					class="motion-glow overflow-hidden rounded-[2rem] bg-primary px-7 py-8 text-white shadow-[0_28px_70px_rgba(13,93,86,0.25)]"
				>
					<p class="text-xs font-black tracking-[0.28em] text-secondary uppercase">Study Flow</p>
					<h3 class="mt-4 text-3xl leading-tight font-black">
						Begin with 11th and 12th, then move ahead into BS classes with structured timing and
						academic direction.
					</h3>
					<p class="mt-4 max-w-2xl text-base leading-8 font-medium text-white/78">
						The section now focuses less on slogans and more on what a student or family actually
						needs to understand before choosing the college.
					</p>
				</div>
			</div>

			<div class="motion-rise space-y-6">
				{#each supportPoints as point, index}
					<div
						class="motion-rise rounded-[2rem] border border-border-soft bg-white p-8 shadow-[0_20px_60px_rgba(13,93,86,0.08)] transition-transform duration-300 hover:-translate-y-1"
						style={`animation-delay: ${index * 120 + 120}ms`}
					>
						<div
							class="motion-float mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white"
						>
							<point.icon size={24} />
						</div>
						<h3 class="text-2xl font-black text-primary">{point.title}</h3>
						<p class="mt-3 text-sm leading-7 font-medium text-primary/65">{point.description}</p>
					</div>
				{/each}

				<div
					class="motion-rise rounded-[2rem] border border-secondary/20 bg-secondary/10 p-7 text-primary shadow-[0_18px_55px_rgba(247,148,29,0.08)]"
					style="animation-delay: 360ms"
				>
					<p class="text-xs font-black tracking-[0.28em] text-secondary uppercase">
						Need More Details
					</p>
					<p class="mt-3 text-2xl leading-9 font-black">
						Explore programs, admission guidance, and academic routes before applying.
					</p>
					<a
						href="/academics/programs"
						class="mt-6 inline-flex items-center gap-3 font-black text-primary transition-colors hover:text-secondary"
					>
						View Academic Programs
						<ArrowRight size={18} />
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
