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

<section class="py-32 bg-white relative overflow-hidden">
	<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-square bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>
	
	<div class="container mx-auto px-4 lg:px-8 relative z-10 text-center">
		<div class="max-w-2xl mx-auto space-y-8">
			<div class="w-24 h-24 bg-primary text-white rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-primary/20 rotate-12">
				<HardHat size={48} />
			</div>
			
			<div class="space-y-4">
				<h2 class="text-4xl md:text-5xl font-black text-primary tracking-tight">Coming Soon</h2>
				<p class="text-xl text-primary/70 font-medium">
					We are currently building a comprehensive and state-of-the-art Student Management System. 
				</p>
			</div>

			<div class="bg-neutral-soft p-8 rounded-3xl border border-border-soft inline-block max-w-md mx-auto text-left space-y-4 mt-8">
				<div class="flex items-center gap-3">
					<BellRing size={20} class="text-secondary" />
					<h3 class="text-lg font-black text-primary">What to expect:</h3>
				</div>
				<ul class="space-y-2 text-primary/70 font-medium">
					<li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-secondary rounded-full"></span> Real-time attendance tracking</li>
					<li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-secondary rounded-full"></span> Online fee voucher generation</li>
					<li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-secondary rounded-full"></span> Course registration and grading</li>
					<li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-secondary rounded-full"></span> Timetable and announcements</li>
				</ul>
			</div>

			<div class="pt-8">
				<a href="/" class="inline-block px-8 py-4 bg-primary text-white rounded-xl font-black shadow-xl shadow-primary/20 hover:scale-105 transition-all">
					Return to Homepage
				</a>
			</div>
		</div>
	</div>
</section>
