import * as server from '../entries/pages/news/results/_page.server.ts.js';

export const index = 26;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/news/results/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/news/results/+page.server.ts";
export const imports = ["_app/immutable/nodes/26.ChpXKOYo.js","_app/immutable/chunks/DHlSUlHC.js","_app/immutable/chunks/YAEaTr59.js","_app/immutable/chunks/Cs5QDfgy.js","_app/immutable/chunks/M_OzpsIJ.js","_app/immutable/chunks/CQ2zWdtH.js"];
export const stylesheets = [];
export const fonts = [];
