import type { Plugin } from 'vite'

export function createVirtualFilesPlugin(): Plugin {
  const virtualModuleId = 'virtual:my-module'
  const resolvedVirtualModuleId = '__astrobook__/virtual' + '.astro'

  return {
    name: 'astrobook-virtual-files',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return `
---
console.log("Virtual Astro file")
---    
<div>
This is a virtual astro file!
</div>
        `
      }
    },
  }
}
