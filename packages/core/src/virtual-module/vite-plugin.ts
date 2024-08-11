import type { Plugin } from 'vite'

import { loadStoryModules } from './story-modules'
import {
  BASE_URL_ID,
  BASE_URL_RESOLVED_ID,
  STORY_MODULES_ID,
  STORY_MODULES_RESOLVED_ID,
} from './virtual-module-ids'
import {
  isVirtualRoutePath,
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

      if (isVirtualRoutePath(id, routes)) {
        return id
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
