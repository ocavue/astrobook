import { test, expect } from '@playwright/test'

import { EXAMPLE_URLS } from '../example-urls'

const BASE_URL = EXAMPLE_URLS['example-pandacss']

// For unknown reasons, this test fails on Windows.
test.skip(process.platform === 'win32', 'Skip on Windows')

test('pandacss example', async ({ page }) => {
  await test.step('Select the ghost story', async () => {
    await page.goto(BASE_URL)
    const button = page.locator('a', { hasText: 'Ghost' })
    await expect(button).toBeVisible()
    await button.click()

    await page.waitForURL(`${BASE_URL}/dashboard/src/stories/button/ghost`)
  })

  await test.step('Check the style', async () => {
    const button = page.locator('button', { hasText: 'Ghost' })
    await expect(button).toHaveClass(/button/)
    await expect(button).toHaveClass(/button--variant_ghost/)
    await expect(button).toHaveCSS('color', 'var(--colors-color-palette-text)')
    // TODO: add hover checks
    await expect(button).toHaveCSS('height', '2.5rem')
    await expect(button).toHaveCSS('min-width', '2.5rem')

    // I don't know much about playwright yet, TODO ...
    // const box = await button.boundingBox()
    // expect(box).not.toBeNull()
    // expect(Math.round(box?.width ?? 0)).toBe(100)
    // expect(Math.round(box?.height ?? 0)).toBe(100)
  })
})
