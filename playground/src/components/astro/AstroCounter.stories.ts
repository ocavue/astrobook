import AstroCounter from './AstroCounter.astro'

export default {
  component: AstroCounter,
  parameters: {
    framework: 'astro',
  },
}

export const Default = {
  args: {},
}

export const LargeStep = {
  args: {
    step: 10,
  },
}
