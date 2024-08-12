import path from 'node:path/posix'

import type { IntegrationOptions } from '@astrobook/types'
import type { AstroIntegration } from 'astro'

import { normalizePath } from './utils/normalize-path'
import { getVirtualRoutes } from './virtual-module/virtual-routes'
import { createVirtualFilesPlugin } from './virtual-module/vite-plugin'

export function createAstrobookIntegration(
  options?: IntegrationOptions,
): AstroIntegration {
  return {
    name: 'astrobook/core',
    hooks: {
      'astro:config:setup': async ({ updateConfig, injectRoute, config }) => {
        const rootDir = normalizePath(path.resolve(options?.directory || '.'))
        const baseUrl = config.base || ''
        const routes = await getVirtualRoutes(rootDir)

        updateConfig({
          vite: {
            plugins: [createVirtualFilesPlugin(rootDir, baseUrl, routes)],
          },
        })

        for (const route of routes.values()) {
          injectRoute({
            pattern: route.pattern,
            entrypoint: route.entrypoint,
            prerender: true,
          })
        }

        injectRoute({
          pattern: '/',
          entrypoint: 'astrobook/pages/app.astro',
          prerender: true,
        })
      },
    },
  }
}
