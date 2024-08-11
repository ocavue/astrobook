import assert from 'node:assert'

import type { Story, StoryModule } from '@astrobook/types'

import { getStoryModules } from './get-story-modules'
import { ROUTE_DASHBOARD_DIR, ROUTE_STORIES_DIR } from './virtual-module-ids'

export interface VirtualRoute {
  pattern: string
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
      assert(!story.id.startsWith('..'))
      assert(!story.id.startsWith('/'))
      routes.push(
        {
          pattern: '/dashboard/' + story.id,
          entrypoint: ROUTE_DASHBOARD_DIR + story.id + '.astro',
          storyModule,
          story,
          props: { hasSidebar: true, story: story.id },
        },
        {
          pattern: '/stories/' + story.id,
          entrypoint: ROUTE_STORIES_DIR + story.id + '.astro',
          storyModule,
          story,
          props: { hasSidebar: false, story: story.id },
        },
      )
    }
  }

  return new Map(routes.map((route) => [route.pattern, route]))
}

function resolveVirtualRoute(
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
    isAstroComponent(m.default.component) 
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
