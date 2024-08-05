import type { GetStaticPathsResult } from 'astro'
import stories from 'virtual:astrobook/stories.mjs'

interface Params {
  story: string
}

function getStaticPaths() {
  return stories.map((story) => {
    return {
      params: {
        story: story.id,
      } satisfies Params,
    }
  }) satisfies GetStaticPathsResult
}

export { getStaticPaths, type Params }
