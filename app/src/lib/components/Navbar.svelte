<script lang="ts">
	import { Menu, X, ChevronDown, GraduationCap, Users, BookOpen, Newspaper, LogIn, PhoneCall, Home } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let isMenuOpen = false;
	let scrolled = false;
	let activeDropdown: string | null = null;

	const navLinks = [
		{ name: 'Home', href: '/', icon: Home },
		{ 
			name: 'About', 
			href: '/about', 
			icon: Users,
			subLinks: [
				{ name: 'Overview', href: '/about/overview' },
				{ name: 'History', href: '/about/history' },
				{ name: 'Mission & Vision', href: '/about/mission-vision' },
				{ name: 'Administration', href: '/about/administration' },
				{ name: 'Faculty', href: '/about/faculty' }
			]
		},
		{ 
			name: 'Admissions', 
			href: '/admissions', 
			icon: GraduationCap,
			subLinks: [
				{ name: 'How to Apply', href: '/admissions/how-to-apply' },
				{ name: 'Eligibility', href: '/admissions/eligibility' },
				{ name: 'Fee Structure', href: '/admissions/fee-structure' },
				{ name: 'Scholarships', href: '/admissions/scholarships' },
				{ name: 'Forms', href: '/admissions/forms' }
			]
		},
		{ 
			name: 'Academics', 
			href: '/academics', 
			icon: BookOpen,
			subLinks: [
				{ name: 'Programs', href: '/academics/programs' },
				{ name: '11th Class', href: '/academics/11th' },
				{ name: '12th Class', href: '/academics/12th' },
				{ name: 'BS Programs', href: '/academics/bs' },
				{ name: 'Syllabus', href: '/academics/syllabus' }
			]
		},
		{ 
			name: 'Departments', 
			href: '/departments', 
			icon: BookOpen,
			subLinks: [
				{ name: 'Computer Science', href: '/departments/computer-science' },
				{ name: 'Mathematics', href: '/departments/mathematics' },
				{ name: 'English', href: '/departments/english' },
				{ name: 'Islamiyat', href: '/departments/islamiyat' },
				{ name: 'Urdu', href: '/departments/urdu' },
				{ name: 'Chemistry', href: '/departments/chemistry' },
				{ name: 'Zoology', href: '/departments/zoology' }
			]
		},
		{ 
			name: 'News', 
			href: '/news', 
			icon: Newspaper,
			subLinks: [
				{ name: 'Announcements', href: '/news/announcements' },
				{ name: 'Events', href: '/news/events' },
				{ name: 'Results', href: '/news/results' },
				{ name: 'Gallery', href: '/news/gallery' }
			]
		}
	];

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function toggleDropdown(name: string) {
		activeDropdown = activeDropdown === name ? null : name;
	}

	onMount(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 20;
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<nav class="fixed top-0 z-50 w-full transition-all duration-300">
	<!-- Top Bar (Inspiration from Eduka) -->
	<div class="hidden lg:block bg-primary text-white/90 py-2 border-b border-white/10">
		<div class="container mx-auto px-4 lg:px-8 flex justify-between items-center text-xs font-medium">
			<div class="flex items-center gap-6">
				<div class="flex items-center gap-2">
					<PhoneCall size={14} class="text-secondary" />
					<span>+92 (63) 9240123</span>
				</div>
				<div class="flex items-center gap-2">
					<Mail size={14} class="text-secondary" />
					<span>info@gpgcbwn.edu.pk</span>
				</div>
				<div class="flex items-center gap-2">
					<MapPin size={14} class="text-secondary" />
					<span>Minchinabad Road, Bahawalnagar</span>
				</div>
			</div>
			<div class="flex items-center gap-4">
				<span class="text-white/50">Follow us:</span>
				<a href="#" class="hover:text-secondary transition-colors"><Facebook size={14} /></a>
				<a href="#" class="hover:text-secondary transition-colors"><Twitter size={14} /></a>
				<a href="#" class="hover:text-secondary transition-colors"><Instagram size={14} /></a>
			</div>
		</div>
	</div>

	<!-- Main Navbar -->
	<div class="{scrolled ? 'bg-white/95 shadow-lg backdrop-blur-md py-2' : 'bg-white py-4'} transition-all duration-300">
		<div class="container mx-auto px-4 lg:px-8">
			<div class="flex items-center justify-between">
				<!-- Logo Section -->
				<a href="/" class="flex items-center gap-3 group">
					<img src="/images/logos/degree4k.png" alt="GPGC Logo" class="h-12 w-auto transition-transform duration-300 group-hover:scale-110" />
					<div class="hidden md:block">
						<h1 class="text-lg font-bold leading-tight tracking-tight text-primary">GPGC</h1>
						<p class="text-[10px] font-medium tracking-widest text-secondary uppercase font-bold">Bahawalnagar</p>
					</div>
				</a>

				<!-- Desktop Navigation -->
				<div class="hidden lg:flex items-center gap-1">
					{#each navLinks as link}
						<div 
							class="relative group"
							on:mouseenter={() => activeDropdown = link.name}
							on:mouseleave={() => activeDropdown = null}
						>
							<a 
								href={link.href} 
								class="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 {$page.url.pathname === link.href ? 'text-secondary' : 'text-primary hover:text-secondary'}"
							>
								{link.name}
								{#if link.subLinks}
									<ChevronDown size={14} class="transition-transform duration-200 group-hover:rotate-180" />
								{/if}
							</a>

							<!-- Dropdown Menu -->
							{#if link.subLinks}
								<div class="absolute left-0 top-full pt-2 opacity-0 invisible translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
									<div class="bg-white border-t-4 border-secondary shadow-2xl rounded-b-xl overflow-hidden min-w-[240px]">
										{#each link.subLinks as sub}
											<a 
												href={sub.href} 
												class="block px-6 py-4 text-sm font-bold text-primary hover:bg-neutral-soft hover:text-secondary border-b border-neutral-100 last:border-0 transition-all duration-150"
											>
												{sub.name}
											</a>
										{/each}
									</div>
								</div>
							{/if}
						</div>
					{/each}
					
					<!-- Action Buttons -->
					<div class="ml-4 flex items-center gap-3 pl-6 border-l border-neutral-200">
						<a href="/student-portal" class="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-black text-white bg-secondary hover:bg-secondary/90 transition-all shadow-md active:scale-95 uppercase tracking-wider">
							<LogIn size={16} />
							Portal
						</a>
					</div>
				</div>

				<!-- Mobile Menu Toggle -->
				<button 
					class="lg:hidden p-2 rounded-xl text-primary hover:bg-primary/5 transition-colors"
					on:click={toggleMenu}
				>
					{#if isMenuOpen}
						<X size={28} />
					{:else}
						<Menu size={28} />
					{/if}
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile Navigation Drawer -->
	{#if isMenuOpen}
		<div class="lg:hidden fixed inset-0 top-[72px] bg-white z-40 overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-300">
			<div class="flex flex-col p-6 gap-2">
				{#each navLinks as link}
					<div>
						<button 
							class="w-full flex items-center justify-between p-4 rounded-2xl text-lg font-bold text-primary hover:bg-primary/5"
							on:click={() => toggleDropdown(link.name)}
						>
							<span class="flex items-center gap-3">
								<link.icon size={20} class="text-secondary" />
								{link.name}
							</span>
							{#if link.subLinks}
								<ChevronDown size={20} class="transition-transform duration-200 {activeDropdown === link.name ? 'rotate-180' : ''}" />
							{/if}
						</button>
						
						{#if link.subLinks && activeDropdown === link.name}
							<div class="ml-12 flex flex-col gap-1 border-l-2 border-secondary/20 pl-4 py-2 animate-in slide-in-from-left-2">
								{#each link.subLinks as sub}
									<a href={sub.href} class="p-3 text-sm font-semibold text-primary/70 hover:text-primary transition-colors" on:click={() => isMenuOpen = false}>
										{sub.name}
									</a>
								{/each}
							</div>
						{/if}
					</div>
				{/each}

				<div class="mt-6 flex flex-col gap-3">
					<a href="/student-portal" class="flex items-center justify-center gap-2 p-4 rounded-2xl bg-secondary text-white font-bold text-center shadow-lg" on:click={() => isMenuOpen = false}>
						<LogIn size={20} />
						Student Portal
					</a>
				</div>
			</div>
		</div>
	{/if}
</nav>
