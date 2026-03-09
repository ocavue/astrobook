import { describe, expect, it } from 'vitest'

import { compressTerms } from './compress-terms'

describe('compressTerms', () => {
  it('removes terms that are substrings of other terms', () => {
    expect(
      compressTerms(['apple123', 'apple245', 'apple', '123', 'apple1234']),
    ).toEqual(['apple1234', 'apple245'])
  })

  it('deduplicates and lowercases', () => {
    expect(compressTerms(['Apple', 'APPLE', 'apple'])).toEqual(['apple'])
  })

  it('returns empty array for empty input', () => {
    expect(compressTerms([])).toEqual([])
  })

  it('keeps all terms when none are substrings', () => {
    expect(compressTerms(['foo', 'bar', 'baz'])).toEqual(['bar', 'baz', 'foo'])
  })

  it('removes exact duplicates after lowercasing', () => {
    expect(compressTerms(['Hello', 'hello', 'world'])).toEqual([
      'hello',
      'world',
    ])
  })
})
