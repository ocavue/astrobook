/** @jsxImportSource preact */

import type { ComponentChildren } from 'preact'
import { useState } from 'preact/hooks'

import { css } from '../../styled-system/css'

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
      <div
        class={css({
          display: 'flex',
          alignItems: 'center',
          gap: '10',
          p: '4',
        })}
      >
        <button
          class={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            rounded: 'rounded',
            bgColor: 'gray.200',
            p: '5',
            transitionProperty:
              'color, background-color, border-color, text-decoration-color, fill, stroke',
            transitionTimingFunction: 'colors',
            transitionDuration: 'colors',
            _hover: { bgColor: 'gray.300' },
          })}
          onClick={subtract}
        >
          -
        </button>
        <pre>{count}</pre>
        <button
          class={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            rounded: 'rounded',
            bgColor: 'gray.200',
            p: '5',
            transitionProperty:
              'color, background-color, border-color, text-decoration-color, fill, stroke',
            transitionTimingFunction: 'colors',
            transitionDuration: 'colors',
            _hover: { bgColor: 'gray.300' },
          })}
          onClick={add}
        >
          +
        </button>
      </div>
      <div class="counter-message">{children}</div>
    </>
  )
}
