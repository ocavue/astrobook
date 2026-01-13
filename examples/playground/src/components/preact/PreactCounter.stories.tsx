import { PreactCounter, type PreactCounterProps } from './PreactCounter'

export default {
  component: PreactCounter,
}

export const Default = {
  args: {} satisfies PreactCounterProps,
}

export const LargeStep = {
  args: {
    step: 100,
    children: 'I expect this to be rendered on the screen',
  } satisfies PreactCounterProps,
}
