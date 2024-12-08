import fs from 'node:fs/promises'
import path from 'node:path'
import pathPosix from 'node:path/posix'

import type { IntegrationOptions } from '@astrobook/types'
import type { AstroIntegration } from 'astro'

import {
  createVirtualRouteComponent,
  getVirtualRoutes,
} from './virtual-module/virtual-routes'
import { createVirtualFilesPlugin } from './virtual-module/vite-plugin'

export function createAstrobookIntegration(
  options?: IntegrationOptions,
): AstroIntegration {
  return {
    name: 'astrobook/core',
    hooks: {
      'astro:config:setup': async ({
        updateConfig,
        injectRoute,
        config,
        createCodegenDir,
      }) => {
        const codegenDir = createCodegenDir()
        const codegenDirString = await fs.realpath(codegenDir)
        console.log('[DEBUG] codegenDirString', codegenDirString)

        const rootDir = path.resolve(options?.directory || '.')
        const astroBaseUrl = config.base || '/'
        const astrobookBaseUrl = options?.subpath || ''
        const baseUrl = pathPosix.join(astroBaseUrl, astrobookBaseUrl)
        const routes = await getVirtualRoutes(rootDir, codegenDir.pathname)

        console.log('[DEBUG] rootDir', rootDir)
        console.log('[DEBUG] codegenDir', codegenDir)

        console.log('[DEBUG] baseUrl', baseUrl)
        console.log('[DEBUG] baseUrl', baseUrl)
        console.log('[DEBUG] routes', routes)

        await Promise.all(
          Array.from(routes.values()).map(async (route) => {
            const filePath = route.entrypoint
            const fileContent = createVirtualRouteComponent(route)
            await fs.mkdir(path.dirname(filePath), { recursive: true })
            await fs.writeFile(filePath, fileContent, { encoding: 'utf-8' })
          }),
        )

        updateConfig({
          vite: {
            plugins: [createVirtualFilesPlugin(rootDir, baseUrl)],
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
