import { defineConfig } from 'astro/config'
import astrobook from 'astrobook'

// https://astro.build/config
export default defineConfig({
  trailingSlash: 'always',

  server: {
    port: 4307,
  },

  integrations: [
    astrobook({
      directory: 'src/components',
      title: 'Acme UI',
      homeContent: {
        title: 'Acme UI',
        subtitle: 'Internal component library',
        // Hide the version badge entirely.
        version: false,
        // Override the repository badge with a custom URL and label.
        repo: {
          href: 'https://github.com/acme/ui',
          label: 'View on GitHub',
        },
      },
    }),
  ],
})
