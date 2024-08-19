<div align="center">
<h1>Astrobook</h1>
<p><strong>The minimal UI component playground</strong></p>
</div>

![astrobook](https://github.com/user-attachments/assets/02289aa9-df34-48f8-8aa5-42015c172443)

Astrobook is a UI component playground that supports multiple frameworks including **React**, **Vue**, **Preact**, **Svelte**, **Solid**, **Lit**, and **Astro**. It offers a unified environment to develop, test, and showcase components.

## Try it Online

[astrobook.pages.dev](https://astrobook.pages.dev/)

## Quick start

> [!NOTE]
> Astrobook supports various frameworks. We use React as an example here. Check the [Astro docs](https://docs.astro.build/en/guides/integrations-guide/#official-integrations) for other integrations.

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

4. Write stories. Astrobook scans all `.stories.{ts,tsx,js,jsx,mts,mtsx,mjs,mjsx}` files. It's compatible with Storybook's [Component Story Format v3](https://storybook.js.org/docs/api/csf).

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

### `directory`

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

## Who's using Astrobook?

- [ProseKit](https://prosekit.dev/astrobook)

_[Add your project](https://github.com/ocavue/astrobook/edit/master/packages/astrobook/README.md)_

## License

MIT
