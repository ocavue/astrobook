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

  await test.step('Hide the version badge', async () => {
    // The default version badge links to Astrobook's CHANGELOG; with
    // `version: false` it must not be rendered at all.
    await expect(
      page.locator('a[href*="astrobook/blob/master/packages/astrobook/CHANGELOG"]'),
    ).toHaveCount(0)
  })

  await test.step('Render the customized GitHub badge', async () => {
    const repoLink = page.locator('a[href="https://github.com/acme/ui"]')
    await expect(repoLink).toBeVisible()
    await expect(repoLink).toContainText('View on GitHub')
  })
})
