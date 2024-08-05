export interface StoryEntry {
  /**
   * The id of the story.
   *
   * @example
   * ```ts
   * "components/ui/button/PrimaryButton"
   * ```
   */
  id: string

  /**
   * The name of the story.
   *
   * @example
   * ```ts
   * "PrimaryButton"
   * ```
   */
  name: string

  /**
   * The import path of the story module.
   *
   * @example
   * ```ts
   * "./components/ui/button/PrimaryButton.stories.js"
   * ```
   */
  modulePath: string
}
