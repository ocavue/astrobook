
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
