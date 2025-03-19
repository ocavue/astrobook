/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent
  export default component
}

declare module '*.astro' {
  import type { AstroComponentFactory } from 'astro/runtime/server/index.js'

  const content: AstroComponentFactory
  export default content
}
