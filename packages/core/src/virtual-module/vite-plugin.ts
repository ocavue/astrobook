import type { Plugin } from 'vite'

import { loadStoryModules } from './story-modules'
import {
  BASE_URL_ID,
  BASE_URL_RESOLVED_ID,
  STORY_MODULES_ID,
  STORY_MODULES_RESOLVED_ID,
} from './virtual-module-ids'

export function createVirtualFilesPlugin(
  rootDir: string,
  baseUrl: string,
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
    },
    load(id) {
      switch (id) {
        case STORY_MODULES_RESOLVED_ID:
          return loadStoryModules(rootDir)
        case BASE_URL_RESOLVED_ID:
          return `const baseUrl = ${JSON.stringify(baseUrl)}; export default baseUrl`
      }
    },
  }
}
