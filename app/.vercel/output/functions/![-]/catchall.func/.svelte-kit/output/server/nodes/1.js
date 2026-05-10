

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.CSk177HS.js","_app/immutable/chunks/B-fI06gm.js","_app/immutable/chunks/ClRIBUvU.js","_app/immutable/chunks/Cs5QDfgy.js"];
export const stylesheets = [];
export const fonts = [];
