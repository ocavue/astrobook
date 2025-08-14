import type { AstroComponentFactory } from 'astro/runtime/server/index.js'

export { urlPathJoin } from './utils/path'

export function isAstroStory(module: { default?: { component?: unknown } }) {
  try {
    const component = module.default?.component
    if (!component) return false

    return isAstroComponentFactory(component)
  } catch {
    return false
  }
}

// Copy from https://github.com/withastro/astro/blob/astro@5.0.0/packages/astro/src/runtime/server/render/astro/factory.ts#L15
export function isAstroComponentFactory(
  obj: unknown,
): obj is AstroComponentFactory {
  return obj == null
    ? false
    : (obj as Record<string, unknown>).isAstroComponentFactory === true
}
