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
  const minMs = 50
  const maxMs = 500
  const scale = 50
  return Math.min(maxMs, Math.round(minMs + scale * Math.log(Math.max(0, rows) + 1)))
}
