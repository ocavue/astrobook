/** @jsxImportSource preact */

import type { ComponentChildren } from 'preact'

export interface Props {
  label?: string
  children?: ComponentChildren
}

export default function PreactDecorator({ children, label }: Props) {
  return (
    <>
      <div className="decorator" data-label={label}>
        {children}
      </div>
    </>
  )
}
