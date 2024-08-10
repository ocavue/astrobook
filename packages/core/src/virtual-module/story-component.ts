import { getStoryModules } from './get-story-modules'

export async function loadStoryComponent(rootDir: string): Promise<string> {
  const importCode: string[] = []
  const templateCode: string[] = []

  const modules = await getStoryModules(rootDir)

  for (const [index, module] of modules.entries()) {
    importCode.push(`import * as m${index} from '${module.importPath}';`)

    for (const story of module.stories) {
      templateCode.push(
        [
          `{`,
          `id === '${story.id}' ?`,
          `isAstroComponent(m${index}) ?`,
          `(<m${index}.default.component { ...m${index}?.['${story.name}']?.args } />) :`,
          `(<m${index}.default.component { ...m${index}?.['${story.name}']?.args } client:load />) :`,
          `null`,
          `}`,
        ].join(' '),
      )
    }
  }

  const result = [
    `---`,
    `import { isAstroComponent } from 'astrobook/client';`,
    ...importCode,
    'const id = Astro.props.story;',
    `---`,
    ...templateCode,
  ].join('\n')

  return result
}
