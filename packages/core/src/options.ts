import type { IntegrationOptions } from '@astrobook/types'
import * as v from 'valibot'

const IntegrationOptionsSchema = v.optional(
  v.object({
    directory: v.optional(v.string(), '.'),
    subpath: v.optional(v.string(), ''),
    dashboardSubpath: v.optional(v.string(), 'dashboard'),
    previewSubpath: v.optional(v.string(), 'stories'),
    title: v.optional(v.string(), 'Astrobook'),
    css: v.optional(v.array(v.string()), []),
    head: v.optional(v.string(), 'astrobook/components/head.astro'),
    home: v.optional(v.string(), 'astrobook/components/home.astro')
  }),
  {},
)

export type ResolvedOptions = v.InferOutput<typeof IntegrationOptionsSchema>

export function resolveOptions(options?: IntegrationOptions): ResolvedOptions {
  const result = v.safeParse(
    IntegrationOptionsSchema,
    options satisfies v.InferInput<typeof IntegrationOptionsSchema>,
  )

  if (!result.success) {
    const errorMessage = v.summarize(result.issues)
    throw new Error(`Invalid Astrobook options:\n${errorMessage}`)
  }

  return result.output
}
