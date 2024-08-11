import type { Plugin } from 'vite'

import { loadStoryModules } from './story-modules'
import {
  BASE_URL_ID,
  BASE_URL_RESOLVED_ID,
  STORY_MODULES_ID,
  STORY_MODULES_RESOLVED_ID,
} from './virtual-module-ids'
import {
  resolveVirtualRoute,
  resolveVirtualRouteComponent,
  type VirtualRoute,
} from './virtual-routes'

export function createVirtualFilesPlugin(
  rootDir: string,
  baseUrl: string,
  routes: Map<string, VirtualRoute>,
): Plugin {
  return {
    name: 'astrobook/virtual-files',
    resolveId(id) {
      switch (id) {
        case STORY_MODULES_ID:
          return STORY_MODULES_RESOLVED_ID
        case BASE_URL_ID:
          return BASE_URL_RESOLVED_ID
      }

      const route = resolveVirtualRoute(id, routes)
      if (route) {
        // Sometimes `id` is as same as `route.entrypoint`, like
        // `/my_astro_project_root/__virtual_astrobook...`.
        //
        // But sometimes it's something unexpected like
        // `/__virtual_astrobook...`, and I don't understand why. In these
        // cases, we force it to be `route.entrypoint`.
        return route.entrypoint
      }
    },
    load(id) {
      switch (id) {
        case STORY_MODULES_RESOLVED_ID:
          return loadStoryModules(rootDir)
        case BASE_URL_RESOLVED_ID:
          return `const baseUrl = ${JSON.stringify(baseUrl)}; export default baseUrl`
      }

      const routeComponent = resolveVirtualRouteComponent(id, routes)
      if (routeComponent) return routeComponent
    },
  }
}
