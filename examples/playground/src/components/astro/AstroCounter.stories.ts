import type { ComponentProps } from 'astro/types'

import AstroCounter from './AstroCounter.astro'
import Subcomponent from './Subcomponent.astro'

type AstroCounterProps = ComponentProps<typeof AstroCounter>

export default {
  component: AstroCounter,
}

export const Default = {
  args: {} satisfies AstroCounterProps,
}

export const LargeStep = {
  args: {
    step: 5,
  } satisfies AstroCounterProps,
  slots: {
    default: '<p>Counter</p>',
  },
}

export const LargeStepSlot = {
  args: {
    step: 5,
  } satisfies AstroCounterProps,
  slots: {
    default: Subcomponent,
  },
}
