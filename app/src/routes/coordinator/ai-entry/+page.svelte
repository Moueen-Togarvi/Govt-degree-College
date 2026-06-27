<script lang="ts">
	import { enhance } from '$app/forms';
	import { reveal } from '$lib/admin/motion';
	import type { PageData, ActionData } from './$types';

	import Sparkles from 'lucide-svelte/icons/sparkles';
	import Send from 'lucide-svelte/icons/send';
	import Lightbulb from 'lucide-svelte/icons/lightbulb';
	import CircleCheckBig from 'lucide-svelte/icons/circle-check-big';
	import TriangleAlert from 'lucide-svelte/icons/triangle-alert';

	let { data, form }: { data: PageData; form: ActionData } = $props();
	let submitting = $state(false);
	let promptValue = $state('');

	const suggestions = [
		'Announce that tomorrow is a public holiday.',
		'Create a new notice: Midterm exams start next week.',
		'Create course Artificial Intelligence with 3 credit hours.'
	];
</script>

<svelte:head><title>AI Assistant — Coordinator | GPGC Portal</title></svelte:head>

<div class="adm-page">
	<!-- Header -->
	<div class="adm-head">
		<div>
			<h1 class="adm-title"><Sparkles size={22} stroke-width={1.75} /> AI Assistant</h1>
			<p class="adm-sub">
				{data.department?.name ?? 'Department'} · Manage department data using natural language
			</p>
		</div>
	</div>

	<!-- Composer -->
	<div class="adm-card ai-card" use:reveal={{ y: 18 }}>
		<div class="ai-hero">
			<span class="ai-orb"><Sparkles size={26} stroke-width={1.75} /></span>
			<h2 class="ai-hero__title">What can I help you with today?</h2>
			<p class="ai-hero__sub">
				Just type what you want to do, and I'll handle the database entries for you.
			</p>
		</div>

		<form
			method="POST"
			action="?/processPrompt"
			use:enhance={() => {
				submitting = true;
				return async ({ update }) => {
					submitting = false;
					await update();
				};
			}}
			class="adm-card__body ai-form"
		>
			<div class="adm-field">
				<label class="adm-label" for="prompt">Your request</label>
				<textarea
					id="prompt"
					name="prompt"
					bind:value={promptValue}
					class="adm-textarea ai-input"
					placeholder="E.g. Announce that tomorrow classes are cancelled..."
					required
					rows="3"
				></textarea>
			</div>
			<div class="ai-form-foot">
				<button type="submit" class="adm-btn adm-btn--primary" disabled={submitting}>
					{#if submitting}<span class="adm-spin"></span>{/if}
					<Send size={16} stroke-width={1.75} /> Send
				</button>
			</div>
		</form>
	</div>

	<!-- Suggestions -->
	<div class="adm-card" use:reveal={{ delay: 100, y: 18 }}>
		<div class="adm-card__head">
			<h2 class="adm-card__title"><Lightbulb size={18} stroke-width={1.75} /> Try asking</h2>
		</div>
		<div class="adm-card__body">
			<div class="pill-group">
				{#each suggestions as s (s)}
					<button type="button" class="pill" onclick={() => (promptValue = s)}>{s}</button>
				{/each}
			</div>
		</div>
	</div>

	<!-- Responses -->
	{#if form?.error}
		<div class="adm-alert adm-alert--error ai-response" use:reveal={{ y: 10 }}>
			<TriangleAlert size={18} stroke-width={2} />
			<span><strong>Oops:</strong> {form.error}</span>
		</div>
	{/if}
	{#if form?.success}
		<div class="adm-alert adm-alert--success ai-response" use:reveal={{ y: 10 }}>
			<CircleCheckBig size={18} stroke-width={2} />
			<span><strong>AI says:</strong> {form.message}</span>
		</div>
	{/if}
</div>

<style>
	/* Hero */
	.ai-card {
		overflow: visible;
	}

	.ai-hero {
		text-align: center;
		padding: 2rem 1.5rem 1.25rem;
		background:
			radial-gradient(120% 120% at 50% -10%, rgba(17, 125, 116, 0.1), transparent 60%),
			linear-gradient(180deg, #fbfdfc, #fff);
		border-bottom: 1px solid var(--adm-line-soft);
	}

	.ai-orb {
		display: inline-grid;
		place-items: center;
		width: 58px;
		height: 58px;
		border-radius: 18px;
		background: linear-gradient(135deg, var(--adm-accent-2), var(--adm-accent));
		color: #fff;
		box-shadow: 0 10px 24px rgba(13, 93, 86, 0.3);
		margin-bottom: 0.85rem;
		animation: ai-float 3.5s ease-in-out infinite;
	}

	@keyframes ai-float {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-8px);
		}
	}

	.ai-hero__title {
		font-size: 1.35rem;
		font-weight: 800;
		letter-spacing: -0.01em;
		background: linear-gradient(135deg, var(--adm-accent-2), var(--adm-accent-dark));
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		margin: 0 0 0.35rem;
	}

	.ai-hero__sub {
		color: var(--adm-muted);
		font-size: 0.9rem;
		margin: 0 auto;
		max-width: 440px;
		line-height: 1.5;
	}

	/* Form */
	.ai-form {
		gap: 0.85rem;
	}

	.ai-input {
		min-height: 110px;
		font-size: 0.95rem;
		line-height: 1.5;
	}

	.ai-form-foot {
		display: flex;
		justify-content: flex-end;
	}

	/* Suggestion pills */
	.pill-group {
		display: flex;
		flex-wrap: wrap;
		gap: 0.55rem;
	}

	.pill {
		background: #fff;
		border: 1px solid var(--adm-line);
		color: var(--adm-ink-2);
		padding: 0.45rem 0.95rem;
		border-radius: 999px;
		font-size: 0.8rem;
		font-family: inherit;
		font-weight: 500;
		cursor: pointer;
		text-align: left;
		transition:
			border-color 0.15s,
			background 0.15s,
			color 0.15s,
			transform 0.08s;
	}

	.pill:hover {
		background: #e6f2f0;
		border-color: #cdeae6;
		color: var(--adm-accent-dark);
	}

	.pill:active {
		transform: translateY(1px);
	}

	/* Response */
	.ai-response {
		animation: ai-slide-up 0.3s ease-out;
	}

	@keyframes ai-slide-up {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (max-width: 560px) {
		.ai-hero {
			padding: 1.5rem 1rem 1rem;
		}
		.ai-hero__title {
			font-size: 1.2rem;
		}
	}
</style>
