import { GreenBorderDecorator } from '../decorators/JsxDecorator'
import RedBorderDecorator from '../decorators/RedBorderDecorator.astro'

import SolidCounter, { type SolidCounterProps } from './SolidCounter'

export default {
  component: SolidCounter,
}

export const Default = {
  args: {} satisfies SolidCounterProps,
}

export const LargeStep = {
  args: {
    step: 5,
  } satisfies SolidCounterProps,
}

export const RedBorder = {
  args: {
    step: 1,
  } satisfies SolidCounterProps,
  decorators: [() => RedBorderDecorator],
}

export const GreenBorder = {
  args: {
    step: 1,
  } satisfies SolidCounterProps,
  decorators: [() => GreenBorderDecorator],
}
