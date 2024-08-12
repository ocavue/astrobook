import { expect, test } from '@playwright/test'

for (const dir of ['dashboard', 'stories']) {
  for (const framework of [
    'astro',
    'preact',
    'react',
    'solid',
    'svelte',
    'vue',
  ]) {
    for (const story of ['default', 'large-step']) {
      const path = `${dir}/${framework}/${framework}-counter/${story}`
      test(path, async ({ page }) => {
        await page.goto(`/${path}`)

        const counter = page.locator('.counter')
        const counterPre = counter.locator('pre')
        const counterAdd = counter.locator('button', { hasText: '+' })
        const counterSub = counter.locator('button', { hasText: '-' })

        await expect(counterPre).toHaveText('0')

        await counterAdd.click()
        await expect(counterPre).toHaveText(story === 'default' ? '1' : '5')

        await counterSub.click()
        await expect(counterPre).toHaveText('0')
      })
    }
  }
}
