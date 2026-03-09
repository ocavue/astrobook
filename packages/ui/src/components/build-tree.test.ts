import type { StoryModule } from '@astrobook/types'
import { describe, expect, it } from 'vitest'

import { buildTree, isSingleStory } from './build-tree'

function makeModule(
  id: string,
  directory: string,
  name: string,
  storyNames: string[],
): StoryModule {
  return {
    id,
    directory,
    name,
    importPath: `/path/to/${id}.stories.ts`,
    stories: storyNames.map((sn) => ({ id: `${id}/${sn}`, name: sn })),
  }
}

describe('isSingleStory', () => {
  it('returns true for single story matching module name', () => {
    const mod = makeModule('hoist/hoist', 'hoist', 'Hoist', ['Hoist'])
    expect(isSingleStory(mod)).toBe(true)
  })

  it('returns false for single story with different name', () => {
    const mod = makeModule('x/y', 'x', 'Y', ['Default'])
    expect(isSingleStory(mod)).toBe(false)
  })

  it('returns false for multiple stories', () => {
    const mod = makeModule('x/y', 'x', 'Y', ['Default', 'Large'])
    expect(isSingleStory(mod)).toBe(false)
  })
})

describe('buildTree', () => {
  it('returns empty array for empty input', () => {
    expect(buildTree([])).toEqual([])
  })

  it('builds tree from playground data', () => {
    const modules: StoryModule[] = [
      makeModule('hoist/hoist', 'hoist', 'Hoist', ['Hoist']),
      makeModule('hoist/no-hoist-multiple', 'hoist', 'NoHoistMultiple', [
        'Default',
        'NoHoistMultiple',
      ]),
    ]
    const tree = buildTree(modules)

    expect(tree).toHaveLength(1)
    expect(tree[0].type).toBe('directory')

    const dir = tree[0]
    if (dir.type !== 'directory') throw new Error('expected directory')
    expect(dir.name).toBe('hoist')
    expect(dir.children).toHaveLength(2)

    expect(dir.children[0].type).toBe('story')
    if (dir.children[0].type !== 'story') throw new Error('expected story')
    expect(dir.children[0].name).toBe('Hoist')

    expect(dir.children[1].type).toBe('module')
    if (dir.children[1].type !== 'module') throw new Error('expected module')
    expect(dir.children[1].name).toBe('NoHoistMultiple')
    expect(dir.children[1].children).toHaveLength(2)
    expect(dir.children[1].children[0].name).toBe('Default')
    expect(dir.children[1].children[1].name).toBe('NoHoistMultiple')
  })

  it('creates nested directories from slashed paths', () => {
    const modules: StoryModule[] = [
      makeModule('components/ui/button', 'components/ui', 'Button', ['Button']),
      makeModule('components/forms/input', 'components/forms', 'Input', [
        'Input',
      ]),
    ]
    const tree = buildTree(modules)

    expect(tree).toHaveLength(1)
    const components = tree[0]
    if (components.type !== 'directory') throw new Error('expected directory')
    expect(components.name).toBe('components')
    expect(components.children).toHaveLength(2)

    const ui = components.children[0]
    if (ui.type !== 'directory') throw new Error('expected directory')
    expect(ui.name).toBe('ui')
    expect(ui.children).toHaveLength(1)
    expect(ui.children[0].type).toBe('story')

    const forms = components.children[1]
    if (forms.type !== 'directory') throw new Error('expected directory')
    expect(forms.name).toBe('forms')
    expect(forms.children).toHaveLength(1)
    expect(forms.children[0].type).toBe('story')
  })

  it('handles empty directory string', () => {
    const modules: StoryModule[] = [
      makeModule('button', '', 'Button', ['Button']),
    ]
    const tree = buildTree(modules)

    expect(tree).toHaveLength(1)
    expect(tree[0].type).toBe('story')
  })

  it('groups modules under shared directory', () => {
    const modules: StoryModule[] = [
      makeModule('react/counter', 'react', 'Counter', ['Default', 'LargeStep']),
      makeModule('react/toggle', 'react', 'Toggle', ['Toggle']),
    ]
    const tree = buildTree(modules)

    expect(tree).toHaveLength(1)
    const dir = tree[0]
    if (dir.type !== 'directory') throw new Error('expected directory')
    expect(dir.name).toBe('react')
    expect(dir.children).toHaveLength(2)
    expect(dir.children[0].type).toBe('module')
    expect(dir.children[1].type).toBe('story')
  })
})
