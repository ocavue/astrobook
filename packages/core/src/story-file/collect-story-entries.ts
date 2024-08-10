import path from 'node:path/posix'

import type { StoryEntry } from '@astrobook/types'

import { normalizePath } from '../utils/normalize-path'

import { collectStoryFiles } from './collect-story-files'

export async function collectStoryEntries(
  rootDir: string,
): Promise<StoryEntry[]> {
  rootDir = normalizePath(rootDir)
  const files = await collectStoryFiles(rootDir)
  const entries: StoryEntry[] = []

  for (const file of files) {
    if (file.namedExports.length === 0) {
      console.warn(`[astrobook] File ${file.filePath} has no named exports`)
      continue
    }

    if (!file.defaultExport) {
      console.warn(`[astrobook] File ${file.filePath} has no default export`)
      continue
    }

    const moduleId = normalizePath(
      path.relative(rootDir, file.filePath).replace(/\.stories\.\w+$/i, ''),
    )

    for (const storyName of file.namedExports) {
      const storyId = `${moduleId}/${storyName}`

      entries.push({
        id: storyId,
        name: storyName,
        modulePath: file.filePath,
      })
    }
  }

  return entries
}
