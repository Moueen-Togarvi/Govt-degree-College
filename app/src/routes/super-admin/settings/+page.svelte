<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
	let seeding = $state(false);

	const totalUsers = $derived(
		(data.counts?.coordinator ?? 0) +
			(data.counts?.faculty ?? 0) +
			(data.counts?.student ?? 0) +
			(data.counts?.super_admin ?? 0)
	);
</script>

<svelte:head><title>Settings — Super Admin | GPGC Portal</title></svelte:head>

<div class="adm-page">
	<div class="adm-head">
		<div>
			<h1 class="adm-title">⚙️ Settings</h1>
			<p class="adm-sub">Account, system status and maintenance tools.</p>
		</div>
	</div>

	{#if form?.error}
		<div class="adm-alert adm-alert--error">⚠️ {form.error}</div>
	{/if}
	{#if form?.success}
		<div class="adm-alert adm-alert--success">✅ {form.message}</div>
	{/if}

	<div class="adm-grid-2" style="align-items:start">
		<!-- Account -->
		<div class="adm-card">
			<div class="adm-card__head"><h2 class="adm-card__title">👤 Admin Account</h2></div>
			<div class="adm-card__body">
				<div class="kv">
					<span class="kv-k">Name</span><span class="kv-v is-strong">{data.user.name}</span>
				</div>
				<div class="kv">
					<span class="kv-k">Email</span><span class="kv-v">{data.user.email}</span>
				</div>
				<div class="kv">
					<span class="kv-k">Role</span>
					<span class="kv-v"><span class="adm-badge adm-badge--purple">Super Admin</span></span>
				</div>
				<div class="kv">
					<span class="kv-k">Status</span>
					<span class="kv-v">
						<span class="adm-status-dot adm-status-dot--green"></span>
						Active
					</span>
				</div>
				<div class="adm-hint" style="margin-top:.75rem">
					To change the admin password, update it in the database or run
					<code class="adm-code">npm run db:setup</code>.
				</div>
			</div>
		</div>

		<!-- System status -->
		<div class="adm-card">
			<div class="adm-card__head"><h2 class="adm-card__title">🩺 System Status</h2></div>
			<div class="adm-card__body">
				<div class="status-line">
					<span
						class="adm-status-dot {data.dbConfigured
							? 'adm-status-dot--green'
							: 'adm-status-dot--red'}"
					></span>
					<span class="is-strong">Database configured</span>
					<span class="adm-muted" style="margin-left:auto"
						>{data.dbConfigured ? 'Yes' : 'No DATABASE_URL'}</span
					>
				</div>
				<div class="status-line">
					<span
						class="adm-status-dot {data.dbReady ? 'adm-status-dot--green' : 'adm-status-dot--red'}"
					></span>
					<span class="is-strong">Database reachable</span>
					<span class="adm-muted" style="margin-left:auto"
						>{data.dbReady ? 'Connected' : 'Unreachable'}</span
					>
				</div>
				<hr class="sep" />
				<div class="status-line">
					<span>🏛️ Departments</span>
					<span class="is-strong" style="margin-left:auto">{data.deptCount}</span>
				</div>
				<div class="status-line">
					<span>👥 Coordinators</span>
					<span class="is-strong" style="margin-left:auto">{data.counts?.coordinator ?? 0}</span>
				</div>
				<div class="status-line">
					<span>👨‍🏫 Faculty</span>
					<span class="is-strong" style="margin-left:auto">{data.counts?.faculty ?? 0}</span>
				</div>
				<div class="status-line">
					<span>🎓 Students</span>
					<span class="is-strong" style="margin-left:auto">{data.counts?.student ?? 0}</span>
				</div>
				<hr class="sep" />
				<div class="status-line">
					<span class="adm-muted">Total users</span>
					<span class="is-strong" style="margin-left:auto">{totalUsers}</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Maintenance -->
	<div class="adm-card">
		<div class="adm-card__head"><h2 class="adm-card__title">🛠️ Maintenance</h2></div>
		<div class="adm-card__body">
			<div class="maint">
				<div>
					<div class="is-strong">Re-seed demo content</div>
					<div class="adm-muted" style="font-size:.85rem">
						Ensures all content tables exist and fills any that are empty with the default
						announcements, events, notices, news, results and quick links. Existing data is not
						removed.
					</div>
				</div>
				<form
					method="POST"
					action="?/seed"
					use:enhance={() => {
						seeding = true;
						return async ({ update }) => {
							seeding = false;
							await update();
						};
					}}
				>
					<button
						type="submit"
						class="adm-btn adm-btn--primary"
						disabled={seeding}
						onclick={(e) => {
							if (!confirm('Re-seed empty content tables now?')) e.preventDefault();
						}}
					>
						{#if seeding}<span class="adm-spin"></span>{/if}
						Re-seed Content
					</button>
				</form>
			</div>
		</div>
	</div>
</div>

<style>
	.kv {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.55rem 0;
		border-bottom: 1px solid #f1f5f9;
		font-size: 0.88rem;
	}
	.kv:last-child {
		border-bottom: none;
	}
	.kv-k {
		color: #64748b;
	}
	.kv-v {
		color: #0f172a;
	}
	.status-line {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.45rem 0;
		font-size: 0.88rem;
	}
	.sep {
		border: none;
		border-top: 1px solid #f1f5f9;
		margin: 0.6rem 0;
	}
	.maint {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		flex-wrap: wrap;
	}
	.maint > div:first-child {
		flex: 1;
		min-width: 240px;
	}
</style>
