import * as server from '../entries/pages/news/announcements/_page.server.ts.js';

export const index = 23;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/news/announcements/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/news/announcements/+page.server.ts";
export const imports = ["_app/immutable/nodes/23.BJFa8aLn.js","_app/immutable/chunks/DHlSUlHC.js","_app/immutable/chunks/YAEaTr59.js","_app/immutable/chunks/Cs5QDfgy.js","_app/immutable/chunks/CATTGB5e.js","_app/immutable/chunks/CQ2zWdtH.js"];
export const stylesheets = [];
export const fonts = [];
