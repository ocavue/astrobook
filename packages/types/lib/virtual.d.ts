declare module 'virtual:astrobook/story-modules.mjs' {
  const entries: import('./types').StoryModule[]
  export default entries
}

declare module 'virtual:astrobook/global-config.mjs' {
  const config: import('./types').GlobalConfig
  export default config
}

declare module 'virtual:astrobook/components/head.mjs' {
  const Head: (props: unknown) => unknown
  export default Head
}

declare module 'virtual:astrobook/user-wrapper-component' {
  const Wrapper: (props: unknown) => unknown

  export default Wrapper
}

declare module 'virtual:astrobook/user-css.mjs' {}
