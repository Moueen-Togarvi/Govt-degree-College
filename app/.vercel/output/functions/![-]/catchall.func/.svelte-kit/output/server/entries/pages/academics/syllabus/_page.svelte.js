import { Y as escape_html, c as ensure_array_like, g as stringify, l as head, q as attr } from "../../../../chunks/dev.js";
import { t as Download } from "../../../../chunks/download.js";
import { t as File_text } from "../../../../chunks/file-text.js";
import { t as PageHero } from "../../../../chunks/PageHero.js";
//#region src/routes/academics/syllabus/+page.svelte
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
			label: "Syllabus",
			href: "/academics/syllabus"
		}
	];
	const categories = [{
		name: "BISE Bahawalpur Intermediate Syllabus",
		items: [
			"FSc Pre-Medical (Part I & II)",
			"FSc Pre-Engineering (Part I & II)",
			"ICS Syllabus",
			"FA Subjects Syllabus"
		]
	}, {
		name: "KFUEIT BS Programs Curriculum",
		items: [
			"BS Computer Science Roadmap",
			"BS Mathematics Course Outline",
			"BS English Semester Wise",
			"BS Chemistry Syllabus"
		]
	}];
	head("71x1zv", $$renderer, ($$renderer) => {
		$$renderer.title(($$renderer) => {
			$$renderer.push(`<title>Syllabus &amp; Curriculum | GPGC Bahawalnagar</title>`);
		});
	});
	PageHero($$renderer, {
		title: "Syllabus & Curriculum",
		subtitle: "Access the detailed roadmap for your academic journey.",
		breadcrumbs,
		image: "/images/gallery/474603631_1113700027116416_3753317337439731517_n.jpg"
	});
	$$renderer.push(`<!----> <section class="py-24 bg-white"><div class="container mx-auto px-4 lg:px-8"><div class="max-w-4xl mx-auto space-y-16"><!--[-->`);
	const each_array = ensure_array_like(categories);
	for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
		let cat = each_array[$$index_1];
		$$renderer.push(`<div class="space-y-8"><h2 class="text-3xl font-black text-primary border-l-8 border-secondary pl-6">${escape_html(cat.name)}</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><!--[-->`);
		const each_array_1 = ensure_array_like(cat.items);
		for (let $$index = 0, $$length = each_array_1.length; $$index < $$length; $$index++) {
			let item = each_array_1[$$index];
			$$renderer.push(`<div class="flex items-center justify-between p-6 bg-neutral-soft rounded-2xl border border-border-soft hover:shadow-md transition-all group"><div class="flex items-center gap-4"><div class="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors">`);
			File_text($$renderer, { size: 20 });
			$$renderer.push(`<!----></div> <h3 class="font-bold text-primary text-sm">${escape_html(item)}</h3></div> <button class="p-2 text-secondary hover:bg-secondary/10 rounded-lg transition-all"${attr("aria-label", `Download ${stringify(item)}`)}>`);
			Download($$renderer, { size: 18 });
			$$renderer.push(`<!----></button></div>`);
		}
		$$renderer.push(`<!--]--></div></div>`);
	}
	$$renderer.push(`<!--]--></div></div></section>`);
}
//#endregion
export { _page as default };
