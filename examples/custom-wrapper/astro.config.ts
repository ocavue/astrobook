import { defineConfig } from 'astro/config'
import astrobook from 'astrobook'

// https://astro.build/config
export default defineConfig({
  server: {
    port: 4306,
  },
  integrations: [
    astrobook({
      directory: './src/components',
      wrapper: './src/components/CustomWrapper.astro',
    }),
  ],
})
