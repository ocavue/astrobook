import VueCounter from './VueCounter.vue'

export default {
  component: VueCounter,
  parameters: {
    framework: 'vue',
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
