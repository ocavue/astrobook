import assert from 'node:assert'
import { isAbsolute } from 'node:path'

import { fdir } from 'fdir'

import { normalizePath } from '../utils/normalize-path'

/**
 * List the absolute paths of all story files in the given directory.
 */
export async function listStoryFiles(rootDir: string): Promise<string[]> {
  assert(isAbsolute(rootDir))

  const filePaths = await new fdir()
    .withSymlinks()
    .withFullPaths()
    .normalize()
    .glob('./**/*.stories.{ts,tsx,js,jsx,mts,mtsx,mjs,mjsx}')
    .exclude((dirname) => dirname === 'node_modules')
    .crawl(rootDir)
    .withPromise()

  return filePaths.map(normalizePath)
}
