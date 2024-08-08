import SvelteCounter from './SvelteCounter.svelte'

export default {
  component: SvelteCounter,
  parameters: {
    framework: 'svelte',
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
