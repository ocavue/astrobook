/// <reference path="../.astro/types.d.ts" />

declare module '*.astro' {
  declare const component: (props: unknown) => unknown
  export default component
}
