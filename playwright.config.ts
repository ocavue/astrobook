import { defineConfig, devices } from '@playwright/test'

import { EXAMPLE_URLS } from './tests/example-urls'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* The maximum number of retry attempts */
  retries: process.env.CI ? 4 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        launchOptions: {
          firefoxUserPrefs: {
            // Workaround for Firefox not being able to hover on buttons on
            // Linux. See also:
            // https://github.com/microsoft/playwright/issues/7769
            'ui.primaryPointerCapabilities': 0x02 | 0x04,
            'ui.allPointerCapabilities': 0x02 | 0x04,
          },
        },
      },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ].filter((project) => {
    if (process.env.CI) {
      return true
    }
    return project.name === 'chromium'
  }),

  /* Run your local dev server before starting the tests */
  webServer: Object.entries(EXAMPLE_URLS).map(([name, url]) => ({
    command:
      process.env.ASTROBOOK_TEST_MODE === 'preview'
        ? `pnpm run --filter ${name} preview`
        : `pnpm run --filter ${name} dev`,
    url: url,
    reuseExistingServer: !process.env.CI,
  })),
})
