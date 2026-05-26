import { test, expect } from '@playwright/test';

test.describe('Playwright documentation', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Running ${testInfo.title}`);
    await page.goto('/');
  });

  test.afterEach(async ({ page }, testInfo) => {
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

    if (testInfo.status !== testInfo.expectedStatus) {
      console.log(`Unexpected result on ${page.url()}`);
    }
  });

  test('shows product title', async ({ page }) => {
    await test.step('Check page title', async () => {
      await expect(page).toHaveTitle(/Playwright/);
    });
  });

  test('opens installation guide from get started link', async ({ page }) => {
    await test.step('Open Get started page', async () => {
      await page.getByRole('link', { name: 'Get started' }).click();
    });

    await test.step('Check installation heading', async () => {
      await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
    });
  });
});
