import { test, expect } from '@playwright/test';

test.describe('Playwright smoke checks', () => {
  test('loads documentation home page', async ({ page }) => {
    await test.step('Open home page', async () => {
      await page.goto('/');
    });

    await test.step('Verify main heading', async () => {
      await expect(page.getByRole('heading', { name: /Playwright enables/ })).toBeVisible();
    });
  });
});
