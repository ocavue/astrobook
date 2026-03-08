import { test, expect, type Page } from '@playwright/test'

import { EXAMPLE_URLS } from '../example-urls'

const url = EXAMPLE_URLS['example-playground']

function getModuleDetails(page: Page, moduleId: string) {
  return page.locator(`details[data-id="module:${moduleId}"]`)
}

function getModuleSummary(page: Page, moduleId: string) {
  return page.locator(`details[data-id="module:${moduleId}"] > summary`)
}

function getDirectoryDetails(page: Page, directory: string) {
  return page.locator(`details[data-id="dir:${directory}"]`)
}

function getDirectorySummary(page: Page, directory: string) {
  return page.locator(`details[data-id="dir:${directory}"] > summary`)
}

test.describe('Module collapse', () => {
  test('modules are expanded by default', async ({ page }) => {
    await page.goto(url)
    const details = getModuleDetails(page, 'react/react-counter')
    await expect(details).toHaveAttribute('open', '')
  })

  test('clicking summary collapses module', async ({ page }) => {
    await page.goto(url)
    const details = getModuleDetails(page, 'react/react-counter')
    const summary = getModuleSummary(page, 'react/react-counter')

    await summary.click()
    await expect(details).not.toHaveAttribute('open', '')
  })

  test('clicking collapsed summary expands module', async ({ page }) => {
    await page.goto(url)
    const details = getModuleDetails(page, 'react/react-counter')
    const summary = getModuleSummary(page, 'react/react-counter')

    await summary.click()
    await expect(details).not.toHaveAttribute('open', '')

    await summary.click()
    await expect(details).toHaveAttribute('open', '')
  })

  test('collapsed state persists across navigation', async ({ page }) => {
    await page.goto(url)
    const summary = getModuleSummary(page, 'react/react-counter')
    await summary.click()

    const storyLink = page.locator('a[data-active]').first()
    if (await storyLink.count()) {
      await storyLink.click()
      await page.waitForURL('**/*')
    } else {
      const anyLink = page.locator('details[data-id="dir:astro"] a').first()
      await anyLink.click()
      await page.waitForURL('**/*')
    }

    const details = getModuleDetails(page, 'react/react-counter')
    await expect(details).not.toHaveAttribute('open', '')
  })

  test('auto-expands when it contains the active story', async ({ page }) => {
    await page.goto(`${url}/dashboard/react/react-counter/default`)
    const details = getModuleDetails(page, 'react/react-counter')
    await expect(details).toHaveAttribute('open', '')
  })

  test('keyboard toggle with Enter key', async ({ page }) => {
    await page.goto(url)
    const summary = getModuleSummary(page, 'react/react-counter')
    const details = getModuleDetails(page, 'react/react-counter')

    await summary.focus()
    await page.keyboard.press('Enter')
    await expect(details).not.toHaveAttribute('open', '')

    await page.keyboard.press('Enter')
    await expect(details).toHaveAttribute('open', '')
  })

  test('hoisted modules do not have details wrapper', async ({ page }) => {
    await page.goto(url)
    const hoistModule = page.locator('details[data-id="module:hoist/hoist"]')
    await expect(hoistModule).toHaveCount(0)
  })

  test('collapsed module children are still in the DOM', async ({ page }) => {
    await page.goto(url)
    const summary = getModuleSummary(page, 'react/react-counter')
    await summary.click()

    const stories = page.locator(
      'details[data-id="module:react/react-counter"] a',
    )
    await expect(stories).toHaveCount(2)
  })
})

test.describe('Directory collapse', () => {
  test('directories are expanded by default', async ({ page }) => {
    await page.goto(url)
    const details = getDirectoryDetails(page, 'react')
    await expect(details).toHaveAttribute('open', '')
  })

  test('clicking summary collapses directory', async ({ page }) => {
    await page.goto(url)
    const details = getDirectoryDetails(page, 'react')
    const summary = getDirectorySummary(page, 'react')

    await summary.click()
    await expect(details).not.toHaveAttribute('open', '')
  })

  test('clicking collapsed summary expands directory', async ({ page }) => {
    await page.goto(url)
    const details = getDirectoryDetails(page, 'react')
    const summary = getDirectorySummary(page, 'react')

    await summary.click()
    await expect(details).not.toHaveAttribute('open', '')

    await summary.click()
    await expect(details).toHaveAttribute('open', '')
  })

  test('collapsing one directory does not affect others', async ({ page }) => {
    await page.goto(url)
    const reactSummary = getDirectorySummary(page, 'react')
    await reactSummary.click()

    const reactDetails = getDirectoryDetails(page, 'react')
    const vueDetails = getDirectoryDetails(page, 'vue')
    await expect(reactDetails).not.toHaveAttribute('open', '')
    await expect(vueDetails).toHaveAttribute('open', '')
  })

  test('collapsed directory hides all its modules and stories', async ({
    page,
  }) => {
    await page.goto(url)
    const summary = getDirectorySummary(page, 'react')
    await summary.click()

    const content = getDirectoryDetails(page, 'react').locator(':scope > div')
    await expect(content).not.toBeVisible()
  })

  test('collapsed directory state persists across navigation', async ({
    page,
  }) => {
    await page.goto(url)
    const summary = getDirectorySummary(page, 'react')
    await summary.click()

    const anyLink = page.locator('details[data-id="dir:astro"] a').first()
    await anyLink.click()
    await page.waitForURL('**/*')

    const details = getDirectoryDetails(page, 'react')
    await expect(details).not.toHaveAttribute('open', '')
  })

  test('auto-expands when it contains the active story', async ({ page }) => {
    await page.goto(`${url}/dashboard/react/react-counter/default`)
    const details = getDirectoryDetails(page, 'react')
    await expect(details).toHaveAttribute('open', '')
  })

  test('directory collapse is independent of module collapse', async ({
    page,
  }) => {
    await page.goto(url)

    const moduleSummary = getModuleSummary(page, 'react/react-counter')
    await moduleSummary.click()

    const dirSummary = getDirectorySummary(page, 'react')
    await dirSummary.click()
    await dirSummary.click()

    const moduleDetails = getModuleDetails(page, 'react/react-counter')
    await expect(moduleDetails).not.toHaveAttribute('open', '')
  })

  test('chevron rotates when toggling', async ({ page }) => {
    await page.goto(url)
    const summary = getDirectorySummary(page, 'react')
    const chevron = page.locator(
      'details[data-id="dir:react"] > summary > [data-astrobook-chevron]',
    )

    await expect(chevron).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)')

    await summary.click()
    await expect(chevron).toHaveCSS('transform', 'matrix(0, -1, 1, 0, 0, 0)')
  })

  test('keyboard toggle with Enter key', async ({ page }) => {
    await page.goto(url)
    const summary = getDirectorySummary(page, 'react')
    const details = getDirectoryDetails(page, 'react')

    await summary.focus()
    await page.keyboard.press('Enter')
    await expect(details).not.toHaveAttribute('open', '')

    await page.keyboard.press('Enter')
    await expect(details).toHaveAttribute('open', '')
  })

  test('collapsed directory children are still in the DOM', async ({
    page,
  }) => {
    await page.goto(url)
    const summary = getDirectorySummary(page, 'react')
    await summary.click()

    const module = getModuleDetails(page, 'react/react-counter')
    await expect(module).toHaveCount(1)
  })
})
