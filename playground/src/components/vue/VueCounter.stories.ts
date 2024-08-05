import VueCounter from './VueCounter.vue'

export default {
  component: VueCounter,
}

export const Default = {
  args: {},
}

export const LargeStep = {
  args: {
    step: 10,
  },
}
