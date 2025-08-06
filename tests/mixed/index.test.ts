import { test, expect } from '@playwright/test'

import { EXAMPLE_URLS } from '../example-urls'
import { testCounter } from '../helpers/counter'

const BASE_URL = EXAMPLE_URLS['example-mixed']

test('mixed example', async ({ page }) => {
  await test.step('Check the home page', async () => {
    await page.goto(BASE_URL)
    await expect(page).toHaveTitle('Welcome to Astro.')
  })

  await test.step('Open the astrobook', async () => {
    const button = page.locator('a', { hasText: 'Go to Astrobook' })
    await button.click()

    await expect(page).toHaveURL(`${BASE_URL}/astrobook-subpath`)
    await expect(page).toHaveTitle('Astrobook')
    await expect(page.locator('h1')).toHaveText('Astrobook')
  })

  await test.step('Select the story', async () => {
    const button = page.locator('a', { hasText: 'LargeStep' })
    await expect(button).toBeVisible()
    await button.click()

    await page.waitForURL(
      `${BASE_URL}/astrobook-subpath/dashboard-subpath/preact-counter/large-step`,
    )
  })

  await test.step('Interact with the story', async () => {
    await testCounter(page, 5)
  })

  await test.step('Go to full screen', async () => {
    await page.goto(
      `${BASE_URL}/astrobook-subpath/story-subpath/preact-counter/large-step`,
    )
  })

  await test.step('Interact with the story', async () => {
    await testCounter(page, 5)
  })
})
