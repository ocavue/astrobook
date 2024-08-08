import '@astrobook/types'

import type { StoryEntry } from '@astrobook/types'
import stories from 'virtual:astrobook/stories.mjs'

export interface ComponentInfo {
  directory?: string
  name: string
  stories: StoryEntry[]
}

/**
 * Group stories by their parent directory. Return a tree of NavItems.
 */
function getComponentInfos(stories: StoryEntry[]): ComponentInfo[] {
  const components: Record<string, ComponentInfo> = {}

  for (const story of stories) {
    const parts = story.id.split('/').filter(Boolean)
    parts.pop() // Remove the story name
    const name = parts.pop() // Get the component name
    const directory = parts.join('/') || undefined

    if (!name) {
      throw new Error(
        `Unable to find the component name for story ${story.id}. Please open an issue on GitHub.`,
      )
    }

    const component = (components[story.modulePath] ??= {
      name,
      directory,
      stories: [],
    })
    component.stories.push(story)
  }

  return Object.values(components)
}

export const componentInfos = getComponentInfos(stories)
