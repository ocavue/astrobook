/// <reference types="vite/client" />

import { ensureLeadingSlash, stripSlashes } from './path'

const BASE_URL = stripSlashes(
  (import.meta.env.ASTROBOOK_BASE_URL2 as string) || '',
)

export function getPathWithBase(path: string, base: string = BASE_URL): string {
  return ensureLeadingSlash(
    [base, path].map(stripSlashes).filter(Boolean).join('/'),
  )
}
