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
      <div class="flex gap-10 items-center p-4">
        <button class="bg-gray-200 rounded-md p-5 size-20 color-black shadow-sm hover:bg-gray-300 transition-colors" onClick={subtract}>-</button>
        <pre>{count}</pre>
        <button class="bg-gray-200 rounded-md p-5 size-20 color-black shadow-sm hover:bg-gray-300 transition-colors" onClick={add}>+</button>
      </div>
      <div class="counter-message">{children}</div>
    </>
  )
}
