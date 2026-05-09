import * as server from '../entries/pages/admin/_page.server.ts.js';

export const index = 14;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/+page.server.ts";
export const imports = ["_app/immutable/nodes/14.8viW13kw.js","_app/immutable/chunks/B-fI06gm.js","_app/immutable/chunks/CenjmNus.js","_app/immutable/chunks/Cs5QDfgy.js","_app/immutable/chunks/aGcr-3en.js","_app/immutable/chunks/Cvx9nM6e.js","_app/immutable/chunks/BOBKEgH9.js","_app/immutable/chunks/B7Zm8Tv7.js","_app/immutable/chunks/Eh6QJ8VI.js","_app/immutable/chunks/BRDjkEXL.js","_app/immutable/chunks/CY2NpLZ4.js"];
export const stylesheets = [];
export const fonts = [];
