import AstroCounter from './AstroCounter.astro'

export default {
  component: AstroCounter,
}

export const Default = {
  args: {},
}

export const LargeStep = {
  args: {
    step: 5,
  },
}
