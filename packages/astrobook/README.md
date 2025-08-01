<div align="center">
<h1>Astrobook</h1>
<p><strong>The minimal UI component playground</strong></p>
</div>

![astrobook](https://github.com/user-attachments/assets/02289aa9-df34-48f8-8aa5-42015c172443)

Astrobook is a UI component playground that supports multiple frameworks including **React**, **Vue**, **Preact**, **Svelte**, **Solid**, **Lit**, and **Astro**. It offers a unified environment to develop, test, and showcase components.

## Try it Online

- An example of using multiple UI rendering frameworks (React, Preact, Vue, Svelte, Solid, Lit, Astro) with Astrobook.

  Online demo: [astrobook.pages.dev](https://astrobook.pages.dev/)

  [![Open in StackBlitz][stackblitz_badge]][example_playground]

- An example of using custom `<head>` tags with Astrobook.

  [![Open in StackBlitz][stackblitz_badge]][example_custom_head]

- An example that shows how to add Astrobook into an existing Astro project.

  [![Open in StackBlitz][stackblitz_badge]][example_mixed]

- An example of using TailwindCSS with Astrobook.

  [![Open in StackBlitz][stackblitz_badge]][example_tailwindcss]

- An example of using UnoCSS with Astrobook.

  [![Open in StackBlitz][stackblitz_badge]][example_unocss]

- An example of using PandaCSS with Astrobook.

  [![Open in StackBlitz][stackblitz_badge]][example_pandacss]

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

4. Write stories. Astrobook scans all `.stories.{ts,tsx,js,jsx,mts,mjs}` files. It's compatible with a limited subset of Storybook's [Component Story Format v3](https://storybook.js.org/docs/api/csf). In particular, `args` and `decorators` properties are supported.

   ```ts
   // src/components/Button.stories.ts
   import { Button, type ButtonProps } from './Button.tsx'
   import { Container } from './Container.tsx'

   export default {
     component: Button,
   }

   export const PrimaryButton = {
     args: { variant: 'primary' } satisfies ButtonProps,
   }

   export const SecondaryButton = {
     args: { variant: 'secondary' } satisfies ButtonProps,
   }
   ```

5. Run `npm run dev` and open `http://localhost:4321` to see your stories.

### Decorators

Decorators are objects that have a property for the component and the props that will be passed to it on render. This component must have a _slot_ for children to be rendered. Currently, decorators only support styling changes and are not able to change a component's context or any client-side behaviors. Any decorators are rendered into HTML by Astro and sent to the client.

You can use decorators to wrap a component with a custom style.

For example, this is a React decorator that adds a green border to a component and an Astro decorator that adds a red border to a component.

```tsx
// ReactGreenBorderDecorator.tsx

import type { ComponentChildren } from 'react'

export function GreenBorderDecorator({
  width = 2,
  children,
}: {
  width?: number
  children?: ComponentChildren
}) {
  return <div style={{ border: `solid ${width}px green` }}>{children}</div>
}
```

```astro
<!-- AstroRedBorderDecorator.astro -->
<div style="border: solid 2px red;">
  <slot />
</div>
```

In your stories, you can use the decorators like this:

```tsx
// Button.stories.tsx
import { Button, type ButtonProps } from './Button.tsx'
import { GreenBorderDecorator } from './ReactGreenBorderDecorator.tsx'
import RedBorderDecorator from './AstroRedBorderDecorator.astro'

export default {
  component: Button,
}

export const PrimaryButton = {
  args: { variant: 'primary' } satisfies ButtonProps,
  decorators: [
    { component: GreenBorderDecorator, props: { width: 10 } },
    { component: RedBorderDecorator },
  ],
}
```

This will render the button, wrapped in a red border, which is then wrapped in a green border.

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

### `subpath`

You can run Astrobook as a standalone app. You can also add it to your existing Astro project. In the latter case, you can use the `subpath` option to specify the subpath of Astrobook.

```js
// astro.config.mjs
import { defineConfig } from 'astro/config'
import astrobook from 'astrobook'

export default defineConfig({
  integrations: [
    astrobook({
      subpath: '/docs/components',
    }),
  ],
})
```

In the example above, Astrobook will be available at `http://localhost:4321/docs/components`.

Notice that the `subpath` option is relative to the [base URL](https://docs.astro.build/en/reference/configuration-reference/#base) of your Astro project. For example, if you configure both Astro's `base` and `astrobook`'s `subpath`, like so:

```js
// astro.config.mjs
import { defineConfig } from 'astro/config'
import astrobook from 'astrobook'

export default defineConfig({
  base: '/base',
  integrations: [
    astrobook({
      subpath: '/docs/components',
    }),
  ],
})
```

You Astro project will be available at `http://localhost:4321/base` and Astrobook will be available at `http://localhost:4321/base/docs/components`.

### `css`

You can customize the styles by using the `css` option to specify the CSS files to be imported into your Astrobook site.

```js
// astro.config.mjs
import { defineConfig } from 'astro/config'
import astrobook from 'astrobook'

export default defineConfig({
  integrations: [
    astrobook({
      css: [
        // Relative path to your custom CSS file
        './src/styles/custom.css',
      ],
    }),
  ],
})
```

### `head`

You can further customize your Astrobook project by providing a custom `head` options. It's a path to an Astro component that includes custom tags to the `<head>` of your Astrobook site. It should only include [elements permitted inside `<head>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head#see_also), like `<link>`, `<style>`, `<script>`, etc.

Below is an example of a custom head component that configures the global styles and fonts.

```astro
<!-- Load custom fonts -->
<link rel="preconnect" href="https://rsms.me/" />
<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />

<!-- Apply global styles -->
<style is:global>
  html {
    font-family: 'Inter', sans-serif;
  }
</style>
```

```js
// astro.config.mjs
import { defineConfig } from 'astro/config'
import astrobook from 'astrobook'

export default defineConfig({
  integrations: [
    astrobook({
      // Relative path to your custom head component
      head: './src/components/CustomHead.astro',
    }),
  ],
})
```

### `title`

You can set the title for your website.

```js
// astro.config.mjs
import { defineConfig } from 'astro/config'
import astrobook from 'astrobook'

export default defineConfig({
  integrations: [
    astrobook({
      title: 'My Components Playground',
    }),
  ],
})
```

## Advanced

### Enable Astrobook only on development

You can enable Astrobook only on development by using the `process.env.NODE_ENV`
to conditionally include the `astrobook` integration. This is useful when you
want to include Astrobook in your existing Astro project but don't want to build
it in production.

```js
// astro.config.mjs
import { defineConfig } from 'astro/config'
import astrobook from 'astrobook'

// https://astro.build/config
export default defineConfig({
  integrations: [
    // On development, Astrobook is available at http://localhost:4321/astrobook.
    // On production, Astrobook is not included.
    process.env.NODE_ENV === 'development'
      ? astrobook({ subpath: '/astrobook' })
      : null,
  ],
})
```

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

[stackblitz_badge]: https://developer.stackblitz.com/img/open_in_stackblitz.svg
[example_playground]: https://stackblitz.com/github/ocavue/astrobook/tree/master/examples/playground
[example_unocss]: https://stackblitz.com/github/ocavue/astrobook/tree/master/examples/unocss
[example_pandacss]: https://stackblitz.com/github/ocavue/astrobook/tree/master/examples/pandacss
[example_tailwindcss]: https://stackblitz.com/github/ocavue/astrobook/tree/master/examples/tailwindcss
[example_custom_head]: https://stackblitz.com/github/ocavue/astrobook/tree/master/examples/custom-head
[example_mixed]: https://stackblitz.com/github/ocavue/astrobook/tree/master/examples/mixed
