import path from 'node:path'

import type { IntegrationOptions } from '@astrobook/types'
import type { AstroIntegration } from 'astro'

import { normalizePath } from './utils/normalize-path'
import { createVirtualFilesPlugin } from './virtual-module/vite-plugin'

export function createAstrobookIntegration(
  options?: IntegrationOptions,
): AstroIntegration {
  return {
    name: 'astrobook/core',
    hooks: {
      'astro:config:setup': ({ updateConfig, injectRoute }) => {
        const rootDir = getRootDir(options)
        updateConfig({
          vite: {
            plugins: [createVirtualFilesPlugin(rootDir)],
          },
        })
        injectRoute({
          pattern: '/[...story]',
          entrypoint: 'astrobook/pages/dashboard.astro',
          prerender: true,
        })
        injectRoute({
          pattern: '/',
          entrypoint: 'astrobook/pages/app.astro',
          prerender: true,
        })
      },
    },
  }
}

function getRootDir(options?: IntegrationOptions): string {
  const rootDir = options?.directory ?? '.'
  if (path.isAbsolute(rootDir)) {
    return rootDir
  }
  return normalizePath(path.resolve(rootDir))
}
