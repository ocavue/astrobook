#!/usr/bin/env tsx

/*
Minify inline script tags in all .astro files under ./temp
*/

import fs from 'node:fs/promises'
import path from 'node:path/posix'

import * as esbuild from 'esbuild'
import { fdir } from 'fdir'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

async function main() {
  // Get all .astro files under ./temp
  const filePaths = await new fdir()
    .withFullPaths()
    .filter((filePath) => filePath.endsWith('.astro'))
    .crawl(path.join(__dirname, 'temp'))
    .withPromise()

  await Promise.all(filePaths.map(update))
}

/**
 * Read the file, minify the inline script tags, and write the file back.
 */
async function update(filePath: string) {
  let content = await fs.readFile(filePath, 'utf-8')
  const matches = [...content.matchAll(/<script is:inline>(.*?)<\/script>/gs)]
  if (matches.length === 0) return

  for (const match of matches) {
    const script = match[1]
    const minified = await minify(script)
    content = content.replace(script, minified)
  }

  console.log('Minified inline scripts in', filePath)
  await fs.writeFile(filePath, content, 'utf-8')
}

async function minify(script: string): Promise<string> {
  return (await esbuild.transform(script, { minify: true })).code
}

await main()
