
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

