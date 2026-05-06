<script lang="ts">
	import { GraduationCap, Users, Library, Banknote, ArrowUpRight } from 'lucide-svelte';

	const links = [
		{
			title: "Scholarship Facility",
			desc: "We offer merit-based and government scholarships to support bright students.",
			icon: GraduationCap,
			color: "text-blue-600",
			bg: "bg-blue-50"
		},
		{
			title: "Skilled Lecturers",
			desc: "Our faculty consists of highly qualified professors dedicated to your success.",
			icon: Users,
			color: "text-teal-600",
			bg: "bg-teal-50"
		},
		{
			title: "Book Library Facility",
			desc: "Access thousands of books, journals, and digital resources in our central library.",
			icon: Library,
			color: "text-orange-600",
			bg: "bg-orange-50"
		},
		{
			title: "Affordable Education",
			desc: "High-quality government-standard education at the most affordable fee structure.",
			icon: Banknote,
			color: "text-purple-600",
			bg: "bg-purple-50"
		}
	];
</script>

<section class="py-24 bg-neutral-soft">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
			{#each links as link}
				<div class="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border-soft relative overflow-hidden">
					<!-- Hover Accent -->
					<div class="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150"></div>
					
					<div class="space-y-6 relative z-10">
						<div class="w-16 h-16 {link.bg} {link.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
							<link.icon size={32} />
						</div>
						
						<div class="space-y-3">
							<h3 class="text-xl font-black text-primary">{link.title}</h3>
							<p class="text-sm font-medium text-primary/60 leading-relaxed">
								{link.desc}
							</p>
						</div>

						<a href="/resources" class="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:text-secondary transition-colors">
							Learn More
							<ArrowUpRight size={14} />
						</a>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
