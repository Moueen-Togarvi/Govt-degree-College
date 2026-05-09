<script lang="ts">
	import PageHero from '$lib/components/shared/PageHero.svelte';
	
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'About', href: '/about/overview' },
		{ label: 'Faculty', href: '/about/faculty' }
	];

	const departments = [
		{
			id: 'computer-science',
			name: "Computer Science",
			urduName: "کمپیوٹر سائنس",
			coordinator: {
				name: "Dr. Ahmed Hassan",
				urduName: "ڈاکٹر احمد حسن",
				role: "Department Coordinator",
				urduRole: "ڈیپارٹمنٹ کوآرڈینیٹر",
				qualification: "PhD AI",
				urduQualification: "پی ایچ ڈی آرٹیفیشل انٹیلیجنس",
				photo: "/images/gallery/474603631_1113700027116416_3753317337439731517_n.jpg"
			},
			staff: [
				{
					name: "Prof. Muhammad Zahid",
					urduName: "پروفیسر محمد زاہد",
					role: "HOD",
					urduRole: "شعبہ سربراہ",
					qualification: "MS Computer Science",
					urduQualification: "ایم ایس کمپیوٹر سائنس",
					photo: "/images/gallery/488504405_1150873360384302_7113898617720777839_n.jpg"
				},
				{
					name: "Dr. Ahmed Hassan",
					urduName: "ڈاکٹر احمد حسن",
					role: "Associate Professor",
					urduRole: "ایسوسی ایٹ پروفیسر",
					qualification: "PhD AI",
					urduQualification: "پی ایچ ڈی آرٹیفیشل انٹیلیجنس",
					photo: "/images/gallery/474603631_1113700027116416_3753317337439731517_n.jpg"
				}
			]
		},
		{
			id: 'english',
			name: "English",
			urduName: "انگلش",
			coordinator: {
				name: "Ms. Amna Bibi",
				urduName: "مس آمنہ بی بی",
				role: "Department Coordinator",
				urduRole: "ڈیپارٹمنٹ کوآرڈینیٹر",
				qualification: "M.Phil Linguistics",
				urduQualification: "ایم فل لسانیات",
				photo: "/images/gallery/491999992_1166947772110194_8921941246071863873_n.jpg"
			},
			staff: [
				{
					name: "Prof. Sajjad Haider",
					urduName: "پروفیسر سجاد حیدر",
					role: "HOD",
					urduRole: "شعبہ سربراہ",
					qualification: "MA English Literature",
					urduQualification: "ایم اے انگلش لٹریچر",
					photo: "/images/gallery/497498149_1184322940372677_5964474392879878424_n.jpg"
				},
				{
					name: "Ms. Amna Bibi",
					urduName: "مس آمنہ بی بی",
					role: "Lecturer",
					urduRole: "لیکچرار",
					qualification: "M.Phil Linguistics",
					urduQualification: "ایم فل لسانیات",
					photo: "/images/gallery/491999992_1166947772110194_8921941246071863873_n.jpg"
				}
			]
		},
		{
			id: 'urdu',
			name: "Urdu",
			urduName: "اردو",
			coordinator: {
				name: "Ms. Naila Ashraf",
				urduName: "مس نائلہ اشرف",
				role: "Department Coordinator",
				urduRole: "ڈیپارٹمنٹ کوآرڈینیٹر",
				qualification: "M.Phil Urdu",
				urduQualification: "ایم فل اردو",
				photo: "/images/gallery/488936577_1152937786844526_8441555087243500544_n.jpg"
			},
			staff: [
				{
					name: "Prof. Khalid Mahmood",
					urduName: "پروفیسر خالد محمود",
					role: "HOD",
					urduRole: "شعبہ سربراہ",
					qualification: "MA Urdu",
					urduQualification: "ایم اے اردو",
					photo: "/images/gallery/547755271_1299324492205854_5011253499358894922_n.jpg"
				},
				{
					name: "Ms. Naila Ashraf",
					urduName: "مس نائلہ اشرف",
					role: "Lecturer",
					urduRole: "لیکچرار",
					qualification: "M.Phil Urdu",
					urduQualification: "ایم فل اردو",
					photo: "/images/gallery/488936577_1152937786844526_8441555087243500544_n.jpg"
				}
			]
		}
	];

	type Language = 'english' | 'urdu';

	let activeDepartment = $state<string>('all');
	let activeLanguage = $state<Language>('english');

	const visibleDepartments = $derived(
		activeDepartment === 'all'
			? departments
			: departments.filter((department) => department.id === activeDepartment)
	);

	function getDepartmentHead(department: (typeof departments)[number]) {
		return department.staff.find((member) => member.role === 'HOD') ?? department.staff[0];
	}
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
		<div class="space-y-12">
			<div class="rounded-[2rem] border border-border-soft bg-neutral-soft/70 p-6 lg:p-8">
				<div class="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
					<div>
						<p class="text-sm font-black uppercase tracking-[0.32em] text-secondary">Faculty Search</p>
						<h2 class="mt-3 text-3xl font-black text-primary lg:text-4xl">Select a department and language.</h2>
					</div>

					<div class="inline-flex rounded-full border border-border-soft bg-white p-1 shadow-sm">
						<button
							type="button"
							class={`rounded-full px-5 py-3 text-sm font-black uppercase tracking-[0.18em] transition ${
								activeLanguage === 'english'
									? 'bg-primary text-white'
									: 'text-primary/60 hover:text-primary'
							}`}
							onclick={() => (activeLanguage = 'english')}
						>
							English
						</button>
						<button
							type="button"
							class={`rounded-full px-5 py-3 text-sm font-black uppercase tracking-[0.18em] transition ${
								activeLanguage === 'urdu'
									? 'bg-primary text-white'
									: 'text-primary/60 hover:text-primary'
							}`}
							onclick={() => (activeLanguage = 'urdu')}
						>
							Urdu
						</button>
					</div>
				</div>

				<div class="mt-8 flex flex-wrap gap-3">
					<button
						type="button"
						class={`rounded-full border px-5 py-3 text-sm font-black transition ${
							activeDepartment === 'all'
								? 'border-primary bg-primary text-white'
								: 'border-border-soft bg-white text-primary hover:border-secondary hover:text-secondary'
						}`}
						onclick={() => (activeDepartment = 'all')}
					>
						# All Departments
					</button>
					{#each departments as department}
						<button
							type="button"
							class={`rounded-full border px-5 py-3 text-sm font-black transition ${
								activeDepartment === department.id
									? 'border-primary bg-primary text-white'
									: 'border-border-soft bg-white text-primary hover:border-secondary hover:text-secondary'
							}`}
							onclick={() => (activeDepartment = department.id)}
						>
							# {activeLanguage === 'english' ? department.name : department.urduName}
						</button>
					{/each}
				</div>
			</div>

			{#each visibleDepartments as dept}
				<div class="space-y-8">
					<h2 class="inline-block border-b-4 border-secondary pb-4 text-3xl font-black text-primary">
						{activeLanguage === 'english' ? `${dept.name} Department` : `${dept.urduName} ڈیپارٹمنٹ`}
					</h2>
					<div class="grid gap-6 md:grid-cols-2">
						<div class="rounded-[2rem] border border-secondary/20 bg-secondary/5 p-6 text-center shadow-sm">
							<div class="mx-auto h-36 w-36 overflow-hidden rounded-[1.75rem] border border-white/80 shadow-md">
								<img
									src={getDepartmentHead(dept).photo}
									alt={activeLanguage === 'english' ? getDepartmentHead(dept).name : getDepartmentHead(dept).urduName}
									class="h-full w-full object-cover"
								/>
							</div>
							<div class="mt-5">
								<p class="text-xs font-black uppercase tracking-[0.25em] text-secondary">
									{activeLanguage === 'english' ? 'HOD' : 'شعبہ سربراہ'}
								</p>
								<h3 class="mt-3 text-xl font-black text-primary">
									{activeLanguage === 'english' ? getDepartmentHead(dept).name : getDepartmentHead(dept).urduName}
								</h3>
								<p class="mt-2 text-sm font-semibold text-primary/70">
									{activeLanguage === 'english'
										? getDepartmentHead(dept).qualification
										: getDepartmentHead(dept).urduQualification}
								</p>
							</div>
						</div>

						<div class="rounded-[2rem] border border-primary/10 bg-primary/[0.03] p-6 text-center shadow-sm">
							<div class="mx-auto h-36 w-36 overflow-hidden rounded-[1.75rem] border border-white/80 shadow-md">
								<img
									src={dept.coordinator.photo}
									alt={activeLanguage === 'english' ? dept.coordinator.name : dept.coordinator.urduName}
									class="h-full w-full object-cover"
								/>
							</div>
							<div class="mt-5">
								<p class="text-xs font-black uppercase tracking-[0.25em] text-secondary">
									{activeLanguage === 'english' ? 'Coordinator' : 'کوآرڈینیٹر'}
								</p>
								<h3 class="mt-3 text-xl font-black text-primary">
									{activeLanguage === 'english' ? dept.coordinator.name : dept.coordinator.urduName}
								</h3>
								<p class="mt-2 text-sm font-semibold text-primary/70">
									{activeLanguage === 'english'
										? dept.coordinator.qualification
										: dept.coordinator.urduQualification}
								</p>
							</div>
						</div>
					</div>
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{#each dept.staff as member}
							<div class="bg-neutral-soft p-8 rounded-3xl border border-border-soft hover:border-secondary hover:shadow-lg transition-all group">
								<div class="space-y-5">
									<div class="h-44 overflow-hidden rounded-2xl">
										<img
											src={member.photo}
											alt={activeLanguage === 'english' ? member.name : member.urduName}
											class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
										/>
									</div>
									<div class="w-12 h-1 bg-secondary group-hover:w-24 transition-all duration-500"></div>
									<div class="space-y-1">
										<h3 class="text-xl font-black text-primary">
											{activeLanguage === 'english' ? member.name : member.urduName}
										</h3>
										<p class="text-secondary font-bold text-sm uppercase tracking-wider">
											{activeLanguage === 'english' ? member.role : member.urduRole}
										</p>
									</div>
									<p class="text-primary/60 text-sm font-medium">
										{activeLanguage === 'english'
											? member.qualification
											: member.urduQualification}
									</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
