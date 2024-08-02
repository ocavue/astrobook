import type { AstroIntegration } from 'astro'

import { createVirtualFilesPlugin } from './vite-plugin'

export function createAstrobookIntegration(): AstroIntegration {
  return {
    name: 'astrobook/core',
    hooks: {
      'astro:config:setup': (options) => {
        options.updateConfig({
          vite: {
            plugins: [createVirtualFilesPlugin()],
          },
        })
      },
    },
  }
}
