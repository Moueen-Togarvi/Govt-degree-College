<script lang="ts">
	import { Menu, X, ChevronDown, GraduationCap, Users, BookOpen, Newspaper, LogIn, PhoneCall, Home, Mail, MapPin } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let isMenuOpen = $state(false);
	let scrolled = $state(false);
	let activeDropdown = $state<string | null>(null);

	const navLinks = [
		{ name: 'Home', href: '/', icon: Home },
		{ 
			name: 'About', 
			href: '/about/overview', 
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
			href: '/admissions/how-to-apply', 
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
			href: '/academics/programs', 
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
			href: '/departments/computer-science', 
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
			href: '/news/announcements', 
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

<nav class="fixed top-0 z-50 w-full transition-all duration-500 {scrolled ? 'shadow-[0_10px_30px_rgba(0,0,0,0.08)]' : ''}">
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
					<span>College Road, Bahawalnagar</span>
				</div>
			</div>
			<div class="flex items-center gap-3">
				<span class="text-white/50 text-xs">Follow us:</span>
				<!-- Facebook -->
				<a href="/" aria-label="Facebook" class="hover:text-secondary transition-colors">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
				</a>
				<!-- Twitter/X -->
				<a href="/" aria-label="Twitter" class="hover:text-secondary transition-colors">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
				</a>
				<!-- Instagram -->
				<a href="/" aria-label="Instagram" class="hover:text-secondary transition-colors">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
				</a>
			</div>
		</div>
	</div>

	<!-- Main Navbar -->
	<div class="{scrolled ? 'bg-white/95 shadow-lg backdrop-blur-md py-0.5' : 'bg-white py-1'} transition-all duration-300">
		<div class="container mx-auto px-4 lg:px-8">
			<div class="flex items-center justify-between">
				<!-- Logo Section -->
				<a href="/" class="flex items-center gap-4 group">
					<div class="bg-white p-1 rounded-lg shadow-sm border border-neutral-100 group-hover:border-secondary transition-colors">
						<img src="/images/logos/degree4k-removebg-preview.png" alt="GPGC Logo" class="h-14 w-auto transition-transform duration-300 group-hover:scale-105" />
					</div>
					<div class="hidden md:block">
						<h1 class="text-xl font-black leading-tight tracking-tight text-primary">GPGC</h1>
						<p class="text-[11px] font-bold tracking-[0.2em] text-secondary uppercase">Bahawalnagar</p>
					</div>
				</a>

				<!-- Desktop Navigation -->
				<div class="hidden lg:flex items-center gap-1">
					{#each navLinks as link}
						<div 
							class="relative group"
							role="none"
							onmouseenter={() => activeDropdown = link.name}
							onmouseleave={() => activeDropdown = null}
						>
							<a 
								href={link.href} 
								class="relative flex items-center gap-1.5 px-5 py-3 text-sm font-bold tracking-wide transition-all duration-300 {$page.url.pathname === link.href ? 'text-secondary' : 'text-primary hover:text-secondary'} group/link"
							>
								{link.name}
								{#if link.subLinks}
									<ChevronDown size={14} class="transition-transform duration-300 group-hover:rotate-180 opacity-70" />
								{/if}
								
								<!-- Animated Underline -->
								<span class="absolute bottom-1 left-5 right-5 h-[2px] bg-secondary scale-x-0 transition-transform duration-300 origin-left group-hover/link:scale-x-100 {$page.url.pathname === link.href ? 'scale-x-100' : ''}"></span>
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
					<div class="ml-6 flex items-center gap-3 pl-8 border-l border-neutral-200">
						<a href="/student-portal" class="flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-black text-white bg-secondary hover:bg-secondary/90 hover:scale-105 hover:shadow-lg hover:shadow-secondary/20 transition-all active:scale-95 uppercase tracking-widest">
							<LogIn size={16} />
							Portal
						</a>
					</div>
				</div>

				<!-- Mobile Menu Toggle -->
				<button 
					class="lg:hidden p-2 rounded-xl text-primary hover:bg-primary/5 transition-colors"
					onclick={toggleMenu}
					aria-label="Toggle Menu"
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
		<div class="lg:hidden fixed inset-0 top-[68px] bg-white z-40 overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-300">
			<div class="flex flex-col p-6 gap-2">
				{#each navLinks as link}
					<div>
						<button 
							class="w-full flex items-center justify-between p-4 rounded-2xl text-lg font-bold text-primary hover:bg-primary/5"
							onclick={() => toggleDropdown(link.name)}
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
									<a href={sub.href} class="p-3 text-sm font-semibold text-primary/70 hover:text-primary transition-colors" onclick={() => isMenuOpen = false}>
										{sub.name}
									</a>
								{/each}
							</div>
						{/if}
					</div>
				{/each}

				<div class="mt-6 flex flex-col gap-3">
					<a href="/student-portal" class="flex items-center justify-center gap-2 p-4 rounded-2xl bg-secondary text-white font-bold text-center shadow-lg" onclick={() => isMenuOpen = false}>
						<LogIn size={20} />
						Student Portal
					</a>
				</div>
			</div>
		</div>
	{/if}
</nav>
