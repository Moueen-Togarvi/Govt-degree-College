import { Y as escape_html, c as ensure_array_like, g as stringify, l as head, q as attr } from "../../../../chunks/dev.js";
import { t as Download } from "../../../../chunks/download.js";
import { t as File_text } from "../../../../chunks/file-text.js";
import { t as PageHero } from "../../../../chunks/PageHero.js";
//#region src/routes/admissions/forms/+page.svelte
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
			label: "Downloadable Forms",
			href: "/admissions/forms"
		}
	];
	const forms = [
		{
			name: "BS Admission Form",
			size: "1.2 MB",
			format: "PDF"
		},
		{
			name: "Intermediate Admission Form",
			size: "800 KB",
			format: "PDF"
		},
		{
			name: "Scholarship Application Form",
			size: "500 KB",
			format: "PDF"
		},
		{
			name: "Character Certificate Request",
			size: "300 KB",
			format: "DOCX"
		}
	];
	head("1k95963", $$renderer, ($$renderer) => {
		$$renderer.title(($$renderer) => {
			$$renderer.push(`<title>Forms | Admissions | GPGC Bahawalnagar</title>`);
		});
	});
	PageHero($$renderer, {
		title: "Downloadable Forms",
		subtitle: "Access all necessary documents and application forms here.",
		breadcrumbs,
		image: "/images/gallery/488936577_1152937786844526_8441555087243500544_n.jpg"
	});
	$$renderer.push(`<!----> <section class="py-24 bg-white"><div class="container mx-auto px-4 lg:px-8"><div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"><!--[-->`);
	const each_array = ensure_array_like(forms);
	for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
		let form = each_array[$$index];
		$$renderer.push(`<div class="flex items-center justify-between p-6 bg-neutral-soft rounded-2xl border border-border-soft hover:shadow-md transition-all group"><div class="flex items-center gap-4"><div class="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors">`);
		File_text($$renderer, { size: 24 });
		$$renderer.push(`<!----></div> <div class="space-y-0.5"><h3 class="font-bold text-primary">${escape_html(form.name)}</h3> <p class="text-xs text-primary/50 font-bold uppercase tracking-wider">${escape_html(form.size)} • ${escape_html(form.format)}</p></div></div> <button class="p-3 text-secondary hover:bg-secondary/10 rounded-xl transition-all"${attr("aria-label", `Download ${stringify(form.name)}`)}>`);
		Download($$renderer, { size: 20 });
		$$renderer.push(`<!----></button></div>`);
	}
	$$renderer.push(`<!--]--></div></div></section>`);
}
//#endregion
export { _page as default };
