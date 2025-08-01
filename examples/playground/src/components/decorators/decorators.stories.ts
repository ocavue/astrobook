import type { ComponentProps } from 'astro/types'

import LitCounter from './LitCounter.astro'

type LitCounterProps = ComponentProps<typeof LitCounter>

export default {
  component: LitCounter,
}

export const Default = {
  args: {} satisfies LitCounterProps,
}

export const LargeStep = {
  args: {
    step: 5,
  } satisfies LitCounterProps,
}

