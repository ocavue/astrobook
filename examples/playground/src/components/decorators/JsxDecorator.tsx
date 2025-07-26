/** @jsxImportSource preact */

import type { ComponentChildren } from 'preact'

export interface PreactDecoratorProps {
  children?: ComponentChildren
}

export function GreenBorderDecorator({ children }: PreactDecoratorProps) {
  return (
    <>
      <div style="border: solid 2px green;">{children}</div>
    </>
  )
}
