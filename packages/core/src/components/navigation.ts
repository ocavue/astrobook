import stories from 'virtual:astrobook/stories.mjs'

export interface NavItem {
  /**
   * A string that doesn't contain slashes.
   * @example 'components'
   */
  label: string

  /**
   * The leaf node in the path should have an id.
   * @example 'components/ui/button'
   */
  id?: string

  /**
   * The children of this node.
   */
  children?: NavItem[]
}

interface Story {
  /**
   * @example 'components/ui/button'
   */
  id: string
}

/**
 * Group stories by their parent directory. Return a tree of NavItems.
 */
function getNavItems(stories: Story[]): NavItem[] {
  const root: NavItem = { label: 'root', children: [] }

  stories.forEach((story) => {
    const parts = story.id.split('/')
    let currentNode = root

    parts.forEach((part, index) => {
      let child = currentNode.children?.find((c) => c.label === part)

      if (!child) {
        child = { label: part }
        if (index === parts.length - 1) {
          child.id = story.id
        } else {
          child.children = []
        }
        currentNode.children = currentNode.children || []
        currentNode.children.push(child)
      }

      currentNode = child
    })
  })

  return root.children || []
}

function expandNavItems(items: NavItem[]): NavItem[] {
  if (items.length === 1) {
    return expandNavItems(items[0].children || [])
  }
  return items
}

const navItems = expandNavItems(getNavItems(stories))

export { navItems }
