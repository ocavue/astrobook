import { defineConfig } from 'tsup'

const config: unknown = defineConfig({
  entry: {
    index: 'src/index.ts',
  },
  format: ['esm'],
  clean: true,
  experimentalDts: true,
  external: [/^virtual:/],
})

export default config
