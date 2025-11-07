import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { IntegrationOptions } from '@astrobook/types'
import type { AstroIntegration } from 'astro'
import colors from 'yoctocolors'

import { resolveOptions } from './options'
import { createPathBuilder } from './utils/path-builder'
import {
  createVirtualRouteComponent,
  getVirtualRoutes,
} from './virtual-module/virtual-routes'
import { createVirtualFilesPlugin } from './virtual-module/vite-plugin'

export function createAstrobookIntegration(
  userOptions?: IntegrationOptions,
): AstroIntegration {
  let astrobookBaseForLogging: string | undefined

  const resolvedOptions = resolveOptions(userOptions)

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
				const rootDir = path.resolve(config.root.pathname, resolvedOptions.directory);

        const astroBase = config.base || ''

        // The subpaths are relative to the Astro base path.
        const astrobookSubpath = resolvedOptions.subpath

        const buildPath = createPathBuilder({
          trailingSlash: config.trailingSlash,
        })

        const dashboardSubpath = buildPath(
          astrobookSubpath,
          resolvedOptions.dashboardSubpath,
        )
        const previewSubpath = buildPath(
          astrobookSubpath,
          resolvedOptions.previewSubpath,
        )

        if (dashboardSubpath === previewSubpath) {
          throw new Error(
            '[Astrobook] The dashboard and preview subpaths cannot be the same. Please set different values for `dashboardSubpath` and `previewSubpath` options.',
          )
        }

        const astrobookBase = buildPath(astroBase, astrobookSubpath)
        const dashboardBase = buildPath(astroBase, dashboardSubpath)
        const storyBase = buildPath(astroBase, previewSubpath)

        // If subpath is set, Astrobook is only part of the current Astro
        // project. In this case, we want to print the URL of the Astrobook
        // entrypoint for easy access.
        if (astrobookSubpath && command === 'dev') {
          astrobookBaseForLogging = astrobookBase
        } else {
          astrobookBaseForLogging = undefined
        }

        logger.debug(`Creating dedicated folder`)
        const codegenDir: string = fileURLToPath(createCodegenDir())

        logger.debug(`Created dedicated folder at ${codegenDir}`)

        logger.debug(`Scanning for stories in ${rootDir}`)

        const routes = await getVirtualRoutes(
          rootDir,
          codegenDir,
          logger,
          dashboardSubpath,
          previewSubpath,
          buildPath,
        )

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
                  astrobookBase,
                  dashboardBase,
                  storyBase,
                  head: resolvedOptions.head,
                  css: resolvedOptions.css,
                  title: resolvedOptions.title,
                  trailingSlash: config.trailingSlash,
                },
                config,
                logger,
              ),
            ],
          },
        })

        logger.debug(`Injecting routes`)
        for (const route of routes.values()) {
          injectRoute({
            pattern: route.pattern,
            entrypoint: route.entrypoint,
            prerender: true,
          })
        }
        injectRoute({
          pattern: astrobookSubpath,
          entrypoint: 'astrobook/pages/app.astro',
          prerender: true,
        })
      },
      'astro:server:start': ({ logger, address }) => {
        if (astrobookBaseForLogging) {
          const url = new URL(
            astrobookBaseForLogging,
            `http://localhost:${address.port}`,
          )
          const message =
            colors.bgGreen(colors.white(colors.bold(' astrobook '))) +
            ' is available at ' +
            colors.cyan(url.toString())
          // Get a logger that don't print the label and the current time
          // https://github.com/withastro/astro/blob/ff72ebe/packages/astro/src/core/logger/core.ts#L38
          const plainLogger = logger.fork('SKIP_FORMAT')
          plainLogger.info(message)
        }
      },
    },
  }
}
