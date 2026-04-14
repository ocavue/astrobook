import { describe, expect, it } from 'vitest'

import { computeCollapseDuration as compute } from './collapse-duration'

describe('computeCollapseDuration', () => {
  it('maps row counts to durations', () => {
    expect(compute(0)).toMatchInlineSnapshot(`50`)
    expect(compute(1)).toMatchInlineSnapshot(`50`)
    expect(compute(2)).toMatchInlineSnapshot(`85`)
    expect(compute(5)).toMatchInlineSnapshot(`130`)
    expect(compute(10)).toMatchInlineSnapshot(`165`)
    expect(compute(20)).toMatchInlineSnapshot(`200`)
    expect(compute(50)).toMatchInlineSnapshot(`246`)
    expect(compute(100)).toMatchInlineSnapshot(`280`)
    expect(compute(200)).toMatchInlineSnapshot(`315`)
    expect(compute(500)).toMatchInlineSnapshot(`361`)
    expect(compute(1000)).toMatchInlineSnapshot(`395`)
    expect(compute(2000)).toMatchInlineSnapshot(`430`)
    expect(compute(4000)).toMatchInlineSnapshot(`465`)
    expect(compute(10000)).toMatchInlineSnapshot(`500`)
    expect(compute(1000000000)).toMatchInlineSnapshot(`500`)
  })
})
