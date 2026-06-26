<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let loading = $state(false);
	let showPassword = $state(false);
</script>

<svelte:head>
	<title>Login — GPGC University Portal</title>
	<meta name="description" content="Login to the Government Post Graduate College University Management Portal" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
</svelte:head>

<div class="login-root">
	<!-- Left Panel: Branding -->
	<div class="login-brand">
		<div class="brand-content">
			<div class="brand-logo">
				<img src="/images/logos/degree4k-removebg-preview.png" alt="GPGC Logo" class="logo-img" />
			</div>
			<h1 class="brand-title">GPGC University Portal</h1>
			<p class="brand-subtitle">Government Post Graduate College Bahawalnagar</p>
			<div class="brand-features">
				<div class="feature-item">
					<span class="feature-icon">🎓</span>
					<span>Student Management System</span>
				</div>
				<div class="feature-item">
					<span class="feature-icon">👨‍🏫</span>
					<span>Faculty & Department Portal</span>
				</div>
				<div class="feature-item">
					<span class="feature-icon">📊</span>
					<span>Academic Records & Results</span>
				</div>
				<div class="feature-item">
					<span class="feature-icon">📋</span>
					<span>Attendance & GPA Tracking</span>
				</div>
			</div>
			<div class="brand-wave">
				<svg viewBox="0 0 1200 120" preserveAspectRatio="none">
					<path d="M0,60 C300,100 900,20 1200,60 L1200,120 L0,120 Z" fill="rgba(255,255,255,0.05)" />
				</svg>
			</div>
		</div>
	</div>

	<!-- Right Panel: Login Form -->
	<div class="login-form-panel">
		<div class="form-container">
			<div class="form-header">
				<h2 class="form-title">Welcome Back</h2>
				<p class="form-subtitle">Sign in to your portal account</p>
			</div>

			{#if data.reason === 'unauthorized'}
				<div class="alert alert-warn">
					<span class="alert-icon">⚠️</span>
					You don't have permission to access that page. Please log in with the correct account.
				</div>
			{/if}

			{#if form?.error}
				<div class="alert alert-error">
					<span class="alert-icon">❌</span>
					{form.error}
				</div>
			{/if}

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

				<div class="form-group">
					<label for="email" class="form-label">Email Address</label>
					<div class="input-wrapper">
						<span class="input-icon">📧</span>
						<input
							id="email"
							type="email"
							name="email"
							value={form?.email ?? ''}
							placeholder="you@gpgc.edu.pk"
							required
							autocomplete="email"
							class="form-input"
						/>
					</div>
				</div>

				<div class="form-group">
					<label for="password" class="form-label">Password</label>
					<div class="input-wrapper">
						<span class="input-icon">🔒</span>
						<input
							id="password"
							type={showPassword ? 'text' : 'password'}
							name="password"
							placeholder="Enter your password"
							required
							autocomplete="current-password"
							class="form-input"
						/>
						<button
							type="button"
							class="password-toggle"
							onclick={() => (showPassword = !showPassword)}
							aria-label="Toggle password visibility"
						>
							{showPassword ? '🙈' : '👁️'}
						</button>
					</div>
				</div>

				<button type="submit" class="btn-login" disabled={loading}>
					{#if loading}
						<span class="spinner"></span>
						Signing in...
					{:else}
						Sign In
					{/if}
				</button>
			</form>

			<div class="role-hints">
				<p class="role-hints-title">Portal Access for:</p>
				<div class="role-chips">
					<span class="role-chip chip-admin">Super Admin</span>
					<span class="role-chip chip-coord">Coordinator</span>
					<span class="role-chip chip-faculty">Faculty</span>
					<span class="role-chip chip-student">Student</span>
				</div>
			</div>

			{#if form?.success}
				<div class="alert alert-success" style="margin-top: 1rem; background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534;">
					<span class="alert-icon">✨</span>
					{form.message}
				</div>
			{/if}

			<form
				method="POST"
				action="?/setupDb"
				use:enhance={() => {
					loading = true;
					return async ({ update }) => {
						loading = false;
						await update();
					};
				}}
				style="margin-top: 1.5rem; text-align: center;"
			>
				<button type="submit" class="btn-setup" disabled={loading} style="background: none; border: 1px dashed #cbd5e1; color: #64748b; padding: 0.5rem 1rem; border-radius: 8px; font-size: 0.8rem; cursor: pointer; font-weight: 500; font-family: inherit;">
					🔧 Reset & Initialize Database
				</button>
			</form>

			<div class="form-footer">
				<a href="/" class="back-link">← Back to Public Website</a>
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
		background: linear-gradient(135deg, #1a237e 0%, #0d47a1 40%, #1565c0 70%, #1976d2 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 3rem;
		position: relative;
		overflow: hidden;
	}

	.login-brand::before {
		content: '';
		position: absolute;
		top: -50%;
		right: -20%;
		width: 600px;
		height: 600px;
		background: rgba(255, 255, 255, 0.03);
		border-radius: 50%;
	}

	.login-brand::after {
		content: '';
		position: absolute;
		bottom: -30%;
		left: -10%;
		width: 400px;
		height: 400px;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 50%;
	}

	.brand-content {
		position: relative;
		z-index: 1;
		max-width: 420px;
		text-align: center;
		color: white;
	}

	.brand-logo {
		margin-bottom: 1.5rem;
	}

	.logo-img {
		width: 90px;
		height: 90px;
		object-fit: contain;
		filter: brightness(0) invert(1);
		opacity: 0.95;
	}

	.brand-title {
		font-size: 1.9rem;
		font-weight: 700;
		margin: 0 0 0.5rem;
		letter-spacing: -0.5px;
	}

	.brand-subtitle {
		font-size: 0.95rem;
		opacity: 0.75;
		margin: 0 0 2.5rem;
		font-weight: 300;
	}

	.brand-features {
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
		text-align: left;
	}

	.feature-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 0.9rem;
		opacity: 0.85;
		background: rgba(255, 255, 255, 0.08);
		padding: 0.65rem 1rem;
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.feature-icon {
		font-size: 1.1rem;
	}

	.brand-wave {
		position: absolute;
		bottom: -2rem;
		left: 0;
		right: 0;
		height: 80px;
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
		margin-bottom: 2rem;
		text-align: center;
	}

	.form-title {
		font-size: 1.75rem;
		font-weight: 700;
		color: #0f172a;
		margin: 0 0 0.4rem;
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
		padding: 0.85rem 1rem;
		border-radius: 10px;
		font-size: 0.88rem;
		margin-bottom: 1.25rem;
		line-height: 1.5;
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

	.alert-icon {
		font-size: 1rem;
		flex-shrink: 0;
		margin-top: 1px;
	}

	/* ─── Form ─── */
	.login-form {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.form-label {
		font-size: 0.85rem;
		font-weight: 600;
		color: #374151;
	}

	.input-wrapper {
		position: relative;
		display: flex;
		align-items: center;
	}

	.input-icon {
		position: absolute;
		left: 0.9rem;
		font-size: 0.95rem;
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
		background: white;
		color: #0f172a;
		transition: border-color 0.2s, box-shadow 0.2s;
		box-sizing: border-box;
	}

	.form-input:focus {
		outline: none;
		border-color: #1976d2;
		box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.12);
	}

	.form-input::placeholder {
		color: #94a3b8;
	}

	.password-toggle {
		position: absolute;
		right: 0.9rem;
		background: none;
		border: none;
		cursor: pointer;
		font-size: 1rem;
		padding: 0;
		line-height: 1;
	}

	/* ─── Login Button ─── */
	.btn-login {
		width: 100%;
		padding: 0.85rem;
		background: linear-gradient(135deg, #1a237e, #1976d2);
		color: white;
		border: none;
		border-radius: 10px;
		font-size: 0.95rem;
		font-weight: 600;
		font-family: inherit;
		cursor: pointer;
		transition: opacity 0.2s, transform 0.1s;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		margin-top: 0.25rem;
	}

	.btn-login:hover:not(:disabled) {
		opacity: 0.92;
		transform: translateY(-1px);
	}

	.btn-login:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.spinner {
		width: 16px;
		height: 16px;
		border: 2px solid rgba(255, 255, 255, 0.4);
		border-top-color: white;
		border-radius: 50%;
		animation: spin 0.7s linear infinite;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	/* ─── Role Hints ─── */
	.role-hints {
		margin-top: 1.75rem;
		text-align: center;
	}

	.role-hints-title {
		font-size: 0.78rem;
		color: #94a3b8;
		margin: 0 0 0.6rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.role-chips {
		display: flex;
		gap: 0.5rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.role-chip {
		padding: 0.3rem 0.75rem;
		border-radius: 999px;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.chip-admin { background: #ede9fe; color: #6d28d9; }
	.chip-coord { background: #dbeafe; color: #1d4ed8; }
	.chip-faculty { background: #d1fae5; color: #065f46; }
	.chip-student { background: #fef3c7; color: #92400e; }

	/* ─── Footer ─── */
	.form-footer {
		margin-top: 1.5rem;
		text-align: center;
	}

	.back-link {
		font-size: 0.85rem;
		color: #64748b;
		text-decoration: none;
		transition: color 0.2s;
	}

	.back-link:hover {
		color: #1976d2;
	}

	/* ─── Responsive ─── */
	@media (max-width: 768px) {
		.login-root {
			flex-direction: column;
		}

		.login-brand {
			padding: 2rem 1.5rem 2.5rem;
			flex: 0;
		}

		.brand-title {
			font-size: 1.5rem;
		}

		.brand-features {
			display: none;
		}

		.login-form-panel {
			flex: 1;
			flex-basis: auto;
		}
	}
</style>
