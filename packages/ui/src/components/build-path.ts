import { createPathBuilder } from '@astrobook/core/client'
import config from 'virtual:astrobook/global-config.mjs'

export const buildPath: (...parts: string[]) => string = createPathBuilder({
  trailingSlash: config.trailingSlash,
})
