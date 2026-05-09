import * as server from '../entries/pages/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.BLsN-QtK.js","_app/immutable/chunks/DHlSUlHC.js","_app/immutable/chunks/CL-67EHM.js","_app/immutable/chunks/YAEaTr59.js","_app/immutable/chunks/Cs5QDfgy.js","_app/immutable/chunks/D9zrAcdL.js","_app/immutable/chunks/BMYYXutk.js","_app/immutable/chunks/DMmu068B.js","_app/immutable/chunks/tVO9iPq2.js","_app/immutable/chunks/CCmkF-j2.js","_app/immutable/chunks/WYIdF738.js","_app/immutable/chunks/cOplRRVw.js"];
export const stylesheets = ["_app/immutable/assets/3.TLQn--_m.css"];
export const fonts = [];
