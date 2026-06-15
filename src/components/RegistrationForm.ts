import { Locator, Page } from '@playwright/test';

export default class RegistrationForm {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get form(): Locator {
    return this.page.locator('.modal-content');
  }

  get nameInput(): Locator {
    return this.form.locator('input[name="name"]');
  }

  get lastNameInput(): Locator {
    return this.form.locator('input[name="lastName"]');
  }

  get emailInput(): Locator {
    return this.form.locator('input[name="email"]');
  }

  get passwordInput(): Locator {
    return this.form.locator('input[name="password"]');
  }

  get repeatPasswordInput(): Locator {
    return this.form.locator('input[name="repeatPassword"]');
  }

  get registerButton(): Locator {
    return this.form.getByRole('button', { name: 'Register' });
  }

  async fillRegistrationForm(name: string, lastName: string, email: string, password: string, repeatPassword: string) {
    await this.nameInput.fill(name);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.repeatPasswordInput.fill(repeatPassword);
  }

  async register() {
    await this.registerButton.click();
  }

  async fillNameAndBlur(name: string) {
    await this.nameInput.fill(name);
    await this.nameInput.blur();
  }

  async fillLastNameAndBlur(lastName: string) {
    await this.lastNameInput.fill(lastName);
    await this.lastNameInput.blur();
  }

  async fillEmailAndBlur(email: string) {
    await this.emailInput.fill(email);
    await this.emailInput.blur();
  }

  async fillPasswordAndBlur(password: string) {
    await this.passwordInput.fill(password);
    await this.passwordInput.blur();
  }

  async fillRepeatPasswordAndBlur(repeatPassword: string) {
    await this.repeatPasswordInput.fill(repeatPassword);
    await this.repeatPasswordInput.blur();
  }

  async touchAllFields() {
    await this.nameInput.focus();
    await this.nameInput.blur();
    await this.lastNameInput.focus();
    await this.lastNameInput.blur();
    await this.emailInput.focus();
    await this.emailInput.blur();
    await this.passwordInput.focus();
    await this.passwordInput.blur();
    await this.repeatPasswordInput.focus();
    await this.repeatPasswordInput.blur();
  }

  errorText(text: string) {
    return this.form.getByText(text, { exact: true });
  }
}
// fik