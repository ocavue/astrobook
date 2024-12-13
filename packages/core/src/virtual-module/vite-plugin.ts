import type { GlobalConfig } from '@astrobook/types'
import type { Plugin } from 'vite'

import { loadStoryModules } from './story-modules'
import {
  COMPONENT_HEAD_ID,
  COMPONENT_HEAD_RESOLVED_ID,
  STORY_MODULES_ID,
  STORY_MODULES_RESOLVED_ID,
  GLOBAL_CONFIG_ID,
  GLOBAL_CONFIG_RESOLVED_ID
} from './virtual-module-ids'

export function createVirtualFilesPlugin(
  rootDir: string,
  config: GlobalConfig,
): Plugin {
  return {
    name: 'astrobook/virtual-files',
    resolveId(id) {
      switch (id) {
        case STORY_MODULES_ID:
          return STORY_MODULES_RESOLVED_ID
        case GLOBAL_CONFIG_ID:
          return GLOBAL_CONFIG_RESOLVED_ID
        case COMPONENT_HEAD_ID:
          return COMPONENT_HEAD_RESOLVED_ID
      }
    },
    load(id) {
      switch (id) {
        case STORY_MODULES_RESOLVED_ID:
          return loadStoryModules(rootDir)
        case GLOBAL_CONFIG_RESOLVED_ID:
          return `const config = ${JSON.stringify(config)}; export default config;`
        case COMPONENT_HEAD_RESOLVED_ID:
          return `export { default } from ${JSON.stringify(config.head)};`;
      }
    },
  }
}
