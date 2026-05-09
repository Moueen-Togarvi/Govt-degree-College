import * as server from '../entries/pages/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.BPlvEJZJ.js","_app/immutable/chunks/B-fI06gm.js","_app/immutable/chunks/CbqD_F1r.js","_app/immutable/chunks/CenjmNus.js","_app/immutable/chunks/Cs5QDfgy.js","_app/immutable/chunks/BQqUbq-u.js","_app/immutable/chunks/aGcr-3en.js","_app/immutable/chunks/Cvx9nM6e.js","_app/immutable/chunks/B7Zm8Tv7.js","_app/immutable/chunks/Eh6QJ8VI.js","_app/immutable/chunks/BRDjkEXL.js","_app/immutable/chunks/Bt_-2DaB.js"];
export const stylesheets = ["_app/immutable/assets/3.DYXJLPH4.css"];
export const fonts = [];
