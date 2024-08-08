/// <reference types="./virtual-modules.d.ts" />

export type { StoryModule } from './story-module'
export type { StoryEntry } from './story-entry'

/**
 * All available frameworks that can be used to render a story.
 */
export type Framework =
  | 'react'
  | 'vue'
  | 'preact'
  | 'svelte'
  | 'solid-js'
  | 'astro'

/**
 * The options for the integration.
 */
export interface IntegrationOptions {
  /**
   * The default framework to use. If not pr
   */
  framework?: Framework
}
