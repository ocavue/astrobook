import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import type { GlobalConfig } from '@astrobook/types'
import type { AstroConfig, AstroIntegrationLogger } from 'astro'
import type { Plugin, ViteDevServer } from 'vite'

import { loadStoryModules } from './story-modules'
import {
  COMPONENT_HEAD_ID,
  COMPONENT_HEAD_RESOLVED_ID,
  COMPONENT_HOME_ID,
  COMPONENT_HOME_RESOLVED_ID,
  STORY_MODULES_ID,
  STORY_MODULES_RESOLVED_ID,
  GLOBAL_CONFIG_ID,
  GLOBAL_CONFIG_RESOLVED_ID,
  USER_CSS_RESOLVED_ID,
  USER_CSS_ID,
} from './virtual-module-ids'

export function createVirtualFilesPlugin(
  rootDir: string,
  config: GlobalConfig,
  astroConfig: AstroConfig,
  logger: AstroIntegrationLogger,
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

  let storyModules: string | undefined
  let needToReload = false
  let watcherInitialized = false

  async function getStoryModules(): Promise<string> {
    let newStoryModules = await loadStoryModules(rootDir)
    if (storyModules && newStoryModules !== storyModules) {
      needToReload = true
    }
    storyModules = newStoryModules
    return storyModules
  }

  async function restartServerIfNeeded(server: ViteDevServer) {
    await getStoryModules()
    if (needToReload) {
      needToReload = false
      logger.info(`Restarting`)
      await server.restart()
    }
  }

  function initializeNewFileWatcher(server: ViteDevServer) {
    if (watcherInitialized || !server.watcher) return
    watcherInitialized = true

    server.watcher.on('add', async (filePath: string) => {
      if (filePath.includes('.stories.')) {
        logger.debug(`Potential story file added: ${filePath}`)
        await restartServerIfNeeded(server)
      }
    })

    server.watcher.on('unlink', async (filePath: string) => {
      if (filePath.includes('.stories.')) {
        logger.debug(`Potential story file deleted: ${filePath}`)
        await restartServerIfNeeded(server)
      }
    })

    logger.debug(`Initialized file watcher for story files`)
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
        case COMPONENT_HOME_ID:
          return COMPONENT_HOME_RESOLVED_ID
        case USER_CSS_ID:
          return USER_CSS_RESOLVED_ID
      }
    },
    load(id) {
      switch (id) {
        case STORY_MODULES_RESOLVED_ID:
          return getStoryModules()
        case GLOBAL_CONFIG_RESOLVED_ID:
          return `const config = ${JSON.stringify(config)}; export default config;`
        case COMPONENT_HEAD_RESOLVED_ID:
          return `export { default } from ${resolveId(config.head)};`
        case COMPONENT_HOME_RESOLVED_ID:
          return `export { default } from ${resolveId(config.home)};`
        case USER_CSS_RESOLVED_ID:
          return config.css.map((id) => `import ${resolveId(id)};`).join('')
      }
    },
    async handleHotUpdate(ctx) {
      const { server } = ctx
      initializeNewFileWatcher(server)
      await restartServerIfNeeded(server)
    },
  }
}
