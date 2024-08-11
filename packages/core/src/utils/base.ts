/// <reference types="vite/client" />

import { ensureLeadingSlash, stripSlashes } from './path'

export function getPathWithBase(path: string, base: string): string {
  return ensureLeadingSlash(
    [base, path].map(stripSlashes).filter(Boolean).join('/'),
  )
}
