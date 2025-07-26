import RedBorderDecorator from '../decorators/RedBorderDecorator.astro'
import VueCounter from './VueCounter.vue'

type VueCounterProps = {
  step?: number
}

export default {
  component: VueCounter,
}

export const Default = {
  args: {} satisfies VueCounterProps,
}

export const LargeStep = {
  args: {
    step: 5,
  } satisfies VueCounterProps,
}

export const RedBorder = {
  args: {
    step: 1,
  } satisfies VueCounterProps,
  decorators: [
    () => RedBorderDecorator
  ]
}
