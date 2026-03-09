import type { StoryModule } from '@astrobook/types'

import { compressTerms } from './compress-terms'

export interface DirectoryNode {
  type: 'directory'
  name: string
  searchText: string
  children: TreeNode[]
}

export interface ModuleNode {
  type: 'module'
  id: string
  name: string
  searchText: string
  children: StoryNode[]
}

export interface StoryNode {
  type: 'story'
  id: string
  name: string
  searchText: string
  children?: undefined
}

export type TreeNode = DirectoryNode | ModuleNode | StoryNode

export function isSingleStory(module: StoryModule): boolean {
  return module.stories.length === 1 && module.stories[0].name === module.name
}

function findOrCreateDirectory(
  children: TreeNode[],
  segments: string[],
): TreeNode[] {
  let current = children
  for (const segment of segments) {
    let dir: DirectoryNode | undefined
    for (const node of current) {
      if (node.type === 'directory' && node.name === segment) {
        dir = node
        break
      }
    }
    if (!dir) {
      dir = { type: 'directory', name: segment, children: [], searchText: '' }
      current.push(dir)
    }
    current = dir.children
  }
  return current
}

export function buildTree(modules: StoryModule[]): TreeNode[] {
  const root: TreeNode[] = []

  for (const module of modules) {
    const segments = module.directory ? module.directory.split('/') : []
    const children = findOrCreateDirectory(root, segments)

    const storyNodes: StoryNode[] = module.stories.map((story) => ({
      type: 'story',
      id: story.id,
      name: story.name,
      searchText: '',
    }))

    if (isSingleStory(module)) {
      children.push(storyNodes[0])
    } else {
      const moduleNode: ModuleNode = {
        type: 'module',
        id: module.id,
        name: module.name,
        searchText: '',
        children: storyNodes,
      }
      children.push(moduleNode)
    }
  }

  for (const node of root) {
    assignSearchText(node, [])
  }

  return root
}

function assignSearchText(
  node: TreeNode,
  ancestorTerms: readonly string[],
): readonly string[] {
  const currTerms = [...ancestorTerms, node.name]
  const subTreeTerms: Array<readonly string[]> = []

  for (const child of node.children || []) {
    subTreeTerms.push(assignSearchText(child, currTerms))
  }

  const mergedTerms = compressTerms([...currTerms, ...subTreeTerms.flat()])
  node.searchText = mergedTerms.join(' ')
  return mergedTerms
}
