import { defineConfig } from 'tsdown'

const config: unknown = defineConfig({
  entry: {
    index: 'src/index.ts',
    client: 'src/client.ts',
  },
  format: ['esm'],
  clean: true,
  dts: true,
  external: [/^virtual:/],
})

export default config
