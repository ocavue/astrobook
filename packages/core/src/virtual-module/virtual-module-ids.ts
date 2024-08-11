// TODO: remove VirtualModuleIds
export const enum VirtualModuleIds {
  // TODO: remove STORY_COMPONENT_ID
  STORY_COMPONENT_ID = 'virtual:astrobook/story-component.astro',
  STORY_COMPONENT_RESOLVED_ID = '__virtual_astrobook_story_component__.astro',

  STORY_MODULES_ID = 'virtual:astrobook/story-modules.mjs',
  STORY_MODULES_RESOLVED_ID = '__virtual_astrobook_story_modules__.mjs',

  BASE_URL_ID = 'virtual:astrobook/base-url.mjs',
  BASE_URL_RESOLVED_ID = '__virtual_astrobook_base_url__.mjs',
}

export const ROUTE_DASHBOARD_DIR =
  '__virtual_astrobook_story_module_dashboard__'
export const ROUTE_STORIES_DIR = '__virtual_astrobook_story_module_fullscreen__'
