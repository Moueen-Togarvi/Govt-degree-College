import * as server from '../entries/pages/news/announcements/_page.server.ts.js';

export const index = 23;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/news/announcements/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/news/announcements/+page.server.ts";
export const imports = ["_app/immutable/nodes/23.ByXx-l30.js","_app/immutable/chunks/B-fI06gm.js","_app/immutable/chunks/CenjmNus.js","_app/immutable/chunks/Cs5QDfgy.js","_app/immutable/chunks/BOBKEgH9.js","_app/immutable/chunks/DmfQ8ZLO.js"];
export const stylesheets = [];
export const fonts = [];
