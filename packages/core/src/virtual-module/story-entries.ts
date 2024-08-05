import { collectStoryEntries } from '../story-file/collect-story-entries'

export async function loadStoryEntries(): Promise<string> {
  const entries = await collectStoryEntries(process.cwd())
  return `export default ${JSON.stringify(entries)}`
}
