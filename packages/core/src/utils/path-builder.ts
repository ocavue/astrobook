import type { AstroConfig } from 'astro'

import {
  ensureLeadingSlash,
  ensureTrailingSlash,
  stripLeadingAndTrailingSlashes,
  stripTrailingSlash,
} from './path'

interface PathBuilderOptions {
  trailingSlash?: AstroConfig['trailingSlash']
}

export type PathBuilder = (...parts: string[]) => string

/**
 * Joins multiple path segments into a single URL path with a leading slash,
 * and adds or removes a trailing slash based on config.
 */
export function createPathBuilder({
  trailingSlash = 'ignore',
}: PathBuilderOptions): PathBuilder {
  return function buildPath(...parts): string {
    let result = parts
      .map(stripLeadingAndTrailingSlashes)
      .filter(Boolean)
      .join('/')

    if (trailingSlash === 'always') {
      result = ensureTrailingSlash(result)
    } else if (trailingSlash === 'never') {
      result = stripTrailingSlash(result)
    }

    return ensureLeadingSlash(result)
  }
}
