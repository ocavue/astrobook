import { defineConfig } from 'astro/config'
import astrobook from 'astrobook'

// https://astro.build/config
export default defineConfig({
  server: {
    port: 4305,
  },

  // Enable many frameworks to support all different kinds of components.
  integrations: [astrobook({ directory: 'src/components', head: './src/components/CustomHead.astro', title: 'Custom Title' })],
})
