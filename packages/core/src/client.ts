export { getPathWithBase } from './utils/base'

export function isAstroComponent(module: {
  default?: { component?: unknown }
}) {
  try {
    const component = module.default?.component
    if (!component) return false

    const comp = component as Record<string, unknown>

    if (comp.isAstroComponentFactory) {
      return true
    }

    const moduleId = comp.moduleId
    if (
      moduleId &&
      typeof moduleId === 'string' &&
      moduleId.toLowerCase().endsWith('.astro')
    ) {
      return true
    }
  } catch {
    return false
  }
}
