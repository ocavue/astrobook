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
    expect(page.locator('.decorator').count()).toBe(1)
  })

  test('multiple decorators', async ({ page }) => {
    await page.goto(
      `${BASE_URL}/dashboard/decorators/decorators/multiple-decorators`,
    )
    await testCounter(page, 1)
    expect(page.locator('.decorator').count()).toBe(2)
  })

  test('mixed decorators', async ({ page }) => {
    await page.goto(
      `${BASE_URL}/dashboard/decorators/decorators/mixed-decorators`,
    )
    await testCounter(page, 1)
    expect(page.locator('.decorator').count()).toBe(5)
  })
})
