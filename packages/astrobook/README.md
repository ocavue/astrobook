# astrobook

[![NPM version](https://img.shields.io/npm/v/astrobook?color=a1b858&label=)](https://www.npmjs.com/package/astrobook)

> Minimal and fast component playgrounds. Powered by [Astro](https://astro.build/).

![astrobook](https://github.com/user-attachments/assets/dbaa6243-4ce2-45da-b760-44543f59bb63)

## Quick start

1. Install the packages

   ```bash
   npm install astro astrobook @astrojs/react
   ```

   > [!NOTE]
   > Astrobook supports React, Vue, Preact, Svelte, Solid and Astro components. We use React as an example here. Check the [Astro docs](https://docs.astro.build/en/guides/integrations-guide/#official-integrations) for other integrations.

2. Create `astro.config.mjs`

   ```js
   import { defineConfig } from 'astro/config'
   import react from '@astrojs/react'
   import astrobook from 'astrobook'

   // https://astro.build/config
   export default defineConfig({
     integrations: [react(), astrobook()],
   })
   ```

3. Add scripts to your `package.json`

   ```json
   "scripts": {
     "dev": "astro dev",
     "build": "astro build"
   }
   ```

4. Write stories

   ```ts
   // components/Button.stories.ts
   import { Button, type ButtonProps } from './Button.tsx'

   export default {
     component: Button,
   }

   export const PrimaryButton = {
     args: {
       variant: 'primary',
     } satisfies ButtonProps,
   }

   export const SecondaryButton = {
     args: {
       variant: 'secondary',
     } satisfies ButtonProps,
   }
   ```

5. Run `npm run dev` and open `http://localhost:4321`

## License

MIT
