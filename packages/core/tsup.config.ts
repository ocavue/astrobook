import { defineConfig } from 'tsup'

const config: unknown = defineConfig({
  entry: {
    index: 'src/index.ts',
    'components/navigation': 'src/components/navigation.ts',
    'components/story': 'src/components/story.ts',
    'components/app': 'src/components/app.ts',
  },
  format: ['esm'],
  clean: true,
  experimentalDts: true,
  external: [/^virtual:/],
})

export default config
