import { Y as escape_html, c as ensure_array_like, l as head } from "../../../../chunks/dev.js";
import { t as Circle_check_big } from "../../../../chunks/circle-check-big.js";
import { t as PageHero } from "../../../../chunks/PageHero.js";
//#region src/routes/academics/11th/+page.svelte
function _page($$renderer) {
	const breadcrumbs = [
		{
			label: "Home",
			href: "/"
		},
		{
			label: "Academics",
			href: "/academics/programs"
		},
		{
			label: "11th Class",
			href: "/academics/11th"
		}
	];
	const groups = [
		{
			name: "FSc Pre-Medical",
			subjects: [
				"Biology",
				"Chemistry",
				"Physics",
				"English",
				"Urdu",
				"Islamiyat"
			]
		},
		{
			name: "FSc Pre-Engineering",
			subjects: [
				"Mathematics",
				"Chemistry",
				"Physics",
				"English",
				"Urdu",
				"Islamiyat"
			]
		},
		{
			name: "ICS",
			subjects: [
				"Computer Science",
				"Mathematics",
				"Physics/Stats",
				"English",
				"Urdu",
				"Islamiyat"
			]
		},
		{
			name: "FA (General)",
			subjects: [
				"English Literature",
				"Fine Arts",
				"Education",
				"English",
				"Urdu",
				"Islamiyat"
			]
		}
	];
	head("clm240", $$renderer, ($$renderer) => {
		$$renderer.title(($$renderer) => {
			$$renderer.push(`<title>11th Class (Inter Part-I) | GPGC Bahawalnagar</title>`);
		});
	});
	PageHero($$renderer, {
		title: "Intermediate Part-I",
		subtitle: "The foundation of your higher education journey.",
		breadcrumbs,
		image: "/images/gallery/488504405_1150873360384302_7113898617720777839_n.jpg"
	});
	$$renderer.push(`<!----> <section class="py-24 bg-white"><div class="container mx-auto px-4 lg:px-8"><div class="grid grid-cols-1 md:grid-cols-2 gap-8"><!--[-->`);
	const each_array = ensure_array_like(groups);
	for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
		let group = each_array[$$index_1];
		$$renderer.push(`<div class="p-10 bg-neutral-soft rounded-3xl border border-border-soft hover:border-secondary hover:shadow-xl transition-all space-y-8 group"><h3 class="text-3xl font-black text-primary border-l-8 border-secondary pl-6">${escape_html(group.name)}</h3> <div class="grid grid-cols-2 gap-4"><!--[-->`);
		const each_array_1 = ensure_array_like(group.subjects);
		for (let $$index = 0, $$length = each_array_1.length; $$index < $$length; $$index++) {
			let subject = each_array_1[$$index];
			$$renderer.push(`<div class="flex items-center gap-3 text-primary/70 font-bold">`);
			Circle_check_big($$renderer, {
				size: 18,
				class: "text-secondary"
			});
			$$renderer.push(`<!----> <span>${escape_html(subject)}</span></div>`);
		}
		$$renderer.push(`<!--]--></div></div>`);
	}
	$$renderer.push(`<!--]--></div></div></section>`);
}
//#endregion
export { _page as default };
