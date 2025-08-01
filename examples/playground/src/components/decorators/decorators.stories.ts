import type { ComponentProps } from 'astro/types'

import LitCounter from '../lit/LitCounter.astro'

import AstroDecorator from './AstroDecorator.astro'
import PreactDecorator from './PreactDecorator'
import ReactDecorator from './ReactDecorator'
import SvelteDecorator from './SvelteDecorator.svelte'
import VueDecorator from './VueDecorator.vue'

type LitCounterProps = ComponentProps<typeof LitCounter>

export default {
  component: LitCounter,
}

export const Default = {
  args: {} satisfies LitCounterProps,
  decorators: [
    { component: AstroDecorator, props: { label: 'Astro' } },
    { component: ReactDecorator, props: { label: 'React' } },
    { component: PreactDecorator, props: { label: 'Preact' } },
    { component: SvelteDecorator, props: { label: 'Svelte' } },
    { component: VueDecorator, props: { label: 'Vue' } },
  ],
}
