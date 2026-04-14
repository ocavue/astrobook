import { describe, expect, it } from 'vitest'

import { computeCollapseDuration as compute } from './collapse-duration'

describe('computeCollapseDuration', () => {
  it('maps row counts to durations', () => {
    expect(compute(0)).toMatchInlineSnapshot(`100`)
    expect(compute(1)).toMatchInlineSnapshot(`100`)
    expect(compute(2)).toMatchInlineSnapshot(`124`)
    expect(compute(5)).toMatchInlineSnapshot(`156`)
    expect(compute(10)).toMatchInlineSnapshot(`181`)
    expect(compute(20)).toMatchInlineSnapshot(`205`)
    expect(compute(50)).toMatchInlineSnapshot(`237`)
    expect(compute(100)).toMatchInlineSnapshot(`261`)
    expect(compute(200)).toMatchInlineSnapshot(`285`)
    expect(compute(500)).toMatchInlineSnapshot(`318`)
    expect(compute(1000)).toMatchInlineSnapshot(`342`)
    expect(compute(2000)).toMatchInlineSnapshot(`366`)
    expect(compute(4000)).toMatchInlineSnapshot(`390`)
    expect(compute(10000)).toMatchInlineSnapshot(`422`)
    expect(compute(1000000000)).toMatchInlineSnapshot(`500`)
  })
})
