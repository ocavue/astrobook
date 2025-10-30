import type { StoryNamedExport } from '@astrobook/types'
import type { AstroComponentFactory } from 'astro/runtime/server/index.js'

export { createPathBuilder, type PathBuilder } from './utils/path-builder'

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
function isAstroComponentFactory(
  obj: unknown,
): obj is AstroComponentFactory {
  return obj == null
    ? false
    : (obj as Record<string, unknown>).isAstroComponentFactory === true
}

export function validateStoryNamedExport(
  module: Record<string, unknown>,
  importPath: string,
  storyName: string,
): StoryNamedExport {
  if (!module) {
    throw new Error(
      `[astrobook] Unexpected error: Unable to find story module: ${importPath}`,
    )
  }
  if (typeof module !== 'object') {
    throw new TypeError(
      `[astrobook] Unexpected error: Story module should be an object, but got ${typeof module}: ${importPath}`,
    )
  }

  const defaultExport = 'default' in module ? module['default'] : undefined
  if (!defaultExport) {
    throw new TypeError(
      `[astrobook] '${importPath}' should have a default export`,
    )
  }
  if (typeof defaultExport !== 'object') {
    throw new TypeError(
      `[astrobook] '${importPath}' default export should be an object, but got ${typeof defaultExport}`,
    )
  }

  const component =
    'component' in defaultExport ? defaultExport.component : undefined
  if (!component) {
    throw new TypeError(
      `[astrobook] '${importPath}' default export should have a component property`,
    )
  }

  const storyObject: unknown =
    storyName in module ? module[storyName] : undefined
  if (!storyObject) {
    throw new Error(
      `[astrobook] Unable to find named export '${storyName}' from '${importPath}'`,
    )
  }
  if (typeof storyObject !== 'object') {
    throw new TypeError(
      `[astrobook] Named export '${storyName}' from '${importPath}' should be an object, but got ${typeof storyObject}`,
    )
  }

  const decorators =
    'decorators' in storyObject ? storyObject.decorators : undefined

  if (decorators != null && !Array.isArray(decorators)) {
    throw new TypeError(
      `[astrobook] The 'decorators' property of the named export '${storyName}' from '${importPath}' should be an array or undefined, but got ${typeof decorators}`,
    )
  }

  const args = 'args' in storyObject ? storyObject.args : undefined
  if (args != null && typeof args !== 'object') {
    throw new TypeError(
      `[astrobook] The 'args' property of the named export '${storyName}' from '${importPath}' should be an object or undefined, but got ${typeof args}`,
    )
  }

  return { decorators, args }
}
