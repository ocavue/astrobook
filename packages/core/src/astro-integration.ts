import path from 'node:path'
import pathPosix from 'node:path/posix'

import type { IntegrationOptions } from '@astrobook/types'
import type { AstroIntegration } from 'astro'

import { getVirtualRoutes } from './virtual-module/virtual-routes'
import { createVirtualFilesPlugin } from './virtual-module/vite-plugin'

export function createAstrobookIntegration(
  options?: IntegrationOptions,
): AstroIntegration {
  return {
    name: 'astrobook/core',
    hooks: {
      'astro:config:setup': async ({ updateConfig, injectRoute, config }) => {
        const rootDir = path.resolve(options?.directory || '.')
        const astroBaseUrl = config.base || '/'
        const astrobookBaseUrl = options?.subpath || ''
        const baseUrl = pathPosix.join(astroBaseUrl, astrobookBaseUrl)
        const routes = await getVirtualRoutes(rootDir)

        updateConfig({
          vite: {
            plugins: [createVirtualFilesPlugin(rootDir, baseUrl, routes)],
          },
        })

        for (const route of routes.values()) {
          const pattern = pathPosix.join(astrobookBaseUrl, route.pattern)
          const entrypoint = path.normalize(
            path.relative('.', route.entrypoint),
          )
          injectRoute({
            pattern,
            entrypoint,
            prerender: true,
          })
        }
        injectRoute({
          pattern: astrobookBaseUrl,
          entrypoint: 'astrobook/pages/app.astro',
          prerender: true,
        })
      },
    },
  }
}
