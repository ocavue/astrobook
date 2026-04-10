import type {
  IntegrationOptions,
  ResolvedHomeContent,
} from '@astrobook/types'
import * as v from 'valibot'

const DEFAULT_HOME_COMPONENT = 'astrobook/components/home.astro'
const EMPTY_HOME_COMPONENT = 'astrobook/components/empty.astro'

const HomeContentSchema = v.object({
  title: v.optional(v.nullable(v.string()), 'Astrobook'),
  subtitle: v.optional(
    v.nullable(v.string()),
    'The minimal UI component playground',
  ),
  version: v.optional(
    v.nullable(
      v.object({
        href: v.optional(
          v.string(),
          'https://github.com/ocavue/astrobook/blob/master/packages/astrobook/CHANGELOG.md',
        ),
      }),
    ),
    {},
  ),
  repo: v.optional(
    v.nullable(
      v.object({
        href: v.optional(v.string(), 'https://github.com/ocavue/astrobook'),
        label: v.optional(v.string(), 'Star on GitHub'),
      }),
    ),
    {},
  ),
})

const HomeSchema = v.optional(
  v.union([v.string(), v.literal(false), HomeContentSchema]),
  {},
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
  }),
  {},
)

type ParsedOptions = v.InferOutput<typeof IntegrationOptionsSchema>

export interface ResolvedOptions extends Omit<ParsedOptions, 'home'> {
  home: string
  homeContent: ResolvedHomeContent
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

  const { home: parsedHome, ...rest } = result.output

  // The default home content is what valibot produces when an empty object is
  // parsed against `HomeContentSchema`. Computing it here keeps a single source
  // of truth: the schema.
  const defaultHomeContent = v.parse(HomeContentSchema, {}) as ResolvedHomeContent

  let home: string
  let homeContent: ResolvedHomeContent

  if (typeof parsedHome === 'string') {
    home = parsedHome
    homeContent = defaultHomeContent
  } else if (parsedHome === false) {
    home = EMPTY_HOME_COMPONENT
    homeContent = defaultHomeContent
  } else {
    home = DEFAULT_HOME_COMPONENT
    homeContent = parsedHome as ResolvedHomeContent
  }

  return {
    ...rest,
    home,
    homeContent,
  }
}
