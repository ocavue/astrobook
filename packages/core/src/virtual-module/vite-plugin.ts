import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import type { GlobalConfig } from '@astrobook/types'
import type { AstroConfig } from 'astro'
import type { Plugin } from 'vite'

import { loadStoryModules } from './story-modules'
import {
  COMPONENT_HEAD_ID,
  COMPONENT_HEAD_RESOLVED_ID,
  STORY_MODULES_ID,
  STORY_MODULES_RESOLVED_ID,
  GLOBAL_CONFIG_ID,
  GLOBAL_CONFIG_RESOLVED_ID,
  USER_CSS_RESOLVED_ID,
  USER_CSS_ID,
  USER_WRAPPER_COMPONENT_ID,
  USER_WRAPPER_COMPONENT_RESOLVED_ID,
} from './virtual-module-ids'

export function createVirtualFilesPlugin(
  rootDir: string,
  config: GlobalConfig,
  astroConfig: AstroConfig,
): Plugin {
  const root = astroConfig.root

  /**
   * Resolves module IDs to a usable format:
   * - Relative paths (e.g. `'./module.js'`) are resolved against `base` and formatted as an absolute path.
   * - Package identifiers (e.g. `'module'`) are returned unchanged.
   *
   * By default, `base` is the project root directory.
   */
  function resolveId(id: string, base = root) {
    return JSON.stringify(
      id.startsWith('.') ? resolve(fileURLToPath(base), id) : id,
    )
  }

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
        case USER_CSS_ID:
          return USER_CSS_RESOLVED_ID
        case USER_WRAPPER_COMPONENT_ID:
          return USER_WRAPPER_COMPONENT_RESOLVED_ID
      }
    },
    load(id) {
      switch (id) {
        case STORY_MODULES_RESOLVED_ID:
          return loadStoryModules(rootDir)
        case GLOBAL_CONFIG_RESOLVED_ID:
          return `const config = ${JSON.stringify(config)}; export default config;`
        case COMPONENT_HEAD_RESOLVED_ID:
          return `export { default } from ${resolveId(config.head)};`
        case USER_CSS_RESOLVED_ID:
          return config.css.map((id) => `import ${resolveId(id)};`).join('')
        case USER_WRAPPER_COMPONENT_RESOLVED_ID:
          if (!config.wrapper) {
            return `export default ({ children }) => { return children }`
          }

          return `export { default } from ${resolveId(config.wrapper)}`
      }
    },
  }
}
