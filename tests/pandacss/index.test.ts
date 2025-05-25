import { test, expect } from '@playwright/test'

import { EXAMPLE_URLS } from '../example-urls'

const BASE_URL = EXAMPLE_URLS['example-pandacss']

// For unknown reasons, this test fails on Windows.
test.skip(process.platform === 'win32', 'Skip on Windows')

test('pandacss example', async ({ page }) => {
  await test.step('Select the ghost button story', async () => {
    await page.goto(BASE_URL)
    const button = page.locator('a', { hasText: 'Ghost' })
    await expect(button).toBeVisible()
    await button.click()

    await page.waitForURL(`${BASE_URL}/dashboard/button/ghost`)
  })

  await test.step('Check the ghost button styles', async () => {
    const button = page.locator('button', { hasText: 'Ghost' })
    await expect(button).toBeVisible()
    await expect(button).toHaveClass(/button/)
    await expect(button).toHaveClass(/button--variant_ghost/)
    await expect(button).toHaveClass(/button--size_md/)
    await expect(button).toHaveCSS('color', 'rgb(28, 32, 36)')

    await expect(button).toHaveCSS('height', '40px')
    await expect(button).toHaveCSS('min-width', '40px')
    await button.hover()
    await page.waitForTimeout(200)
    await expect(button).toHaveCSS('background-color', 'rgba(0, 0, 51, 0.06)')
  })
})
