import fs from 'node:fs/promises'
import path from 'node:path'
import pathPosix from 'node:path/posix'
import { fileURLToPath } from 'node:url'

import type { IntegrationOptions } from '@astrobook/types'
import type { AstroIntegration } from 'astro'
import colors from 'yoctocolors'

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
        createCodegenDir,
        config,
        logger,
        command,
      }) => {
        const rootDir = path.resolve(options?.directory || '.')
        const astroBaseUrl = config.base || '/'
        const astrobookBaseUrl = options?.subpath || ''
        const baseUrl = pathPosix.join(astroBaseUrl, astrobookBaseUrl)

        // If subpath is set, Astrobook is only part of the current Astro
        // project. In this case, we want to print the URL of the Astrobook
        // entrypoint for easy access.
        if (astrobookBaseUrl && command === 'dev') {
          const url = new URL(baseUrl, `http://localhost:${config.server.port}`)
          const message =
            colors.bgGreen(colors.white(colors.bold(' astrobook '))) +
            ' is available at ' +
            colors.cyan(url.toString())
          // Get a logger that don't print the label and the current time
          // https://github.com/withastro/astro/blob/ff72ebe/packages/astro/src/core/logger/core.ts#L38
          const plainLogger = logger.fork('SKIP_FORMAT')
          plainLogger.info(message)
        }

        logger.debug(`Creating dedicated folder`)
        let codegenDir: string
        if (createCodegenDir) {
          codegenDir = fileURLToPath(createCodegenDir())
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
            plugins: [
              createVirtualFilesPlugin(
                rootDir,
                {
                  baseUrl,
                  head: options?.head || 'astrobook/components/head.astro',
                  css: options?.css || [],
                  title: options?.title || 'Astrobook',
                },
                config,
                logger,
              ),
            ],
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
