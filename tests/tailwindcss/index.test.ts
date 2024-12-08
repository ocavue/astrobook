import { test, expect } from '@playwright/test'

import { EXAMPLE_URLS } from '../example-urls'

const BASE_URL = EXAMPLE_URLS['example-tailwindcss']

test('tailwindcss example', async ({ page }) => {
  await test.step('Select the story', async () => {
    await page.goto(BASE_URL)
    const button = page.locator('a', { hasText: 'LargeStep' })
    await expect(button).toBeVisible()
    await button.click()

    await page.waitForURL(
      `${BASE_URL}/dashboard/src/stories/preact-counter/large-step`,
    )
  })

  await test.step('Check the style', async () => {
    const button = page.locator('button', { hasText: '+' })
    await expect(button).toHaveClass(/size-\[100px]/)
    await expect(button).toHaveCSS('width', '100px')
    await expect(button).toHaveCSS('height', '100px')
    const box = await button.boundingBox()
    expect(box).not.toBeNull()
    expect(Math.round(box?.width ?? 0)).toBe(100)
    expect(Math.round(box?.height ?? 0)).toBe(100)
  })
})
