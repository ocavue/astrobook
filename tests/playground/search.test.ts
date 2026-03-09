import { test, expect, type Page } from '@playwright/test'

import { EXAMPLE_URLS } from '../example-urls'

const url = EXAMPLE_URLS['example-playground']

function getSearchToggle(page: Page) {
  return page.locator('#astrobook-search-toggle')
}

function getSearchPanel(page: Page) {
  return page.locator('#astrobook-search-panel')
}

function getSearchInput(page: Page) {
  return page.locator('#astrobook-search-input')
}

function getSidebarItems(page: Page) {
  return page.locator('#astrobook-sidebar-tree [data-search-text]')
}

test.describe('Search', () => {
  test('search panel is hidden by default', async ({ page }) => {
    await page.goto(url)
    const panel = getSearchPanel(page)
    await expect(panel).not.toHaveAttribute('data-open')
  })

  test('clicking toggle opens search panel', async ({ page }) => {
    await page.goto(url)
    const toggle = getSearchToggle(page)
    const panel = getSearchPanel(page)

    await toggle.click()
    await expect(panel).toHaveAttribute('data-open', '')
  })

  test('clicking toggle again closes search panel', async ({ page }) => {
    await page.goto(url)
    const toggle = getSearchToggle(page)
    const panel = getSearchPanel(page)

    await toggle.click()
    await expect(panel).toHaveAttribute('data-open', '')

    await toggle.click()
    await expect(panel).not.toHaveAttribute('data-open')
  })

  test('search input is focused when panel opens', async ({ page }) => {
    await page.goto(url)
    const toggle = getSearchToggle(page)
    const input = getSearchInput(page)

    await toggle.click()
    await expect(input).toBeFocused()
  })

  test('closing panel clears the search input', async ({ page }) => {
    await page.goto(url)
    const toggle = getSearchToggle(page)
    const input = getSearchInput(page)

    await toggle.click()
    await input.fill('react')
    await expect(input).toHaveValue('react')

    await toggle.click()
    await expect(input).toHaveValue('')
  })

  test('typing filters sidebar items', async ({ page }) => {
    await page.goto(url)
    const toggle = getSearchToggle(page)
    const input = getSearchInput(page)

    await toggle.click()

    const allItemsBefore = await getSidebarItems(page).count()
    expect(allItemsBefore).toBeGreaterThan(0)

    await input.fill('react')

    // Wait for the CSS filter to take effect
    const visibleItems = getSidebarItems(page).filter({
      hasNot: page.locator(':scope[style*="display: none"]'),
    })
    // At least the react directory/module should be visible
    await expect(visibleItems.first()).toBeVisible()

    // Items that don't match "react" should be hidden
    const vueItem = page.locator(
      '#astrobook-sidebar-tree [data-search-text]:not([data-search-text*="react"])',
    )
    for (const item of await vueItem.all()) {
      await expect(item).not.toBeVisible()
    }
  })

  test('clearing search shows all items again', async ({ page }) => {
    await page.goto(url)
    const toggle = getSearchToggle(page)
    const input = getSearchInput(page)

    await toggle.click()
    await input.fill('react')

    // Some items should be hidden
    const hiddenItems = page.locator(
      '#astrobook-sidebar-tree [data-search-text]:not([data-search-text*="react"])',
    )
    const hiddenCount = await hiddenItems.count()
    expect(hiddenCount).toBeGreaterThan(0)

    // Clear search
    await input.fill('')

    // All items should be visible again
    const allItems = getSidebarItems(page)
    for (const item of await allItems.all()) {
      await expect(item).toBeVisible()
    }
  })

  test('search is case-insensitive', async ({ page }) => {
    await page.goto(url)
    const toggle = getSearchToggle(page)
    const input = getSearchInput(page)

    await toggle.click()
    await input.fill('REACT')

    // React items should still be visible (searchText is lowercased)
    const reactItems = page.locator(
      '#astrobook-sidebar-tree [data-search-text*="react"]',
    )
    await expect(reactItems.first()).toBeVisible()
  })

  test('search with no matches hides all items', async ({ page }) => {
    await page.goto(url)
    const toggle = getSearchToggle(page)
    const input = getSearchInput(page)

    await toggle.click()
    await input.fill('zzzznonexistent')

    // All items should be hidden
    const allItems = getSidebarItems(page)
    for (const item of await allItems.all()) {
      await expect(item).not.toBeVisible()
    }
  })
})
