import { describe, expect, it } from 'vitest'

import { resolveOptions } from './options'

describe('resolveOptions', () => {
  it('should return default values', () => {
    expect(resolveOptions()).toEqual({
      directory: '.',
      subpath: '',
      dashboardSubpath: 'dashboard',
      previewSubpath: 'stories',
      title: 'Astrobook',
      css: [],
      head: 'astrobook/components/head.astro',
      home: 'astrobook/components/home.astro',
    })
  })

  it('should override options', () => {
    expect(
      resolveOptions({
        directory: './components',
        title: 'My Library',
        css: ['./styles/main.css'],
        home: './MyCustomHome.astro',
      }),
    ).toEqual({
      directory: './components',
      subpath: '',
      dashboardSubpath: 'dashboard',
      previewSubpath: 'stories',
      title: 'My Library',
      css: ['./styles/main.css'],
      head: 'astrobook/components/head.astro',
      home: './MyCustomHome.astro',
    })
  })

  it('should throw error for invalid options', () => {
    expect(() => {
      // @ts-expect-error - testing invalid type
      resolveOptions({ directory: 111, css: [222, 333] })
    }).toThrowErrorMatchingInlineSnapshot(`
      [Error: Invalid Astrobook options:
      × Invalid type: Expected string but received 111
        → at directory
      × Invalid type: Expected string but received 222
        → at css.0
      × Invalid type: Expected string but received 333
        → at css.1]
    `)
  })
})
