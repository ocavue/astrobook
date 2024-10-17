import { expect, test } from '@playwright/test'

for (const dir of ['dashboard', 'stories']) {
  for (const framework of [
    'astro',
    'lit',
    'preact',
    'react',
    'solid',
    'svelte',
    'vue',
  ]) {
    for (const story of ['default', 'large-step']) {
      const url = `http://localhost:4321/${dir}/${framework}/${framework}-counter/${story}`
      test(url, async ({ page }) => {
        await page.goto(url)

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
        await expect(counterPre).toHaveText(story === 'default' ? '1' : '5')

        await counterSub.click()
        await expect(counterPre).toHaveText('0')
      })
    }
  }
}
