import { test, expect } from './fixtures/userGaragePage.fixture';

test.describe('Garage with fixture', () => {
  test('opens garage page for logged in user', async ({ userGaragePage }) => {
    await expect(userGaragePage.title).toBeVisible();
    await expect(userGaragePage.addCarButton).toBeVisible();
  });
});
