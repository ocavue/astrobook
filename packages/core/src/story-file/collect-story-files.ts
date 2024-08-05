import fs from 'node:fs/promises'

import { getExports } from './get-exports'
import { listStoryFiles } from './list-story-files'

export type ParsedStoryFile = {
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

export async function collectStoryFiles(
  rootDir: string,
): Promise<ParsedStoryFile[]> {
  const filePaths = await listStoryFiles(rootDir)
  return Promise.all(filePaths.map(parseStoryFile))
}

async function parseStoryFile(filePath: string): Promise<ParsedStoryFile> {
  const code = await fs.readFile(filePath, 'utf-8')
  const exports = getExports(code)
  const defaultExport = exports.includes('default')
  const namedExports = exports.filter((name) => name !== 'default')

  return { filePath, defaultExport, namedExports }
}
