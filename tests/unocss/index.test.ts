import { test, expect } from '@playwright/test'

import { EXAMPLE_URLS } from '../example-urls'

const BASE_URL = EXAMPLE_URLS['example-unocss']

test('unocss example', async ({ page }) => {
  await test.step('Select the story', async () => {
    await page.goto(BASE_URL)
    const button = page.locator('a', { hasText: 'LargeStep' })
    await expect(button).toBeVisible()
    await button.click()

    await page.waitForURL(
      `${BASE_URL}/dashboard/src/stories/preact-counter/large-step`,
    )
  })

  const counterNumber = page
    .locator('div.counter', { hasText: '+' })
    .locator('pre')

  await test.step('Check the style', async () => {
    await expect(counterNumber).toHaveClass('size-[100px]')
    const box = await counterNumber.boundingBox()
    expect(box).not.toBeNull()
    expect(box?.width).toBe(100)
    expect(box?.height).toBe(100)
  })
})
