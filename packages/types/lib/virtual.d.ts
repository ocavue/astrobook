declare module 'virtual:astrobook/story-modules.mjs' {
  const entries: import('./types').StoryModule[]
  export default entries
}

declare module 'virtual:astrobook/story-component.astro' {
  const StoryComponent = (_props: any) => any
  export default StoryComponent
}

declare module 'virtual:astrobook/base-url.mjs' {
  const baseUrl: string
  export default baseUrl
}
