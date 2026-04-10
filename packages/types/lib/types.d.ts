export interface IntegrationOptions {
  /**
   * The directory to scan for stories.
   *
   * @default '.'
   *
   * @example
   *
   * ```js
   * astrobook({
   *  directory: './src/astrobook',
   * })
   * ```
   */
  directory?: string

  /**
   * The subpath to deploy Astrobook to relative to the [base
   * URL](https://docs.astro.build/en/reference/configuration-reference/#base)
   * of your Astro project. This is useful if you want to use Astrobook in your
   * existing Astro project.
   *
   * @example
   *
   * ```js
   * astrobook({
   *  subpath: '/docs/components',
   * })
   * ```
   */
  subpath?: string

  /**
   * The subpath for dashboard pages relative to the main subpath.
   * A dashboard page has a sidebar for navigation between components.
   *
   * @default '/dashboard/'
   *
   * @example
   *
   * ```js
   * astrobook({
   *  dashboardSubpath: '/components/',
   * })
   * ```
   */
  dashboardSubpath?: string

  /**
   * The subpath for preview pages relative to the main subpath.
   * A preview page displays an individual component without the sidebar.
   *
   * @default '/stories/'
   *
   * @example
   *
   * ```js
   * astrobook({
   *  previewSubpath: '/preview/',
   * })
   * ```
   */
  previewSubpath?: string

  /**
   * Set the title for your website. Will be used in metadata and in the browser tab title.
   *
   * @default 'Astrobook'
   *
   * @example
   *
   * ```js
   * astrobook({
   *  title: 'My Components Playground',
   * })
   * ```
   */
  title?: string

  /**
   * Provide CSS files to customize the look and feel of your Astrobook project.
   *
   * Supports local CSS files relative to the root of your project,
   * e.g. `'./src/custom.css'`, and CSS you installed as an npm
   * module, e.g. `'@fontsource/roboto'`.
   *
   * @example
   *
   * ```js
   * astrobook({
   *  css: ['./src/custom-styles.css', '@fontsource/roboto'],
   * })
   * ```
   */
  css?: string[]

  /**
   * The path to an Astro component to provide custom tags in the `<head>`.
   * It can be an `.astro` or `.html` file.
   *
   * @example
   *
   * ```js
   * astrobook({
   *  head: './src/components/CustomHead.astro',
   * })
   * ```
   *
   * ```astro
   * astrobook({
   *  head: './src/components/CustomHead.html',
   * })
   * ```
   */
  head?: string

  /**
   * Controls which Astro component is rendered on the dashboard homepage.
   *
   * - Pass a string (relative path or package identifier) to fully replace
   *   the built-in home page with a custom Astro component.
   * - Pass `false` to render an empty home page.
   * - Omit the option to use Astrobook's built-in home. Customize the content
   *   of that built-in home through {@link IntegrationOptions.homeContent}.
   *
   * @default 'astrobook/components/home.astro'
   *
   * @example
   *
   * ```js
   * // Replace the built-in home page with a custom Astro component
   * astrobook({
   *   home: './src/components/CustomHome.astro',
   * })
   * ```
   *
   * @example
   *
   * ```js
   * // Render an empty home page
   * astrobook({ home: false })
   * ```
   */
  home?: string | false

  /**
   * Customize the content of Astrobook's built-in home page (title, subtitle,
   * version badge, GitHub badge).
   *
   * This option is only consumed when {@link IntegrationOptions.home} is left
   * at its default value. If you provide a custom `home` component or set
   * `home: false`, this option is ignored.
   *
   * Each field can be set to a custom value to override it, set to `false`
   * to hide the corresponding section, or omitted to fall back to the
   * default.
   *
   * @example
   *
   * ```js
   * import { version } from './package.json'
   *
   * astrobook({
   *   homeContent: {
   *     title: 'Acme UI',
   *     subtitle: 'Internal component library',
   *     version: { label: `v${version}` }, // show your own version
   *     repo: { href: 'https://github.com/acme/ui' },
   *   },
   * })
   * ```
   */
  homeContent?: HomeContentOptions
}

/**
 * Options for customizing the content of the built-in home page.
 *
 * Used as the object form of {@link IntegrationOptions.home}. Each field can
 * be set to `false` to hide the corresponding section, omitted to fall back to
 * the default value, or set to a custom value to override it.
 */
export interface HomeContentOptions {
  /**
   * The main title shown on the home page. Set to `false` to hide.
   * @default 'Astrobook'
   */
  title?: string | false

  /**
   * The subtitle shown beneath the title. Set to `false` to hide.
   * @default 'The minimal UI component playground'
   */
  subtitle?: string | false

  /**
   * Configuration for the version badge. Set to `false` to hide.
   */
  version?: HomeVersionOptions | false

  /**
   * Configuration for the GitHub repository badge. Set to `false` to hide.
   */
  repo?: HomeRepoOptions | false
}

export interface HomeVersionOptions {
  /**
   * The URL the version badge links to.
   * @default 'https://github.com/ocavue/astrobook/blob/master/packages/astrobook/CHANGELOG.md'
   */
  href?: string

  /**
   * The label rendered inside the version badge.
   *
   * Defaults to the current Astrobook version (e.g. `v0.12.7`).
   * Set a custom string to display your own project's version instead.
   *
   * @example
   *
   * ```js
   * import { version } from './package.json'
   *
   * astrobook({
   *   homeContent: {
   *     version: { label: `v${version}` },
   *   },
   * })
   * ```
   */
  label?: string
}

export interface HomeRepoOptions {
  /**
   * The URL the repository badge links to.
   * @default 'https://github.com/ocavue/astrobook'
   */
  href?: string

  /**
   * The label rendered inside the repository badge.
   * @default 'Star on GitHub'
   */
  label?: string
}

export interface StoryModule {
  /**
   * The id of the story module.
   *
   * @example 'components/ui/button'
   */
  id: string

  /**
   * The name of the story module.
   *
   * @example 'Button'
   */
  name: string

  /**
   * The directory of the story module. It might be an empty string.
   *
   * @example 'components/ui'
   */
  directory: string

  /**
   * The import path of the story module.
   *
   * @example '/Users/john/projects/my-project/components/ui/Button.stories.js'
   * @example '../ui/Button.stories.ts'
   */
  importPath: string

  /**
   * All stories in the story module.
   */
  stories: Story[]
}

export interface Story {
  /**
   * The id of the story.
   *
   * @example 'components/ui/button/primary-button'
   */
  id: string

  /**
   * The name of the story.
   *
   * @example 'PrimaryButton'
   */
  name: string
}

export interface GlobalConfig {
  /**
   * The computed base URL path for Astrobook, combining the Astro base URL with
   * the optional subpath. Used for generating correct URLs throughout the
   * Astrobook interface.
   */
  astrobookBase: string
  dashboardBase: string
  storyBase: string

  /**
   * The path to an Astro component to provide custom tags in the `<head>`.
   */
  head: string

  /**
   * The path to an Astro component to render on dashboard homepage.
   * @default astrobook/components/home.astro
   */
  home: string

  /**
   * The fully resolved content for the built-in home page. When the user
   * provides a custom `home` component path or `home: false`, this still
   * holds the default values but is not consumed by the rendered component.
   */
  homeContent: {
    title: string | false
    subtitle: string | false
    version: { href: string; label: string } | false
    repo: { href: string; label: string } | false
  }

  /**
   * Array of CSS file paths to import for customizing the look and feel
   * of the Astrobook project. Supports both local files and npm modules.
   */
  css: string[]

  /**
   * The title for the Astrobook website.
   */
  title: string

  trailingSlash: import('astro').AstroConfig['trailingSlash']
}

/**
 * @internal
 */
export interface StoryDecorator {
  /**
   * The component to use as a decorator.
   */
  component: unknown

  /**
   * The props to pass to the decorator.
   */
  props?: object | null | undefined
}

/**
 * @internal
 */
export interface StoryNamedExport {
  /**
   * The decorators to apply to the story.
   */
  decorators?: StoryDecorator[] | null | undefined

  /**
   * The arguments to pass to the story.
   */
  args?: object | null | undefined
}

declare global {
  interface Window {
    astrobook?: {
      setTheme?: (theme: 'dark' | 'light') => void
      getTheme?: () => 'dark' | 'light'
    }
  }
}
