export interface IntegrationOptions {
  /**
   * The directory to scan for stories.
   *
   * @default '.'
   */
  directory?: string

  /**
   * The base path to deploy Astrobook to relative to the [base
   * URL](https://docs.astro.build/en/reference/configuration-reference/#base)
   * of your Astro project. This is useful if you want to use Astrobook in your
   * existing Astro project.
   *
   * @example '/docs/components'
   */
  base?: string
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

declare global {
  interface Window {
    astrobook?: {
      setTheme?: (theme: 'dark' | 'light') => void
      getTheme?: () => 'dark' | 'light'
    }
  }
}
