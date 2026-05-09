<script lang="ts">
	import PageHero from '$lib/components/shared/PageHero.svelte';
	import type { FacultyDirectoryDepartment, FacultyDirectoryMember } from '$lib/types/faculty';

	let { data } = $props();
	
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'About', href: '/about/overview' },
		{ label: 'Faculty', href: '/about/faculty' }
	];
	const departments = $derived(data.departments as FacultyDirectoryDepartment[]);

	type Language = 'english' | 'urdu';

	let activeDepartment = $state<string>('all');
	let activeLanguage = $state<Language>('english');

	const visibleDepartments = $derived(
		activeDepartment === 'all'
			? departments
			: departments.filter((department) => department.id === activeDepartment)
	);

	function getDepartmentHead(department: FacultyDirectoryDepartment): FacultyDirectoryMember | null {
		return department.staff.find((member) => member.isHod) ?? null;
	}

	function getDepartmentCoordinator(department: FacultyDirectoryDepartment): FacultyDirectoryMember | null {
		return department.coordinator ?? department.staff.find((member) => member.isCoordinator) ?? null;
	}

	function getDepartmentFaculty(department: FacultyDirectoryDepartment) {
		const head = getDepartmentHead(department);
		const coordinator = getDepartmentCoordinator(department);

		return department.staff.filter(
			(member) =>
				member.id !== head?.id &&
				member.id !== coordinator?.id &&
				member.isTeachingStaff
		);
	}

	function getDepartmentLeadRoleCount(department: FacultyDirectoryDepartment) {
		const ids = new Set<number>();
		const head = getDepartmentHead(department);
		const coordinator = getDepartmentCoordinator(department);
		if (head) ids.add(head.id);
		if (coordinator) ids.add(coordinator.id);
		return ids.size;
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

<section class="bg-white py-24">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="space-y-14">
			<div class="overflow-hidden rounded-[2.25rem] border border-primary/10 bg-[linear-gradient(145deg,rgba(248,249,250,0.96),rgba(255,255,255,1))] p-6 shadow-[0_24px_80px_rgba(13,93,86,0.08)] lg:p-8">
				<div class="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
					<div>
						<p class="text-sm font-black uppercase tracking-[0.32em] text-secondary">Faculty Search</p>
						<h2 class="mt-3 max-w-3xl text-3xl font-black text-primary lg:text-4xl">
							Explore departments through a cleaner, premium faculty directory.
						</h2>
						<p class="mt-4 max-w-2xl text-base leading-8 text-primary/65">
							Choose a department, switch language, and view department leadership and faculty in a more structured layout.
						</p>
					</div>

					<div class="inline-flex rounded-full border border-primary/10 bg-white p-1.5 shadow-sm">
						<button
							type="button"
							class={`rounded-full px-5 py-3 text-sm font-black uppercase tracking-[0.18em] transition ${
								activeLanguage === 'english'
									? 'bg-primary text-white shadow-lg shadow-primary/20'
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
									? 'bg-primary text-white shadow-lg shadow-primary/20'
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
								? 'border-primary bg-primary text-white shadow-lg shadow-primary/20'
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
									? 'border-primary bg-primary text-white shadow-lg shadow-primary/20'
									: 'border-border-soft bg-white text-primary hover:border-secondary hover:text-secondary'
							}`}
							onclick={() => (activeDepartment = department.id)}
						>
							# {activeLanguage === 'english' ? department.name : department.urduName}
						</button>
					{/each}
				</div>
			</div>

			{#if visibleDepartments.length === 0}
				<div class="rounded-[2.5rem] border border-dashed border-primary/20 bg-neutral-soft/70 p-10 text-center text-primary/55">
					<p class="text-sm font-black uppercase tracking-[0.3em] text-secondary">
						{activeLanguage === 'english' ? 'Faculty Directory' : 'فیکلٹی ڈائریکٹری'}
					</p>
					<p class="mt-4 text-base font-semibold">
						{activeLanguage === 'english'
							? 'Departments and teachers added from admin will appear here.'
							: 'ایڈمن سے شامل کیے گئے شعبے اور اساتذہ یہاں ظاہر ہوں گے۔'}
					</p>
				</div>
			{/if}

			{#each visibleDepartments as dept}
				{@const head = getDepartmentHead(dept)}
				{@const coordinator = getDepartmentCoordinator(dept)}
				<div class="overflow-hidden rounded-[2.5rem] border border-primary/10 bg-[linear-gradient(150deg,rgba(255,255,255,1),rgba(248,249,250,0.94))] p-6 shadow-[0_28px_90px_rgba(13,93,86,0.08)] lg:p-8">
					<div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
						<div>
							<p class="text-sm font-black uppercase tracking-[0.3em] text-secondary">
								{activeLanguage === 'english' ? 'Academic Department' : 'تعلیمی شعبہ'}
							</p>
							<h2 class="mt-3 text-3xl font-black text-primary lg:text-4xl">
								{activeLanguage === 'english' ? `${dept.name} Department` : `${dept.urduName} ڈیپارٹمنٹ`}
							</h2>
						</div>
						<div class="inline-flex w-fit rounded-full border border-primary/10 bg-white/80 px-5 py-3 text-sm font-black uppercase tracking-[0.22em] text-primary/65 shadow-sm">
							{activeLanguage === 'english' ? 'Leadership & Faculty' : 'قیادت اور فیکلٹی'}
						</div>
					</div>

					<div class="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
						<div class="grid gap-6 md:grid-cols-2">
							<div class="relative overflow-hidden rounded-[2.25rem] border border-secondary/20 bg-[linear-gradient(145deg,rgba(247,148,29,0.10),rgba(255,255,255,1))] p-6 shadow-[0_24px_70px_rgba(247,148,29,0.10)]">
								<div class="absolute right-0 top-0 h-28 w-28 rounded-full bg-secondary/10 blur-3xl"></div>
								<div class="relative space-y-5">
									<div class="inline-flex rounded-full border border-secondary/20 bg-white/85 px-4 py-2 text-[11px] font-black uppercase tracking-[0.28em] text-secondary shadow-sm">
										{activeLanguage === 'english' ? 'Head of Department' : 'شعبہ سربراہ'}
									</div>
									<div class="overflow-hidden rounded-[1.8rem] border border-white/80 bg-[linear-gradient(180deg,rgba(233,245,255,0.95),rgba(255,255,255,1))] shadow-lg">
										{#if head}
											<img
												src={head.photo}
												alt={activeLanguage === 'english' ? head.name : head.urduName}
												class="h-72 w-full object-contain object-center p-3"
											/>
										{:else}
											<div class="flex h-72 items-center justify-center bg-neutral-soft text-center text-sm font-bold text-primary/45">
												{activeLanguage === 'english' ? 'HOD will be added soon' : 'HOD جلد شامل کیا جائے گا'}
											</div>
										{/if}
									</div>
									<div class="space-y-2">
										<h3 class="text-2xl font-black text-primary">
											{head
												? activeLanguage === 'english'
													? head.name
													: head.urduName
												: activeLanguage === 'english'
													? 'Pending Assignment'
													: 'جلد مقرر ہوگا'}
										</h3>
										<p class="text-sm font-black uppercase tracking-[0.2em] text-primary/45">
											{activeLanguage === 'english' ? 'Department Leadership' : 'شعبہ قیادت'}
										</p>
										<p class="text-base font-semibold leading-7 text-primary/70">
											{head
												? activeLanguage === 'english'
													? head.qualification
													: head.urduQualification
												: activeLanguage === 'english'
													? 'Add a teacher in admin and mark them as HOD.'
													: 'ایڈمن میں استاد شامل کر کے انہیں HOD مارک کریں۔'}
										</p>
									</div>
								</div>
							</div>

							<div class="relative overflow-hidden rounded-[2.25rem] border border-primary/10 bg-[linear-gradient(145deg,rgba(13,93,86,0.06),rgba(255,255,255,1))] p-6 shadow-[0_24px_70px_rgba(13,93,86,0.10)]">
								<div class="absolute bottom-0 left-0 h-28 w-28 rounded-full bg-primary/10 blur-3xl"></div>
								<div class="relative space-y-5">
									<div class="inline-flex rounded-full border border-primary/10 bg-white/85 px-4 py-2 text-[11px] font-black uppercase tracking-[0.28em] text-secondary shadow-sm">
										{activeLanguage === 'english' ? 'Department Coordinator' : 'ڈیپارٹمنٹ کوآرڈینیٹر'}
									</div>
									<div class="overflow-hidden rounded-[1.8rem] border border-white/80 bg-[linear-gradient(180deg,rgba(233,245,255,0.95),rgba(255,255,255,1))] shadow-lg">
										{#if coordinator}
											<img
												src={coordinator.photo}
												alt={activeLanguage === 'english' ? coordinator.name : coordinator.urduName}
												class="h-72 w-full object-contain object-center p-3"
											/>
										{:else}
											<div class="flex h-72 items-center justify-center bg-neutral-soft text-center text-sm font-bold text-primary/45">
												{activeLanguage === 'english'
													? 'Coordinator will be added soon'
													: 'Coordinator جلد شامل کیا جائے گا'}
											</div>
										{/if}
									</div>
									<div class="space-y-2">
										<h3 class="text-2xl font-black text-primary">
											{coordinator
												? activeLanguage === 'english'
													? coordinator.name
													: coordinator.urduName
												: activeLanguage === 'english'
													? 'Pending Assignment'
													: 'جلد مقرر ہوگا'}
										</h3>
										<p class="text-sm font-black uppercase tracking-[0.2em] text-primary/45">
											{activeLanguage === 'english' ? 'Academic Coordination' : 'تعلیمی کوآرڈینیشن'}
										</p>
										<p class="text-base font-semibold leading-7 text-primary/70">
											{coordinator
												? activeLanguage === 'english'
													? coordinator.qualification
													: coordinator.urduQualification
												: activeLanguage === 'english'
													? 'Add a teacher in admin and mark them as coordinator.'
													: 'ایڈمن میں استاد شامل کر کے انہیں coordinator مارک کریں۔'}
										</p>
									</div>
								</div>
							</div>
						</div>

						<div class="rounded-[2.25rem] border border-primary/10 bg-primary px-6 py-7 text-white shadow-[0_24px_70px_rgba(13,93,86,0.20)]">
							<p class="text-sm font-black uppercase tracking-[0.3em] text-secondary">
								{activeLanguage === 'english' ? 'Department Snapshot' : 'شعبہ جائزہ'}
							</p>
							<h3 class="mt-4 text-3xl font-black">
								{activeLanguage === 'english' ? dept.name : dept.urduName}
							</h3>
							<p class="mt-4 text-base leading-8 text-white/72">
								{activeLanguage === 'english'
									? 'Faculty listings are arranged to highlight departmental leadership first, followed by teaching staff in a cleaner, easier-to-scan presentation.'
									: 'فیکلٹی لسٹنگ کو اس انداز میں ترتیب دیا گیا ہے کہ پہلے شعبہ جاتی قیادت نمایاں ہو اور پھر تدریسی عملہ ایک صاف اور بہتر انداز میں دکھائی دے۔'}
							</p>
							<div class="mt-8 grid grid-cols-2 gap-4">
								<div class="rounded-[1.4rem] border border-white/10 bg-white/8 p-4">
									<p class="text-[11px] font-black uppercase tracking-[0.24em] text-secondary">
										{activeLanguage === 'english' ? 'Faculty Members' : 'فیکلٹی ممبران'}
									</p>
									<p class="mt-3 text-3xl font-black">{dept.staff.length}</p>
								</div>
								<div class="rounded-[1.4rem] border border-white/10 bg-white/8 p-4">
									<p class="text-[11px] font-black uppercase tracking-[0.24em] text-secondary">
										{activeLanguage === 'english' ? 'Lead Roles' : 'اہم عہدے'}
									</p>
									<p class="mt-3 text-3xl font-black">{getDepartmentLeadRoleCount(dept)}</p>
								</div>
							</div>
						</div>
					</div>

					<div class="mt-10 flex items-center justify-between gap-4">
						<div>
							<p class="text-sm font-black uppercase tracking-[0.3em] text-secondary">
								{activeLanguage === 'english' ? 'Faculty Grid' : 'فیکلٹی گرڈ'}
							</p>
							<h3 class="mt-3 text-2xl font-black text-primary">
								{activeLanguage === 'english' ? 'Teaching Team' : 'تدریسی ٹیم'}
							</h3>
						</div>
						<div class="hidden h-px flex-1 bg-gradient-to-r from-secondary/50 to-transparent lg:block"></div>
					</div>

					<div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
						{#each getDepartmentFaculty(dept) as member}
							<div class="group relative aspect-square overflow-hidden rounded-[2rem] border border-primary/10 bg-white shadow-[0_18px_45px_rgba(13,93,86,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(13,93,86,0.14)]">
								<img
									src={member.photo}
									alt={activeLanguage === 'english' ? member.name : member.urduName}
									class="absolute inset-0 h-full w-full object-cover object-[center_18%] transition-transform duration-500 group-hover:scale-[1.03]"
								/>
								<div class="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/94 to-transparent"></div>
								<div class="absolute inset-x-0 bottom-0 p-5">
									<div class="inline-flex rounded-full bg-secondary/12 px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-secondary backdrop-blur-sm">
										{activeLanguage === 'english' ? member.role : member.urduRole}
									</div>
									<h3 class="mt-3 line-clamp-2 text-xl font-black text-primary">
										{activeLanguage === 'english' ? member.name : member.urduName}
									</h3>
									<p class="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-primary/70">
										{activeLanguage === 'english'
											? member.qualification
											: member.urduQualification}
									</p>
								</div>
							</div>
						{/each}

						{#if getDepartmentFaculty(dept).length === 0}
							<div class="rounded-[2rem] border border-dashed border-primary/20 bg-neutral-soft/70 p-8 text-center text-primary/55 md:col-span-2 xl:col-span-3">
								<p class="text-sm font-black uppercase tracking-[0.3em] text-secondary">
									{activeLanguage === 'english' ? 'Faculty List' : 'فیکلٹی فہرست'}
								</p>
								<p class="mt-4 text-base font-semibold">
									{activeLanguage === 'english'
										? 'Additional faculty profiles will appear here.'
										: 'مزید فیکلٹی پروفائلز یہاں ظاہر ہوں گی۔'}
								</p>
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
