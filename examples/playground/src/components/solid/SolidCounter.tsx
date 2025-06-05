/** @jsxImportSource solid-js */

import '../../styles/global.css'

import { createSignal, type JSX } from 'solid-js'

export interface SolidCounterProps {
  step?: number
  children?: JSX.Element
}

/** A counter written with Solid */
export default function SolidCounter(props: SolidCounterProps) {
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
