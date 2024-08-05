import { describe, expect, it } from 'vitest'

import { normalizePath } from './normalize-path'

describe('normalizePath', () => {
  it('should convert a windows path to unix-style slashes', () => {
    expect(normalizePath(String.raw`C:\Users\John\Documents\file.txt`)).toBe(
      'C:/Users/John/Documents/file.txt',
    )
  })

  it('should normalize ..', () => {
    expect(normalizePath('/Users/John/..//Documents/file.txt')).toBe(
      '/Users/Documents/file.txt',
    )
    expect(normalizePath(String.raw`C:\Users\John\..\Documents\file.txt`)).toBe(
      'C:/Users/Documents/file.txt',
    )
  })

  it('should normalize .', () => {
    expect(normalizePath('/Users/John/./Documents/file.txt')).toBe(
      '/Users/John/Documents/file.txt',
    )
    expect(normalizePath(String.raw`C:\Users\John\.\Documents\file.txt`)).toBe(
      'C:/Users/John/Documents/file.txt',
    )
  })

  it('should normalize multiple slashes', () => {
    expect(normalizePath('/Users/John//Documents/file.txt')).toBe(
      '/Users/John/Documents/file.txt',
    )
    expect(normalizePath(String.raw`C:\Users\John\\Documents\file.txt`)).toBe(
      'C:/Users/John/Documents/file.txt',
    )
  })
})
