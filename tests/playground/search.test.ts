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

function getStoryLink(page: Page, storyId: string) {
  return page.locator(
    `a[data-astrobook-story-link][data-story-id="${storyId}"]`,
  )
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

    // Items matching "react" should be visible
    const reactItems = page.locator(
      '#astrobook-sidebar-tree [data-search-text*="react"]',
    )
    await expect(reactItems.first()).toBeVisible()

    // Items that don't match "react" should be hidden
    const nonReactItems = page.locator(
      '#astrobook-sidebar-tree [data-search-text]:not([data-search-text*="react"])',
    )
    for (const item of await nonReactItems.all()) {
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

  test('search query and filter survive navigating to a story', async ({
    page,
  }) => {
    await page.goto(url)
    const toggle = getSearchToggle(page)
    const input = getSearchInput(page)
    const panel = getSearchPanel(page)

    await toggle.click()
    await input.fill('counter')

    await getStoryLink(page, 'astro/astro-counter/default').click()
    await page.waitForURL('**/astro/astro-counter/default')

    await expect(panel).toHaveAttribute('data-open', '')
    await expect(toggle).toHaveAttribute('data-active', '')
    await expect(input).toHaveValue('counter')

    const nonMatching = page.locator(
      '#astrobook-sidebar-tree [data-search-text]:not([data-search-text*="counter"])',
    )
    expect(await nonMatching.count()).toBeGreaterThan(0)
    for (const item of await nonMatching.all()) {
      await expect(item).not.toBeVisible()
    }
  })

  test('open search panel with empty query stays open after navigating', async ({
    page,
  }) => {
    await page.goto(`${url}/dashboard/astro/astro-counter/default`)
    await getSearchToggle(page).click()

    await getStoryLink(page, 'astro/astro-counter/large-step').click()
    await page.waitForURL('**/astro/astro-counter/large-step')

    await expect(getSearchPanel(page)).toHaveAttribute('data-open', '')
    await expect(getSearchInput(page)).toHaveValue('')
  })

  test('closed search stays closed after navigating', async ({ page }) => {
    await page.goto(`${url}/dashboard/astro/astro-counter/default`)
    const toggle = getSearchToggle(page)
    const input = getSearchInput(page)

    await toggle.click()
    await input.fill('counter')
    await toggle.click()

    await getStoryLink(page, 'astro/astro-counter/large-step').click()
    await page.waitForURL('**/astro/astro-counter/large-step')

    await expect(getSearchPanel(page)).not.toHaveAttribute('data-open')
    await expect(input).toHaveValue('')
  })

  test('search survives a full page reload', async ({ page }) => {
    await page.goto(url)
    const toggle = getSearchToggle(page)
    const input = getSearchInput(page)

    await toggle.click()
    await input.fill('counter')

    await page.reload()

    await expect(getSearchPanel(page)).toHaveAttribute('data-open', '')
    await expect(input).toHaveValue('counter')
  })
})
