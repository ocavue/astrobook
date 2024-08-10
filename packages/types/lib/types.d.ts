export interface IntegrationOptions {
  /**
   * The directory to scan for stories.
   *
   * @default '.'
   */
  directory?: string
}

export interface StoryModule {
  /**
   * The id of the story module.
   *
   * `id` is a combination of the story module's `directory` and its `name`.
   *
   * @example 'components/ui/Button'
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
   * @example 'components/ui/Button/PrimaryButton'
   */
  id: string

  /**
   * The name of the story.
   *
   * @example 'PrimaryButton'
   */
  name: string
}
