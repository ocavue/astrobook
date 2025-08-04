import preact from '@astrojs/preact'
import { defineConfig } from 'astro/config'
import astrobook from 'astrobook'

// https://astro.build/config
export default defineConfig({
  server: {
    port: 4302,
  },

  base: '/docs',

  integrations: [
    preact(),
    astrobook({ 
      directory: 'src/stories', 
      subpath: 'playground',
      dashboardSubpath: '',
      storySubpath: '/-/',
    }),
  ],
})
