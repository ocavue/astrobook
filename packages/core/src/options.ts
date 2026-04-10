import type { IntegrationOptions } from '@astrobook/types'
import * as v from 'valibot'

const DEFAULT_HEAD_COMPONENT = 'astrobook/components/head.astro'
const DEFAULT_HOME_COMPONENT = 'astrobook/components/home.astro'
const EMPTY_HOME_COMPONENT = 'astrobook/components/empty.astro'

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

const HomeSchema = v.optional(
  v.union([v.string(), v.literal(false)]),
  DEFAULT_HOME_COMPONENT,
)

const IntegrationOptionsSchema = v.optional(
  v.object({
    directory: v.optional(v.string(), '.'),
    subpath: v.optional(v.string(), ''),
    dashboardSubpath: v.optional(v.string(), 'dashboard'),
    previewSubpath: v.optional(v.string(), 'stories'),
    title: v.optional(v.string(), 'Astrobook'),
    css: v.optional(v.array(v.string()), []),
    head: v.optional(v.string(), DEFAULT_HEAD_COMPONENT),
    home: HomeSchema,
    homeContent: HomeContentSchema,
  }),
  {},
)

type ParsedOptions = v.InferOutput<typeof IntegrationOptionsSchema>

export interface ResolvedOptions extends Omit<ParsedOptions, 'home'> {
  // After normalization `home` is always a path string. `false` is rewritten
  // to the built-in empty component path.
  home: string
}

export function resolveOptions(options?: IntegrationOptions): ResolvedOptions {
  const result = v.safeParse(
    IntegrationOptionsSchema,
    options satisfies v.InferInput<typeof IntegrationOptionsSchema>,
  )

  if (!result.success) {
    const errorMessage = v.summarize(result.issues)
    throw new Error(`Invalid Astrobook options:\n${errorMessage}`)
  }

  const parsed = result.output

  return {
    ...parsed,
    home: parsed.home === false ? EMPTY_HOME_COMPONENT : parsed.home,
  }
}
