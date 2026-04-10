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

// We define `ResolvedOptions` manually rather than inferring from the valibot
// schema because the union shape of `home` confuses inference: the parsed
// `home` value would be widened to `any` and infect downstream destructuring.
export interface ResolvedOptions {
  directory: string
  subpath: string
  dashboardSubpath: string
  previewSubpath: string
  title: string
  css: string[]
  head: string
  home: string
  homeContent: ResolvedHomeContent
}

interface ParsedOptions {
  directory: string
  subpath: string
  dashboardSubpath: string
  previewSubpath: string
  title: string
  css: string[]
  head: string
  home: string | false | ResolvedHomeContent
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

  const parsed = result.output as unknown as ParsedOptions

  // The default home content is what valibot produces when an empty object is
  // parsed against `HomeContentSchema`. Computing it here keeps a single source
  // of truth: the schema.
  const defaultHomeContent: ResolvedHomeContent = v.parse(
    HomeContentSchema,
    {},
  ) as ResolvedHomeContent

  let home: string
  let homeContent: ResolvedHomeContent

  if (typeof parsed.home === 'string') {
    home = parsed.home
    homeContent = defaultHomeContent
  } else if (parsed.home === false) {
    home = EMPTY_HOME_COMPONENT
    homeContent = defaultHomeContent
  } else {
    home = DEFAULT_HOME_COMPONENT
    homeContent = parsed.home
  }

  return {
    directory: parsed.directory,
    subpath: parsed.subpath,
    dashboardSubpath: parsed.dashboardSubpath,
    previewSubpath: parsed.previewSubpath,
    title: parsed.title,
    css: parsed.css,
    head: parsed.head,
    home,
    homeContent,
  }
}
