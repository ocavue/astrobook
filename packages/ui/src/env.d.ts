/// <reference types="astro/client" />

declare module '*.astro' {
  declare const component: (props: unknown) => unknown
  export default component
}
