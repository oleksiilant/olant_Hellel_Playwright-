import { Locator, Page } from '@playwright/test';

export default class LoginForm {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get form(): Locator {
    return this.page.locator('.modal-content');
  }

  get emailInput(): Locator {
    return this.form.locator('input[name="email"]');
  }

  get passwordInput(): Locator {
    return this.form.locator('input[name="password"]');
  }

  get loginButton(): Locator {
    return this.form.getByRole('button', { name: 'Login' });
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
