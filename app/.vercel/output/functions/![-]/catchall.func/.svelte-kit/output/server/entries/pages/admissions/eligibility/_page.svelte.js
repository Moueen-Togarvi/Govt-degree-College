import { Y as escape_html, c as ensure_array_like, l as head } from "../../../../chunks/dev.js";
import { t as Circle_check_big } from "../../../../chunks/circle-check-big.js";
import { t as PageHero } from "../../../../chunks/PageHero.js";
//#region src/routes/admissions/eligibility/+page.svelte
function _page($$renderer) {
	const breadcrumbs = [
		{
			label: "Home",
			href: "/"
		},
		{
			label: "Admissions",
			href: "/admissions/how-to-apply"
		},
		{
			label: "Eligibility",
			href: "/admissions/eligibility"
		}
	];
	const criteria = [{
		program: "Intermediate (FSc/FA)",
		marks: "Minimum 60% in Matriculation",
		age: "Maximum 18 years",
		reqs: [
			"Matric Certificate",
			"B-Form / CNIC",
			"Domicile"
		]
	}, {
		program: "BS Programs (4-Year)",
		marks: "Minimum 50% in Intermediate",
		age: "Maximum 22 years",
		reqs: [
			"Intermediate Certificate",
			"CNIC",
			"Character Certificate"
		]
	}];
	head("99bxpl", $$renderer, ($$renderer) => {
		$$renderer.title(($$renderer) => {
			$$renderer.push(`<title>Eligibility | Admissions | GPGC Bahawalnagar</title>`);
		});
	});
	PageHero($$renderer, {
		title: "Admission Eligibility",
		subtitle: "Check the minimum requirements for your desired program.",
		breadcrumbs,
		image: "/images/gallery/491999992_1166947772110194_8921941246071863873_n.jpg"
	});
	$$renderer.push(`<!----> <section class="py-24 bg-white"><div class="container mx-auto px-4 lg:px-8"><div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12"><!--[-->`);
	const each_array = ensure_array_like(criteria);
	for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
		let item = each_array[$$index_1];
		$$renderer.push(`<div class="bg-neutral-soft p-12 rounded-3xl border border-border-soft hover:shadow-xl transition-all space-y-8 relative overflow-hidden group"><div class="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform"></div> <div class="space-y-2"><h3 class="text-3xl font-black text-primary">${escape_html(item.program)}</h3> <div class="w-16 h-1.5 bg-secondary rounded-full"></div></div> <div class="space-y-6"><div class="space-y-2"><p class="text-xs font-black uppercase tracking-widest text-secondary">Academic Marks</p> <p class="text-xl font-bold text-primary">${escape_html(item.marks)}</p></div> <div class="space-y-2"><p class="text-xs font-black uppercase tracking-widest text-secondary">Age Limit</p> <p class="text-xl font-bold text-primary">${escape_html(item.age)}</p></div> <div class="space-y-4"><p class="text-xs font-black uppercase tracking-widest text-secondary">Documents Required</p> <div class="flex flex-wrap gap-2"><!--[-->`);
		const each_array_1 = ensure_array_like(item.reqs);
		for (let $$index = 0, $$length = each_array_1.length; $$index < $$length; $$index++) {
			let req = each_array_1[$$index];
			$$renderer.push(`<span class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-bold">`);
			Circle_check_big($$renderer, {
				size: 14,
				class: "text-secondary"
			});
			$$renderer.push(`<!----> ${escape_html(req)}</span>`);
		}
		$$renderer.push(`<!--]--></div></div></div></div>`);
	}
	$$renderer.push(`<!--]--></div></div></section>`);
}
//#endregion
export { _page as default };
