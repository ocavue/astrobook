import { test, expect } from '@playwright/test'

import { EXAMPLE_URLS } from '../example-urls'

const url = EXAMPLE_URLS['example-playground']

test('Hoist sidebar', async ({ page }) => {
  await page.goto(url)

  const hoistNavGroup = page.locator('nav > div > div:has( div:text("hoist") )')

  const linkTexts = await hoistNavGroup.locator('a').allTextContents()
  const trimmedLinkTexts = linkTexts.map(text => text.trim())

  expect(trimmedLinkTexts).toEqual([
    "Hoist",

    "NoHoistDifferentName",
    "Default",

    "NoHoistMultiple",
    "Default",
    "NoHoistMultiple"
  ])
})
