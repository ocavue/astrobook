import { PreactCounter } from './PreactCounter'

export default {
  component: PreactCounter,
  parameters: {
    framework: 'preact',
  },
}

export const Default = {
  args: {},
}

export const LargeStep = {
  args: {
    step: 10,
  },
}
