import * as server from '../entries/pages/news/events/_page.server.ts.js';

export const index = 24;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/news/events/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/news/events/+page.server.ts";
export const imports = ["_app/immutable/nodes/24.EW92qU7j.js","_app/immutable/chunks/DHlSUlHC.js","_app/immutable/chunks/CATTGB5e.js","_app/immutable/chunks/YAEaTr59.js","_app/immutable/chunks/Cs5QDfgy.js","_app/immutable/chunks/kmbOivJh.js","_app/immutable/chunks/GxjB2nFh.js","_app/immutable/chunks/CQ2zWdtH.js"];
export const stylesheets = [];
export const fonts = [];
