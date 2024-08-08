import { defineConfig, transformerCompileClass, presetWind } from 'unocss'

const config: unknown = defineConfig({
  cli: {
    entry: {
      patterns: ['temp/components/**/*.astro'],
      outFile: 'temp/style.css',
    },
  },
  presets: [
    presetWind({
      variablePrefix: 'astrobook-',
      preflight: false,
    }),
  ],
  transformers: [
    transformerCompileClass({
      classPrefix: 'astrobook-',
    }),
  ],
})

export default config
