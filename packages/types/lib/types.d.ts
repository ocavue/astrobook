export interface IntegrationOptions {
  /**
   * The directory to scan for stories.
   *
   * @default '.'
   */
  directory?: string

  /**
   * The subpath to deploy Astrobook to relative to the [base
   * URL](https://docs.astro.build/en/reference/configuration-reference/#base)
   * of your Astro project. This is useful if you want to use Astrobook in your
   * existing Astro project.
   *
   * @example '/docs/components'
   */
  subpath?: string

  /**
   * Set the title for your website. Will be used in metadata and in the browser tab title.
   *
   * @default 'Astrobook'
   */
  title?: string

  /**
   * The path to an Astro component to provide custom tags in the `<head>`.
   *
   * @example './src/components/CustomHead.astro'
   * @example './src/components/CustomHead.html'
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
  baseUrl: string,
  head: string,
  title: string,
}

declare global {
  interface Window {
    astrobook?: {
      setTheme?: (theme: 'dark' | 'light') => void
      getTheme?: () => 'dark' | 'light'
    }
  }
}
