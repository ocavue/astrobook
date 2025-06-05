import type { ComponentProps } from 'astro/types'

import Typography from './Typography.astro'

type TypographyProps = ComponentProps<typeof Typography>

export default {
  component: Typography,
}

export const Lobster = {
  args: {
    fontName: 'lobster',
  } satisfies TypographyProps,
}

export const FreckleFace = {
  args: {
    fontName: 'freckle-face',
  } satisfies TypographyProps,
}

export const PressStart2P = {
  args: {
    fontName: 'press-start-2p',
  } satisfies TypographyProps,
}
