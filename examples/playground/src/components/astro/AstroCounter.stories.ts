import type { ComponentProps } from 'astro/types'

import AstroCounter from './AstroCounter.astro'
import RedBorderDecorator from '../decorators/RedBorderDecorator.astro'

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
}

export const RedBorder = {
  args: {
    step: 1,
  } satisfies AstroCounterProps,
  decorators: [
    () => RedBorderDecorator
  ]
}
