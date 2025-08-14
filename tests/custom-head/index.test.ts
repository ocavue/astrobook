import { test, expect } from '@playwright/test'

import { EXAMPLE_URLS } from '../example-urls'

const BASE_URL = EXAMPLE_URLS['example-custom-head']

test('custom-head example', async ({ page }) => {
  await test.step('Check the home page', async () => {
    await page.goto(BASE_URL)
    await expect(page).toHaveTitle('Custom Title')
    await expect(page.locator('a', { hasText: 'Custom Title' })).toBeVisible()
  })

  await test.step('Select Lobster font story', async () => {
    const button = page.locator('a', { hasText: 'Lobster' })
    await expect(button).toBeVisible()
    await button.click()

    await page.waitForURL(`${BASE_URL}/dashboard/typography/lobster/`)
  })

  await test.step('Verify custom fonts are loaded', async () => {
    // Check that Google Fonts stylesheet link is present in the head
    const fontLink = page.locator(
      'link[rel="stylesheet"][href*="fonts.googleapis.com"]',
    )
    await expect(fontLink).toBeAttached()

    // Check that the text uses the Lobster font
    const textElement = page.locator('.font-lobster p')
    await expect(textElement).toBeVisible()
    await expect(textElement).toHaveText('Lorem ipsum dolor sit amet')

    // Verify the font-family is applied
    const computedStyle = await textElement.evaluate(
      (el) => window.getComputedStyle(el).fontFamily,
    )
    expect(computedStyle).toContain('Lobster')
  })

  await test.step('Test Freckle Face font', async () => {
    const button = page.locator('a', { hasText: 'FreckleFace' })
    await button.click()

    await page.waitForURL(`${BASE_URL}/dashboard/typography/freckle-face/`)

    const textElement = page.locator('.font-freckle-face p')
    await expect(textElement).toBeVisible()

    const computedStyle = await textElement.evaluate(
      (el) => window.getComputedStyle(el).fontFamily,
    )
    expect(computedStyle).toContain('Freckle Face')
  })

  await test.step('Test Press Start 2P font', async () => {
    const button = page.locator('a', { hasText: 'PressStart2P' })
    await button.click()

    await page.waitForURL(`${BASE_URL}/dashboard/typography/press-start2-p/`)

    const textElement = page.locator('.font-press-start-2p p')
    await expect(textElement).toBeVisible()

    const computedStyle = await textElement.evaluate(
      (el) => window.getComputedStyle(el).fontFamily,
    )
    expect(computedStyle).toContain('Press Start 2P')
  })
})
