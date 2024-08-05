import type { GetStaticPathsResult } from 'astro'

function getStaticPaths(): GetStaticPathsResult {
  return [
    {
      params: {
        path: undefined,
      },
    },
  ]
}

export { getStaticPaths }
