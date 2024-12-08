import preact from '@astrojs/preact'
import { defineConfig } from 'astro/config'
import astrobook from 'astrobook'
import unocss from 'unocss/astro'

// https://astro.build/config
export default defineConfig({
  server: {
    port: 4303,
  },

  integrations: [preact(), astrobook({}), unocss({ injectReset: true })],
})
