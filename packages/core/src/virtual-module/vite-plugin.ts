import type { IntegrationOptions } from '@astrobook/types'
import type { Plugin } from 'vite'

import { loadStoryComponent } from './story-component'
import { loadStoryEntries } from './story-entries'
import { VirtualModuleIds } from './virtual-module-ids'

export function createVirtualFilesPlugin(options: IntegrationOptions): Plugin {
  return {
    name: 'astrobook/virtual-files',
    resolveId(id) {
      switch (id) {
        case VirtualModuleIds.COMPONENT_ID:
          return VirtualModuleIds.COMPONENT_RESOLVED_ID
        case VirtualModuleIds.ENTRIES_ID:
          return VirtualModuleIds.ENTRIES_RESOLVED_ID
      }
    },
    load(id) {
      switch (id) {
        case VirtualModuleIds.COMPONENT_RESOLVED_ID:
          return loadStoryComponent(options.framework)
        case VirtualModuleIds.ENTRIES_RESOLVED_ID:
          return loadStoryEntries()
      }
    },
  }
}
