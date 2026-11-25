import { defineConfig } from 'tsdown'

const config: unknown = defineConfig({
  entry: {
    index: 'src/index.ts',
    client: 'src/client.ts',
  },
  format: ['esm'],
  clean: true,
  dts: true,
  fixedExtension: false,
  deps: {
    neverBundle: [/^virtual:/],
    onlyBundle: ['just-kebab-case'],
  },
})

export default config
