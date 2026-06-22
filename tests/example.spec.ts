import { test, expect } from '@playwright/test';

test.describe('QAuto home page', () => {
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
      await expect(page).toHaveTitle(/Hillel Qauto/);
    });
  });

  test('opens sign up form', async ({ page }) => {
    await test.step('Open Sign up form', async () => {
      await page.getByRole('button', { name: 'Sign up' }).click();
    });

    await test.step('Check registration form title', async () => {
      await expect(page.getByText('Registration')).toBeVisible();
    });
  });
});
