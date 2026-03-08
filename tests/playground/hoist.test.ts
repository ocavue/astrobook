import { test, expect } from '@playwright/test'

import { EXAMPLE_URLS } from '../example-urls'

const url = EXAMPLE_URLS['example-playground']

test('Hoist sidebar', async ({ page }) => {
  await page.goto(url)

  const hoistDir = page.locator('details[data-id="dir:hoist"]')

  const contents = hoistDir.locator(':scope > div')
  const linkTexts = await contents
    .locator('a, details[data-astrobook-collapsible] > summary')
    .allTextContents()
  const trimmedLinkTexts = linkTexts.map((text) => text.trim())

  expect(trimmedLinkTexts).toEqual([
    'Hoist',

    'NoHoistDifferentName',
    'Default',

    'NoHoistMultiple',
    'Default',
    'NoHoistMultiple',
  ])
})
