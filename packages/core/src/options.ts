import type { IntegrationOptions } from '@astrobook/types'
import { z } from 'astro/zod'

const IntegrationOptionsSchema = z.object({
  directory: z.string().optional().default('.'),
  subpath: z.string().optional().default(''),
  dashboardSubpath: z.string().optional().default('dashboard'),
  storySubpath: z.string().optional().default('stories'),
  title: z.string().optional().default('Astrobook'),
  css: z.array(z.string()).optional().default([]),
  head: z.string().optional().default('astrobook/components/head.astro'),
})

export type ResolvedOptions = z.infer<typeof IntegrationOptionsSchema>

export function resolveOptions(options?: IntegrationOptions): ResolvedOptions {
  const result = IntegrationOptionsSchema.safeParse(options)

  if (!result.success) {
    // TODO: use `z.prettifyError()` to provide a more readable error message once
    // Astro supports zod v4.
    throw new Error(`Invalid Astrobook options:\n${result.error}`, {
      cause: result.error,
    })
  }

  return result.data
}
