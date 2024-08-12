import * as crypto from 'node:crypto'
import { promises as fs } from 'node:fs'
import * as path from 'node:path'

async function getFileHash(filePath: string): Promise<string> {
  const fileBuffer = await fs.readFile(filePath)
  const hashSum = crypto.createHash('sha256')
  hashSum.update(fileBuffer)
  return hashSum.digest('hex')
}

async function copyFile(srcPath: string, destPath: string): Promise<void> {
  // Check if destination file exists
  try {
    await fs.access(destPath)
    // If file exists, compare content
    const [srcHash, destHash] = await Promise.all([
      getFileHash(srcPath),
      getFileHash(destPath),
    ])

    if (srcHash === destHash) {
      return
    }
  } catch {
    // Destination file doesn't exist, we'll copy it
  }

  // Copy file
  await fs.copyFile(srcPath, destPath)
  console.log(`[copy.ts] ${srcPath} -> ${destPath}`)
}

async function copyDirectory(srcPath: string, destPath: string): Promise<void> {
  // Create destination directory if it doesn't exist
  await fs.mkdir(destPath, { recursive: true })

  // Read all files/directories in the source directory
  const entries = await fs.readdir(srcPath, { withFileTypes: true })

  await Promise.all(
    entries.map(async (entry) => {
      const copy = entry.isDirectory() ? copyDirectory : copyFile
      await copy(
        path.join(srcPath, entry.name),
        path.join(destPath, entry.name),
      )
    }),
  )
}

async function main() {
  // Get command line arguments
  const args = process.argv.slice(2)

  if (args.length !== 2) {
    console.error('Usage: tsx copy.ts <source_dir> <destination_dir>')
    process.exit(1)
  }

  const [src, dest] = args
  await copyDirectory(src, dest)
}

await main()
