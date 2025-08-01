import type { Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

import { EXAMPLE_URLS } from '../example-urls'
import { testCounter } from '../helpers/counter'

const BASE_URL = EXAMPLE_URLS['example-playground']

function goto(
  page: Page,
  story: string,
  mode: 'dashboard' | 'stories' = 'dashboard',
) {
  return page.goto(`${BASE_URL}/${mode}/decorators/decorators/${story}`)
}

test.describe('decorators', () => {
  test('single decorator functionality', async ({ page }) => {
    await goto(page, 'single-decorator', 'stories')

    // Test basic functionality and structure
    await testCounter(page, 1)
    await expect(page.locator('.decorator')).toHaveCount(1)

    // Single decorator doesn't have label prop, so data-label should be empty
    const decorator = page.locator('.decorator').first()
    const dataLabel = await decorator.getAttribute('data-label')
    expect(dataLabel).toBeFalsy()
  })

  test('multiple decorators with labels', async ({ page }) => {
    await goto(page, 'multiple-decorators')

    // Test functionality and structure
    await testCounter(page, 5)
    await expect(page.locator('.decorator')).toHaveCount(2)

    // Test nested decorator labels
    const decorators = page.locator('.decorator')
    await expect(decorators.nth(0)).toHaveAttribute(
      'data-label',
      'Outer Decorator',
    )
    await expect(decorators.nth(1)).toHaveAttribute(
      'data-label',
      'Inner Decorator',
    )
  })

  test('mixed framework decorators', async ({ page }) => {
    await goto(page, 'mixed-decorators', 'stories')

    // Test functionality through all decorators
    await testCounter(page, 10)
    await expect(page.locator('.decorator')).toHaveCount(5)

    // Test all framework decorators are present with correct labels
    const decorators = page.locator('.decorator')
    await expect(decorators.nth(0)).toHaveAttribute('data-label', 'Astro')
    await expect(decorators.nth(1)).toHaveAttribute('data-label', 'React')
    await expect(decorators.nth(2)).toHaveAttribute('data-label', 'Preact')
    await expect(decorators.nth(3)).toHaveAttribute('data-label', 'Svelte')
    await expect(decorators.nth(4)).toHaveAttribute('data-label', 'Vue')
  })
})
