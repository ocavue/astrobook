import preact from '@astrojs/preact'
import { defineConfig } from 'astro/config'
import astrobook from 'astrobook'

// https://astro.build/config
export default defineConfig({
  server: {
    port: 4309,
  },

  integrations: [
    preact(),
    astrobook({
      title: 'Astrobook + PandaCSS Playground',
      directory: 'src/components',

      css: ['./src/styles/global.css'],
    }),
  ],
})
