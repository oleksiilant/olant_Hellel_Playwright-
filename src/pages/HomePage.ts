import { Page } from '@playwright/test';
import BasePage from './BasePage';
import RegistrationForm from '../components/RegistrationForm';

export default class HomePage extends BasePage {
  constructor(page: Page) {
    super(page, 'https://qauto.forstudy.space/');
  }

  async openRegistrationForm() {
    await this.page.getByRole('button', { name: 'Sign up' }).click();
    return new RegistrationForm(this.page);
  }
}
