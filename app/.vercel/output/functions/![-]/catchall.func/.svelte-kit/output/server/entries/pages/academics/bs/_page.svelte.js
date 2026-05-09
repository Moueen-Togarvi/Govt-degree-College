import { Y as escape_html, c as ensure_array_like, l as head } from "../../../../chunks/dev.js";
import { t as External_link } from "../../../../chunks/external-link.js";
import { t as Graduation_cap } from "../../../../chunks/graduation-cap.js";
import { t as PageHero } from "../../../../chunks/PageHero.js";
//#region src/routes/academics/bs/+page.svelte
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
			label: "BS Programs",
			href: "/academics/bs"
		}
	];
	const programs = [
		"BS Computer Science",
		"BS Mathematics",
		"BS English",
		"BS Physics",
		"BS Chemistry",
		"BS Botany",
		"BS Zoology",
		"BS Economics",
		"BS Islamiyat",
		"BS Urdu",
		"BS Psychology",
		"BS Statistics"
	];
	head("7n4wlz", $$renderer, ($$renderer) => {
		$$renderer.title(($$renderer) => {
			$$renderer.push(`<title>BS Programs (4-Year) | GPGC Bahawalnagar</title>`);
		});
	});
	PageHero($$renderer, {
		title: "BS Programs (4-Year)",
		subtitle: "Affiliated with KFUEIT Rahim Yar Khan. Excellence in higher education.",
		breadcrumbs,
		image: "/images/gallery/682757218_1491086206363014_2879876708562002240_n.jpg"
	});
	$$renderer.push(`<!----> <section class="py-24 bg-white"><div class="container mx-auto px-4 lg:px-8"><div class="max-w-6xl mx-auto space-y-16"><div class="bg-primary p-12 rounded-3xl text-white relative overflow-hidden group"><div class="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -mr-32 -mt-32"></div> <div class="relative z-10 space-y-6"><div class="inline-flex items-center gap-2 bg-secondary/20 px-4 py-1.5 rounded-full text-secondary text-sm font-black uppercase tracking-widest">Affiliation Alert</div> <h2 class="text-4xl font-black italic">Affiliated with KFUEIT Rahim Yar Khan</h2> <p class="text-white/70 max-w-3xl text-lg font-medium leading-relaxed">Our BS programs follow the academic calendar, examination system, and degree standards of Khawaja Fareed University of Engineering &amp; Information Technology. This ensures global recognition and academic quality for our students.</p> <a href="https://kfueit.edu.pk" target="_blank" class="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-xl font-black hover:bg-secondary hover:text-white transition-all shadow-xl">Visit KFUEIT Portal `);
	External_link($$renderer, { size: 18 });
	$$renderer.push(`<!----></a></div></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
	const each_array = ensure_array_like(programs);
	for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
		let program = each_array[$$index];
		$$renderer.push(`<div class="p-8 bg-neutral-soft rounded-2xl border border-border-soft hover:border-secondary hover:shadow-lg transition-all group flex items-center justify-between"><div class="flex items-center gap-4"><div class="w-12 h-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors">`);
		Graduation_cap($$renderer, { size: 24 });
		$$renderer.push(`<!----></div> <h3 class="text-lg font-black text-primary">${escape_html(program)}</h3></div></div>`);
	}
	$$renderer.push(`<!--]--></div></div></div></section>`);
}
//#endregion
export { _page as default };
