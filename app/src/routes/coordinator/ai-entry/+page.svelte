<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
	let submitting = $state(false);
	let promptValue = $state('');

	const suggestions = [
		"Announce that tomorrow is a public holiday.",
		"Create a new notice: Midterm exams start next week.",
		"Create course Artificial Intelligence with 3 credit hours."
	];
</script>

<svelte:head><title>AI Assistant — Coordinator | GPGC</title></svelte:head>

<div class="page">
	<div class="page-header">
		<div>
			<h1 class="page-title">✨ AI Assistant</h1>
			<p class="page-subtitle">Manage department data using natural language</p>
		</div>
	</div>

	<div class="ai-card">
		<div class="ai-hero">
			<div class="sparkles">✨</div>
			<h2>What can I help you with today?</h2>
			<p>Just type what you want to do, and I'll handle the database entries for you.</p>
		</div>

		<form method="POST" action="?/processPrompt" use:enhance={() => { 
			submitting = true; 
			return async ({ update }) => { 
				submitting = false; 
				await update(); 
			}; 
		}} class="ai-form">
			
			<div class="input-wrapper">
				<textarea 
					name="prompt" 
					bind:value={promptValue} 
					placeholder="E.g. Announce that tomorrow classes are cancelled..." 
					class="ai-input" 
					required
					rows="3"
				></textarea>
				<button type="submit" class="btn-submit" disabled={submitting}>
					{#if submitting}<span class="spinner"></span>{/if}
					Send
				</button>
			</div>

		</form>

		<div class="suggestions">
			<p class="suggest-title">Try asking:</p>
			<div class="pill-group">
				{#each suggestions as s}
					<button class="pill" onclick={() => promptValue = s}>{s}</button>
				{/each}
			</div>
		</div>

		{#if form?.error}
			<div class="ai-response error-response">
				<strong>Oops:</strong> {form.error}
			</div>
		{/if}

		{#if form?.success}
			<div class="ai-response success-response">
				<strong>AI says:</strong> {form.message}
			</div>
		{/if}
	</div>
</div>

<style>
	.page { display: flex; flex-direction: column; gap: 1.5rem; max-width: 800px; margin: 0 auto; width: 100%; }
	.page-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }
	.page-title { font-size: 1.5rem; font-weight: 700; color: #0f172a; margin: 0 0 0.25rem; }
	.page-subtitle { font-size: 0.85rem; color: #64748b; margin: 0; }

	.ai-card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); overflow: hidden; padding: 2rem; display: flex; flex-direction: column; gap: 2rem; }

	.ai-hero { text-align: center; }
	.sparkles { font-size: 3rem; margin-bottom: 0.5rem; animation: float 3s ease-in-out infinite; }
	@keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
	.ai-hero h2 { font-size: 1.5rem; font-weight: 800; background: linear-gradient(135deg, #7c3aed, #db2777); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0 0 0.5rem; }
	.ai-hero p { color: #64748b; font-size: 0.95rem; margin: 0; }

	.ai-form { width: 100%; }
	.input-wrapper { position: relative; border-radius: 16px; border: 2px solid #e2e8f0; background: #f8fafc; transition: all 0.2s; display: flex; flex-direction: column; }
	.input-wrapper:focus-within { border-color: #c4b5fd; background: white; box-shadow: 0 0 0 4px rgba(196,181,253,0.2); }
	
	.ai-input { width: 100%; border: none; background: transparent; padding: 1.25rem; font-size: 1.05rem; color: #0f172a; resize: none; outline: none; font-family: inherit; }
	.ai-input::placeholder { color: #94a3b8; }
	
	.btn-submit { align-self: flex-end; margin: 0 1rem 1rem 0; background: linear-gradient(135deg, #1e1b4b, #4c1d95); color: white; border: none; border-radius: 10px; padding: 0.65rem 1.5rem; font-size: 0.9rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: transform 0.2s; }
	.btn-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 4px 10px rgba(76,29,149,0.3); }
	.btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }

	.suggestions { display: flex; flex-direction: column; gap: 0.75rem; }
	.suggest-title { font-size: 0.8rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin: 0; }
	.pill-group { display: flex; flex-wrap: wrap; gap: 0.5rem; }
	.pill { background: white; border: 1px solid #cbd5e1; color: #475569; padding: 0.4rem 1rem; border-radius: 999px; font-size: 0.8rem; cursor: pointer; transition: all 0.2s; }
	.pill:hover { background: #f1f5f9; border-color: #94a3b8; color: #0f172a; }

	.ai-response { padding: 1rem 1.25rem; border-radius: 12px; font-size: 0.95rem; line-height: 1.5; animation: slideUp 0.3s ease-out; }
	@keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
	.error-response { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }
	.success-response { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }
	
	.spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; }
	@keyframes spin { to { transform: rotate(360deg); } }
</style>
