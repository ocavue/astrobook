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

declare module 'virtual:astrobook/components/home.mjs' {
  const Home: (props: unknown) => unknown
  export default Home
}

declare module 'virtual:astrobook/user-css.mjs' { }
