export interface StoryModule<
  Component = (props: Record<string, unknown>) => unknown,
> {
  default: {
    component: Component
  }
  [story: string]: {
    args?: Record<string, unknown>
  }
}
