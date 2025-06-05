import panda from '@pandacss/dev/postcss'

/** @type {import('postcss').Config} */
const config = {
  plugins: [panda()],
}

export default config
