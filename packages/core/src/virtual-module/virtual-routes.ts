import path from 'node:path'

import type { Story, StoryModule } from '@astrobook/types'
import slash from 'slash'

import { invariant } from '../utils/invariant'

import { getStoryModules } from './get-story-modules'
import { ROUTE_DASHBOARD_DIR, ROUTE_STORIES_DIR } from './virtual-module-ids'

export interface VirtualRoute {
  pattern: string
  /**
   * The absolute path to the virtual entrypoint file. Posix slash format.
   *
   * It's important to use an absolute path here because we must ensure that we
   * only have one `id`, so that Astro's CSS plugin can find the correct CSS
   * content in the following line.
   * https://github.com/withastro/astro/blob/bc2796436dc3810e988c27b71b7a66fcb1ae8bda/packages/astro/src/core/build/plugins/plugin-css.ts#L144
   */
  entrypoint: string
  storyModule: StoryModule
  story: Story
  props: {
    hasSidebar: boolean
    story: string
  }
}

export async function getVirtualRoutes(
  rootDir: string,
): Promise<Map<string, VirtualRoute>> {
  const routes: VirtualRoute[] = []
  const storyModules = await getStoryModules(rootDir)

  for (const storyModule of storyModules) {
    for (const story of storyModule.stories) {
      invariant(
        !story.id.startsWith('..'),
        `Story ID cannot start with '..', but got '${story.id}'`,
      )
      invariant(
        !story.id.startsWith('/'),
        `Story ID cannot start with '/', but got '${story.id}'`,
      )
      routes.push(
        {
          pattern: '/dashboard/' + story.id,
          entrypoint: slash(
            path.resolve(ROUTE_DASHBOARD_DIR + story.id + '.astro'),
          ),
          storyModule,
          story,
          props: { hasSidebar: true, story: story.id },
        },
        {
          pattern: '/stories/' + story.id,
          entrypoint: slash(
            path.resolve(ROUTE_STORIES_DIR + story.id + '.astro'),
          ),
          storyModule,
          story,
          props: { hasSidebar: false, story: story.id },
        },
      )
    }
  }

  return new Map(routes.map((route) => [route.pattern, route]))
}

export function resolveVirtualRoute(
  path: string,
  routes: Map<string, VirtualRoute>,
): VirtualRoute | undefined {
  if (path.endsWith('.astro')) {
    path = path.slice(0, -6)

    if (path.includes(ROUTE_DASHBOARD_DIR)) {
      const storyId = path.split(ROUTE_DASHBOARD_DIR).pop()
      const pattern = '/dashboard/' + storyId
      return routes.get(pattern)
    }

    if (path.includes(ROUTE_STORIES_DIR)) {
      const storyId = path.split(ROUTE_STORIES_DIR).pop()
      const pattern = '/stories/' + storyId
      return routes.get(pattern)
    }
  }
}

function createVirtualRouteComponent(route: VirtualRoute): string {
  return `
---
import StoryPage from 'astrobook/pages/story.astro'
import { isAstroComponent } from 'astrobook/client'
import * as m from '${route.storyModule.importPath}'
---

<StoryPage storyId={'${route.props.story}'} hasSidebar={${route.props.hasSidebar}}>
  {
    isAstroComponent(m)
      ? (<m.default.component { ...m['${route.story.name}']?.args } />)
      : (<m.default.component { ...m['${route.story.name}']?.args } client:load />)
  }
</StoryPage>
`
}

export function resolveVirtualRouteComponent(
  path: string,
  routes: Map<string, VirtualRoute>,
): string | undefined {
  const route = resolveVirtualRoute(path, routes)
  if (route) {
    return createVirtualRouteComponent(route)
  }
}
