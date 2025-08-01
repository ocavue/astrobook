import { ReactCounter } from '../react/ReactCounter'

import AstroDecorator from './AstroDecorator.astro'
import PreactDecorator from './PreactDecorator'
import ReactDecorator from './ReactDecorator'
import SvelteDecorator from './SvelteDecorator.svelte'
import VueDecorator from './VueDecorator.vue'

export default {
  component: ReactCounter,
}

export const SingleDecorator = {
  decorators: [{ component: AstroDecorator }],
}

export const MultipleDecorators = {
  args: { step: 5 },
  decorators: [
    { component: ReactDecorator, props: { label: 'Outer Decorator' } },
    { component: ReactDecorator, props: { label: 'Inner Decorator' } },
  ],
}

export const MixedDecorators = {
  args: { step: 10 },
  decorators: [
    { component: AstroDecorator, props: { label: 'Astro' } },
    { component: ReactDecorator, props: { label: 'React' } },
    { component: PreactDecorator, props: { label: 'Preact' } },
    { component: SvelteDecorator, props: { label: 'Svelte' } },
    { component: VueDecorator, props: { label: 'Vue' } },
  ],
}
