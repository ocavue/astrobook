import { createRequire } from 'node:module'

import { defineConfig } from 'astro/config'
import astrobook from 'astrobook'

const requireModule = createRequire(import.meta.url)
const { version } = requireModule('./package.json') as { version: string }

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
        // Show the version badge with a custom label from package.json.
        version: { label: `v${version}` },
        // Override the repository badge with a custom URL and label.
        repo: {
          href: 'https://github.com/acme/ui',
          label: 'View on GitHub',
        },
      },
    }),
  ],
})
