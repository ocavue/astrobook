import { collectStoryEntries } from '../story-file/collect-story-entries'

export async function loadStoryComponent(): Promise<string> {
  const importCode: string[] = []
  const templateCode: string[] = []

  const stories = await collectStoryEntries(process.cwd())

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

  importCode.push()

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
