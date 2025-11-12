import { test, expect } from '@playwright/test'

import { EXAMPLE_URLS } from '../example-urls'

const BASE_URL = EXAMPLE_URLS['example-custom-home']

test('custom-home example', async ({ page }) => {
  await test.step('Check the home page', async () => {
    await page.goto(BASE_URL)
    await expect(page.locator('h1', { hasText: 'Custom home' })).toBeVisible()
  })
})
