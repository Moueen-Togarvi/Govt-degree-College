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
		'mathematics': {
			name: 'Mathematics',
			icon: Lightbulb,
			desc: 'Fostering analytical thinking and problem-solving skills.',
			hod: 'Prof. Shakeel Ahmed',
			programs: ['BS Mathematics', 'FSc Pre-Engineering'],
			facilities: ['Dedicated Math Library', 'Research Seminar Room'],
			image: '/images/gallery/491999992_1166947772110194_8921941246071863873_n.jpg'
		},
		'english': {
			name: 'English',
			icon: PenTool,
			desc: 'Exploring literature and language to build global communicators.',
			hod: 'Prof. Sajjad Haider',
			programs: ['BS English', 'FA (General)'],
			facilities: ['Language Lab', 'Literary Society'],
			image: '/images/gallery/547755271_1299324492205854_5011253499358894922_n.jpg'
		},
		'islamiyat': {
			name: 'Islamiyat',
			icon: Users,
			desc: 'Imparting Islamic values and theological knowledge.',
			hod: 'Prof. Hafiz Muhammad Ali',
			programs: ['BS Islamiyat', 'Compulsory Islamiyat for all levels'],
			facilities: ['Islamic Research Center'],
			image: '/images/gallery/497498149_1184322940372677_5964474392879878424_n.jpg'
		},
		'urdu': {
			name: 'Urdu',
			icon: PenTool,
			desc: 'Promoting our national language and its rich literary heritage.',
			hod: 'Prof. Dr. Tahir Mahmood',
			programs: ['BS Urdu', 'Compulsory Urdu for all levels'],
			facilities: ['Urdu Literary Society'],
			image: '/images/gallery/474603631_1113700027116416_3753317337439731517_n.jpg'
		},
		'chemistry': {
			name: 'Chemistry',
			icon: Microscope,
			desc: 'Exploring the molecular world through advanced research.',
			hod: 'Prof. Muhammad Aslam',
			programs: ['BS Chemistry', 'FSc Pre-Medical/Pre-Engineering'],
			facilities: ['Fully Equipped Chemistry Lab', 'Chemical Storage'],
			image: '/images/gallery/488504405_1150873360384302_7113898617720777839_n.jpg'
		},
		'zoology': {
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
	<PageHero 
		title="Dept. of {dept.name}" 
		subtitle={dept.desc}
		{breadcrumbs}
		image={dept.image}
	/>

	<section class="py-24 bg-white">
		<div class="container mx-auto px-4 lg:px-8">
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-16">
				<!-- Main Content -->
				<div class="lg:col-span-2 space-y-12">
					<div class="space-y-6">
						<h2 class="text-3xl font-black text-primary border-l-8 border-secondary pl-6">About the Department</h2>
						<p class="text-lg text-primary/70 leading-relaxed">
							The Department of {dept.name} at Govt Post Graduate College Bahawalnagar is one of the most vibrant and academically rigorous departments. We are dedicated to excellence in teaching and providing students with the skills needed for their professional lives.
						</p>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div class="p-8 bg-neutral-soft rounded-3xl border border-border-soft space-y-6">
							<h3 class="text-xl font-black text-primary flex items-center gap-3">
								<BookOpen size={24} class="text-secondary" />
								Programs Offered
							</h3>
							<ul class="space-y-3">
								{#each dept.programs as prog}
									<li class="flex items-center gap-2 font-bold text-primary/70">
										<span class="w-1.5 h-1.5 bg-secondary rounded-full"></span>
										{prog}
									</li>
								{/each}
							</ul>
						</div>

						<div class="p-8 bg-neutral-soft rounded-3xl border border-border-soft space-y-6">
							<h3 class="text-xl font-black text-primary flex items-center gap-3">
								<Microscope size={24} class="text-secondary" />
								Key Facilities
							</h3>
							<ul class="space-y-3">
								{#each dept.facilities as facility}
									<li class="flex items-center gap-2 font-bold text-primary/70">
										<span class="w-1.5 h-1.5 bg-secondary rounded-full"></span>
										{facility}
									</li>
								{/each}
							</ul>
						</div>
					</div>
				</div>

				<!-- Sidebar -->
				<div class="space-y-8">
					<div class="p-8 bg-primary rounded-3xl text-white space-y-6">
						<h3 class="text-xl font-black italic">Head of Department</h3>
						<div class="flex items-center gap-4">
							<div class="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
								<Users2 size={32} class="text-secondary" />
							</div>
							<div>
								<p class="text-lg font-black">{dept.hod}</p>
								<p class="text-secondary text-xs font-bold uppercase tracking-widest">HOD, {dept.name}</p>
							</div>
						</div>
						<button class="w-full py-4 bg-secondary text-white rounded-xl font-black hover:scale-105 transition-all shadow-xl shadow-secondary/20">
							Contact HOD
						</button>
					</div>

					<div class="p-8 bg-neutral-soft rounded-3xl border border-border-soft space-y-6">
						<h3 class="text-xl font-black text-primary">Quick Links</h3>
						<div class="flex flex-col gap-3">
							<a href="/admissions/how-to-apply" class="text-sm font-bold text-primary/70 hover:text-secondary transition-colors">Admission Guide</a>
							<a href="/academics/syllabus" class="text-sm font-bold text-primary/70 hover:text-secondary transition-colors">Course Syllabus</a>
							<a href="/about/faculty" class="text-sm font-bold text-primary/70 hover:text-secondary transition-colors">Faculty Directory</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
{:else}
	<div class="min-h-screen flex items-center justify-center">
		<p class="text-2xl font-black text-primary">Department not found.</p>
	</div>
{/if}
