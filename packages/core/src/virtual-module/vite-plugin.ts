import type { Plugin } from 'vite'

import { loadStoryComponent } from './story-component'
import { loadStoryEntries } from './story-entries'
import { VirtualModuleIds } from './virtual-module-ids'

export function createVirtualFilesPlugin(rootDir: string): Plugin {
  return {
    name: 'astrobook/virtual-files',
    resolveId(id) {
      switch (id) {
        case VirtualModuleIds.STORY_COMPONENT_ID:
          return VirtualModuleIds.STORY_COMPONENT_RESOLVED_ID
        case VirtualModuleIds.ENTRIES_ID:
          return VirtualModuleIds.ENTRIES_RESOLVED_ID
      }
    },
    load(id) {
      switch (id) {
        case VirtualModuleIds.STORY_COMPONENT_RESOLVED_ID:
          return loadStoryComponent(rootDir)
        case VirtualModuleIds.ENTRIES_RESOLVED_ID:
          return loadStoryEntries(rootDir)
      }
    },
  }
}
