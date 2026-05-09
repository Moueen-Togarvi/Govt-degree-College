<script lang="ts">
	import PageHero from '$lib/components/shared/PageHero.svelte';
	import { Banknote } from 'lucide-svelte';
	
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Admissions', href: '/admissions/how-to-apply' },
		{ label: 'Fee Structure', href: '/admissions/fee-structure' }
	];

	const fees = [
		{
			category: "Intermediate (11th & 12th)",
			fee: "Free",
			detail: "Intermediate classes are free under the Government of Punjab."
		},
		{
			category: "BS Morning Program",
			fee: "Rs. 8,000",
			detail: "Current announced fee for the morning BS program."
		},
		{
			category: "BS Evening Program",
			fee: "Rs. 20,000",
			detail: "Current announced fee for the evening BS program."
		}
	];
</script>

<svelte:head>
	<title>Fee Structure | Admissions | GPGC Bahawalnagar</title>
</svelte:head>

<PageHero 
	title="Fee Structure" 
	subtitle="Affordable quality education for every student."
	{breadcrumbs}
	image="/images/gallery/547755271_1299324492205854_5011253499358894922_n.jpg"
/>

<section class="py-24 bg-white">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="max-w-4xl mx-auto space-y-12">
			<div class="overflow-hidden rounded-3xl border border-border-soft shadow-sm">
				<table class="w-full text-left">
					<thead class="bg-primary text-white">
						<tr>
							<th class="px-8 py-6 text-sm font-black uppercase tracking-widest">Program Category</th>
							<th class="px-8 py-6 text-sm font-black uppercase tracking-widest">Current Fee</th>
							<th class="px-8 py-6 text-sm font-black uppercase tracking-widest">Details</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-neutral-100">
						{#each fees as item}
							<tr class="hover:bg-neutral-soft transition-colors group">
								<td class="px-8 py-8 font-black text-primary text-xl">{item.category}</td>
								<td class="px-8 py-8 font-bold text-primary/70">{item.fee}</td>
								<td class="px-8 py-8">
									<p class="max-w-md text-sm font-medium leading-7 text-primary/70">{item.detail}</p>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<div class="flex items-start gap-6 p-10 bg-secondary/5 rounded-3xl border border-secondary/20 italic text-primary/70 font-medium">
				<Banknote size={32} class="text-secondary shrink-0" />
				<p>Note: Fee structure har saal change ho sakti hai. Final fee amount admission ke waqt official challan ya college notice ke mutabiq apply hogi.</p>
			</div>
		</div>
	</div>
</section>
