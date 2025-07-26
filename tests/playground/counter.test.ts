import { expect, test } from '@playwright/test'

import { EXAMPLE_URLS } from '../example-urls'

const BASE_URL = EXAMPLE_URLS['example-playground']

const StoryTypes = {
  'default': 'default',
  'large-step': 'large-step',
  'red-border': 'red-border'
} as const
type StoryTypes = (typeof StoryTypes)[keyof typeof StoryTypes]

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
    for (const story of Object.values(StoryTypes)) {
      const url = `${BASE_URL}/${dir}/${framework}/${framework}-counter/${story}`
      test(url, async ({ page }) => {
        await page.goto(url)

        if (story === StoryTypes['red-border']) {
          const decorator = page.locator('[data-decorator-type=astro]')
          await expect(decorator).toHaveAttribute('style', 'border: solid 2px red;')
        }

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
        await expect(counterPre).toHaveText(story === StoryTypes['large-step'] ? '5' : '1')

        await counterSub.click()
        await expect(counterPre).toHaveText('0')
      })
    }
  }
}
