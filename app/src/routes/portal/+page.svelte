<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import { reveal } from '$lib/admin/motion';

	// Lucide icons (no emojis) — matches the admin design system.
	import GraduationCap from 'lucide-svelte/icons/graduation-cap';
	import Users from 'lucide-svelte/icons/users';
	import ClipboardList from 'lucide-svelte/icons/clipboard-list';
	import BookOpen from 'lucide-svelte/icons/book-open';
	import Mail from 'lucide-svelte/icons/mail';
	import Lock from 'lucide-svelte/icons/lock';
	import Eye from 'lucide-svelte/icons/eye';
	import EyeOff from 'lucide-svelte/icons/eye-off';
	import CircleAlert from 'lucide-svelte/icons/circle-alert';
	import TriangleAlert from 'lucide-svelte/icons/triangle-alert';
	import Sparkles from 'lucide-svelte/icons/sparkles';
	import Wrench from 'lucide-svelte/icons/wrench';
	import ArrowLeft from 'lucide-svelte/icons/arrow-left';
	import ShieldCheck from 'lucide-svelte/icons/shield-check';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let loading = $state(false);
	let setupLoading = $state(false);
	let showPassword = $state(false);

	let email = $state(form?.email ?? '');
	let password = $state('');

	const features = [
		{ icon: GraduationCap, label: 'Student Management System' },
		{ icon: Users, label: 'Faculty & Department Portal' },
		{ icon: ClipboardList, label: 'Academic Records & Results' },
		{ icon: BookOpen, label: 'Attendance & GPA Tracking' }
	];

	const demoCredentials = [
		{
			role: 'Super Admin',
			email: 'admin@gpgc.edu.pk',
			password: 'Admin@1234',
			icon: ShieldCheck,
			color: 'teal'
		},
		{
			role: 'Coordinator',
			email: 'coordinator@gpgc.edu.pk',
			password: 'Coordinator@1234',
			icon: Wrench,
			color: 'blue'
		},
		{
			role: 'Faculty',
			email: 'faculty@gpgc.edu.pk',
			password: 'Faculty@1234',
			icon: Users,
			color: 'green'
		},
		{
			role: 'Student',
			email: 'student@gpgc.edu.pk',
			password: 'Student@1234',
			icon: GraduationCap,
			color: 'orange'
		}
	];

	function fillDemoCredentials(cred: typeof demoCredentials[0]) {
		email = cred.email;
		password = cred.password;
	}
</script>

<svelte:head>
	<title>Login — GPGC University Portal</title>
	<meta
		name="description"
		content="Login to the Government Post Graduate College University Management Portal"
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="login-root">
	<!-- Left Panel: Branding -->
	<div class="login-brand">
		<div class="brand-blob brand-blob--1"></div>
		<div class="brand-blob brand-blob--2"></div>
		<div class="brand-content">
			<a href="/" class="brand-logo" use:reveal={{ y: 14, duration: 480 }}>
				<img src="/images/logos/degree4k-removebg-preview.png" alt="GPGC Logo" class="logo-img" />
			</a>
			<h1 class="brand-title" use:reveal={{ delay: 60, y: 14, duration: 480 }}>
				GPGC University Portal
			</h1>
			<p class="brand-subtitle" use:reveal={{ delay: 120, y: 14, duration: 480 }}>
				Government Post Graduate College Bahawalnagar
			</p>

			<div class="brand-features">
				{#each features as feat, i (feat.label)}
					{@const Icon = feat.icon}
					<div class="feature-item" use:reveal={{ delay: 200 + i * 70, x: -16, duration: 480 }}>
						<span class="feature-icon"><Icon size={18} stroke-width={1.75} /></span>
						<span>{feat.label}</span>
					</div>
				{/each}
			</div>

			<div class="brand-foot" use:reveal={{ delay: 520, y: 12, duration: 480 }}>
				<ShieldCheck size={14} stroke-width={2} />
				<span>Secure, role-based access for the campus community</span>
			</div>
		</div>
	</div>

	<!-- Right Panel: Login Form -->
	<div class="login-form-panel">
		<div class="form-container">
			<div class="form-header" use:reveal={{ y: 14, duration: 480 }}>
				<h2 class="form-title">Welcome back</h2>
				<p class="form-subtitle">Sign in to your portal account</p>
			</div>

			{#if data.reason === 'unauthorized'}
				<div class="alert alert-warn" use:reveal={{ y: 8 }}>
					<TriangleAlert size={18} stroke-width={2} />
					<span>
						You don't have permission to access that page. Please log in with the correct account.
					</span>
				</div>
			{/if}

			{#if form?.error}
				<div class="alert alert-error" use:reveal={{ y: 8 }}>
					<CircleAlert size={18} stroke-width={2} />
					<span>{form.error}</span>
				</div>
			{/if}

			<!-- Quick Demo Selector -->
			<div class="demo-selector-container" use:reveal={{ delay: 60, y: 12, duration: 480 }}>
				<p class="demo-selector-title">Quick Demo Login (Click to fill)</p>
				<div class="demo-grid">
					{#each demoCredentials as cred}
						{@const Icon = cred.icon}
						<button
							type="button"
							class="demo-card demo-card--{cred.color}"
							onclick={() => fillDemoCredentials(cred)}
							title="Click to fill credentials"
						>
							<span class="demo-card-icon"><Icon size={14} stroke-width={2} /></span>
							<span class="demo-card-role">{cred.role}</span>
						</button>
					{/each}
				</div>
			</div>

			<form
				method="POST"
				action="?/login"
				use:enhance={() => {
					loading = true;
					return async ({ update }) => {
						loading = false;
						await update();
					};
				}}
				class="login-form"
			>
				<input type="hidden" name="next" value={data.next} />

				<div class="form-group" use:reveal={{ delay: 100, y: 12, duration: 480 }}>
					<label for="email" class="form-label">Email Address</label>
					<div class="input-wrapper">
						<span class="input-icon"><Mail size={17} stroke-width={1.75} /></span>
						<input
							id="email"
							type="email"
							name="email"
							bind:value={email}
							placeholder="you@gpgc.edu.pk"
							required
							autocomplete="email"
							class="form-input"
						/>
					</div>
				</div>

				<div class="form-group" use:reveal={{ delay: 140, y: 12, duration: 480 }}>
					<label for="password" class="form-label">Password</label>
					<div class="input-wrapper">
						<span class="input-icon"><Lock size={17} stroke-width={1.75} /></span>
						<input
							id="password"
							type={showPassword ? 'text' : 'password'}
							name="password"
							bind:value={password}
							placeholder="Enter your password"
							required
							autocomplete="current-password"
							class="has-toggle form-input"
						/>
						<button
							type="button"
							class="password-toggle"
							onclick={() => (showPassword = !showPassword)}
							aria-label="Toggle password visibility"
						>
							{#if showPassword}
								<EyeOff size={17} stroke-width={1.75} />
							{:else}
								<Eye size={17} stroke-width={1.75} />
							{/if}
						</button>
					</div>
				</div>

				<button
					type="submit"
					class="btn-login"
					disabled={loading}
					use:reveal={{ delay: 180, y: 12, duration: 480 }}
				>
					{#if loading}
						<span class="spinner"></span>
						Signing in...
					{:else}
						Sign In
					{/if}
				</button>
			</form>

			{#if form?.success}
				<div class="alert alert-success" use:reveal={{ y: 8 }}>
					<Sparkles size={18} stroke-width={2} />
					<span>{form.message}</span>
				</div>
			{/if}

			<form
				method="POST"
				action="?/setupDb"
				use:enhance={() => {
					setupLoading = true;
					return async ({ update }) => {
						setupLoading = false;
						await update();
					};
				}}
				class="setup-form"
			>
				<button type="submit" class="btn-setup" disabled={setupLoading}>
					<Wrench size={14} stroke-width={1.75} />
					{setupLoading ? 'Initializing...' : 'Reset & Initialize Database'}
				</button>
			</form>

			<div class="form-footer">
				<a href="/" class="back-link">
					<ArrowLeft size={15} stroke-width={1.75} />
					Back to Public Website
				</a>
			</div>
		</div>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: 'Inter', sans-serif;
	}

	.login-root {
		min-height: 100vh;
		display: flex;
	}

	/* ─── Left Brand Panel ─── */
	.login-brand {
		flex: 1;
		background: linear-gradient(150deg, #0d4a44 0%, #0d5d56 45%, #08332e 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 3rem;
		position: relative;
		overflow: hidden;
	}

	.brand-blob {
		position: absolute;
		border-radius: 50%;
		filter: blur(4px);
		pointer-events: none;
	}

	.brand-blob--1 {
		top: -25%;
		right: -15%;
		width: 520px;
		height: 520px;
		background: radial-gradient(circle, rgba(247, 148, 29, 0.14), transparent 65%);
	}

	.brand-blob--2 {
		bottom: -30%;
		left: -12%;
		width: 440px;
		height: 440px;
		background: radial-gradient(circle, rgba(17, 125, 116, 0.35), transparent 70%);
	}

	.brand-content {
		position: relative;
		z-index: 1;
		max-width: 430px;
		width: 100%;
		color: #fff;
	}

	.brand-logo {
		display: inline-flex;
		margin-bottom: 1.5rem;
	}

	.logo-img {
		width: 84px;
		height: 84px;
		object-fit: contain;
		filter: brightness(0) invert(1);
		opacity: 0.96;
	}

	.brand-title {
		font-size: 1.9rem;
		font-weight: 800;
		margin: 0 0 0.5rem;
		letter-spacing: -0.02em;
		line-height: 1.15;
	}

	.brand-subtitle {
		font-size: 0.95rem;
		opacity: 0.72;
		margin: 0 0 2.5rem;
		font-weight: 300;
	}

	.brand-features {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
	}

	.feature-item {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		font-size: 0.92rem;
		opacity: 0.9;
		background: rgba(255, 255, 255, 0.07);
		padding: 0.7rem 1rem;
		border-radius: 11px;
		border: 1px solid rgba(255, 255, 255, 0.09);
		font-weight: 500;
		backdrop-filter: blur(2px);
		transition: background 0.2s;
	}

	.feature-item:hover {
		background: rgba(255, 255, 255, 0.11);
	}

	.feature-icon {
		display: grid;
		place-items: center;
		width: 34px;
		height: 34px;
		border-radius: 9px;
		background: rgba(247, 148, 29, 0.18);
		color: #fcd9b6;
		flex-shrink: 0;
	}

	.brand-foot {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: 2.5rem;
		font-size: 0.78rem;
		opacity: 0.6;
	}

	/* ─── Right Form Panel ─── */
	.login-form-panel {
		flex: 0 0 480px;
		background: #f8fafc;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2.5rem;
	}

	.form-container {
		width: 100%;
		max-width: 380px;
	}

	.form-header {
		margin-bottom: 1.75rem;
	}

	.form-title {
		font-size: 1.75rem;
		font-weight: 800;
		color: #0f172a;
		margin: 0 0 0.4rem;
		letter-spacing: -0.02em;
	}

	.form-subtitle {
		font-size: 0.9rem;
		color: #64748b;
		margin: 0;
	}

	/* ─── Alerts ─── */
	.alert {
		display: flex;
		align-items: flex-start;
		gap: 0.6rem;
		padding: 0.8rem 1rem;
		border-radius: 11px;
		font-size: 0.86rem;
		margin-bottom: 1.25rem;
		line-height: 1.5;
		font-weight: 500;
	}

	.alert :global(svg) {
		flex-shrink: 0;
		margin-top: 1px;
	}

	.alert-error {
		background: #fef2f2;
		border: 1px solid #fecaca;
		color: #991b1b;
	}

	.alert-warn {
		background: #fffbeb;
		border: 1px solid #fde68a;
		color: #92400e;
	}

	.alert-success {
		background: #f0fdf4;
		border: 1px solid #bbf7d0;
		color: #166534;
		margin-top: 1rem;
	}

	/* ─── Form ─── */
	.login-form {
		display: flex;
		flex-direction: column;
		gap: 1.15rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.form-label {
		font-size: 0.82rem;
		font-weight: 600;
		color: #334155;
	}

	.input-wrapper {
		position: relative;
		display: flex;
		align-items: center;
	}

	.input-icon {
		position: absolute;
		left: 0.9rem;
		display: grid;
		place-items: center;
		color: #94a3b8;
		pointer-events: none;
		z-index: 1;
	}

	.form-input {
		width: 100%;
		padding: 0.75rem 0.9rem 0.75rem 2.6rem;
		border: 1.5px solid #e2e8f0;
		border-radius: 10px;
		font-size: 0.9rem;
		font-family: inherit;
		background: #fff;
		color: #0f172a;
		transition:
			border-color 0.2s,
			box-shadow 0.2s;
		box-sizing: border-box;
	}

	.form-input.has-toggle {
		padding-right: 2.6rem;
	}

	.form-input:focus {
		outline: none;
		border-color: #0d5d56;
		box-shadow: 0 0 0 3px rgba(13, 93, 86, 0.14);
	}

	.form-input::placeholder {
		color: #94a3b8;
	}

	.password-toggle {
		position: absolute;
		right: 0.6rem;
		display: grid;
		place-items: center;
		width: 32px;
		height: 32px;
		border-radius: 7px;
		background: none;
		border: none;
		cursor: pointer;
		color: #94a3b8;
		transition:
			color 0.15s,
			background 0.15s;
	}

	.password-toggle:hover {
		color: #0d5d56;
		background: #e6f2f0;
	}

	/* ─── Login Button ─── */
	.btn-login {
		width: 100%;
		padding: 0.85rem;
		background: linear-gradient(135deg, #117d74, #0d5d56);
		color: #fff;
		border: none;
		border-radius: 10px;
		font-size: 0.95rem;
		font-weight: 600;
		font-family: inherit;
		cursor: pointer;
		transition:
			opacity 0.2s,
			transform 0.1s,
			box-shadow 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		margin-top: 0.25rem;
		box-shadow: 0 4px 14px rgba(13, 93, 86, 0.25);
	}

	.btn-login:hover:not(:disabled) {
		transform: translateY(-1px);
		box-shadow: 0 6px 18px rgba(13, 93, 86, 0.32);
	}

	.btn-login:active:not(:disabled) {
		transform: translateY(0);
	}

	.btn-login:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.spinner {
		width: 16px;
		height: 16px;
		border: 2px solid rgba(255, 255, 255, 0.4);
		border-top-color: #fff;
		border-radius: 50%;
		animation: spin 0.7s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	/* ─── Demo Credentials Selector ─── */
	.demo-selector-container {
		background: #ffffff;
		border: 1px solid #e2e8f0;
		border-radius: 12px;
		padding: 0.85rem;
		margin-bottom: 1.5rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
	}

	.demo-selector-title {
		font-size: 0.72rem;
		color: #64748b;
		margin: 0 0 0.6rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		text-align: center;
	}

	.demo-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.5rem;
	}

	.demo-card {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		background: #f8fafc;
		border: 1px solid #e2e8f0;
		border-radius: 8px;
		padding: 0.45rem 0.6rem;
		cursor: pointer;
		transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		text-align: left;
		font-family: inherit;
		outline: none;
	}

	.demo-card:hover {
		transform: translateY(-1px);
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
	}

	.demo-card:active {
		transform: translateY(0);
	}

	.demo-card-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 22px;
		height: 22px;
		border-radius: 5px;
		flex-shrink: 0;
	}

	.demo-card-role {
		font-size: 0.78rem;
		font-weight: 600;
		color: #334155;
	}

	/* Color variants for demo cards */
	.demo-card--teal .demo-card-icon {
		background: #e6f2f0;
		color: #0d5d56;
	}
	.demo-card--teal:hover {
		border-color: #0d5d56;
		background: #fdfdfd;
	}
	
	.demo-card--blue .demo-card-icon {
		background: #dbeafe;
		color: #1d4ed8;
	}
	.demo-card--blue:hover {
		border-color: #1d4ed8;
		background: #fdfdfd;
	}

	.demo-card--green .demo-card-icon {
		background: #d1fae5;
		color: #065f46;
	}
	.demo-card--green:hover {
		border-color: #065f46;
		background: #fdfdfd;
	}

	.demo-card--orange .demo-card-icon {
		background: #fef0dd;
		color: #b45f00;
	}
	.demo-card--orange:hover {
		border-color: #b45f00;
		background: #fdfdfd;
	}

	/* ─── Setup / Footer ─── */
	.setup-form {
		margin-top: 1.25rem;
		text-align: center;
	}

	.btn-setup {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		background: none;
		border: 1px dashed #cbd5e1;
		color: #64748b;
		padding: 0.5rem 1rem;
		border-radius: 8px;
		font-size: 0.78rem;
		cursor: pointer;
		font-weight: 500;
		font-family: inherit;
		transition:
			color 0.15s,
			border-color 0.15s,
			background 0.15s;
	}

	.btn-setup:hover:not(:disabled) {
		color: #0d5d56;
		border-color: #9fc4be;
		background: #f3f9f8;
	}

	.btn-setup:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.form-footer {
		margin-top: 1.5rem;
		text-align: center;
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.85rem;
		color: #64748b;
		text-decoration: none;
		font-weight: 500;
		transition: color 0.2s;
	}

	.back-link:hover {
		color: #0d5d56;
	}

	/* ─── Responsive ─── */
	@media (max-width: 768px) {
		.login-root {
			flex-direction: column;
		}

		.login-brand {
			padding: 2.25rem 1.5rem 2.5rem;
			flex: 0;
		}

		.brand-title {
			font-size: 1.5rem;
		}

		.brand-features {
			display: none;
		}

		.brand-foot {
			display: none;
		}

		.login-form-panel {
			flex: 1;
			flex-basis: auto;
		}
	}
</style>
