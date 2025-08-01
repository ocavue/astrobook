import { expect, type Page } from '@playwright/test'

export async function testCounter(page: Page, step: number) {
  expect(step).toBeGreaterThan(0)

  const counter = page.locator('.counter')
  await expect(counter).toBeVisible()

  const counterPre = counter.locator('pre')
  const counterAdd = counter.locator('button', { hasText: '+' })
  const counterSub = counter.locator('button', { hasText: '-' })

  await expect(counterPre).toHaveText('0')

  // Wait for the counter button to be clickable
  await expect(async () => {
    await counterAdd.click()
    await expect(counterPre).not.toHaveText('0')
  }).toPass()

  // Reset the counter
  await expect(async () => {
    await counterSub.click()
    await expect(counterPre).toHaveText('0')
  }).toPass()

  await expect(counterPre).toHaveText('0')

  await counterAdd.click()
  await expect(counterPre).toHaveText(String(step))

  await counterSub.click()
  await expect(counterPre).toHaveText('0')
}
