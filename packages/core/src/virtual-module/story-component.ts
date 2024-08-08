import type { Framework } from '@astrobook/types'

import { collectStoryEntries } from '../story-file/collect-story-entries'

const ts = String.raw

export async function loadStoryComponent(
  defaultFramework: Framework | '' = '',
): Promise<string> {
  const importCode: string[] = []
  const frameworkCode: string[] = []
  const templateCode: string[] = []

  const stories = await collectStoryEntries(process.cwd())

  for (const [index, story] of stories.entries()) {
    importCode.push(`import * as m${index} from '${story.modulePath}';`)
    frameworkCode.push(
      `const f${index} = getFramework(m${index}, '${story.modulePath}');`,
    )
    templateCode.push(
      [
        `{`,
        `id === '${story.id}' ?`,
        `f${index} ?`,
        `(<m${index}.default.component { ...m${index}?.['${story.name}']?.args } client:only={f${index}} />) :`,
        `(<m${index}.default.component { ...m${index}?.['${story.name}']?.args } />) :`,
        `null`,
        `}`,
      ].join(' '),
    )
  }

  const result = [
    `---`,
    ...importCode,
    ts`const id = Astro.props.story;`,
    ts`
function getFramework(mod, path) {
  const framework = mod.default?.parameters?.framework || 'DEFAULT_FRAMEWORK';
  if (framework === 'astro') { 
    return undefined; 
  };
  if (!framework) { 
    throw new Error('No framework found for ' + path + ', please add a framework parameter to the default export of the story module');
  };
  return framework;
};
`.replaceAll('DEFAULT_FRAMEWORK', defaultFramework),
    ...frameworkCode,
    `---`,
    ...templateCode,
  ].join('\n')

  return result
}
