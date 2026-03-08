import { ReactCounter, type ReactCounterProps } from './ReactCounter'

export default {
  component: ReactCounter,
}

export const Default = {
  args: {} satisfies ReactCounterProps,
}

export const LargeStep = {
  args: {
    step: 100,
    children: 'I expect this to be rendered on the screen',
  } satisfies ReactCounterProps,
}
