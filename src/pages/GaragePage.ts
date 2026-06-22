import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class GaragePage extends BasePage {
  constructor(page: Page) {
    super(page, '/panel/garage');
  }

  get title(): Locator {
    return this.page.getByRole('heading', { name: 'Garage' });
  }

  get addCarButton(): Locator {
    return this.page.getByRole('button', { name: 'Add car' });
  }
}
