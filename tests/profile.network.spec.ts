import ProfilePage from '../src/pages/ProfilePage';
import { test, expect } from './fixtures/userGaragePage.fixture';

test.describe('Profile network', () => {
  test('shows mocked profile data', async ({ page }) => {
    const profilePage = new ProfilePage(page);
    const mockedProfile = {
      status: 'ok',
      data: {
        userId: 1,
        photoFilename: 'default-user.png',
        name: 'Alex',
        lastName: 'Network',
      },
    };

    await page.route('**/api/users/profile', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockedProfile),
      });
    });

    await profilePage.open();

    await expect(profilePage.title).toBeVisible();
    await expect(profilePage.fullName).toHaveText(`${mockedProfile.data.name} ${mockedProfile.data.lastName}`);
  });
});
