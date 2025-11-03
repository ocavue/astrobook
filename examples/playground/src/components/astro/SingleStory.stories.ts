import type { ComponentProps } from 'astro/types'

import AstroCounter from './AstroCounter.astro'

type AstroCounterProps = ComponentProps<typeof AstroCounter>

export default {
  component: AstroCounter,
}

export const SingleStory = {
  args: {} satisfies AstroCounterProps,
}
