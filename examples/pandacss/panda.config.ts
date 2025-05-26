import { defineConfig } from '@pandacss/dev'

import { fontSizeTokens } from './src/tokens/fontSizes'
import { colorTokens, semanticColorTokens } from './src/tokens/colors'
import { button } from './src/components/Button.recipe'

export default defineConfig({
  preflight: true,
  include: ['./src/**/*.{js,jsx,ts,tsx,astro}'],
  exclude: [],
  conditions: {
    extend: {
      current: '&:is([data-current])',
      hidden: '&:is([hidden])',
      hover: [
        '@media (hover: hover) and (pointer: fine)',
        '&:is(:hover, [data-hover])',
      ],
      dark: '.dark &',
      light: ':root &, .light &',
    },
  },
  globalCss: {
    extend: {
      html: {
        colorPalette: 'crimson',
      },
      body: {
        background: 'bg.canvas',
        color: 'fg.default',
        _dark: {
          colorScheme: 'dark',
        },
      },
      '*, *::before, *::after': {
        borderColor: 'border.subtle',
        borderStyle: 'solid',
        boxSizing: 'border-box',
      },
      '*::placeholder': {
        opacity: 1,
        color: 'fg.subtle',
      },
      '*::selection': {
        bg: 'colorPalette.a3',
      },
    },
  },
  theme: {
    extend: {
      textStyles: {
        xs: { value: { fontSize: 'xs', lineHeight: '1.125rem' } },
        sm: { value: { fontSize: 'sm', lineHeight: '1.25rem' } },
        md: { value: { fontSize: 'md', lineHeight: '1.5rem' } },
        lg: { value: { fontSize: 'lg', lineHeight: '1.75rem' } },
        xl: { value: { fontSize: 'xl', lineHeight: '1.875rem' } },
        '2xl': { value: { fontSize: '2xl', lineHeight: '2rem' } },
        '3xl': { value: { fontSize: '3xl', lineHeight: '2.375rem' } },
        '4xl': {
          value: {
            fontSize: '4xl',
            lineHeight: '2.75rem',
            letterSpacing: '-0.02em',
          },
        },
        '5xl': {
          value: {
            fontSize: '5xl',
            lineHeight: '3.75rem',
            letterSpacing: '-0.02em',
          },
        },
        '6xl': {
          value: {
            fontSize: '6xl',
            lineHeight: '4.5rem',
            letterSpacing: '-0.02em',
          },
        },
        '7xl': {
          value: {
            fontSize: '7xl',
            lineHeight: '5.75rem',
            letterSpacing: '-0.02em',
          },
        },
      },
      tokens: {
        fontSizes: fontSizeTokens,
        colors: colorTokens,
      },
      semanticTokens: {
        colors: semanticColorTokens,
      },

      recipes: {
        button,
      },
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',
  jsxFramework: 'preact',
})
