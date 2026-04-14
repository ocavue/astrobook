import type { TreeNode } from './build-tree'

function countDescendantRows(node: TreeNode): number {
  if (node.type === 'story') return 0
  let rows = node.children.length
  for (const child of node.children) {
    rows += countDescendantRows(child)
  }
  return rows
}

export function getCollapseDuration(node: TreeNode): number {
  if (node.type === 'story') return 0
  return computeCollapseDuration(countDescendantRows(node))
}

export function computeCollapseDuration(rows: number): number {
  return Math.round(100 + 50 * Math.log(Math.max(0, rows) + 1))
}
