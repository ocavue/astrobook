import type { IntegrationOptions } from '@astrobook/types'
import * as v from 'valibot'

const HomeContentSchema = v.optional(
  v.object({
    title: v.optional(v.union([v.string(), v.literal(false)]), 'Astrobook'),
    subtitle: v.optional(
      v.union([v.string(), v.literal(false)]),
      'The minimal UI component playground',
    ),
    version: v.optional(
      v.union([
        v.object({
          href: v.optional(
            v.string(),
            'https://github.com/ocavue/astrobook/blob/master/packages/astrobook/CHANGELOG.md',
          ),
        }),
        v.literal(false),
      ]),
      {},
    ),
    repo: v.optional(
      v.union([
        v.object({
          href: v.optional(v.string(), 'https://github.com/ocavue/astrobook'),
          label: v.optional(v.string(), 'Star on GitHub'),
        }),
        v.literal(false),
      ]),
      {},
    ),
  }),
  {},
)

const HomeSchema = v.pipe(
  v.optional(v.union([v.string(), v.literal(false)]), undefined),
  v.transform((input): string => {
    if (typeof input === 'string') {
      return input
    } else if (input === false) {
      return 'astrobook/components/empty.astro'
    } else if (input === undefined) {
      return 'astrobook/components/home.astro'
    } else {
      throw new Error("Invalid value for 'home' option")
    }
  }),
  v.string(),
)

const IntegrationOptionsSchema = v.optional(
  v.object({
    directory: v.optional(v.string(), '.'),
    subpath: v.optional(v.string(), ''),
    dashboardSubpath: v.optional(v.string(), 'dashboard'),
    previewSubpath: v.optional(v.string(), 'stories'),
    title: v.optional(v.string(), 'Astrobook'),
    css: v.optional(v.array(v.string()), []),
    head: v.optional(v.string(), 'astrobook/components/head.astro'),
    home: HomeSchema,
    homeContent: HomeContentSchema,
  }),
  {},
)

type ResolvedOptions = v.InferOutput<typeof IntegrationOptionsSchema>

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
