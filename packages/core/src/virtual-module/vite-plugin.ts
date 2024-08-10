import type { Plugin } from 'vite'

import { loadStoryComponent } from './story-component'
import { loadStoryModules } from './story-modules'
import { VirtualModuleIds } from './virtual-module-ids'

export function createVirtualFilesPlugin(rootDir: string): Plugin {
  return {
    name: 'astrobook/virtual-files',
    resolveId(id) {
      switch (id) {
        case VirtualModuleIds.STORY_COMPONENT_ID:
          return VirtualModuleIds.STORY_COMPONENT_RESOLVED_ID
        case VirtualModuleIds.STORY_MODULES_ID:
          return VirtualModuleIds.STORY_MODULES_RESOLVED_ID
      }
    },
    load(id) {
      switch (id) {
        case VirtualModuleIds.STORY_COMPONENT_RESOLVED_ID:
          return loadStoryComponent(rootDir)
        case VirtualModuleIds.STORY_MODULES_RESOLVED_ID:
          return loadStoryModules(rootDir)
      }
    },
  }
}
