import { test, expect } from '@playwright/test'

import { EXAMPLE_URLS } from '../example-urls'

const BASE_URL = EXAMPLE_URLS['example-mixed']

test('mixed example', async ({ page }) => {
  await test.step('Check the home page', async () => {
    await page.goto(BASE_URL)
    await expect(page).toHaveTitle('Welcome to Astro')
  })

  await test.step('Open the astrobook', async () => {
    const button = page.locator('a', { hasText: 'Go to Astrobook' })
    await button.click()

    await expect(page).toHaveURL(`${BASE_URL}/docs/components`)
    await expect(page).toHaveTitle('Astrobook')
    await expect(page.locator('h1')).toHaveText('Astrobook')
  })

  await test.step('Select the story', async () => {
    const button = page.locator('a', { hasText: 'LargeStep' })
    await button.click()

    await expect(page).toHaveURL(
      `${BASE_URL}/docs/components/dashboard/preact-counter/large-step`,
    )
  })

  await test.step('Interact with the story', async () => {
    const counterNumber = page.locator('pre', { hasText: '0' })
    await expect(counterNumber).toHaveText('0')

    const button = page.locator('button', { hasText: '+' })
    await button.click()

    await expect(counterNumber).toHaveText('5')
  })

  await test.step('Go to full screen', async () => {
    const button = page.locator('a[title="Go full screen"]')
    await button.click()

    await expect(page).toHaveURL(
      `${BASE_URL}/docs/components/stories/preact-counter/large-step`,
    )
  })

  await test.step('Interact with the story', async () => {
    const counterNumber = page.locator('pre', { hasText: '0' })
    await expect(counterNumber).toHaveText('0')

    const button = page.locator('button', { hasText: '+' })
    await button.click()

    await expect(counterNumber).toHaveText('5')
  })
})
