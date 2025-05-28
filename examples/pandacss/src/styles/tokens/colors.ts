import { defineTokens, defineSemanticTokens } from '@pandacss/dev'

export const colorTokens = defineTokens.colors({
  red: {
    light: {
      '1': { value: '#fffcfc' },
      '2': { value: '#fff7f7' },
      '3': { value: '#feebec' },
      '4': { value: '#ffdbdc' },
      '5': { value: '#ffcdce' },
      '6': { value: '#fdbdbe' },
      '7': { value: '#f4a9aa' },
      '8': { value: '#eb8e90' },
      '9': { value: '#e5484d' },
      '10': { value: '#dc3e42' },
      '11': { value: '#ce2c31' },
      '12': { value: '#641723' },
      a1: { value: '#ff000003' },
      a2: { value: '#ff000008' },
      a3: { value: '#f3000d14' },
      a4: { value: '#ff000824' },
      a5: { value: '#ff000632' },
      a6: { value: '#f8000442' },
      a7: { value: '#df000356' },
      a8: { value: '#d2000571' },
      a9: { value: '#db0007b7' },
      a10: { value: '#d10005c1' },
      a11: { value: '#c40006d3' },
      a12: { value: '#55000de8' },
    },
    dark: {
      '1': { value: '#191111' },
      '2': { value: '#201314' },
      '3': { value: '#3b1219' },
      '4': { value: '#500f1c' },
      '5': { value: '#611623' },
      '6': { value: '#72232d' },
      '7': { value: '#8c333a' },
      '8': { value: '#b54548' },
      '9': { value: '#e5484d' },
      '10': { value: '#ec5d5e' },
      '11': { value: '#ff9592' },
      '12': { value: '#ffd1d9' },
      a1: { value: '#f4121209' },
      a2: { value: '#f22f3e11' },
      a3: { value: '#ff173f2d' },
      a4: { value: '#fe0a3b44' },
      a5: { value: '#ff204756' },
      a6: { value: '#ff3e5668' },
      a7: { value: '#ff536184' },
      a8: { value: '#ff5d61b0' },
      a9: { value: '#fe4e54e4' },
      a10: { value: '#ff6465eb' },
      a11: { value: '#ff9592' },
      a12: { value: '#ffd1d9' },
    },
  },
  gray: {
    light: {
      '1': { value: '#fcfcfd' },
      '2': { value: '#f9f9fb' },
      '3': { value: '#f0f0f3' },
      '4': { value: '#e8e8ec' },
      '5': { value: '#e0e1e6' },
      '6': { value: '#d9d9e0' },
      '7': { value: '#cdced6' },
      '8': { value: '#b9bbc6' },
      '9': { value: '#8b8d98' },
      '10': { value: '#80838d' },
      '11': { value: '#60646c' },
      '12': { value: '#1c2024' },
      a1: { value: '#00005503' },
      a2: { value: '#00005506' },
      a3: { value: '#0000330f' },
      a4: { value: '#00002d17' },
      a5: { value: '#0009321f' },
      a6: { value: '#00002f26' },
      a7: { value: '#00062e32' },
      a8: { value: '#00083046' },
      a9: { value: '#00051d74' },
      a10: { value: '#00071b7f' },
      a11: { value: '#0007149f' },
      a12: { value: '#000509e3' },
    },
    dark: {
      '1': { value: '#111113' },
      '2': { value: '#18191b' },
      '3': { value: '#212225' },
      '4': { value: '#272a2d' },
      '5': { value: '#2e3135' },
      '6': { value: '#363a3f' },
      '7': { value: '#43484e' },
      '8': { value: '#5a6169' },
      '9': { value: '#696e77' },
      '10': { value: '#777b84' },
      '11': { value: '#b0b4ba' },
      '12': { value: '#edeef0' },
      a1: { value: '#00000000' },
      a2: { value: '#d8f4f609' },
      a3: { value: '#ddeaf814' },
      a4: { value: '#d3edf81d' },
      a5: { value: '#d9edfe25' },
      a6: { value: '#d6ebfd30' },
      a7: { value: '#d9edff40' },
      a8: { value: '#d9edff5d' },
      a9: { value: '#dfebfd6d' },
      a10: { value: '#e5edfd7b' },
      a11: { value: '#f1f7feb5' },
      a12: { value: '#fcfdffef' },
    },
  },
  crimson: {
    light: {
      '1': { value: '#fffcfd' },
      '2': { value: '#fef7f9' },
      '3': { value: '#ffe9f0' },
      '4': { value: '#fedce7' },
      '5': { value: '#facedd' },
      '6': { value: '#f3bed1' },
      '7': { value: '#eaacc3' },
      '8': { value: '#e093b2' },
      '9': { value: '#e93d82' },
      '10': { value: '#df3478' },
      '11': { value: '#cb1d63' },
      '12': { value: '#621639' },
      a1: { value: '#ff005503' },
      a2: { value: '#e0004008' },
      a3: { value: '#ff005216' },
      a4: { value: '#f8005123' },
      a5: { value: '#e5004f31' },
      a6: { value: '#d0004b41' },
      a7: { value: '#bf004753' },
      a8: { value: '#b6004a6c' },
      a9: { value: '#e2005bc2' },
      a10: { value: '#d70056cb' },
      a11: { value: '#c4004fe2' },
      a12: { value: '#530026e9' },
    },
    dark: {
      '1': { value: '#191114' },
      '2': { value: '#201318' },
      '3': { value: '#381525' },
      '4': { value: '#4d122f' },
      '5': { value: '#5c1839' },
      '6': { value: '#6d2545' },
      '7': { value: '#873356' },
      '8': { value: '#b0436e' },
      '9': { value: '#e93d82' },
      '10': { value: '#ee518a' },
      '11': { value: '#ff92ad' },
      '12': { value: '#fdd3e8' },
      a1: { value: '#f4126709' },
      a2: { value: '#f22f7a11' },
      a3: { value: '#fe2a8b2a' },
      a4: { value: '#fd158741' },
      a5: { value: '#fd278f51' },
      a6: { value: '#fe459763' },
      a7: { value: '#fd559b7f' },
      a8: { value: '#fe5b9bab' },
      a9: { value: '#fe418de8' },
      a10: { value: '#ff5693ed' },
      a11: { value: '#ff92ad' },
      a12: { value: '#ffd5eafd' },
    },
  },
  current: { value: 'currentColor' },
  black: {
    DEFAULT: { value: '#000000' },
    a1: { value: 'rgba(0, 0, 0, 0.05)' },
    a2: { value: 'rgba(0, 0, 0, 0.1)' },
    a3: { value: 'rgba(0, 0, 0, 0.15)' },
    a4: { value: 'rgba(0, 0, 0, 0.2)' },
    a5: { value: 'rgba(0, 0, 0, 0.3)' },
    a6: { value: 'rgba(0, 0, 0, 0.4)' },
    a7: { value: 'rgba(0, 0, 0, 0.5)' },
    a8: { value: 'rgba(0, 0, 0, 0.6)' },
    a9: { value: 'rgba(0, 0, 0, 0.7)' },
    a10: { value: 'rgba(0, 0, 0, 0.8)' },
    a11: { value: 'rgba(0, 0, 0, 0.9)' },
    a12: { value: 'rgba(0, 0, 0, 0.95)' },
  },
  white: {
    DEFAULT: { value: '#ffffff' },
    a1: { value: 'rgba(255, 255, 255, 0.05)' },
    a2: { value: 'rgba(255, 255, 255, 0.1)' },
    a3: { value: 'rgba(255, 255, 255, 0.15)' },
    a4: { value: 'rgba(255, 255, 255, 0.2)' },
    a5: { value: 'rgba(255, 255, 255, 0.3)' },
    a6: { value: 'rgba(255, 255, 255, 0.4)' },
    a7: { value: 'rgba(255, 255, 255, 0.5)' },
    a8: { value: 'rgba(255, 255, 255, 0.6)' },
    a9: { value: 'rgba(255, 255, 255, 0.7)' },
    a10: { value: 'rgba(255, 255, 255, 0.8)' },
    a11: { value: 'rgba(255, 255, 255, 0.9)' },
    a12: { value: 'rgba(255, 255, 255, 0.95)' },
  },
  transparent: { value: 'rgb(0 0 0 / 0)' },
})
export const semanticColorTokens = defineSemanticTokens.colors({
  red: {
    '1': {
      value: {
        _light: '{colors.red.light.1}',
        _dark: '{colors.red.dark.1}',
      },
    },
    '2': {
      value: {
        _light: '{colors.red.light.2}',
        _dark: '{colors.red.dark.2}',
      },
    },
    '3': {
      value: {
        _light: '{colors.red.light.3}',
        _dark: '{colors.red.dark.3}',
      },
    },
    '4': {
      value: {
        _light: '{colors.red.light.4}',
        _dark: '{colors.red.dark.4}',
      },
    },
    '5': {
      value: {
        _light: '{colors.red.light.5}',
        _dark: '{colors.red.dark.5}',
      },
    },
    '6': {
      value: {
        _light: '{colors.red.light.6}',
        _dark: '{colors.red.dark.6}',
      },
    },
    '7': {
      value: {
        _light: '{colors.red.light.7}',
        _dark: '{colors.red.dark.7}',
      },
    },
    '8': {
      value: {
        _light: '{colors.red.light.8}',
        _dark: '{colors.red.dark.8}',
      },
    },
    '9': {
      value: {
        _light: '{colors.red.light.9}',
        _dark: '{colors.red.dark.9}',
      },
    },
    '10': {
      value: {
        _light: '{colors.red.light.10}',
        _dark: '{colors.red.dark.10}',
      },
    },
    '11': {
      value: {
        _light: '{colors.red.light.11}',
        _dark: '{colors.red.dark.11}',
      },
    },
    '12': {
      value: {
        _light: '{colors.red.light.12}',
        _dark: '{colors.red.dark.12}',
      },
    },
    a1: {
      value: {
        _light: '{colors.red.light.a1}',
        _dark: '{colors.red.dark.a1}',
      },
    },
    a2: {
      value: {
        _light: '{colors.red.light.a2}',
        _dark: '{colors.red.dark.a2}',
      },
    },
    a3: {
      value: {
        _light: '{colors.red.light.a3}',
        _dark: '{colors.red.dark.a3}',
      },
    },
    a4: {
      value: {
        _light: '{colors.red.light.a4}',
        _dark: '{colors.red.dark.a4}',
      },
    },
    a5: {
      value: {
        _light: '{colors.red.light.a5}',
        _dark: '{colors.red.dark.a5}',
      },
    },
    a6: {
      value: {
        _light: '{colors.red.light.a6}',
        _dark: '{colors.red.dark.a6}',
      },
    },
    a7: {
      value: {
        _light: '{colors.red.light.a7}',
        _dark: '{colors.red.dark.a7}',
      },
    },
    a8: {
      value: {
        _light: '{colors.red.light.a8}',
        _dark: '{colors.red.dark.a8}',
      },
    },
    a9: {
      value: {
        _light: '{colors.red.light.a9}',
        _dark: '{colors.red.dark.a9}',
      },
    },
    a10: {
      value: {
        _light: '{colors.red.light.a10}',
        _dark: '{colors.red.dark.a10}',
      },
    },
    a11: {
      value: {
        _light: '{colors.red.light.a11}',
        _dark: '{colors.red.dark.a11}',
      },
    },
    a12: {
      value: {
        _light: '{colors.red.light.a12}',
        _dark: '{colors.red.dark.a12}',
      },
    },
    default: {
      value: {
        _light: '{colors.red.light.9}',
        _dark: '{colors.red.dark.9}',
      },
    },
    emphasized: {
      value: {
        _light: '{colors.red.light.10}',
        _dark: '{colors.red.dark.10}',
      },
    },
    fg: { value: { _light: 'white', _dark: 'white' } },
    text: {
      value: {
        _light: '{colors.red.light.a11}',
        _dark: '{colors.red.dark.a11}',
      },
    },
  },
  crimson: {
    '1': {
      value: {
        _light: '{colors.crimson.light.1}',
        _dark: '{colors.crimson.dark.1}',
      },
    },
    '2': {
      value: {
        _light: '{colors.crimson.light.2}',
        _dark: '{colors.crimson.dark.2}',
      },
    },
    '3': {
      value: {
        _light: '{colors.crimson.light.3}',
        _dark: '{colors.crimson.dark.3}',
      },
    },
    '4': {
      value: {
        _light: '{colors.crimson.light.4}',
        _dark: '{colors.crimson.dark.4}',
      },
    },
    '5': {
      value: {
        _light: '{colors.crimson.light.5}',
        _dark: '{colors.crimson.dark.5}',
      },
    },
    '6': {
      value: {
        _light: '{colors.crimson.light.6}',
        _dark: '{colors.crimson.dark.6}',
      },
    },
    '7': {
      value: {
        _light: '{colors.crimson.light.7}',
        _dark: '{colors.crimson.dark.7}',
      },
    },
    '8': {
      value: {
        _light: '{colors.crimson.light.8}',
        _dark: '{colors.crimson.dark.8}',
      },
    },
    '9': {
      value: {
        _light: '{colors.crimson.light.9}',
        _dark: '{colors.crimson.dark.9}',
      },
    },
    '10': {
      value: {
        _light: '{colors.crimson.light.10}',
        _dark: '{colors.crimson.dark.10}',
      },
    },
    '11': {
      value: {
        _light: '{colors.crimson.light.11}',
        _dark: '{colors.crimson.dark.11}',
      },
    },
    '12': {
      value: {
        _light: '{colors.crimson.light.12}',
        _dark: '{colors.crimson.dark.12}',
      },
    },
    a1: {
      value: {
        _light: '{colors.crimson.light.a1}',
        _dark: '{colors.crimson.dark.a1}',
      },
    },
    a2: {
      value: {
        _light: '{colors.crimson.light.a2}',
        _dark: '{colors.crimson.dark.a2}',
      },
    },
    a3: {
      value: {
        _light: '{colors.crimson.light.a3}',
        _dark: '{colors.crimson.dark.a3}',
      },
    },
    a4: {
      value: {
        _light: '{colors.crimson.light.a4}',
        _dark: '{colors.crimson.dark.a4}',
      },
    },
    a5: {
      value: {
        _light: '{colors.crimson.light.a5}',
        _dark: '{colors.crimson.dark.a5}',
      },
    },
    a6: {
      value: {
        _light: '{colors.crimson.light.a6}',
        _dark: '{colors.crimson.dark.a6}',
      },
    },
    a7: {
      value: {
        _light: '{colors.crimson.light.a7}',
        _dark: '{colors.crimson.dark.a7}',
      },
    },
    a8: {
      value: {
        _light: '{colors.crimson.light.a8}',
        _dark: '{colors.crimson.dark.a8}',
      },
    },
    a9: {
      value: {
        _light: '{colors.crimson.light.a9}',
        _dark: '{colors.crimson.dark.a9}',
      },
    },
    a10: {
      value: {
        _light: '{colors.crimson.light.a10}',
        _dark: '{colors.crimson.dark.a10}',
      },
    },
    a11: {
      value: {
        _light: '{colors.crimson.light.a11}',
        _dark: '{colors.crimson.dark.a11}',
      },
    },
    a12: {
      value: {
        _light: '{colors.crimson.light.a12}',
        _dark: '{colors.crimson.dark.a12}',
      },
    },
    default: {
      value: {
        _light: '{colors.crimson.light.9}',
        _dark: '{colors.crimson.dark.9}',
      },
    },
    emphasized: {
      value: {
        _light: '{colors.crimson.light.10}',
        _dark: '{colors.crimson.dark.10}',
      },
    },
    fg: { value: { _light: 'white', _dark: 'white' } },
    text: {
      value: {
        _light: '{colors.crimson.light.a11}',
        _dark: '{colors.crimson.dark.a11}',
      },
    },
  },
  gray: {
    '1': {
      value: {
        _light: '{colors.gray.light.1}',
        _dark: '{colors.gray.dark.1}',
      },
    },
    '2': {
      value: {
        _light: '{colors.gray.light.2}',
        _dark: '{colors.gray.dark.2}',
      },
    },
    '3': {
      value: {
        _light: '{colors.gray.light.3}',
        _dark: '{colors.gray.dark.3}',
      },
    },
    '4': {
      value: {
        _light: '{colors.gray.light.4}',
        _dark: '{colors.gray.dark.4}',
      },
    },
    '5': {
      value: {
        _light: '{colors.gray.light.5}',
        _dark: '{colors.gray.dark.5}',
      },
    },
    '6': {
      value: {
        _light: '{colors.gray.light.6}',
        _dark: '{colors.gray.dark.6}',
      },
    },
    '7': {
      value: {
        _light: '{colors.gray.light.7}',
        _dark: '{colors.gray.dark.7}',
      },
    },
    '8': {
      value: {
        _light: '{colors.gray.light.8}',
        _dark: '{colors.gray.dark.8}',
      },
    },
    '9': {
      value: {
        _light: '{colors.gray.light.9}',
        _dark: '{colors.gray.dark.9}',
      },
    },
    '10': {
      value: {
        _light: '{colors.gray.light.10}',
        _dark: '{colors.gray.dark.10}',
      },
    },
    '11': {
      value: {
        _light: '{colors.gray.light.11}',
        _dark: '{colors.gray.dark.11}',
      },
    },
    '12': {
      value: {
        _light: '{colors.gray.light.12}',
        _dark: '{colors.gray.dark.12}',
      },
    },
    a1: {
      value: {
        _light: '{colors.gray.light.a1}',
        _dark: '{colors.gray.dark.a1}',
      },
    },
    a2: {
      value: {
        _light: '{colors.gray.light.a2}',
        _dark: '{colors.gray.dark.a2}',
      },
    },
    a3: {
      value: {
        _light: '{colors.gray.light.a3}',
        _dark: '{colors.gray.dark.a3}',
      },
    },
    a4: {
      value: {
        _light: '{colors.gray.light.a4}',
        _dark: '{colors.gray.dark.a4}',
      },
    },
    a5: {
      value: {
        _light: '{colors.gray.light.a5}',
        _dark: '{colors.gray.dark.a5}',
      },
    },
    a6: {
      value: {
        _light: '{colors.gray.light.a6}',
        _dark: '{colors.gray.dark.a6}',
      },
    },
    a7: {
      value: {
        _light: '{colors.gray.light.a7}',
        _dark: '{colors.gray.dark.a7}',
      },
    },
    a8: {
      value: {
        _light: '{colors.gray.light.a8}',
        _dark: '{colors.gray.dark.a8}',
      },
    },
    a9: {
      value: {
        _light: '{colors.gray.light.a9}',
        _dark: '{colors.gray.dark.a9}',
      },
    },
    a10: {
      value: {
        _light: '{colors.gray.light.a10}',
        _dark: '{colors.gray.dark.a10}',
      },
    },
    a11: {
      value: {
        _light: '{colors.gray.light.a11}',
        _dark: '{colors.gray.dark.a11}',
      },
    },
    a12: {
      value: {
        _light: '{colors.gray.light.a12}',
        _dark: '{colors.gray.dark.a12}',
      },
    },
    default: {
      value: {
        _light: '{colors.gray.light.9}',
        _dark: '{colors.gray.dark.9}',
      },
    },
    emphasized: {
      value: {
        _light: '{colors.gray.light.10}',
        _dark: '{colors.gray.dark.10}',
      },
    },
    fg: { value: { _light: 'white', _dark: 'white' } },
    text: {
      value: {
        _light: '{colors.gray.light.12}',
        _dark: '{colors.gray.dark.12}',
      },
    },
  },
  bg: {
    canvas: {
      value: { _light: '{colors.gray.1}', _dark: '{colors.gray.1}' },
    },
    default: { value: { _light: 'white', _dark: '{colors.gray.2}' } },
    subtle: {
      value: { _light: '{colors.gray.2}', _dark: '{colors.gray.3}' },
    },
    muted: {
      value: { _light: '{colors.gray.3}', _dark: '{colors.gray.4}' },
    },
    emphasized: {
      value: { _light: '{colors.gray.4}', _dark: '{colors.gray.5}' },
    },
    disabled: {
      value: { _light: '{colors.gray.5}', _dark: '{colors.gray.6}' },
    },
  },
  fg: {
    default: {
      value: { _light: '{colors.gray.12}', _dark: '{colors.gray.12}' },
    },
    muted: {
      value: { _light: '{colors.gray.11}', _dark: '{colors.gray.11}' },
    },
    subtle: {
      value: { _light: '{colors.gray.10}', _dark: '{colors.gray.10}' },
    },
    disabled: {
      value: { _light: '{colors.gray.9}', _dark: '{colors.gray.9}' },
    },
    error: {
      value: { _light: '{colors.red.9}', _dark: '{colors.red.9}' },
    },
  },
  border: {
    default: {
      value: { _light: '{colors.gray.7}', _dark: '{colors.gray.7}' },
    },
    muted: {
      value: { _light: '{colors.gray.6}', _dark: '{colors.gray.6}' },
    },
    subtle: {
      value: { _light: '{colors.gray.4}', _dark: '{colors.gray.4}' },
    },
    disabled: {
      value: { _light: '{colors.gray.5}', _dark: '{colors.gray.5}' },
    },
    outline: {
      value: { _light: '{colors.gray.a9}', _dark: '{colors.gray.a9}' },
    },
    error: {
      value: { _light: '{colors.red.9}', _dark: '{colors.red.9}' },
    },
  },
})
