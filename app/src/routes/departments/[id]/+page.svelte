<script lang="ts">
	import { page } from '$app/stores';
	import PageHero from '$lib/components/shared/PageHero.svelte';
	import { Users, BookOpen, Microscope, Globe, PenTool, Lightbulb, Users2 } from 'lucide-svelte';

	const departments: Record<string, any> = {
		'computer-science': {
			name: 'Computer Science',
			icon: Globe,
			desc: 'Leading the digital revolution with cutting-edge IT education.',
			hod: 'Prof. Muhammad Zahid',
			programs: ['BS Computer Science', 'ICS (Physics/Stats)'],
			facilities: ['Modern Computer Labs', 'High-Speed Internet', 'Digital Library'],
			image: '/images/gallery/682757218_1491086206363014_2879876708562002240_n.jpg'
		},
		mathematics: {
			name: 'Mathematics',
			icon: Lightbulb,
			desc: 'Fostering analytical thinking and problem-solving skills.',
			hod: 'Prof. Shakeel Ahmed',
			programs: ['BS Mathematics', 'FSc Pre-Engineering'],
			facilities: ['Dedicated Math Library', 'Research Seminar Room'],
			image: '/images/gallery/491999992_1166947772110194_8921941246071863873_n.jpg'
		},
		english: {
			name: 'English',
			icon: PenTool,
			desc: 'Exploring literature and language to build global communicators.',
			hod: 'Prof. Sajjad Haider',
			programs: ['BS English', 'FA (General)'],
			facilities: ['Language Lab', 'Literary Society'],
			image: '/images/gallery/547755271_1299324492205854_5011253499358894922_n.jpg'
		},
		islamiyat: {
			name: 'Islamiyat',
			icon: Users,
			desc: 'Imparting Islamic values and theological knowledge.',
			hod: 'Prof. Hafiz Muhammad Ali',
			programs: ['BS Islamiyat', 'Compulsory Islamiyat for all levels'],
			facilities: ['Islamic Research Center'],
			image: '/images/gallery/497498149_1184322940372677_5964474392879878424_n.jpg'
		},
		urdu: {
			name: 'Urdu',
			icon: PenTool,
			desc: 'Promoting our national language and its rich literary heritage.',
			hod: 'Prof. Dr. Tahir Mahmood',
			programs: ['BS Urdu', 'Compulsory Urdu for all levels'],
			facilities: ['Urdu Literary Society'],
			image: '/images/gallery/474603631_1113700027116416_3753317337439731517_n.jpg'
		},
		chemistry: {
			name: 'Chemistry',
			icon: Microscope,
			desc: 'Exploring the molecular world through advanced research.',
			hod: 'Prof. Muhammad Aslam',
			programs: ['BS Chemistry', 'FSc Pre-Medical/Pre-Engineering'],
			facilities: ['Fully Equipped Chemistry Lab', 'Chemical Storage'],
			image: '/images/gallery/488504405_1150873360384302_7113898617720777839_n.jpg'
		},
		zoology: {
			name: 'Zoology',
			icon: Microscope,
			desc: 'Studying animal life and biological sciences.',
			hod: 'Prof. Dr. Nasir Abbas',
			programs: ['BS Zoology', 'FSc Pre-Medical'],
			facilities: ['Zoology Museum', 'Advanced Bio Lab'],
			image: '/images/gallery/488936577_1152937786844526_8441555087243500544_n.jpg'
		}
	};

	let deptId = $derived($page.params.id ?? '');
	let dept = $derived(departments[deptId as keyof typeof departments]);

	let breadcrumbs = $derived([
		{ label: 'Home', href: '/' },
		{ label: 'Departments', href: '/departments/computer-science' },
		{ label: dept?.name || 'Department', href: `/departments/${deptId}` }
	]);
</script>

<svelte:head>
	<title>{dept?.name || 'Department'} | GPGC Bahawalnagar</title>
</svelte:head>

{#if dept}
	<PageHero title="Dept. of {dept.name}" subtitle={dept.desc} {breadcrumbs} image={dept.image} />

	<section class="bg-white py-24">
		<div class="container mx-auto px-4 lg:px-8">
			<div class="grid grid-cols-1 gap-16 lg:grid-cols-3">
				<!-- Main Content -->
				<div class="space-y-12 lg:col-span-2">
					<div class="space-y-6">
						<h2 class="border-l-8 border-secondary pl-6 text-3xl font-black text-primary">
							About the Department
						</h2>
						<p class="text-lg leading-relaxed text-primary/70">
							The Department of {dept.name} at Govt Post Graduate College Bahawalnagar is one of the most
							vibrant and academically rigorous departments. We are dedicated to excellence in teaching
							and providing students with the skills needed for their professional lives.
						</p>
					</div>

					<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
						<div class="space-y-6 rounded-3xl border border-border-soft bg-neutral-soft p-8">
							<h3 class="flex items-center gap-3 text-xl font-black text-primary">
								<BookOpen size={24} class="text-secondary" />
								Programs Offered
							</h3>
							<ul class="space-y-3">
								{#each dept.programs as prog}
									<li class="flex items-center gap-2 font-bold text-primary/70">
										<span class="h-1.5 w-1.5 rounded-full bg-secondary"></span>
										{prog}
									</li>
								{/each}
							</ul>
						</div>

						<div class="space-y-6 rounded-3xl border border-border-soft bg-neutral-soft p-8">
							<h3 class="flex items-center gap-3 text-xl font-black text-primary">
								<Microscope size={24} class="text-secondary" />
								Key Facilities
							</h3>
							<ul class="space-y-3">
								{#each dept.facilities as facility}
									<li class="flex items-center gap-2 font-bold text-primary/70">
										<span class="h-1.5 w-1.5 rounded-full bg-secondary"></span>
										{facility}
									</li>
								{/each}
							</ul>
						</div>
					</div>
				</div>

				<!-- Sidebar -->
				<div class="space-y-8">
					<div class="space-y-6 rounded-3xl bg-primary p-8 text-white">
						<h3 class="text-xl font-black italic">Head of Department</h3>
						<div class="flex items-center gap-4">
							<div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
								<Users2 size={32} class="text-secondary" />
							</div>
							<div>
								<p class="text-lg font-black">{dept.hod}</p>
								<p class="text-xs font-bold tracking-widest text-secondary uppercase">
									HOD, {dept.name}
								</p>
							</div>
						</div>
						<button
							class="w-full rounded-xl bg-secondary py-4 font-black text-white shadow-xl shadow-secondary/20 transition-all hover:scale-105"
						>
							Contact HOD
						</button>
					</div>

					<div class="space-y-6 rounded-3xl border border-border-soft bg-neutral-soft p-8">
						<h3 class="text-xl font-black text-primary">Quick Links</h3>
						<div class="flex flex-col gap-3">
							<a
								href="/admissions/how-to-apply"
								class="text-sm font-bold text-primary/70 transition-colors hover:text-secondary"
								>Admission Guide</a
							>
							<a
								href="/academics/syllabus"
								class="text-sm font-bold text-primary/70 transition-colors hover:text-secondary"
								>Course Syllabus</a
							>
							<a
								href="/about/faculty"
								class="text-sm font-bold text-primary/70 transition-colors hover:text-secondary"
								>Faculty Directory</a
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
{:else}
	<div class="flex min-h-screen items-center justify-center">
		<p class="text-2xl font-black text-primary">Department not found.</p>
	</div>
{/if}
