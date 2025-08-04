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
   * Dashboard pages include the sidebar for navigation.
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
   * The subpath for story-only pages relative to the main subpath.
   * Story pages display components without the sidebar.
   *
   * @default '/stories/'
   *
   * @example
   *
   * ```js
   * astrobook({
   *  storySubpath: '/preview/',
   * })
   * ```
   */
  storySubpath?: string

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
   * Array of CSS file paths to import for customizing the look and feel
   * of the Astrobook project. Supports both local files and npm modules.
   */
  css: string[]

  /**
   * The title for the Astrobook website.
   */
  title: string
}

declare global {
  interface Window {
    astrobook?: {
      setTheme?: (theme: 'dark' | 'light') => void
      getTheme?: () => 'dark' | 'light'
    }
  }
}
