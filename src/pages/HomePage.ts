import { Page } from '@playwright/test';
import BasePage from './BasePage';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';

export default class HomePage extends BasePage {
  constructor(page: Page) {
    super(page, '/');
  }

  async openRegistrationForm() {
    await this.page.getByRole('button', { name: 'Sign up' }).click();
    return new RegistrationForm(this.page);
  }

  async openLoginForm() {
    await this.page.getByRole('button', { name: 'Sign in' }).click();
    return new LoginForm(this.page);
  }
}
