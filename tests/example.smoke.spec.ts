import { test, expect } from '@playwright/test';

test.describe('QAuto smoke checks', () => {
  test('loads home page', async ({ page }) => {
    await test.step('Open home page', async () => {
      await page.goto('/');
    });

    await test.step('Verify auth buttons', async () => {
      await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Sign up' })).toBeVisible();
    });
  });
});
