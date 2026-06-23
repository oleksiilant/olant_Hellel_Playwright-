import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class ProfilePage extends BasePage {
  constructor(page: Page) {
    super(page, '/panel/profile');
  }

  get fullName(): Locator {
    return this.page.locator('.profile_name');
  }

  get title(): Locator {
    return this.page.getByRole('heading', { name: 'Profile' });
  }
}
