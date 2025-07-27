import type { ComponentProps } from 'astro/types'

import RedBorderDecorator from '../decorators/RedBorderDecorator.astro'

import LitCounter from './LitCounter.astro'
import GreenBorderDecorator from '../decorators/GreenBorderDecorator.astro'

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

export const RedBorder = {
  args: {
    step: 1,
  } satisfies LitCounterProps,
  decorators: [() => RedBorderDecorator],
}

export const GreenBorder = {
  args: {
    step: 1,
  } satisfies LitCounterProps,
  decorators: [() => GreenBorderDecorator],
}