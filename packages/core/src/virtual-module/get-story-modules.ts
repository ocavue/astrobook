import assert from 'node:assert'
import fs from 'node:fs/promises'
import path, { isAbsolute } from 'node:path/posix'

import type { StoryModule } from '@astrobook/types'
import { fdir } from 'fdir'
import kebabCase from 'just-kebab-case'

import { getExports } from '../utils/get-exports'
import { normalizePath } from '../utils/normalize-path'

/**
 * List the absolute paths of all story files in the given directory.
 */
async function listStoryFiles(rootDir: string): Promise<string[]> {
  assert(isAbsolute(rootDir))

  const filePaths = await new fdir()
    .withSymlinks()
    .withFullPaths()
    .normalize()
    .glob('./**/*.stories.{ts,tsx,js,jsx,mts,mtsx,mjs,mjsx}')
    .exclude((dirname) => dirname === 'node_modules')
    .crawl(rootDir)
    .withPromise()

  return filePaths.map(normalizePath).sort()
}

type ParsedStoryFile = {
  /**
   * The absolute path to the file. Unix-style slashes are used.
   */
  filePath: string

  /**
   * Whether the file has a default export
   */
  defaultExport: boolean

  /**
   * The named exports in the file
   */
  namedExports: string[]
}

async function parseStoryFiles(filePath: string): Promise<ParsedStoryFile> {
  const code = await fs.readFile(filePath, 'utf-8')
  const exports = getExports(code)
  const defaultExport = exports.includes('default')
  const namedExports = exports.filter((name) => name !== 'default')

  return { filePath, defaultExport, namedExports }
}

export function convertStoryFileToModule(
  rootDir: string,
  file: ParsedStoryFile,
): StoryModule | undefined {
  if (file.namedExports.length === 0) {
    console.warn(`[astrobook] File ${file.filePath} has no named exports`)
    return
  }

  if (!file.defaultExport) {
    console.warn(`[astrobook] File ${file.filePath} has no default export`)
    return
  }

  const relativePath = normalizePath(path.relative(rootDir, file.filePath))
  const relativePathWithoutStories = relativePath.replace(
    /\.stories\.\w+$/i,
    '',
  )

  const directory = relativePathWithoutStories.split('/').slice(0, -1).join('/')
  const name = relativePathWithoutStories.split('/').pop()
  assert(name, `[astrobook] Unexpected file path: ${file.filePath}`)

  const moduleId = directory
    ? `${directory}/${kebabCase(name)}`
    : kebabCase(name)

  return {
    id: moduleId,
    name,
    directory,
    importPath: file.filePath,
    stories: file.namedExports.map((name) => {
      return { id: `${moduleId}/${kebabCase(name)}`, name }
    }),
  }
}

export async function getStoryModules(rootDir: string): Promise<StoryModule[]> {
  const storyFilePaths = await listStoryFiles(rootDir)
  const storyFiles = await Promise.all(storyFilePaths.map(parseStoryFiles))

  return storyFiles
    .map((storyFile) => convertStoryFileToModule(rootDir, storyFile))
    .filter((module) => !!module)
}
