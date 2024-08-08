import SolidCounter from './SolidCounter'

export default {
  component: SolidCounter,
  parameters: {
    framework: 'solid-js',
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
