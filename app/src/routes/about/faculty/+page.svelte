<script lang="ts">
	import PageHero from '$lib/components/shared/PageHero.svelte';
	
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'About', href: '/about/overview' },
		{ label: 'Faculty', href: '/about/faculty' }
	];

	const departments = [
		{
			name: "Computer Science",
			staff: [
				{ name: "Prof. Muhammad Zahid", role: "HOD", qualification: "MS Computer Science" },
				{ name: "Dr. Ahmed Hassan", role: "Associate Professor", qualification: "PhD AI" }
			]
		},
		{
			name: "English",
			staff: [
				{ name: "Prof. Sajjad Haider", role: "HOD", qualification: "MA English Literature" },
				{ name: "Ms. Amna Bibi", role: "Lecturer", qualification: "M.Phil Linguistics" }
			]
		}
	];
</script>

<svelte:head>
	<title>Faculty | About Us | GPGC Bahawalnagar</title>
</svelte:head>

<PageHero 
	title="Our Faculty" 
	subtitle="Experienced educators committed to student success."
	{breadcrumbs}
	image="/images/gallery/474603631_1113700027116416_3753317337439731517_n.jpg"
/>

<section class="py-24 bg-white">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="space-y-20">
			{#each departments as dept}
				<div class="space-y-8">
					<h2 class="text-3xl font-black text-primary border-b-4 border-secondary pb-4 inline-block">{dept.name} Department</h2>
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{#each dept.staff as member}
							<div class="bg-neutral-soft p-8 rounded-3xl border border-border-soft hover:border-secondary hover:shadow-lg transition-all group">
								<div class="space-y-4">
									<div class="w-12 h-1 bg-secondary group-hover:w-24 transition-all duration-500"></div>
									<div class="space-y-1">
										<h3 class="text-xl font-black text-primary">{member.name}</h3>
										<p class="text-secondary font-bold text-sm uppercase tracking-wider">{member.role}</p>
									</div>
									<p class="text-primary/60 text-sm font-medium">{member.qualification}</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
