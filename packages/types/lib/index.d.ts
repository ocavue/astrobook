/// <reference types="./virtual-modules.d.ts" />

export type { StoryModule } from './story-module'
export type { StoryEntry } from './story-entry'

export interface IntegrationOptions {
  /**
   * The directory to scan for stories.
   *
   * @default '.'
   */
  directory?: string
}
