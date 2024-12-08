import LitCounter from './LitCounter.astro'

export default {
  component: LitCounter,
}

export const Default = {
  args: {},
}

export const LargeStep = {
  args: {
    step: 5,
  },
}
