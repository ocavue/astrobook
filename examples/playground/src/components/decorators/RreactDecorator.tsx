/** @jsxImportSource react */

import type { ReactNode } from 'react'

export interface ReactDecoratorProps {
  children?: ReactNode
}

export function GreenBorderDecorator({ children }: ReactDecoratorProps) {
  return (
    <>
      <div className="green-border" data-decorator-type="jsx">
        {children}
      </div>
    </>
  )
}
