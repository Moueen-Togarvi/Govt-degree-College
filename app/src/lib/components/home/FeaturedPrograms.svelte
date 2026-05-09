<script lang="ts">
	import { ArrowRight, BadgeCheck, Clock3, GraduationCap, School2 } from 'lucide-svelte';

	const programs = [
		{
			title: '11th Class',
			tag: 'Free',
			tagStyle: 'bg-secondary/10 text-secondary border-secondary/20',
			description: 'Intermediate Part-I under the Government of Punjab with accessible, no-fee learning.',
			href: '/academics/11th',
			cta: 'View 11th Class',
			icon: School2
		},
		{
			title: '12th Class',
			tag: 'Free',
			tagStyle: 'bg-secondary/10 text-secondary border-secondary/20',
			description: 'Intermediate Part-II continues the same public-sector pathway with zero tuition burden.',
			href: '/academics/12th',
			cta: 'View 12th Class',
			icon: BadgeCheck
		},
		{
			title: 'BS Morning',
			tag: 'KFUEIT Affiliated',
			tagStyle: 'bg-primary/10 text-primary border-primary/15',
			description: 'Structured morning BS classes with university-linked academic direction and campus support.',
			href: '/academics/bs',
			cta: 'Explore BS Morning',
			icon: GraduationCap
		},
		{
			title: 'BS Evening',
			tag: 'KFUEIT Affiliated',
			tagStyle: 'bg-primary/10 text-primary border-primary/15',
			description: 'An evening BS option designed for flexibility while staying within the same affiliated framework.',
			href: '/academics/bs',
			cta: 'Explore BS Evening',
			icon: Clock3
		}
	];
</script>

<section class="relative overflow-hidden bg-neutral-soft py-24">
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(13,93,86,0.07),_transparent_36%)]"></div>

	<div class="container relative z-10 mx-auto px-4 lg:px-8">
		<div class="mx-auto mb-14 max-w-3xl text-center motion-rise">
			<p class="mb-4 text-sm font-black uppercase tracking-[0.35em] text-secondary">Featured Programs</p>
			<h2 class="text-4xl font-black text-primary lg:text-5xl">Clear paths for intermediate and BS students.</h2>
			<p class="mt-5 text-base font-medium leading-8 text-primary/65 lg:text-lg">
				Every card below matches the actual academic structure of the college, with free intermediate classes and KFUEIT-affiliated BS study.
			</p>
		</div>

		<div class="grid gap-6 lg:grid-cols-2 2xl:grid-cols-4">
			{#each programs as program, index}
				<div class="group relative overflow-hidden rounded-[2rem] border border-border-soft bg-white p-8 shadow-[0_24px_70px_rgba(13,93,86,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_28px_90px_rgba(13,93,86,0.12)] motion-rise" style={`animation-delay: ${index * 110}ms`}>
					<div class="absolute right-0 top-0 h-32 w-32 rounded-full bg-secondary/10 blur-3xl transition-transform duration-500 group-hover:scale-125"></div>

					<div class="relative flex h-full flex-col">
						<div class="mb-8 flex items-start justify-between gap-4">
							<div class="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-primary text-white motion-float">
								<program.icon size={30} />
							</div>
							<span class={`rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] ${program.tagStyle}`}>
								{program.tag}
							</span>
						</div>

						<h3 class="text-2xl font-black text-primary">{program.title}</h3>
						<p class="mt-4 flex-1 text-sm font-medium leading-7 text-primary/65">{program.description}</p>

						<a href={program.href} class="mt-8 inline-flex items-center gap-3 font-black text-primary transition-colors hover:text-secondary">
							{program.cta}
							<ArrowRight size={18} class="transition-transform group-hover:translate-x-1" />
						</a>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
