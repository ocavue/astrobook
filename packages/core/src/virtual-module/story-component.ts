import { collectStoryEntries } from '../story-file/collect-story-entries'

export async function loadStoryComponent(): Promise<string> {
  const scriptCode: string[] = []
  const templateCode: string[] = []

  const stories = await collectStoryEntries(process.cwd())

  for (const [index, story] of stories.entries()) {
    scriptCode.push(`import * as module${index} from '${story.modulePath}';`)
    templateCode.push(
      `{ id === '${story.id}' && <module${index}.default.component { ...module${index}?.['${story.name}']?.args } client:load /> }`,
    )
  }

  scriptCode.push('const id = Astro.props.story;')

  return [`---`, ...scriptCode, `---`, ...templateCode].join('\n')
}
