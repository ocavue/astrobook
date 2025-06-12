import {
  defineConfig,
  transformerCompileClass,
  presetIcons,
  presetWind3,
} from 'unocss'

const config: unknown = defineConfig({
  cli: {
    entry: {
      patterns: ['temp/components/**/*.astro'],
      outFile: 'temp/style.css',
    },
  },
  presets: [
    presetWind3({
      variablePrefix: 'astrobook-',
      preflight: true,
    }),
    presetIcons(),
  ],
  transformers: [
    transformerCompileClass({
      classPrefix: 'astrobook-',
    }),
  ],
  shortcuts: {
    'astrobook-focus-ring':
      'outline-gray-900 dark:outline-gray-100 outline-0 focus-visible:outline-2 outline-offset-2 focus-visible:z-20',

    'astrobook-sidebar-button': [
      'text-size-base block cursor-pointer rounded border-0 bg-transparent p-2 font-semibold text-gray-500 no-underline transition hover:scale-110 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200',
      'astrobook-focus-ring',
    ],
  },
})

export default config
