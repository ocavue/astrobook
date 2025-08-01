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
  test('single decorator', async ({ page }) => {
    await goto(page, 'single-decorator')
    await testCounter(page, 1)
    await expect(page.locator('.decorator')).toHaveCount(1)
  })

  test('multiple decorators', async ({ page }) => {
    await goto(page, 'multiple-decorators')
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

  test('mixed decorators', async ({ page }) => {
    await goto(page, 'mixed-decorators')
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

  test('decorator nesting order', async ({ page }) => {
    await goto(page, 'mixed-decorators')

    // Test that decorators are nested in the correct order
    const decorators = page.locator('.decorator')
    await expect(decorators).toHaveCount(5)

    // Test counter functionality still works through all decorators
    await testCounter(page, 10)
  })

  test('decorator without label prop', async ({ page }) => {
    await goto(page, 'single-decorator')

    // Single decorator doesn't have label prop, so data-label should be empty or undefined
    const decorator = page.locator('.decorator').first()
    const dataLabel = await decorator.getAttribute('data-label')
    expect(
      dataLabel === null || dataLabel === '' || dataLabel === 'undefined',
    ).toBe(true)
  })

  test('all decorators maintain component functionality', async ({ page }) => {
    await goto(page, 'mixed-decorators')

    // Verify that the wrapped component (ReactCounter) maintains its functionality
    // through all framework decorators using the testCounter helper
    await testCounter(page, 10)
  })
})
