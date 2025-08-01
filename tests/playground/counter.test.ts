import { test } from '@playwright/test'

import { EXAMPLE_URLS } from '../example-urls'
import { testCounter } from '../helpers/counter'

const BASE_URL = EXAMPLE_URLS['example-playground']

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
      const url = `${BASE_URL}/${dir}/${framework}/${framework}-counter/${story}`
      test(url, async ({ page }) => {
        await page.goto(url)

        await testCounter(page, story === 'large-step' ? 5 : 1)
      })
    }
  }
}
