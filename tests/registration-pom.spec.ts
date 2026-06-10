import { test, expect } from '@playwright/test';
import HomePage from '../src/pages/HomePage';

test.use({
  httpCredentials: {
    username: 'guest',
    password: 'welcome2qauto',
  },
});

test.describe('Registration form with POM', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.open();
  });

  test('registers a new user with valid data', async ({ page }) => {
    const homePage = new HomePage(page);
    const registrationForm = await homePage.openRegistrationForm();
    const email = `aqa-pom-${Date.now()}@test.com`;

    // тут заповн. форму, бо треба валідний юзер
    await registrationForm.fillRegistrationForm('Alex', 'Lant', email, 'Password1', 'Password1');

    await expect(registrationForm.registerButton).toBeEnabled();
    await registrationForm.register();

    await expect(page).toHaveURL(/.*\/panel\/garage/);
    await expect(page.getByRole('heading', { name: 'Garage' })).toBeVisible();
  });

  test('shows required errors for empty fields', async ({ page }) => {
    const homePage = new HomePage(page);
    const registrationForm = await homePage.openRegistrationForm();

    // щоб показало помилки
    await registrationForm.touchAllFields();

    await expect(registrationForm.errorText('Name required')).toBeVisible();
    await expect(registrationForm.errorText('Last name required')).toBeVisible();
    await expect(registrationForm.errorText('Email required')).toBeVisible();
    await expect(registrationForm.errorText('Password required')).toBeVisible();
    await expect(registrationForm.errorText('Re-enter password required')).toBeVisible();
    await expect(registrationForm.registerButton).toBeDisabled();
  });

  test('shows error when name has invalid characters', async ({ page }) => {
    const homePage = new HomePage(page);
    const registrationForm = await homePage.openRegistrationForm();

    await registrationForm.fillNameAndBlur('Alex1');

    await expect(registrationForm.errorText('Name is invalid')).toBeVisible();
    await expect(registrationForm.nameInput).toHaveClass(/is-invalid/);
    await expect(registrationForm.registerButton).toBeDisabled();
  });

  test('shows error when last name is too short', async ({ page }) => {
    const homePage = new HomePage(page);
    const registrationForm = await homePage.openRegistrationForm();

    await registrationForm.fillLastNameAndBlur('L');

    await expect(registrationForm.errorText('Last name has to be from 2 to 20 characters long')).toBeVisible();
    await expect(registrationForm.lastNameInput).toHaveClass(/is-invalid/);
    await expect(registrationForm.registerButton).toBeDisabled();
  });

  test('shows error when email is incorrect', async ({ page }) => {
    const homePage = new HomePage(page);
    const registrationForm = await homePage.openRegistrationForm();

    await registrationForm.fillEmailAndBlur('aqa-wrong-email');

    await expect(registrationForm.errorText('Email is incorrect')).toBeVisible();
    await expect(registrationForm.emailInput).toHaveClass(/is-invalid/);
    await expect(registrationForm.registerButton).toBeDisabled();
  });

  test('shows error when password does not meet requirements', async ({ page }) => {
    const homePage = new HomePage(page);
    const registrationForm = await homePage.openRegistrationForm();

    await registrationForm.fillPasswordAndBlur('password');

    await expect(
      registrationForm.errorText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
    ).toBeVisible();
    await expect(registrationForm.passwordInput).toHaveClass(/is-invalid/);
    await expect(registrationForm.registerButton).toBeDisabled();
  });

  test('shows error when passwords do not match', async ({ page }) => {
    const homePage = new HomePage(page);
    const registrationForm = await homePage.openRegistrationForm();

    await registrationForm.passwordInput.fill('Password1');
    await registrationForm.fillRepeatPasswordAndBlur('Password2');

    await expect(registrationForm.errorText('Passwords do not match')).toBeVisible();
    await expect(registrationForm.repeatPasswordInput).toHaveClass(/is-invalid/);
    await expect(registrationForm.registerButton).toBeDisabled();
  });
});
