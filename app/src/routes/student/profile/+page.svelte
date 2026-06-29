<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import { reveal } from '$lib/admin/motion';
	import User from 'lucide-svelte/icons/user';
	import Info from 'lucide-svelte/icons/info';
	import Check from 'lucide-svelte/icons/check';
	import CircleAlert from 'lucide-svelte/icons/circle-alert';
	import Save from 'lucide-svelte/icons/save';

	let { data, form }: { data: PageData; form: ActionData } = $props();
	let submitting = $state(false);
</script>

<svelte:head><title>My Profile — Student Portal | GPGC</title></svelte:head>

<div class="adm-page" use:reveal={{ y: 12 }}>
	<div class="adm-head">
		<div>
			<h1 class="adm-title">
				<User size={22} stroke-width={2} /> Student Profile Account
			</h1>
			<p class="adm-sub">View academic details and keep contact information updated</p>
		</div>
	</div>

	{#if form?.error}
		<div class="adm-alert adm-alert--error" use:reveal={{ y: 8 }}>
			<CircleAlert size={18} />
			<span>{form.error}</span>
		</div>
	{/if}
	{#if form?.success}
		<div class="adm-alert adm-alert--success" use:reveal={{ y: 8 }}>
			<Check size={18} />
			<span>{form.message}</span>
		</div>
	{/if}

	<div class="profile-grid">
		<!-- Academic Card -->
		<div class="adm-card" use:reveal={{ delay: 60, y: 12 }}>
			<div class="adm-card__head">
				<h2 class="adm-card__title">
					<Info size={18} /> Academic Registration Details
				</h2>
			</div>
			<div class="adm-card__body">
				<div class="info-list">
					<div class="info-item">
						<span class="info-label">Full Name</span>
						<span class="info-value">{data.profile?.name}</span>
					</div>
					<div class="info-item">
						<span class="info-label">Roll Number</span>
						<span class="info-value"><span class="adm-code font-bold">{data.profile?.roll_number}</span></span>
					</div>
					<div class="info-item">
						<span class="info-label">Department</span>
						<span class="info-value">{data.profile?.department_name}</span>
					</div>
					<div class="info-item">
						<span class="info-label">Current Semester</span>
						<span class="info-value">Semester {data.profile?.semester}</span>
					</div>
					<div class="info-item">
						<span class="info-label">Academic Session</span>
						<span class="info-value">{data.profile?.session}</span>
					</div>
					<div class="info-item">
						<span class="info-label">Father's Name</span>
						<span class="info-value">{data.profile?.father_name || 'Not Provided'}</span>
					</div>
					<div class="info-item">
						<span class="info-label">Registered Email</span>
						<span class="info-value">{data.profile?.email}</span>
					</div>
				</div>
				<div class="note-box">
					💡 Standard academic information is managed by the College Admin and CS Department Coordinator.
				</div>
			</div>
		</div>

		<!-- Contact Form Card -->
		<div class="adm-card" use:reveal={{ delay: 120, y: 12 }}>
			<div class="adm-card__head">
				<h2 class="adm-card__title">
					<User size={18} /> Contact Information
				</h2>
			</div>
			<div class="adm-card__body">
				<form
					method="POST"
					action="?/update"
					use:enhance={() => {
						submitting = true;
						return async ({ update }) => {
							submitting = false;
							await update();
						};
					}}
					class="adm-form"
				>
					<div class="adm-field">
						<label class="adm-label" for="phone">Phone Number</label>
						<input
							type="tel"
							id="phone"
							name="phone"
							value={data.profile?.phone ?? ''}
							placeholder="e.g. 0300-1234567"
							class="adm-input"
						/>
					</div>

					<div class="adm-field">
						<label class="adm-label" for="address">Permanent Address</label>
						<textarea
							id="address"
							name="address"
							placeholder="Enter your current residential address..."
							class="adm-textarea"
							rows="4"
						>{data.profile?.address ?? ''}</textarea>
					</div>

					<div class="form-actions-right">
						<button type="submit" class="adm-btn adm-btn--primary" disabled={submitting}>
							{#if submitting}
								<span class="adm-spin"></span>
							{:else}
								<Save size={16} />
							{/if}
							Save Updates
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<style>
	.profile-grid {
		display: grid;
		grid-template-columns: 1.2fr 1fr;
		gap: 1.25rem;
		align-items: flex-start;
	}
	@media (max-width: 900px) {
		.profile-grid {
			grid-template-columns: 1fr;
		}
	}

	.info-list {
		display: flex;
		flex-direction: column;
		gap: 1.1rem;
	}
	.info-item {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	.info-label {
		font-size: 0.72rem;
		font-weight: 700;
		color: var(--adm-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	.info-value {
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--adm-ink);
	}
	.font-bold {
		font-weight: 700;
		color: var(--adm-accent-dark);
		background: #e6f2f0;
	}

	.note-box {
		margin-top: 1.5rem;
		padding: 0.8rem 1rem;
		background: var(--adm-line-soft);
		border-radius: 8px;
		font-size: 0.78rem;
		color: var(--adm-ink-2);
		border: 1px solid var(--adm-line);
		line-height: 1.45;
	}

	.form-actions-right {
		display: flex;
		justify-content: flex-end;
		margin-top: 0.5rem;
	}
</style>
