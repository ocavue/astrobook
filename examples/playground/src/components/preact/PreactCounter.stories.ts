import { GreenBorderDecorator } from '../decorators/JsxDecorator'
import RedBorderDecorator from '../decorators/RedBorderDecorator.astro'

import { PreactCounter, type PreactCounterProps } from './PreactCounter'

export default {
  component: PreactCounter,
}

export const Default = {
  args: {} satisfies PreactCounterProps,
}

export const LargeStep = {
  args: {
    step: 5,
  } satisfies PreactCounterProps,
}

export const RedBorder = {
  args: {
    step: 1,
  } satisfies PreactCounterProps,
  decorators: [{ component: RedBorderDecorator, props: {} }],
}

export const GreenBorder = {
  args: {
    step: 1,
  } satisfies PreactCounterProps,
  decorators: [{ component: GreenBorderDecorator }],
}
