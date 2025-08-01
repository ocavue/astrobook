/** @jsxImportSource react */

import type { ReactNode } from 'react'

export interface Props {
  label?: string
  children?: ReactNode
}

export default  function ReactDecorator({ children, label }: Props) {
  return (
    <>
      <div className="decorator" data-label={label}>
        {children}
      </div>
    </>
  )
}
