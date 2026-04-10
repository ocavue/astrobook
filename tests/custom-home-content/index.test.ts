import { test, expect } from '@playwright/test'

import { EXAMPLE_URLS } from '../example-urls'

const BASE_URL = EXAMPLE_URLS['example-custom-home-content']

test('custom-home-content example', async ({ page }) => {
  await page.goto(BASE_URL)

  await test.step('Render the custom title and subtitle', async () => {
    await expect(page.locator('h1', { hasText: 'Acme UI' })).toBeVisible()
    await expect(
      page.locator('p', { hasText: 'Internal component library' }),
    ).toBeVisible()
  })

  await test.step('Render the custom version badge', async () => {
    // The example sets version.label to its own package.json version (v0.0.1).
    const versionBadge = page.locator('a', { hasText: 'v0.0.1' })
    await expect(versionBadge).toBeVisible()
  })

  await test.step('Render the customized GitHub badge', async () => {
    const repoLink = page.locator('a[href="https://github.com/acme/ui"]')
    await expect(repoLink).toBeVisible()
    await expect(repoLink).toContainText('View on GitHub')
  })
})
