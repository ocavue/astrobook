import type { ComponentProps } from 'astro/types'

import Button from './Button.astro'

type ButtonProps = ComponentProps<typeof Button>

export default {
  component: Button,
}

export const Solid = {
  args: {
    label: 'Solid',
    variant: 'solid',
  } satisfies ButtonProps,
}

export const Outline = {
  args: {
    label: 'Outline',
    variant: 'outline',
  } satisfies ButtonProps,
}

export const Ghost = {
  args: {
    label: 'Ghost',
    variant: 'ghost',
  } satisfies ButtonProps,
}

export const Link = {
  args: {
    label: 'Link',
    variant: 'link',
  } satisfies ButtonProps,
}

export const Subtle = {
  args: {
    label: 'Subtle',
    variant: 'subtle',
  } satisfies ButtonProps,
}
