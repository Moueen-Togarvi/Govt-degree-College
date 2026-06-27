<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
	let submitting = $state(false);
</script>

<svelte:head><title>My Profile — Student Portal | GPGC</title></svelte:head>

<div class="page">
	<div class="page-header">
		<div>
			<h1 class="page-title">👤 My Profile</h1>
			<p class="page-subtitle">View and update your personal information</p>
		</div>
	</div>

	{#if form?.error}
		<div class="alert alert-error">❌ {form.error}</div>
	{/if}
	{#if form?.success}
		<div class="alert alert-success">✅ {form.message}</div>
	{/if}

	<div class="profile-grid">
		<!-- Readonly Info -->
		<div class="card readonly-card">
			<h2 class="card-title">Academic Details</h2>
			<div class="info-list">
				<div class="info-item">
					<span class="info-label">Full Name</span>
					<span class="info-value">{data.profile?.name}</span>
				</div>
				<div class="info-item">
					<span class="info-label">Roll Number</span>
					<span class="info-value font-mono">{data.profile?.roll_number}</span>
				</div>
				<div class="info-item">
					<span class="info-label">Department</span>
					<span class="info-value">{data.profile?.department_name}</span>
				</div>
				<div class="info-item">
					<span class="info-label">Semester</span>
					<span class="info-value">{data.profile?.semester}</span>
				</div>
				<div class="info-item">
					<span class="info-label">Session</span>
					<span class="info-value">{data.profile?.session}</span>
				</div>
				<div class="info-item">
					<span class="info-label">Father's Name</span>
					<span class="info-value">{data.profile?.father_name || 'Not Provided'}</span>
				</div>
				<div class="info-item">
					<span class="info-label">Official Email</span>
					<span class="info-value">{data.profile?.email}</span>
				</div>
			</div>
			<div class="note">
				💡 Academic details can only be changed by your Department Coordinator.
			</div>
		</div>

		<!-- Editable Info -->
		<div class="card editable-card">
			<h2 class="card-title">Contact Information</h2>
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
				class="edit-form"
			>
				<div class="form-group">
					<label class="form-label" for="phone">Phone Number</label>
					<input
						type="tel"
						id="phone"
						name="phone"
						value={data.profile?.phone ?? ''}
						placeholder="03XX-XXXXXXX"
						class="form-input"
					/>
				</div>

				<div class="form-group">
					<label class="form-label" for="address">Home Address</label>
					<textarea
						id="address"
						name="address"
						rows="4"
						placeholder="Enter your full home address..."
						class="form-input form-textarea">{data.profile?.address ?? ''}</textarea
					>
				</div>

				<div class="form-footer">
					<button type="submit" class="btn-primary" disabled={submitting}>
						{#if submitting}<span class="spinner"></span>{/if}
						Save Changes
					</button>
				</div>
			</form>
		</div>
	</div>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	.page-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
	}
	.page-title {
		font-size: 1.5rem;
		font-weight: 700;
		color: #0f172a;
		margin: 0 0 0.25rem;
	}
	.page-subtitle {
		font-size: 0.85rem;
		color: #64748b;
		margin: 0;
	}
	.alert {
		padding: 0.75rem 1rem;
		border-radius: 10px;
		font-size: 0.88rem;
		font-weight: 500;
	}
	.alert-error {
		background: #fee2e2;
		color: #dc2626;
		border: 1px solid #fecaca;
	}
	.alert-success {
		background: #d1fae5;
		color: #065f46;
		border: 1px solid #a7f3d0;
	}

	.profile-grid {
		display: grid;
		grid-template-columns: 1.2fr 1fr;
		gap: 1.5rem;
		align-items: flex-start;
	}
	.card {
		background: white;
		border-radius: 14px;
		padding: 1.75rem;
		border: 1px solid #e2e8f0;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
	}
	.card-title {
		font-size: 1.1rem;
		font-weight: 700;
		color: #0f172a;
		margin: 0 0 1.5rem;
		padding-bottom: 0.75rem;
		border-bottom: 1px solid #f1f5f9;
	}

	/* Readonly List */
	.info-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.info-item {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	.info-label {
		font-size: 0.75rem;
		font-weight: 600;
		color: #64748b;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	.info-value {
		font-size: 0.95rem;
		font-weight: 500;
		color: #0f172a;
	}
	.font-mono {
		font-family: monospace;
		color: #1d4ed8;
		font-weight: 700;
		background: #eff6ff;
		padding: 0.1rem 0.4rem;
		border-radius: 4px;
		width: fit-content;
	}
	.note {
		margin-top: 1.5rem;
		padding: 0.875rem;
		background: #f8fafc;
		border-radius: 8px;
		font-size: 0.8rem;
		color: #475569;
		border: 1px solid #e2e8f0;
	}

	/* Edit Form */
	.edit-form {
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
		font-size: 0.82rem;
		font-weight: 600;
		color: #374151;
	}
	.form-input {
		padding: 0.65rem 0.875rem;
		border: 1px solid #e2e8f0;
		border-radius: 9px;
		font-size: 0.9rem;
		font-family: inherit;
		outline: none;
		background: #f8fafc;
		transition: all 0.2s;
	}
	.form-input:focus {
		background: white;
		border-color: #6366f1;
		box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
	}
	.form-textarea {
		resize: vertical;
		min-height: 100px;
	}

	.form-footer {
		margin-top: 0.5rem;
		display: flex;
		justify-content: flex-end;
	}
	.btn-primary {
		background: linear-gradient(135deg, #1e1b4b, #4c1d95);
		color: white;
		border: none;
		border-radius: 10px;
		padding: 0.65rem 1.5rem;
		font-size: 0.9rem;
		font-weight: 600;
		cursor: pointer;
		font-family: inherit;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		transition: transform 0.1s;
	}
	.btn-primary:hover {
		transform: translateY(-1px);
		box-shadow: 0 4px 10px rgba(76, 29, 149, 0.3);
	}
	.btn-primary:disabled {
		opacity: 0.7;
		cursor: not-allowed;
		transform: none;
		box-shadow: none;
	}

	.spinner {
		width: 14px;
		height: 14px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-top-color: white;
		border-radius: 50%;
		animation: spin 0.7s linear infinite;
	}
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	@media (max-width: 900px) {
		.profile-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
