import { collectStoryEntries } from '../story-file/collect-story-entries'

export async function loadStoryEntries(rootDir: string): Promise<string> {
  const entries = await collectStoryEntries(rootDir)
  return `export default ${JSON.stringify(entries)}`
}
