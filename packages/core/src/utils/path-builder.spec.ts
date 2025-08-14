import { describe, expect, it } from 'vitest'

import { createPathBuilder } from './path-builder'

describe('createPathBuilder', () => {
  describe('with trailingSlash: "ignore"', () => {
    const buildPath = createPathBuilder({ trailingSlash: 'ignore' })

    it('should join simple path segments', () => {
      expect(buildPath('api', 'users', 'profile')).toBe('/api/users/profile')
      expect(buildPath('docs', 'components')).toBe('/docs/components')
      expect(buildPath('single')).toBe('/single')
    })

    it('should handle paths with leading and trailing slashes', () => {
      expect(buildPath('/api/', '/users/', '/profile/')).toBe(
        '/api/users/profile',
      )
      expect(buildPath('/api', 'users/', '/profile')).toBe('/api/users/profile')
      expect(buildPath('api/', '/users', 'profile/')).toBe('/api/users/profile')
    })

    it('should filter out empty strings', () => {
      expect(buildPath('', 'api', '', 'users', '')).toBe('/api/users')
      expect(buildPath('api', '', 'users')).toBe('/api/users')
      expect(buildPath('', '', 'api')).toBe('/api')
    })

    it('should handle no arguments', () => {
      expect(buildPath()).toBe('/')
    })

    it('should handle only empty strings', () => {
      expect(buildPath('', '', '')).toBe('/')
    })

    it('should handle paths with multiple consecutive slashes', () => {
      expect(buildPath('//api//', '//users//', '//profile//')).toBe(
        '/api/users/profile',
      )
      expect(buildPath('///api///', '///users///')).toBe('/api/users')
    })
  })

  describe('with trailingSlash: "always"', () => {
    const buildPath = createPathBuilder({ trailingSlash: 'always' })

    it('should join simple path segments with trailing slash', () => {
      expect(buildPath('api', 'users', 'profile')).toBe('/api/users/profile/')
      expect(buildPath('docs', 'components')).toBe('/docs/components/')
      expect(buildPath('single')).toBe('/single/')
    })

    it('should handle paths with leading and trailing slashes', () => {
      expect(buildPath('/api/', '/users/', '/profile/')).toBe(
        '/api/users/profile/',
      )
      expect(buildPath('/api', 'users/', '/profile')).toBe('/api/users/profile/')
      expect(buildPath('api/', '/users', 'profile/')).toBe('/api/users/profile/')
    })

    it('should filter out empty strings and add trailing slash', () => {
      expect(buildPath('', 'api', '', 'users', '')).toBe('/api/users/')
      expect(buildPath('api', '', 'users')).toBe('/api/users/')
      expect(buildPath('', '', 'api')).toBe('/api/')
    })

    it('should handle no arguments with trailing slash', () => {
      expect(buildPath()).toBe('/')
    })

    it('should handle only empty strings with trailing slash', () => {
      expect(buildPath('', '', '')).toBe('/')
    })

    it('should handle paths with multiple consecutive slashes and add trailing slash', () => {
      expect(buildPath('//api//', '//users//', '//profile//')).toBe(
        '/api/users/profile/',
      )
      expect(buildPath('///api///', '///users///')).toBe('/api/users/')
    })
  })

  describe('with trailingSlash: "never"', () => {
    const buildPath = createPathBuilder({ trailingSlash: 'never' })

    it('should join simple path segments without trailing slash', () => {
      expect(buildPath('api', 'users', 'profile')).toBe('/api/users/profile')
      expect(buildPath('docs', 'components')).toBe('/docs/components')
      expect(buildPath('single')).toBe('/single')
    })

    it('should handle paths with leading and trailing slashes and remove trailing slash', () => {
      expect(buildPath('/api/', '/users/', '/profile/')).toBe(
        '/api/users/profile',
      )
      expect(buildPath('/api', 'users/', '/profile')).toBe('/api/users/profile')
      expect(buildPath('api/', '/users', 'profile/')).toBe('/api/users/profile')
    })

    it('should filter out empty strings and ensure no trailing slash', () => {
      expect(buildPath('', 'api', '', 'users', '')).toBe('/api/users')
      expect(buildPath('api', '', 'users')).toBe('/api/users')
      expect(buildPath('', '', 'api')).toBe('/api')
    })

    it('should handle no arguments without trailing slash', () => {
      expect(buildPath()).toBe('/')
    })

    it('should handle only empty strings without trailing slash', () => {
      expect(buildPath('', '', '')).toBe('/')
    })

    it('should handle paths with multiple consecutive slashes and remove trailing slash', () => {
      expect(buildPath('//api//', '//users//', '//profile//')).toBe(
        '/api/users/profile',
      )
      expect(buildPath('///api///', '///users///')).toBe('/api/users')
    })
  })

  describe('with default trailingSlash (ignore)', () => {
    const buildPath = createPathBuilder({})

    it('should behave like ignore mode when no trailingSlash is specified', () => {
      expect(buildPath('api', 'users')).toBe('/api/users')
      expect(buildPath('/api/', '/users/')).toBe('/api/users')
    })
  })
})
