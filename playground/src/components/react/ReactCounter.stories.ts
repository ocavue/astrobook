import { ReactCounter } from './ReactCounter'

export default {
  component: ReactCounter,
  parameters: {
    framework: 'react',
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
