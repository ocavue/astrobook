import type { Story, StoryModule } from '@astrobook/types'

export interface DirectoryNode {
  type: 'directory'
  name: string
  children: TreeNode[]
}

export interface ModuleNode {
  type: 'module'
  module: StoryModule
  children: StoryNode[]
}

export interface StoryNode {
  type: 'story'
  story: Story
  module: StoryModule
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
    let dir = current.find(
      (n): n is DirectoryNode => n.type === 'directory' && n.name === segment,
    )
    if (!dir) {
      dir = { type: 'directory', name: segment, children: [] }
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

    if (isSingleStory(module)) {
      const storyNode: StoryNode = {
        type: 'story',
        story: module.stories[0],
        module,
      }
      children.push(storyNode)
    } else {
      const storyNodes: StoryNode[] = module.stories.map((story) => ({
        type: 'story' as const,
        story,
        module,
      }))
      const moduleNode: ModuleNode = {
        type: 'module',
        module,
        children: storyNodes,
      }
      children.push(moduleNode)
    }
  }

  return root
}
