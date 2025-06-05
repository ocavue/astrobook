import Button from './Button.astro'

export default {
  component: Button,
}

export const Solid = {
  args: {
    label: 'Solid',
    variant: 'solid',
  },
}

export const Outline = {
  args: {
    label: 'Outline',
    variant: 'outline',
  },
}

export const Ghost = {
  args: {
    label: 'Ghost',
    variant: 'ghost',
  },
}

export const Link = {
  args: {
    label: 'Link',
    variant: 'link',
  },
}

export const Subtle = {
  args: {
    label: 'Subtle',
    variant: 'subtle',
  },
}
