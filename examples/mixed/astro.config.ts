import preact from '@astrojs/preact'
import { defineConfig } from 'astro/config'
import astrobook from 'astrobook'

// https://astro.build/config
export default defineConfig({
  server: {
    port: 4302,
  },

  base: '/astro-base',

  integrations: [
    preact(),
    astrobook({
      directory: 'src/stories',
      subpath: '/astrobook-subpath',
      dashboardSubpath: '/dashboard-subpath',
      previewSubpath: '/preview-subpath',
    }),
  ],
})
