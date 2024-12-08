/** @jsxImportSource preact */

import type { ComponentChildren } from 'preact'
import { useState } from 'preact/hooks'

/** A counter written with Preact */
export function PreactCounter({
  step = 1,
  children,
}: {
  step?: number
  children?: ComponentChildren
}) {
  const [count, setCount] = useState(0)
  const add = () => setCount((i) => i + step)
  const subtract = () => setCount((i) => i - step)

  return (
    <>
      <div class="flex items-center gap-10 p-4">
        <button
          class="color-black flex size-[100px] items-center justify-center rounded bg-gray-200 p-5 transition-colors hover:bg-gray-300"
          onClick={subtract}
        >
          -
        </button>
        <pre>{count}</pre>
        <button
          class="color-black flex size-[100px] items-center justify-center rounded bg-gray-200 p-5 transition-colors hover:bg-gray-300"
          onClick={add}
        >
          +
        </button>
      </div>
      <div class="counter-message">{children}</div>
    </>
  )
}
