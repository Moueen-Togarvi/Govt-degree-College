import * as server from '../entries/pages/news/results/_page.server.ts.js';

export const index = 26;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/news/results/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/news/results/+page.server.ts";
export const imports = ["_app/immutable/nodes/26.ncbgNcEl.js","_app/immutable/chunks/B-fI06gm.js","_app/immutable/chunks/CenjmNus.js","_app/immutable/chunks/Cs5QDfgy.js","_app/immutable/chunks/BPINGhwN.js","_app/immutable/chunks/DmfQ8ZLO.js"];
export const stylesheets = [];
export const fonts = [];
