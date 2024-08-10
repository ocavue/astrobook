import { describe, expect, it } from 'vitest'

import { getExports } from './get-exports'

describe('getExports', () => {
  it('can parse named exports', () => {
    expect(getExports('export const a = 1')).toEqual(['a'])
    expect(getExports('const a = 1; export { a }')).toEqual(['a'])
    expect(getExports('const a = 1; export { a as b }')).toEqual(['b'])
    expect(getExports('export function a () {}')).toEqual(['a'])
    expect(getExports('export class A {}')).toEqual(['A'])
    expect(getExports('export { a } from "./other"')).toEqual(['a'])
  })

  it('can parse named exports', () => {
    expect(getExports('export default { name: "a" }')).toEqual(['default'])
    expect(getExports('const a = 1; export { a as default }')).toEqual([
      'default',
    ])
  })

  it('can parse JSX', () => {
    expect(
      getExports('export function a() { return <div>hello</div> }'),
    ).toEqual(['a'])
  })
})
