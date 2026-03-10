import { test, expect, type Page } from '@playwright/test'

import { EXAMPLE_URLS } from '../example-urls'

const url = EXAMPLE_URLS['example-playground']

function getStoryLink(page: Page, storyId: string) {
  return page.locator(
    `a[data-astrobook-story-link][data-story-id="${storyId}"]`,
  )
}

test('clicked story gets highlighted', async ({ page }) => {
  await page.goto(`${url}/dashboard/astro/astro-counter/default`)

  const defaultStory = getStoryLink(page, 'astro/astro-counter/default')
  await expect(defaultStory).toHaveClass(/astrobook-sidebar-story-link-active/)

  const largeStepStory = getStoryLink(page, 'astro/astro-counter/large-step')
  await expect(largeStepStory).toHaveClass(
    /astrobook-sidebar-story-link-inactive/,
  )

  await largeStepStory.click()
  await page.waitForURL('**/astro/astro-counter/large-step')

  await expect(largeStepStory).toHaveClass(
    /astrobook-sidebar-story-link-active/,
  )
  await expect(defaultStory).toHaveClass(
    /astrobook-sidebar-story-link-inactive/,
  )
})
