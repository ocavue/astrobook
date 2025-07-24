/** @jsxImportSource preact */

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
      <div class="flex items-center gap-10 p-4">
        <button
          class="flex size-[100px] items-center justify-center rounded bg-gray-200 p-5 hover:bg-gray-300 dark:bg-blue-800 dark:hover:bg-blue-700"
          onClick={subtract}
        >
          -
        </button>
        <pre>{count}</pre>
        <button
          class="flex size-[100px] items-center justify-center rounded bg-gray-200 p-5 hover:bg-gray-300 dark:bg-blue-800 dark:hover:bg-blue-700"
          onClick={add}
        >
          +
        </button>
      </div>
      <div class="counter-message">{children}</div>
    </>
  )
}
