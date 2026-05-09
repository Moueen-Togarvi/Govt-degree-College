import { Y as escape_html, c as ensure_array_like, l as head, q as attr } from "../../../../chunks/dev.js";
import { t as Book_open } from "../../../../chunks/book-open.js";
import { t as Graduation_cap } from "../../../../chunks/graduation-cap.js";
import { t as Scroll_text } from "../../../../chunks/scroll-text.js";
import { t as PageHero } from "../../../../chunks/PageHero.js";
//#region src/routes/academics/programs/+page.svelte
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
			label: "Programs",
			href: "/academics/programs"
		}
	];
	const categories = [
		{
			title: "Intermediate Programs",
			icon: Book_open,
			desc: "FSc Pre-Medical, Pre-Engineering, ICS, and FA programs for high school graduates.",
			href: "/academics/11th"
		},
		{
			title: "BS Programs (4-Year)",
			icon: Graduation_cap,
			desc: "Comprehensive degree programs affiliated with KFUEIT in various disciplines.",
			href: "/academics/bs"
		},
		{
			title: "Syllabus & Curriculum",
			icon: Scroll_text,
			desc: "Access the latest BISE and HEC approved syllabus for all our offered courses.",
			href: "/academics/syllabus"
		}
	];
	head("7fiz7h", $$renderer, ($$renderer) => {
		$$renderer.title(($$renderer) => {
			$$renderer.push(`<title>Academic Programs | GPGC Bahawalnagar</title>`);
		});
	});
	PageHero($$renderer, {
		title: "Academic Programs",
		subtitle: "Diverse educational paths designed to help you achieve your career goals.",
		breadcrumbs,
		image: "/images/gallery/497498149_1184322940372677_5964474392879878424_n.jpg"
	});
	$$renderer.push(`<!----> <section class="py-24 bg-white"><div class="container mx-auto px-4 lg:px-8"><div class="grid grid-cols-1 md:grid-cols-3 gap-12"><!--[-->`);
	const each_array = ensure_array_like(categories);
	for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
		let category = each_array[$$index];
		$$renderer.push(`<a${attr("href", category.href)} class="flex flex-col p-10 bg-neutral-soft rounded-3xl border border-border-soft hover:border-secondary hover:shadow-xl transition-all group"><div class="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center group-hover:bg-secondary group-hover:scale-110 transition-all mb-8 shadow-lg shadow-primary/10">`);
		if (category.icon) {
			$$renderer.push("<!--[-->");
			category.icon($$renderer, { size: 32 });
			$$renderer.push("<!--]-->");
		} else {
			$$renderer.push("<!--[!-->");
			$$renderer.push("<!--]-->");
		}
		$$renderer.push(`</div> <h3 class="text-2xl font-black text-primary mb-4">${escape_html(category.title)}</h3> <p class="text-primary/70 leading-relaxed font-medium mb-8 flex-grow">${escape_html(category.desc)}</p> <span class="text-sm font-black text-secondary group-hover:translate-x-2 transition-transform">View Details →</span></a>`);
	}
	$$renderer.push(`<!--]--></div></div></section> <section class="py-24 bg-primary text-white overflow-hidden relative"><div class="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -mr-32 -mt-32"></div> <div class="container mx-auto px-4 lg:px-8 text-center space-y-8 relative z-10"><h2 class="text-4xl lg:text-5xl font-black leading-tight">Empowering Students Through <br/> Academic Excellence</h2> <p class="text-white/70 max-w-2xl mx-auto text-lg font-medium">Join over 5,000 students who are building their future at Bahawalnagar's most prestigious institution.</p> <div class="flex justify-center gap-4"><a href="/admissions/how-to-apply" class="px-8 py-4 bg-secondary text-white rounded-xl font-black shadow-xl shadow-secondary/20 hover:scale-105 transition-all">Start Application</a></div></div></section>`);
}
//#endregion
export { _page as default };
