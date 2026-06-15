import { test, expect } from '@playwright/test';
import HomePage from '../../src/pages/HomePage';

const authFile = 'playwright/.auth/user.json';
const userEmail = process.env.USER_EMAIL;
const userPassword = process.env.USER_PASSWORD || 'Password1';

test('login and save storage state', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.open();

  if (userEmail) {
    const loginForm = await homePage.openLoginForm();

    await loginForm.login(userEmail, userPassword);
  } else {
    const registrationForm = await homePage.openRegistrationForm();
    const email = `aqa-fixtures-${Date.now()}@test.com`;

    await registrationForm.fillRegistrationForm('Alex', 'Lant', email, userPassword, userPassword);
    await registrationForm.register();
  }

  await expect(page).toHaveURL(/.*\/panel\/garage/);
  await page.context().storageState({ path: authFile });
});
