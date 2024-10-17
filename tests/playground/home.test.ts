import { test, expect } from '@playwright/test'

import { EXAMPLE_URLS } from '../example-urls'

const BASE_URL = EXAMPLE_URLS['example-playground']

test('home page', async ({ page }) => {
  await page.goto(BASE_URL)
  await expect(page).toHaveTitle(/Astrobook/)
})
