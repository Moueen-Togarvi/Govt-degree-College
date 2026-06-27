<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	function statusClass(status: string) {
		switch (status) {
			case 'paid':
				return 'status-paid';
			case 'overdue':
				return 'status-overdue';
			case 'pending':
			default:
				return 'status-pending';
		}
	}
</script>

<svelte:head><title>Fee Status — Student Portal | GPGC</title></svelte:head>

<div class="page">
	<div class="page-header">
		<div>
			<h1 class="page-title">💳 Fee Status</h1>
			<p class="page-subtitle">View your semester fee records and challans</p>
		</div>
	</div>

	{#if data.fee_records.length === 0}
		<div class="empty-state">
			<span>💳</span>
			<h3>No Fee Records Found</h3>
			<p>Your fee records have not been uploaded yet.</p>
		</div>
	{:else}
		<div class="fee-grid">
			{#each data.fee_records as fee}
				<div class="fee-card">
					<div class="fee-header">
						<span class="semester-badge">Semester {fee.semester}</span>
						<span class="status-badge {statusClass(fee.status)}">{fee.status.toUpperCase()}</span>
					</div>

					<div class="fee-amount">
						<span class="currency">Rs.</span>
						<span class="amount">{parseFloat(fee.amount).toLocaleString()}</span>
					</div>

					<div class="fee-details">
						{#if fee.challan_no}
							<div class="detail-row">
								<span class="label">Challan No:</span>
								<span class="value font-mono">{fee.challan_no}</span>
							</div>
						{/if}
						{#if fee.due_date}
							<div class="detail-row">
								<span class="label">Due Date:</span>
								<span class="value">{new Date(fee.due_date).toLocaleDateString()}</span>
							</div>
						{/if}
						{#if fee.paid_date}
							<div class="detail-row">
								<span class="label">Paid Date:</span>
								<span class="value font-semibold text-green-600"
									>{new Date(fee.paid_date).toLocaleDateString()}</span
								>
							</div>
						{/if}
					</div>

					{#if fee.status === 'pending' || fee.status === 'overdue'}
						<div class="fee-actions">
							<button class="btn-print">🖨️ Print Challan</button>
							<button class="btn-pay">💳 Pay Online</button>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
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

	.empty-state {
		text-align: center;
		padding: 4rem 2rem;
		background: white;
		border-radius: 14px;
		border: 1px solid #e2e8f0;
	}
	.empty-state span {
		font-size: 3rem;
		display: block;
		margin-bottom: 1rem;
	}
	.empty-state h3 {
		font-size: 1.1rem;
		color: #0f172a;
		margin: 0 0 0.5rem;
	}
	.empty-state p {
		font-size: 0.9rem;
		color: #64748b;
		margin: 0;
	}

	.fee-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 1.5rem;
	}
	.fee-card {
		background: white;
		border-radius: 16px;
		padding: 1.5rem;
		border: 1px solid #e2e8f0;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		transition: transform 0.2s;
	}
	.fee-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
	}

	.fee-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.semester-badge {
		font-size: 0.8rem;
		font-weight: 700;
		color: #475569;
		background: #f1f5f9;
		padding: 0.25rem 0.75rem;
		border-radius: 999px;
	}

	.status-badge {
		font-size: 0.7rem;
		font-weight: 800;
		padding: 0.25rem 0.75rem;
		border-radius: 999px;
		letter-spacing: 0.05em;
	}
	.status-paid {
		background: #dcfce3;
		color: #166534;
		border: 1px solid #bbf7d0;
	}
	.status-pending {
		background: #fef3c7;
		color: #92400e;
		border: 1px solid #fde68a;
	}
	.status-overdue {
		background: #fee2e2;
		color: #991b1b;
		border: 1px solid #fecaca;
	}

	.fee-amount {
		display: flex;
		align-items: baseline;
		gap: 0.25rem;
		padding-bottom: 1rem;
		border-bottom: 1px dashed #e2e8f0;
	}
	.currency {
		font-size: 1rem;
		font-weight: 600;
		color: #64748b;
	}
	.amount {
		font-size: 2.25rem;
		font-weight: 800;
		color: #0f172a;
		line-height: 1;
	}

	.fee-details {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}
	.detail-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.85rem;
	}
	.label {
		color: #64748b;
	}
	.value {
		color: #0f172a;
		font-weight: 500;
	}

	.font-mono {
		font-family: monospace;
		background: #f8fafc;
		padding: 0.1rem 0.4rem;
		border-radius: 4px;
		border: 1px solid #e2e8f0;
		font-weight: 600;
	}
	.text-green-600 {
		color: #16a34a;
	}
	.font-semibold {
		font-weight: 600;
	}

	.fee-actions {
		display: flex;
		gap: 0.75rem;
		margin-top: auto;
		padding-top: 0.5rem;
	}
	.btn-print {
		flex: 1;
		background: white;
		color: #475569;
		border: 1px solid #cbd5e1;
		border-radius: 8px;
		padding: 0.6rem;
		font-size: 0.85rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s;
	}
	.btn-print:hover {
		background: #f8fafc;
		border-color: #94a3b8;
	}
	.btn-pay {
		flex: 1;
		background: linear-gradient(135deg, #0284c7, #0369a1);
		color: white;
		border: none;
		border-radius: 8px;
		padding: 0.6rem;
		font-size: 0.85rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s;
	}
	.btn-pay:hover {
		filter: brightness(1.1);
		transform: translateY(-1px);
	}
</style>
