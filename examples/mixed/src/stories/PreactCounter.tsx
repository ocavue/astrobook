/** @jsxImportSource preact */

import '../styles/global.css'

import type { ComponentChildren } from 'preact'
import { useState } from 'preact/hooks'

export interface PreactCounterProps {
  step?: number
  children?: ComponentChildren
}

/** A counter written with Preact */
export function PreactCounter({ step = 1, children }: PreactCounterProps) {
  const [count, setCount] = useState(0)
  const add = () => setCount((i) => i + step)
  const subtract = () => setCount((i) => i - step)

  return (
    <>
      <div class="counter">
        <button onClick={subtract}>-</button>
        <pre>{count}</pre>
        <button onClick={add}>+</button>
      </div>
      <div class="counter-message">{children}</div>
    </>
  )
}
