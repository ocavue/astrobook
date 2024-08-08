import type { AstroIntegration } from 'astro'

import { createVirtualFilesPlugin } from './virtual-module/vite-plugin'

export function createAstrobookIntegration(): AstroIntegration {
  return {
    name: 'astrobook/core',
    hooks: {
      'astro:config:setup': ({ updateConfig, injectRoute }) => {
        updateConfig({
          vite: {
            plugins: [createVirtualFilesPlugin()],
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
