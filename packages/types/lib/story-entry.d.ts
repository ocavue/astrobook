export interface StoryEntry {
  /**
   * The id of the story.
   *
   * @example 'components/ui/button/PrimaryButton'
   */
  id: string

  /**
   * The name of the story.
   *
   * @example 'PrimaryButton'
   */
  name: string

  /**
   * The import path of the story module.
   *
   * @example './components/ui/button.stories.js'
   */
  modulePath: string
}
