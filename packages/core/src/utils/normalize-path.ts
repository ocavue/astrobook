import { normalize } from 'node:path/posix'

import slash from 'slash'

/**
 * Converts a path to unix-style slashes and normalizes it.
 */
export function normalizePath(path: string): string {
  return normalize(slash(path))
}
