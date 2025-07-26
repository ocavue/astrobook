import RedBorderDecorator from '../decorators/RedBorderDecorator.astro'

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
  decorators: [() => RedBorderDecorator],
}
