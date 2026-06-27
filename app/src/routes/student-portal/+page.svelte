<script lang="ts">
	import PageHero from '$lib/components/shared/PageHero.svelte';
	import { HardHat, BellRing } from 'lucide-svelte';

	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Student Portal', href: '/student-portal' }
	];
</script>

<svelte:head>
	<title>Student Portal | GPGC Bahawalnagar</title>
</svelte:head>

<PageHero
	title="Student Portal"
	subtitle="The digital gateway for students."
	{breadcrumbs}
	image="/images/gallery/489370014_1155981606540144_7733475266851659714_n.jpg"
/>

<section class="relative overflow-hidden bg-white py-32">
	<div
		class="pointer-events-none absolute top-1/2 left-1/2 aspect-square w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/5 blur-3xl"
	></div>

	<div class="relative z-10 container mx-auto px-4 text-center lg:px-8">
		<div class="mx-auto max-w-2xl space-y-8">
			<div
				class="mx-auto flex h-24 w-24 rotate-12 items-center justify-center rounded-3xl bg-primary text-white shadow-2xl shadow-primary/20"
			>
				<HardHat size={48} />
			</div>

			<div class="space-y-4">
				<h2 class="text-4xl font-black tracking-tight text-primary md:text-5xl">Coming Soon</h2>
				<p class="text-xl font-medium text-primary/70">
					We are currently building a comprehensive and state-of-the-art Student Management System.
				</p>
			</div>

			<div
				class="mx-auto mt-8 inline-block max-w-md space-y-4 rounded-3xl border border-border-soft bg-neutral-soft p-8 text-left"
			>
				<div class="flex items-center gap-3">
					<BellRing size={20} class="text-secondary" />
					<h3 class="text-lg font-black text-primary">What to expect:</h3>
				</div>
				<ul class="space-y-2 font-medium text-primary/70">
					<li class="flex items-center gap-2">
						<span class="h-1.5 w-1.5 rounded-full bg-secondary"></span> Real-time attendance tracking
					</li>
					<li class="flex items-center gap-2">
						<span class="h-1.5 w-1.5 rounded-full bg-secondary"></span> Online fee voucher generation
					</li>
					<li class="flex items-center gap-2">
						<span class="h-1.5 w-1.5 rounded-full bg-secondary"></span> Course registration and grading
					</li>
					<li class="flex items-center gap-2">
						<span class="h-1.5 w-1.5 rounded-full bg-secondary"></span> Timetable and announcements
					</li>
				</ul>
			</div>

			<div class="pt-8">
				<a
					href="/"
					class="inline-block rounded-xl bg-primary px-8 py-4 font-black text-white shadow-xl shadow-primary/20 transition-all hover:scale-105"
				>
					Return to Homepage
				</a>
			</div>
		</div>
	</div>
</section>
