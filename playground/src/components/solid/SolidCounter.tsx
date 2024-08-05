/** @jsxImportSource solid-js */

import { createSignal, type JSX } from 'solid-js'

/** A counter written with Solid */
export default function SolidCounter(props: {
  step?: number
  children?: JSX.Element
}) {
  const [count, setCount] = createSignal(0)
  const add = () => setCount(count() + (props.step || 1))
  const subtract = () => setCount(count() - (props.step || 1))

  return (
    <>
      <div id="solid" class="counter">
        <button onClick={subtract}>-</button>
        <pre>{count()}</pre>
        <button onClick={add}>+</button>
      </div>
      <div class="counter-message">{props.children}</div>
    </>
  )
}
