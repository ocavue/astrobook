import type { ComponentProps } from 'astro/types'

import Button from './Button.astro'

type ButtonProps = ComponentProps<typeof Button>

export default {
  component: Button,
}

export const Primary = {
  args: { variant: 'primary' } satisfies ButtonProps,
}

export const Secondary = {
  args: { variant: 'secondary' } satisfies ButtonProps,
}
