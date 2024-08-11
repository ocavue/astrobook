import { expect, test } from 'vitest'

import { getPathWithBase } from './base'

test('getPathWithBase', () => {
  expect(getPathWithBase('/path', '')).toMatchInlineSnapshot(`"/path"`)
  expect(getPathWithBase('/path/', '')).toMatchInlineSnapshot(`"/path"`)
  expect(getPathWithBase('/path/', '/base')).toMatchInlineSnapshot(
    `"/base/path"`,
  )
  expect(getPathWithBase('/path', '/')).toMatchInlineSnapshot(`"/path"`)
  expect(getPathWithBase('/', '/')).toMatchInlineSnapshot(`"/"`)
  expect(getPathWithBase('/', 'base')).toMatchInlineSnapshot(`"/base"`)
  expect(getPathWithBase('/path', 'base/')).toMatchInlineSnapshot(
    `"/base/path"`,
  )
})
