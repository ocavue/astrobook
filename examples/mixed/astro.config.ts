import preact from '@astrojs/preact'
import { defineConfig } from 'astro/config'
import astrobook from 'astrobook'

// https://astro.build/config
export default defineConfig({
  server: {
    port: 4302,
  },

  // Enable many frameworks to support all different kinds of components.
  integrations: [preact(), astrobook({ directory: 'src/stories', base: "/docs/components" })],
})
