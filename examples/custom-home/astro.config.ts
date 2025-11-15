import { defineConfig } from 'astro/config'
import astrobook from 'astrobook'

// https://astro.build/config
export default defineConfig({
  trailingSlash: 'always',

  server: {
    port: 4306,
  },

  integrations: [
    astrobook({
      directory: 'src/components',
      head: './src/components/CustomHome.astro',
    }),
  ],
})
