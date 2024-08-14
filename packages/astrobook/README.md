# astrobook

[![NPM version](https://img.shields.io/npm/v/astrobook?color=a1b858&label=)](https://www.npmjs.com/package/astrobook)

> A minimal and fast [Storybook](https://storybook.js.org/) alternative. Powered by [Astro](https://astro.build/).

![astrobook](https://github.com/user-attachments/assets/dbaa6243-4ce2-45da-b760-44543f59bb63)

## Quick start

> [!NOTE]
> Astrobook supports **React**, **Vue**, **Preact**, **Svelte**, **Solid** and **Astro** components out of the box. We use React as an example here. Check the [Astro docs](https://docs.astro.build/en/guides/integrations-guide/#official-integrations) for other integrations.

1. Install the packages

   ```bash
   npm install astro @astrojs/react astrobook
   ```

2. Create `astro.config.mjs` and add the `astrobook` integration

   ```js
   // astro.config.mjs
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

4. Write stories. Astrobook will scan all `.stories.{ts,tsx,js,jsx,mts,mtsx,mjs,mjsx}` files.

   ```ts
   // src/components/Button.stories.ts
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

5. Run `npm run dev` and open `http://localhost:4321` to see your stories.

## Options

You can use the `directory` option to specify the directory to scan for stories. The default directory is current working directory.

```js
// astro.config.mjs
import { defineConfig } from 'astro/config'
import astrobook from 'astrobook'

export default defineConfig({
  integrations: [
    astrobook({
      directory: 'src/components',
    }),
    /* ...other integrations */
  ],
})
```

## Advanced

### Toggle theme via message

If you're running Astrobook in an iframe, you can toggle the theme via a message.

```js
const theme = 'light' // or "dark"
iframe.contentWindow.postMessage({ type: 'astrobook:set-theme', theme }, '*')
```

## License

MIT
