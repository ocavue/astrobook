import { describe, expect, it } from 'vitest'

import { slug } from './slug'

describe('slug', () => {
  it('converts to lowercase', () => {
    expect(slug('Hello')).toBe('hello')
    expect(slug('WORLD')).toBe('world')
  })

  it('replaces spaces with underscores', () => {
    expect(slug('hello world')).toBe('hello_world')
  })

  it('replaces non-alphanumeric characters with underscores', () => {
    expect(slug('hello-world')).toBe('hello_world')
    expect(slug('foo.bar.baz')).toBe('foo_bar_baz')
    expect(slug('a@b#c')).toBe('a_b_c')
  })

  it('collapses consecutive non-alphanumeric characters into a single underscore', () => {
    expect(slug('hello---world')).toBe('hello_world')
    expect(slug('foo   bar')).toBe('foo_bar')
  })

  it('strips leading and trailing underscores', () => {
    expect(slug('_hello_')).toBe('hello')
    expect(slug('--hello--')).toBe('hello')
    expect(slug('  hello  ')).toBe('hello')
  })

  it('handles alphanumeric strings unchanged (except case)', () => {
    expect(slug('hello')).toBe('hello')
    expect(slug('test123')).toBe('test123')
  })

  it('handles empty string', () => {
    expect(slug('')).toBe('')
  })
})
