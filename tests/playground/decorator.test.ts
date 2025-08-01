import { expect, test } from '@playwright/test'

import { EXAMPLE_URLS } from '../example-urls'
import { testCounter } from '../helpers/counter'

const BASE_URL = EXAMPLE_URLS['example-playground']

test.describe('decorators', () => {
  test('single decorator', async ({ page }) => {
    await page.goto(
      `${BASE_URL}/dashboard/decorators/decorators/single-decorator`,
    )
    await testCounter(page, 1)
    await expect(page.locator('.decorator')).toHaveCount(1)
  })

  test('multiple decorators', async ({ page }) => {
    await page.goto(
      `${BASE_URL}/dashboard/decorators/decorators/multiple-decorators`,
    )
    await testCounter(page, 5)
    await expect(page.locator('.decorator')).toHaveCount(2)
  })

  test('mixed decorators', async ({ page }) => {
    await page.goto(
      `${BASE_URL}/dashboard/decorators/decorators/mixed-decorators`,
    )
    await testCounter(page, 10)
    await expect(page.locator('.decorator')).toHaveCount(5)
  })
})
