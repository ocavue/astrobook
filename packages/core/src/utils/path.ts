/** Ensure the passed path does not start and end with slashes. */
export function stripSlashes(path: string): string {
  return path.split('/').filter(Boolean).join('/')
}

/** Ensure the passed path starts with a leading slash. */
export function ensureLeadingSlash(path: string): string {
  return '/' + stripSlashes(path)
}

/** Ensure the passed path ends with a trailing slash. */
export function ensureTrailingSlash(path: string): string {
  return stripSlashes(path) + '/'
}
