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

  /**
   * The path to a slotted component that wraps the active story.
   *
   * @example
   *
   * ```js
   * astrobook({
   *   wrapper: './src/layouts/StoryWrapper.astro',
   * })
   * ```
   */
  wrapper?: string
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
  baseUrl: string
  head: string
  css: string[]
  title: string
  wrapper?: string
}

declare global {
  interface Window {
    astrobook?: {
      setTheme?: (theme: 'dark' | 'light') => void
      getTheme?: () => 'dark' | 'light'
    }
  }
}
