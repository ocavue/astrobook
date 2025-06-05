import { defineConfig } from '@pandacss/dev'

import { colorTokens, semanticColorTokens } from './src/styles/colors'

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
        '2xs': { value: { fontSize: '0.5rem', lineHeight: '0.75rem' } },
        xs: { value: { fontSize: '0.75rem', lineHeight: '1.125rem' } },
        sm: { value: { fontSize: '0.875rem', lineHeight: '1.25rem' } },
        md: { value: { fontSize: '1rem', lineHeight: '1.5rem' } },
        lg: { value: { fontSize: '1.125rem', lineHeight: '1.75rem' } },
        xl: { value: { fontSize: '1.25rem', lineHeight: '1.875rem' } },
        '2xl': { value: { fontSize: '1.5rem', lineHeight: '2rem' } },
        '3xl': { value: { fontSize: '1.875rem', lineHeight: '2.375rem' } },
      },
      tokens: {
        colors: colorTokens,
      },
      semanticTokens: {
        colors: semanticColorTokens,
      },
      recipes: {
        button: {
          className: 'button',
          jsx: ['Button'],
          staticCss: ['*'],
          base: {
            alignItems: 'center',
            appearance: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            display: 'inline-flex',
            fontWeight: 'semibold',
            isolation: 'isolate',
            minWidth: '0rem',
            justifyContent: 'center',
            outline: 'none',
            position: 'relative',
            transitionDuration: 'normal',
            transitionProperty: 'background, border-color, color, box-shadow',
            transitionTimingFunction: 'default',
            userSelect: 'none',
            verticalAlign: 'middle',
            whiteSpace: 'nowrap',
            _hidden: {
              display: 'none',
            },
            '& :where(svg)': {
              fontSize: '1.1em',
              width: '1.1em',
              height: '1.1em',
            },
          },
          defaultVariants: {
            variant: 'solid',
            size: 'md',
          },
          variants: {
            variant: {
              solid: {
                background: 'colorPalette.default',
                color: 'colorPalette.fg',
                _hover: {
                  background: 'colorPalette.emphasized',
                },
                _focusVisible: {
                  outline: '2px solid',
                  outlineColor: 'colorPalette.default',
                  outlineOffset: '2px',
                },
                _disabled: {
                  color: 'fg.disabled',
                  background: 'bg.disabled',
                  cursor: 'not-allowed',
                  _hover: {
                    color: 'fg.disabled',
                    background: 'bg.disabled',
                  },
                },
              },
              outline: {
                colorPalette: 'gray',
                borderWidth: '1px',
                borderColor: 'colorPalette.a7',
                color: 'colorPalette.text',
                _hover: {
                  background: 'colorPalette.a2',
                },
                _disabled: {
                  borderColor: 'border.disabled',
                  color: 'fg.disabled',
                  cursor: 'not-allowed',
                  _hover: {
                    background: 'transparent',
                    borderColor: 'border.disabled',
                    color: 'fg.disabled',
                  },
                },
                _focusVisible: {
                  outline: '2px solid',
                  outlineColor: 'colorPalette.default',
                  outlineOffset: '2px',
                },
                _selected: {
                  background: 'accent.default',
                  borderColor: 'accent.default',
                  color: 'accent.fg',
                  _hover: {
                    background: 'accent.emphasized',
                    borderColor: 'accent.emphasized',
                  },
                },
              },
              ghost: {
                color: 'colorPalette.text',
                colorPalette: 'gray',
                _hover: {
                  background: 'colorPalette.a3',
                },
                _selected: {
                  background: 'colorPalette.a3',
                },
                _disabled: {
                  color: 'fg.disabled',
                  cursor: 'not-allowed',
                  _hover: {
                    background: 'transparent',
                    color: 'fg.disabled',
                  },
                },
                _focusVisible: {
                  outline: '2px solid',
                  outlineColor: 'colorPalette.default',
                  outlineOffset: '2px',
                },
              },
              link: {
                verticalAlign: 'baseline',
                _disabled: {
                  color: 'border.disabled',
                  cursor: 'not-allowed',
                  _hover: {
                    color: 'border.disabled',
                  },
                },
                height: 'auto!',
                px: '0rem!',
                minW: '0rem!',
              },
              subtle: {
                background: 'colorPalette.a3',
                color: 'colorPalette.text',
                colorPalette: 'gray',
                _hover: {
                  background: 'colorPalette.a4',
                },
                _focusVisible: {
                  outline: '2px solid',
                  outlineColor: 'colorPalette.default',
                  outlineOffset: '2px',
                },
                _disabled: {
                  background: 'bg.disabled',
                  color: 'fg.disabled',
                  cursor: 'not-allowed',
                  _hover: {
                    background: 'bg.disabled',
                    color: 'fg.disabled',
                  },
                },
              },
            },
            size: {
              xs: {
                height: '2rem',
                minWidth: '2rem',
                textStyle: 'xs',
                paddingX: '0.75rem',
                gap: '0.5rem',
              },
              sm: {
                height: '2.25rem',
                minWidth: '2.25rem',
                textStyle: 'sm',
                paddingX: '0.875rem',
                gap: '0.5rem',
              },
              md: {
                height: '2.5rem',
                minWidth: '2.5rem',
                textStyle: 'sm',
                paddingX: '1rem',
                gap: '0.5rem',
              },
              lg: {
                height: '2.75rem',
                minWidth: '2.75rem',
                textStyle: 'md',
                paddingX: '1.125rem',
                gap: '0.5rem',
              },
              xl: {
                height: '3rem',
                minWidth: '3rem',
                textStyle: 'md',
                paddingX: '1.25rem',
                gap: '0.625rem',
              },
              '2xl': {
                height: '4rem',
                minWidth: '4rem',
                textStyle: 'lg',
                paddingX: '1.75rem',
                gap: '0.75rem',
              },
            },
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',
})
