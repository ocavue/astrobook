import { basic } from '@ocavue/eslint-config'

export default [
  ...basic(),
  { rules: { '@typescript-eslint/triple-slash-reference': 'off' } },
]
