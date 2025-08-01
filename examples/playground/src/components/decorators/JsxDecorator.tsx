/** @jsxImportSource preact */

import type { ComponentChildren } from 'preact'

export interface PreactDecoratorProps {
  children?: ComponentChildren
}

export function GreenBorderDecorator({ children }: PreactDecoratorProps) {
  return (
    <>
      <div class="green-border" data-decorator-type="jsx">
        {children}
      </div>
    </>
  )
}
