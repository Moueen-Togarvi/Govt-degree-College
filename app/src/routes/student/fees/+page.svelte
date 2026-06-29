<script lang="ts">
	import type { PageData } from './$types';
	import { reveal, lift } from '$lib/admin/motion';
	import Wallet from 'lucide-svelte/icons/wallet';
	import Printer from 'lucide-svelte/icons/printer';
	import CreditCard from 'lucide-svelte/icons/credit-card';

	let { data }: { data: PageData } = $props();

	function statusClass(status: string) {
		switch (status) {
			case 'paid':
				return 'adm-badge--green';
			case 'overdue':
				return 'adm-badge--red';
			case 'pending':
			default:
				return 'adm-badge--amber';
		}
	}
</script>

<svelte:head><title>Fee Status — Student Portal | GPGC</title></svelte:head>

<div class="adm-page" use:reveal={{ y: 12 }}>
	<div class="adm-head">
		<div>
			<h1 class="adm-title">
				<Wallet size={22} stroke-width={2} /> Student Fee Status
			</h1>
			<p class="adm-sub">View semester-wise tuition fee details, print bank challan vouchers, or pay online</p>
		</div>
	</div>

	{#if data.fee_records.length === 0}
		<div class="adm-card" use:reveal={{ delay: 120, y: 12 }}>
			<div class="adm-empty">
				<div class="adm-empty__icon"><Wallet size={24} /></div>
				<h3>No Fee Records Available</h3>
				<p>Your semester fee statements and bank challans have not been uploaded by the accounts office yet.</p>
			</div>
		</div>
	{:else}
		<div class="fee-grid">
			{#each data.fee_records as fee, i}
				<div class="adm-card fee-card" use:reveal={{ delay: 50 * i, y: 12 }} use:lift>
					<div class="adm-card__body flex-col">
						<div class="card-top">
							<span class="semester-tag">Semester {fee.semester}</span>
							<span class="adm-badge {statusClass(fee.status)}">
								{fee.status.toUpperCase()}
							</span>
						</div>

						<div class="fee-amount">
							<span class="currency font-sans">PKR</span>
							<span class="val font-sans">{parseFloat(fee.amount).toLocaleString()}</span>
						</div>

						<div class="fee-details">
							{#if fee.challan_no}
								<div class="detail-row">
									<span class="lbl">Challan No:</span>
									<span class="adm-code">{fee.challan_no}</span>
								</div>
							{/if}
							{#if fee.due_date}
								<div class="detail-row">
									<span class="lbl">Due Date:</span>
									<span class="value font-semibold">{new Date(fee.due_date).toLocaleDateString()}</span>
								</div>
							{/if}
							{#if fee.paid_date}
								<div class="detail-row">
									<span class="lbl">Paid Date:</span>
									<span class="value text-emerald font-semibold">
										{new Date(fee.paid_date).toLocaleDateString()}
									</span>
								</div>
							{/if}
						</div>

						{#if fee.status === 'pending' || fee.status === 'overdue'}
							<div class="fee-actions">
								<button class="adm-btn adm-btn--ghost flex-1">
									<Printer size={13} /> Print Challan
								</button>
								<button class="adm-btn adm-btn--primary flex-1">
									<CreditCard size={13} /> Pay Online
								</button>
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.fee-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 1.25rem;
	}

	.fee-card {
		height: 100%;
	}

	.flex-col {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		height: 100%;
		box-sizing: border-box;
	}

	.card-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.semester-tag {
		font-size: 0.8rem;
		font-weight: 700;
		color: var(--adm-ink-2);
		background: var(--adm-line-soft);
		border: 1px solid var(--adm-line);
		padding: 0.2rem 0.6rem;
		border-radius: 6px;
	}

	.fee-amount {
		display: flex;
		align-items: baseline;
		gap: 0.3rem;
		padding-bottom: 0.85rem;
		border-bottom: 1.5px dashed var(--adm-line);
	}
	.currency {
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--adm-muted);
	}
	.val {
		font-size: 2.1rem;
		font-weight: 800;
		color: var(--adm-ink);
		line-height: 1;
	}

	.fee-details {
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
		flex: 1;
	}
	.detail-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.82rem;
	}
	.lbl {
		color: var(--adm-muted);
		font-weight: 500;
	}
	.value {
		color: var(--adm-ink-2);
	}

	.font-semibold {
		font-weight: 600;
	}
	.text-emerald {
		color: #059669;
	}

	.fee-actions {
		display: flex;
		gap: 0.65rem;
		margin-top: auto;
	}
	.flex-1 {
		flex: 1;
	}
</style>
