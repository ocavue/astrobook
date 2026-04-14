import { describe, expect, it } from 'vitest'

import { computeCollapseDuration as compute } from './collapse-duration'

describe('computeCollapseDuration', () => {
  it('maps row counts to durations', () => {
    expect(compute(0)).toMatchInlineSnapshot(`100`)
    expect(compute(1)).toMatchInlineSnapshot(`135`)
    expect(compute(2)).toMatchInlineSnapshot(`155`)
    expect(compute(5)).toMatchInlineSnapshot(`190`)
    expect(compute(10)).toMatchInlineSnapshot(`220`)
    expect(compute(20)).toMatchInlineSnapshot(`252`)
    expect(compute(50)).toMatchInlineSnapshot(`297`)
    expect(compute(100)).toMatchInlineSnapshot(`331`)
    expect(compute(200)).toMatchInlineSnapshot(`365`)
    expect(compute(500)).toMatchInlineSnapshot(`411`)
    expect(compute(1000)).toMatchInlineSnapshot(`445`)
    expect(compute(2000)).toMatchInlineSnapshot(`480`)
  })
})
