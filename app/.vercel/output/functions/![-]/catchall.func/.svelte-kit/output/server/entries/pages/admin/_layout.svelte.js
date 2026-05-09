import "../../../chunks/dev.js";
//#region src/routes/admin/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { children, data } = $$props;
		$$renderer.push(`<div class="min-h-screen bg-[radial-gradient(circle_at_top,_#f5f8ff,_#eef3f7_55%,_#e7edf4)] text-slate-900"><header class="border-b border-slate-200/80 bg-white/80 backdrop-blur-md"><div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"><div><p class="text-xs font-black uppercase tracking-[0.3em] text-secondary">Admin Panel</p> <h1 class="text-2xl font-black text-primary">GPGC Content Manager</h1></div> `);
		if (data.authenticated) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<form method="POST" action="/admin/logout"><button type="submit" class="rounded-xl bg-primary px-5 py-3 text-sm font-black text-white transition-colors hover:bg-secondary">Logout</button></form>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></header> `);
		children($$renderer);
		$$renderer.push(`<!----></div>`);
	});
}
//#endregion
export { _layout as default };
