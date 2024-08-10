import {
  defineConfig,
  transformerCompileClass,
  presetWind,
  presetIcons,
} from 'unocss'

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
      preflight: true,
    }),
    presetIcons(),
  ],
  transformers: [
    transformerCompileClass({
      classPrefix: 'astrobook-',
    }),
  ],
})

export default config
