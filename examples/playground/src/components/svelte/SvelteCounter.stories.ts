import RedBorderDecorator from '../decorators/RedBorderDecorator.astro'
import SvelteDecorator from '../decorators/SvelteDecorator.svelte'

import SvelteCounter from './SvelteCounter.svelte'

type SvelteCounterProps = {
  step?: number
}

export default {
  component: SvelteCounter,
}

export const Default = {
  args: {} satisfies SvelteCounterProps,
}

export const LargeStep = {
  args: {
    step: 5,
  } satisfies SvelteCounterProps,
}

export const RedBorder = {
  args: {
    step: 1,
  } satisfies SvelteCounterProps,
  decorators: [{ component: RedBorderDecorator }],
}

export const GreenBorder = {
  args: {
    step: 1,
  } satisfies SvelteCounterProps,
  decorators: [{ component: SvelteDecorator }],
}
