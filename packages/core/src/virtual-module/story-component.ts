import { collectStoryEntries } from '../story-file/collect-story-entries'

export async function loadStoryComponent(rootDir: string): Promise<string> {
  const importCode: string[] = []
  const templateCode: string[] = []

  const stories = await collectStoryEntries(rootDir)

  for (const [index, story] of stories.entries()) {
    importCode.push(`import * as m${index} from '${story.modulePath}';`)
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
