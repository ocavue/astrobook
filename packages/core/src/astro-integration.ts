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
    name: 'astrobook',
    hooks: {
      'astro:config:setup': async ({
        updateConfig,
        injectRoute,
        config,
        createCodegenDir,
        logger,
      }) => {
        const rootDir = path.resolve(options?.directory || '.')
        const astroBaseUrl = config.base || '/'
        const astrobookBaseUrl = options?.subpath || ''
        const baseUrl = pathPosix.join(astroBaseUrl, astrobookBaseUrl)

        logger.debug(`Creating dedicated folder`)
        let codegenDir: string
        if (createCodegenDir) {
          const codegenDirURL = createCodegenDir()
          codegenDir = await fs.realpath(codegenDirURL)
        } else {
          // Astro v4, where `createCodegenDir()` is not available
          codegenDir = path.resolve('.astro', 'integrations', 'astrobook')
          await fs.mkdir(codegenDir, { recursive: true })
        }
        logger.debug(`Created dedicated folder at ${codegenDir}`)

        logger.debug(`Scanning for stories in ${rootDir}`)
        const routes = await getVirtualRoutes(rootDir, codegenDir, logger)

        logger.debug(`Writing files to ${codegenDir}`)
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

        logger.debug(`Injecting routes`)
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
