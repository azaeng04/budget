import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration for more information
 */

const baseURL = process.env.E2E_BASE_URL || 'http://localhost:4200/';

export const config: PlaywrightTestConfig = {
  testDir: './src/e2e',
  testMatch: '*.e2e-spec.ts',
  retries: process.env.CI ? 2 : 0,
  maxFailures: 2,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  use: {
    actionTimeout: 0,
    baseURL,
    trace: 'on-first-retry',
  },
  reporter: [
    [
      'html',
      { outputFolder: '../../dist/apps/app-budget-e2e/playwright-report' },
    ],
    [
      'json',
      {
        outputFile:
          '../../dist/apps/app-budget-e2e/playwright-report/test-results.json',
      },
    ],
  ],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  workers: process.env.CI ? 1 : undefined,
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },
    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],
};

export default config;
