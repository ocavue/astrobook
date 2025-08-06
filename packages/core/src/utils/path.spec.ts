import { describe, expect, it } from 'vitest'

import {
  ensureLeadingSlash,
  ensureTrailingSlash,
  stripSlashes,
  urlPathJoin,
} from './path'

describe('stripSlashes', () => {
  it('should remove leading and trailing slashes', () => {
    expect(stripSlashes('/api/users/')).toBe('api/users')
    expect(stripSlashes('/api/users')).toBe('api/users')
    expect(stripSlashes('api/users/')).toBe('api/users')
    expect(stripSlashes('api/users')).toBe('api/users')
  })

  it('should handle empty and single slash strings', () => {
    expect(stripSlashes('')).toBe('')
    expect(stripSlashes('/')).toBe('')
    expect(stripSlashes('//')).toBe('')
  })

  it('should handle multiple consecutive slashes', () => {
    expect(stripSlashes('//api//users//')).toBe('api/users')
    expect(stripSlashes('///api///users///')).toBe('api/users')
  })
})

describe('ensureLeadingSlash', () => {
  it('should add leading slash when missing', () => {
    expect(ensureLeadingSlash('api/users')).toBe('/api/users')
    expect(ensureLeadingSlash('api')).toBe('/api')
    expect(ensureLeadingSlash('')).toBe('/')
  })

  it('should preserve leading slash when present', () => {
    expect(ensureLeadingSlash('/api/users')).toBe('/api/users')
    expect(ensureLeadingSlash('/api')).toBe('/api')
    expect(ensureLeadingSlash('/')).toBe('/')
  })
})

describe('ensureTrailingSlash', () => {
  it('should add trailing slash when missing', () => {
    expect(ensureTrailingSlash('api/users')).toBe('api/users/')
    expect(ensureTrailingSlash('api')).toBe('api/')
    expect(ensureTrailingSlash('')).toBe('/')
  })

  it('should preserve trailing slash when present', () => {
    expect(ensureTrailingSlash('api/users/')).toBe('api/users/')
    expect(ensureTrailingSlash('api/')).toBe('api/')
    expect(ensureTrailingSlash('/')).toBe('/')
  })
})

describe('urlPathJoin', () => {
  it('should join simple path segments', () => {
    expect(urlPathJoin('api', 'users', 'profile')).toBe('/api/users/profile')
    expect(urlPathJoin('docs', 'components')).toBe('/docs/components')
    expect(urlPathJoin('single')).toBe('/single')
  })

  it('should handle paths with leading and trailing slashes', () => {
    expect(urlPathJoin('/api/', '/users/', '/profile/')).toBe(
      '/api/users/profile',
    )
    expect(urlPathJoin('/api', 'users/', '/profile')).toBe('/api/users/profile')
    expect(urlPathJoin('api/', '/users', 'profile/')).toBe('/api/users/profile')
  })

  it('should filter out empty strings', () => {
    expect(urlPathJoin('', 'api', '', 'users', '')).toBe('/api/users')
    expect(urlPathJoin('api', '', 'users')).toBe('/api/users')
    expect(urlPathJoin('', '', 'api')).toBe('/api')
  })

  it('should handle no arguments', () => {
    expect(urlPathJoin()).toBe('/')
  })

  it('should handle only empty strings', () => {
    expect(urlPathJoin('', '', '')).toBe('/')
  })

  it('should handle paths with multiple consecutive slashes', () => {
    expect(urlPathJoin('//api//', '//users//', '//profile//')).toBe(
      '/api/users/profile',
    )
    expect(urlPathJoin('///api///', '///users///')).toBe('/api/users')
  })
})
