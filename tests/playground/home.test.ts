import { test, expect } from '@playwright/test'

test('home page', async ({ page }) => {
  await page.goto('http://localhost:4321')
  await expect(page).toHaveTitle(/Astrobook/)
})
