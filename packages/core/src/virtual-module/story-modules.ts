import { getStoryModules } from './get-story-modules'

export async function loadStoryModules(rootDir: string): Promise<string> {
  const modules = await getStoryModules(rootDir)
  return `export default ${JSON.stringify(modules)}`
}
