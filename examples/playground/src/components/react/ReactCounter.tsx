/** @jsxImportSource react */

import '../../styles/global.css'

import { useState, type ReactNode } from 'react'

export interface ReactCounterProps {
  step?: number
  children?: ReactNode
}

/** A counter written with React */
export function ReactCounter({ step = 1, children }: ReactCounterProps) {
  const [count, setCount] = useState(0)
  const add = () => setCount((i) => i + step)
  const subtract = () => setCount((i) => i - step)

  return (
    <>
      <div className="counter">
        <button onClick={subtract}>-</button>
        <pre>{count}</pre>
        <button onClick={add}>+</button>
      </div>
      <div className="counter-message">{children}</div>
    </>
  )
}
