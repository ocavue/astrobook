import { test, expect, type Page } from '@playwright/test'

import { EXAMPLE_URLS } from '../example-urls'

const BASE_URL = EXAMPLE_URLS['example-pandacss']

// For unknown reasons, this test fails on Windows.
test.skip(process.platform === 'win32', 'Skip on Windows')

async function locateButtonStory(page: Page, storyName: string) {
  await page.goto(BASE_URL)
  const button = page.locator('a', { hasText: storyName })
  await expect(button).toBeVisible()
  await button.click()

  await page.waitForURL(
    `${BASE_URL}/dashboard/button/${storyName.toLowerCase()}`,
  )
}

async function checkButtonVariantStyles(
  page: Page,
  name: string,
  color: string,
  backgroundColor: string,
  hoverBackgroundColor: string,
) {
  const button = page.locator('button', { hasText: name })
  await expect(button).toBeVisible()
  await expect(button).toHaveClass(/button/)
  await expect(button).toHaveClass(/button--size_md/)
  await expect(button).toHaveClass(
    new RegExp(`button--variant_${name.toLowerCase()}`),
  )

  await expect(button).toHaveCSS('color', color)
  await expect(button).toHaveCSS('background-color', backgroundColor)
  const { width = 0, height = 0 } = (await button.boundingBox()) || {}
  await button.hover({ position: { x: width / 2, y: height / 2 } })
  await expect(button).toHaveCSS('background-color', hoverBackgroundColor)
}

test('pandacss example', async ({ page }) => {
  await test.step('Select the solid button story', async () => {
    await locateButtonStory(page, 'Solid')
  })

  await test.step('Check the solid button styles', async () => {
    await checkButtonVariantStyles(
      page,
      'Solid',
      'rgb(255, 255, 255)',
      'rgb(233, 61, 130)',
      'rgb(223, 52, 120)',
    )
  })

  await test.step('Select the link button story', async () => {
    await locateButtonStory(page, 'Link')
  })

  await test.step('Check the link button styles', async () => {
    await checkButtonVariantStyles(
      page,
      'Link',
      'rgb(28, 32, 36)',
      'rgba(0, 0, 0, 0)',
      'rgba(0, 0, 0, 0)',
    )
  })

  await test.step('Select the outline button story', async () => {
    await locateButtonStory(page, 'Outline')
  })

  await test.step('Check the outline button styles', async () => {
    await checkButtonVariantStyles(
      page,
      'Outline',
      'rgb(28, 32, 36)',
      'rgba(0, 0, 0, 0)',
      'rgba(0, 0, 85, 0.024)',
    )
  })

  await test.step('Select the subtle button story', async () => {
    await locateButtonStory(page, 'Subtle')
  })

  await test.step('Check the subtle button styles', async () => {
    await checkButtonVariantStyles(
      page,
      'Subtle',
      'rgb(28, 32, 36)',
      'rgba(0, 0, 51, 0.06)',
      'rgba(0, 0, 45, 0.09)',
    )
  })

  await test.step('Select the ghost button story', async () => {
    await locateButtonStory(page, 'Ghost')
  })

  await test.step('Check the ghost button styles', async () => {
    await checkButtonVariantStyles(
      page,
      'Ghost',
      'rgb(28, 32, 36)',
      'rgba(0, 0, 0, 0)',
      'rgba(0, 0, 51, 0.06)',
    )
  })
})
