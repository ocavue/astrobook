/** @jsxImportSource preact */

import '../../styles/global.css'

import type { ComponentChildren } from 'preact'
import { useState } from 'preact/hooks'

/** A counter written with Preact */
export interface PreactCounterProps {
  step?: number
  children?: ComponentChildren
}

export function PreactCounter(props: PreactCounterProps) {
  const { step = 1, children } = props
  const [count, setCount] = useState(0)
  const add = () => setCount((i) => i + step)
  const subtract = () => setCount((i) => i - step)

  console.log('props', props)
  console.log('step', step)
  console.log('children', children)

  return (
    <>
      <div class="counter">
        <button onClick={subtract}>-</button>
        <pre>{count}</pre>
        <button onClick={add}>+</button>
      </div>
      <div class="counter-message">
        <div>
          Below is the children defined in the PreactCounter.stories.tsx file
        </div>
        <div>{children}</div>
      </div>
    </>
  )
}
