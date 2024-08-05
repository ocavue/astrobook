export function trimSlashes(path: string) {
  return path.split('/').filter(Boolean).join('/')
}
