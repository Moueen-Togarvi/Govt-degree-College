import { Y as escape_html, c as ensure_array_like, l as head, n as attr_class, o as derived, q as attr } from "../../../../chunks/dev.js";
import { t as PageHero } from "../../../../chunks/PageHero.js";
//#region src/routes/about/faculty/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const breadcrumbs = [
			{
				label: "Home",
				href: "/"
			},
			{
				label: "About",
				href: "/about/overview"
			},
			{
				label: "Faculty",
				href: "/about/faculty"
			}
		];
		const departments = derived(() => data.departments);
		let activeDepartment = "all";
		let activeLanguage = "english";
		const visibleDepartments = derived(() => activeDepartment === "all" ? departments() : departments().filter((department) => department.id === activeDepartment));
		function getDepartmentHead(department) {
			return department.staff.find((member) => member.isHod) ?? null;
		}
		function getDepartmentCoordinator(department) {
			return department.coordinator ?? department.staff.find((member) => member.isCoordinator) ?? null;
		}
		function getDepartmentFaculty(department) {
			const head = getDepartmentHead(department);
			const coordinator = getDepartmentCoordinator(department);
			return department.staff.filter((member) => member.id !== head?.id && member.id !== coordinator?.id && member.isTeachingStaff);
		}
		function getDepartmentLeadRoleCount(department) {
			const ids = /* @__PURE__ */ new Set();
			const head = getDepartmentHead(department);
			const coordinator = getDepartmentCoordinator(department);
			if (head) ids.add(head.id);
			if (coordinator) ids.add(coordinator.id);
			return ids.size;
		}
		head("1yibhrh", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Faculty | About Us | GPGC Bahawalnagar</title>`);
			});
		});
		PageHero($$renderer, {
			title: "Our Faculty",
			subtitle: "Experienced educators committed to student success.",
			breadcrumbs,
			image: "/images/gallery/474603631_1113700027116416_3753317337439731517_n.jpg"
		});
		$$renderer.push(`<!----> <section class="bg-white py-24"><div class="container mx-auto px-4 lg:px-8"><div class="space-y-14"><div class="overflow-hidden rounded-[2.25rem] border border-primary/10 bg-[linear-gradient(145deg,rgba(248,249,250,0.96),rgba(255,255,255,1))] p-6 shadow-[0_24px_80px_rgba(13,93,86,0.08)] lg:p-8"><div class="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"><div><p class="text-sm font-black uppercase tracking-[0.32em] text-secondary">Faculty Search</p> <h2 class="mt-3 max-w-3xl text-3xl font-black text-primary lg:text-4xl">Explore departments through a cleaner, premium faculty directory.</h2> <p class="mt-4 max-w-2xl text-base leading-8 text-primary/65">Choose a department, switch language, and view department leadership and faculty in a more structured layout.</p></div> <div class="inline-flex rounded-full border border-primary/10 bg-white p-1.5 shadow-sm"><button type="button"${attr_class(`rounded-full px-5 py-3 text-sm font-black uppercase tracking-[0.18em] transition ${activeLanguage === "english" ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-primary/60 hover:text-primary"}`)}>English</button> <button type="button"${attr_class(`rounded-full px-5 py-3 text-sm font-black uppercase tracking-[0.18em] transition ${activeLanguage === "urdu" ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-primary/60 hover:text-primary"}`)}>Urdu</button></div></div> <div class="mt-8 flex flex-wrap gap-3"><button type="button"${attr_class(`rounded-full border px-5 py-3 text-sm font-black transition ${activeDepartment === "all" ? "border-primary bg-primary text-white shadow-lg shadow-primary/20" : "border-border-soft bg-white text-primary hover:border-secondary hover:text-secondary"}`)}># All Departments</button> <!--[-->`);
		const each_array = ensure_array_like(departments());
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let department = each_array[$$index];
			$$renderer.push(`<button type="button"${attr_class(`rounded-full border px-5 py-3 text-sm font-black transition ${activeDepartment === department.id ? "border-primary bg-primary text-white shadow-lg shadow-primary/20" : "border-border-soft bg-white text-primary hover:border-secondary hover:text-secondary"}`)}># ${escape_html(activeLanguage === "english" ? department.name : department.urduName)}</button>`);
		}
		$$renderer.push(`<!--]--></div></div> `);
		if (visibleDepartments().length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="rounded-[2.5rem] border border-dashed border-primary/20 bg-neutral-soft/70 p-10 text-center text-primary/55"><p class="text-sm font-black uppercase tracking-[0.3em] text-secondary">${escape_html(activeLanguage === "english" ? "Faculty Directory" : "فیکلٹی ڈائریکٹری")}</p> <p class="mt-4 text-base font-semibold">${escape_html(activeLanguage === "english" ? "Departments and teachers added from admin will appear here." : "ایڈمن سے شامل کیے گئے شعبے اور اساتذہ یہاں ظاہر ہوں گے۔")}</p></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <!--[-->`);
		const each_array_1 = ensure_array_like(visibleDepartments());
		for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
			let dept = each_array_1[$$index_2];
			const head = getDepartmentHead(dept);
			const coordinator = getDepartmentCoordinator(dept);
			$$renderer.push(`<div class="overflow-hidden rounded-[2.5rem] border border-primary/10 bg-[linear-gradient(150deg,rgba(255,255,255,1),rgba(248,249,250,0.94))] p-6 shadow-[0_28px_90px_rgba(13,93,86,0.08)] lg:p-8"><div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div><p class="text-sm font-black uppercase tracking-[0.3em] text-secondary">${escape_html(activeLanguage === "english" ? "Academic Department" : "تعلیمی شعبہ")}</p> <h2 class="mt-3 text-3xl font-black text-primary lg:text-4xl">${escape_html(activeLanguage === "english" ? `${dept.name} Department` : `${dept.urduName} ڈیپارٹمنٹ`)}</h2></div> <div class="inline-flex w-fit rounded-full border border-primary/10 bg-white/80 px-5 py-3 text-sm font-black uppercase tracking-[0.22em] text-primary/65 shadow-sm">${escape_html(activeLanguage === "english" ? "Leadership & Faculty" : "قیادت اور فیکلٹی")}</div></div> <div class="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]"><div class="grid gap-6 md:grid-cols-2"><div class="relative overflow-hidden rounded-[2.25rem] border border-secondary/20 bg-[linear-gradient(145deg,rgba(247,148,29,0.10),rgba(255,255,255,1))] p-6 shadow-[0_24px_70px_rgba(247,148,29,0.10)]"><div class="absolute right-0 top-0 h-28 w-28 rounded-full bg-secondary/10 blur-3xl"></div> <div class="relative space-y-5"><div class="inline-flex rounded-full border border-secondary/20 bg-white/85 px-4 py-2 text-[11px] font-black uppercase tracking-[0.28em] text-secondary shadow-sm">${escape_html(activeLanguage === "english" ? "Head of Department" : "شعبہ سربراہ")}</div> <div class="relative overflow-hidden rounded-[1.8rem] border border-white/80 bg-[linear-gradient(180deg,rgba(233,245,255,0.95),rgba(255,255,255,1))] shadow-lg">`);
			if (head) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<img${attr("src", head.photo)}${attr("alt", activeLanguage === "english" ? head.name : head.urduName)} class="h-72 w-full object-contain object-center p-3"/> <div class="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-white/40 blur-md"></div>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<div class="flex h-72 items-center justify-center bg-neutral-soft text-center text-sm font-bold text-primary/45">${escape_html(activeLanguage === "english" ? "HOD will be added soon" : "HOD جلد شامل کیا جائے گا")}</div>`);
			}
			$$renderer.push(`<!--]--></div> <div class="space-y-2"><h3 class="text-2xl font-black text-primary">${escape_html(head ? activeLanguage === "english" ? head.name : head.urduName : activeLanguage === "english" ? "Pending Assignment" : "جلد مقرر ہوگا")}</h3> <p class="text-sm font-black uppercase tracking-[0.2em] text-primary/45">${escape_html(activeLanguage === "english" ? "Department Leadership" : "شعبہ قیادت")}</p> <p class="text-base font-semibold leading-7 text-primary/70">${escape_html(head ? activeLanguage === "english" ? head.qualification : head.urduQualification : activeLanguage === "english" ? "Add a teacher in admin and mark them as HOD." : "ایڈمن میں استاد شامل کر کے انہیں HOD مارک کریں۔")}</p></div></div></div> <div class="relative overflow-hidden rounded-[2.25rem] border border-primary/10 bg-[linear-gradient(145deg,rgba(13,93,86,0.06),rgba(255,255,255,1))] p-6 shadow-[0_24px_70px_rgba(13,93,86,0.10)]"><div class="absolute bottom-0 left-0 h-28 w-28 rounded-full bg-primary/10 blur-3xl"></div> <div class="relative space-y-5"><div class="inline-flex rounded-full border border-primary/10 bg-white/85 px-4 py-2 text-[11px] font-black uppercase tracking-[0.28em] text-secondary shadow-sm">${escape_html(activeLanguage === "english" ? "Department Coordinator" : "ڈیپارٹمنٹ کوآرڈینیٹر")}</div> <div class="relative overflow-hidden rounded-[1.8rem] border border-white/80 bg-[linear-gradient(180deg,rgba(233,245,255,0.95),rgba(255,255,255,1))] shadow-lg">`);
			if (coordinator) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<img${attr("src", coordinator.photo)}${attr("alt", activeLanguage === "english" ? coordinator.name : coordinator.urduName)} class="h-72 w-full object-contain object-center p-3"/> <div class="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-white/40 blur-md"></div>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<div class="flex h-72 items-center justify-center bg-neutral-soft text-center text-sm font-bold text-primary/45">${escape_html(activeLanguage === "english" ? "Coordinator will be added soon" : "Coordinator جلد شامل کیا جائے گا")}</div>`);
			}
			$$renderer.push(`<!--]--></div> <div class="space-y-2"><h3 class="text-2xl font-black text-primary">${escape_html(coordinator ? activeLanguage === "english" ? coordinator.name : coordinator.urduName : activeLanguage === "english" ? "Pending Assignment" : "جلد مقرر ہوگا")}</h3> <p class="text-sm font-black uppercase tracking-[0.2em] text-primary/45">${escape_html(activeLanguage === "english" ? "Academic Coordination" : "تعلیمی کوآرڈینیشن")}</p> <p class="text-base font-semibold leading-7 text-primary/70">${escape_html(coordinator ? activeLanguage === "english" ? coordinator.qualification : coordinator.urduQualification : activeLanguage === "english" ? "Add a teacher in admin and mark them as coordinator." : "ایڈمن میں استاد شامل کر کے انہیں coordinator مارک کریں۔")}</p></div></div></div></div> <div class="rounded-[2.25rem] border border-primary/10 bg-primary px-6 py-7 text-white shadow-[0_24px_70px_rgba(13,93,86,0.20)]"><p class="text-sm font-black uppercase tracking-[0.3em] text-secondary">${escape_html(activeLanguage === "english" ? "Department Snapshot" : "شعبہ جائزہ")}</p> <h3 class="mt-4 text-3xl font-black">${escape_html(activeLanguage === "english" ? dept.name : dept.urduName)}</h3> <p class="mt-4 text-base leading-8 text-white/72">${escape_html(activeLanguage === "english" ? "Faculty listings are arranged to highlight departmental leadership first, followed by teaching staff in a cleaner, easier-to-scan presentation." : "فیکلٹی لسٹنگ کو اس انداز میں ترتیب دیا گیا ہے کہ پہلے شعبہ جاتی قیادت نمایاں ہو اور پھر تدریسی عملہ ایک صاف اور بہتر انداز میں دکھائی دے۔")}</p> <div class="mt-8 grid grid-cols-2 gap-4"><div class="rounded-[1.4rem] border border-white/10 bg-white/8 p-4"><p class="text-[11px] font-black uppercase tracking-[0.24em] text-secondary">${escape_html(activeLanguage === "english" ? "Faculty Members" : "فیکلٹی ممبران")}</p> <p class="mt-3 text-3xl font-black">${escape_html(dept.staff.length)}</p></div> <div class="rounded-[1.4rem] border border-white/10 bg-white/8 p-4"><p class="text-[11px] font-black uppercase tracking-[0.24em] text-secondary">${escape_html(activeLanguage === "english" ? "Lead Roles" : "اہم عہدے")}</p> <p class="mt-3 text-3xl font-black">${escape_html(getDepartmentLeadRoleCount(dept))}</p></div></div></div></div> <div class="mt-10 flex items-center justify-between gap-4"><div><p class="text-sm font-black uppercase tracking-[0.3em] text-secondary">${escape_html(activeLanguage === "english" ? "Faculty Grid" : "فیکلٹی گرڈ")}</p> <h3 class="mt-3 text-2xl font-black text-primary">${escape_html(activeLanguage === "english" ? "Teaching Team" : "تدریسی ٹیم")}</h3></div> <div class="hidden h-px flex-1 bg-gradient-to-r from-secondary/50 to-transparent lg:block"></div></div> <div class="mt-8 grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4"><!--[-->`);
			const each_array_2 = ensure_array_like(getDepartmentFaculty(dept));
			for (let $$index_1 = 0, $$length = each_array_2.length; $$index_1 < $$length; $$index_1++) {
				let member = each_array_2[$$index_1];
				$$renderer.push(`<div class="group relative overflow-hidden rounded-[2rem] border border-primary/10 bg-white shadow-[0_18px_45px_rgba(13,93,86,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(13,93,86,0.14)]"><div class="relative overflow-hidden rounded-b-none bg-[linear-gradient(180deg,rgba(233,245,255,0.95),rgba(255,255,255,1))]"><img${attr("src", member.photo)}${attr("alt", activeLanguage === "english" ? member.name : member.urduName)} class="h-48 w-full object-contain object-center p-3 transition-transform duration-500 group-hover:scale-[1.03]"/> <div class="absolute bottom-2 right-2 h-6 w-6 rounded-full bg-white/40 blur-md opacity-50"></div></div> <div class="bg-[#0D5D56] p-5"><div class="inline-flex rounded-full bg-secondary/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-secondary border border-secondary/20 backdrop-blur-md">${escape_html(activeLanguage === "english" ? member.role : member.urduRole)}</div> <h3 class="mt-3 line-clamp-1 text-lg font-black text-white">${escape_html(activeLanguage === "english" ? member.name : member.urduName)}</h3> <p class="mt-1 line-clamp-1 text-sm font-semibold leading-5 text-white/70">${escape_html(activeLanguage === "english" ? member.qualification : member.urduQualification)}</p></div></div>`);
			}
			$$renderer.push(`<!--]--> `);
			if (getDepartmentFaculty(dept).length === 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="rounded-[2rem] border border-dashed border-primary/20 bg-neutral-soft/70 p-8 text-center text-primary/55 md:col-span-2 xl:col-span-3"><p class="text-sm font-black uppercase tracking-[0.3em] text-secondary">${escape_html(activeLanguage === "english" ? "Faculty List" : "فیکلٹی فہرست")}</p> <p class="mt-4 text-base font-semibold">${escape_html(activeLanguage === "english" ? "Additional faculty profiles will appear here." : "مزید فیکلٹی پروفائلز یہاں ظاہر ہوں گی۔")}</p></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div></div>`);
		}
		$$renderer.push(`<!--]--></div></div></section>`);
	});
}
//#endregion
export { _page as default };
