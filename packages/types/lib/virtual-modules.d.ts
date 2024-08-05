declare module 'virtual:astrobook/stories.mjs' {
  const entries: import('./story-entry').StoryEntry[]
  export default entries
}

declare module 'virtual:astrobook/component.astro' {
  const StoryComponent = (_props: any) => any
  export default StoryComponent
}
