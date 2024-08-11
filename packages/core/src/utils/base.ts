/// <reference types="vite/client" />

import { ensureLeadingSlash, stripSlashes } from './path'

const BASE_URL = stripSlashes(import.meta.env.BASE_URL)

export function getPathWithBase(path: string, base: string = BASE_URL): string {
  return ensureLeadingSlash(
    [base, path].map(stripSlashes).filter(Boolean).join('/'),
  )
}
