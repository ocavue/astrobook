import preact from '@astrojs/preact'
import { defineConfig } from 'astro/config'
import astrobook from 'astrobook'
import unocss from 'unocss/astro'

// https://astro.build/config
export default defineConfig({
  server: {
    port: 4303,
  },

  vite: {
    optimizeDeps: {
      // A workaround for https://github.com/withastro/astro/issues/16181
      include: [
        'astro/runtime/client/dev-toolbar/entrypoint.js',
        'astro/virtual-modules/transitions-router.js',
        'astro/virtual-modules/transitions-types.js',
        'astro/virtual-modules/transitions-events.js',
        'astro/virtual-modules/transitions-swap-functions.js',
      ],
    },
  },

  integrations: [preact(), astrobook({}), unocss({ injectReset: true })],
})
