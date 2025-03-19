import preact from '@astrojs/preact'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import astrobook from 'astrobook'

// https://astro.build/config
export default defineConfig({
  server: {
    port: 4304,
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    preact(),
    astrobook({
      css: ['./src/styles/global.css'],
    }),
  ],
})
