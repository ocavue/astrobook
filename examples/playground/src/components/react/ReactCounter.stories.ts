import { GreenBorderDecorator } from '../decorators/JsxDecorator'
import RedBorderDecorator from '../decorators/RedBorderDecorator.astro'

import { ReactCounter, type ReactCounterProps } from './ReactCounter'

export default {
  component: ReactCounter,
}

export const Default = {
  args: {} satisfies ReactCounterProps,
}

export const LargeStep = {
  args: {
    step: 5,
  } satisfies ReactCounterProps,
}

export const RedBorder = {
  args: {
    step: 1,
  } satisfies ReactCounterProps,
  decorators: [() => RedBorderDecorator],
}

export const GreenBorder = {
  args: {
    step: 1,
  } satisfies ReactCounterProps,
  decorators: [() => GreenBorderDecorator],
}