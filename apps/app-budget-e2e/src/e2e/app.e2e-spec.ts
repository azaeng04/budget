import { test, expect } from '@playwright/test';

test('app-budget', async ({ page }) => {
  await page.goto('/');

  const greeting = page.locator('h1');
  await expect(greeting).toContainText('Welcome app-budget');
});
