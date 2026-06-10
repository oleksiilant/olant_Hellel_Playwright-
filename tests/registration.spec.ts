import { test, expect } from '@playwright/test';

test.use({
  httpCredentials: {
    username: 'guest',
    password: 'welcome2qauto',
  },
});

test.describe('Registration form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://qauto.forstudy.space/');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await expect(page.getByText('Registration')).toBeVisible();
  });

  test('registers a new user with valid data', async ({ page }) => {
    const form = page.locator('.modal-content');
    const email = `aqa-${Date.now()}@test.com`;

    await form.locator('input[name="name"]').fill('Alex');
    await form.locator('input[name="lastName"]').fill('Lant');
    await form.locator('input[name="email"]').fill(email);
    await form.locator('input[name="password"]').fill('Password1');
    await form.locator('input[name="repeatPassword"]').fill('Password1');

    await expect(form.getByRole('button', { name: 'Register' })).toBeEnabled();
    await form.getByRole('button', { name: 'Register' }).click();

    await expect(page).toHaveURL(/.*\/panel\/garage/);
    await expect(page.getByRole('heading', { name: 'Garage' })).toBeVisible();
  });

  test('shows required errors for empty fields', async ({ page }) => {
    const form = page.locator('.modal-content');

    await form.locator('input[name="name"]').focus();
    await form.locator('input[name="name"]').blur();
    await form.locator('input[name="lastName"]').focus();
    await form.locator('input[name="lastName"]').blur();
    await form.locator('input[name="email"]').focus();
    await form.locator('input[name="email"]').blur();
    await form.locator('input[name="password"]').focus();
    await form.locator('input[name="password"]').blur();
    await form.locator('input[name="repeatPassword"]').focus();
    await form.locator('input[name="repeatPassword"]').blur();

    await expect(form.getByText('Name required', { exact: true })).toBeVisible();
    await expect(form.getByText('Last name required', { exact: true })).toBeVisible();
    await expect(form.getByText('Email required', { exact: true })).toBeVisible();
    await expect(form.getByText('Password required', { exact: true })).toBeVisible();
    await expect(form.getByText('Re-enter password required', { exact: true })).toBeVisible();
    await expect(form.getByRole('button', { name: 'Register' })).toBeDisabled();
  });

  test('shows error when name has invalid characters', async ({ page }) => {
    const form = page.locator('.modal-content');
    const nameInput = form.locator('input[name="name"]');

    await nameInput.fill('Alex1');
    await nameInput.blur();

    await expect(form.getByText('Name is invalid')).toBeVisible();
    await expect(nameInput).toHaveClass(/is-invalid/);
    await expect(form.getByRole('button', { name: 'Register' })).toBeDisabled();
  });

  test('shows error when last name is too short', async ({ page }) => {
    const form = page.locator('.modal-content');
    const lastNameInput = form.locator('input[name="lastName"]');

    await lastNameInput.fill('L');
    await lastNameInput.blur();

    await expect(form.getByText('Last name has to be from 2 to 20 characters long')).toBeVisible();
    await expect(lastNameInput).toHaveClass(/is-invalid/);
    await expect(form.getByRole('button', { name: 'Register' })).toBeDisabled();
  });

  test('shows error when email is incorrect', async ({ page }) => {
    const form = page.locator('.modal-content');
    const emailInput = form.locator('input[name="email"]');

    await emailInput.fill('aqa-wrong-email');
    await emailInput.blur();

    await expect(form.getByText('Email is incorrect')).toBeVisible();
    await expect(emailInput).toHaveClass(/is-invalid/);
    await expect(form.getByRole('button', { name: 'Register' })).toBeDisabled();
  });

  test('shows error when password does not meet requirements', async ({ page }) => {
    const form = page.locator('.modal-content');
    const passwordInput = form.locator('input[name="password"]');

    await passwordInput.fill('password');
    await passwordInput.blur();

    await expect(
      form.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
    ).toBeVisible();
    await expect(passwordInput).toHaveClass(/is-invalid/);
    await expect(form.getByRole('button', { name: 'Register' })).toBeDisabled();
  });

  test('shows error when passwords do not match', async ({ page }) => {
    const form = page.locator('.modal-content');
    const repeatPasswordInput = form.locator('input[name="repeatPassword"]');

    await form.locator('input[name="password"]').fill('Password1');
    await repeatPasswordInput.fill('Password2');
    await repeatPasswordInput.blur();

    await expect(form.getByText('Passwords do not match')).toBeVisible();
    await expect(repeatPasswordInput).toHaveClass(/is-invalid/);
    await expect(form.getByRole('button', { name: 'Register' })).toBeDisabled();
  });
});
