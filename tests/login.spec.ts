import { test, expect, type Page } from '@playwright/test';
import { getBaseUrl, getPassword, getUsername } from '../helpers/envHelper';
import { LoginPage } from '../pages/loginPage';
import { ErrorMessages } from '../enums/errorMessage.enum';
import { DataInput } from '../enums/dataInput.enum';
import { pasteDataFromClipboard } from '../utils/utils';

test.beforeEach(async ({ page }) => {
  const baseUrl = getBaseUrl();
  await page.goto(baseUrl);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test.describe('Login feature', () => {
  test('TC_001: Verify error message when username is missing', async ({ page }) => {
    const loginPage = new LoginPage(page);  

    await loginPage.fillPasswordField("abc");
    await loginPage.loginBtn.click();

    expect(page.getByText(ErrorMessages.REQUIRED), "Verify that the error message will be displayed for the required field").toBeVisible();
  });

  test('TC_002: Verify error message when password is missing', async ({ page }) => {
    const loginPage = new LoginPage(page);  

    await loginPage.fillUsernameField("abc");
    await loginPage.loginBtn.click();

    expect(page.getByText(ErrorMessages.REQUIRED), "Verify that the error message will be displayed for the required field").toBeVisible();
  });

  test('TC_003: Verify error when both username and password fields are empty', async ({ page }) => {
    const loginPage = new LoginPage(page);  

    await loginPage.loginBtn.click();

    const requiredMessage = await page.locator(`text=${ErrorMessages.REQUIRED}`);
    const messageCount = await requiredMessage.count();

    expect(messageCount, "Verify that the error message will be displayed for the required field").toEqual(2);
  });

  test('TC_004: Verify successful login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);  

    await loginPage.login(getUsername(), getPassword());
    await expect(loginPage.upgradeBtn, "Verify that the login is successful with valid credentials").toBeVisible();
  });

  test('TC_005: Verify error message with incorrect password', async ({ page }) => {
    const loginPage = new LoginPage(page);  

    await loginPage.login(getUsername(), DataInput.INCORRECT_DATA);
    await expect(page.getByText(ErrorMessages.INVALID_CREDENTIALS), "Verify that the error message will be displayed").toBeVisible();
  });

  test('TC_006: Verify error message with incorrect username', async ({ page }) => {
    const loginPage = new LoginPage(page);  

    await loginPage.login(DataInput.INCORRECT_DATA, getPassword());
    await expect(page.getByText(ErrorMessages.INVALID_CREDENTIALS), "Verify that the error message will be displayed").toBeVisible();
  });

  test('TC_007: Verify that the system is case sensitive for the username', async ({ page }) => {
    const loginPage = new LoginPage(page);  

    await loginPage.login(getUsername().toString().toLowerCase(), getPassword().toString().toLowerCase());
    await expect(loginPage.upgradeBtn, "Verify that the login is successful with valid credentials").toBeVisible();
  });

  test('TC_008: Verify that the system prevents SQL injection', async ({ page }) => {
    const loginPage = new LoginPage(page);  

    await loginPage.login(DataInput.SQL_INJECTION, getPassword());
    await expect(page.getByText(ErrorMessages.INVALID_CREDENTIALS), "Verify that the error message will be displayed").toBeVisible();
  });

  test('TC_009: Verify the system behavior when entering a very long username', async ({ page }) => {
    const loginPage = new LoginPage(page);  

    await loginPage.login(DataInput.LONG_DATA.repeat(10), getPassword());
    await expect(page.getByText(ErrorMessages.INVALID_CREDENTIALS), "Verify that the error message will be displayed").toBeVisible();
  });

  test('TC_010: Verify the system behavior when entering a very long password', async ({ page }) => {
    const loginPage = new LoginPage(page);  

    await loginPage.login(getUsername(), DataInput.LONG_DATA.repeat(10));
    await expect(page.getByText(ErrorMessages.INVALID_CREDENTIALS), "Verify that the error message will be displayed").toBeVisible();
  });

  test('TC_011: Verify login works with leading/trailing spaces', async ({ page }) => {
    const loginPage = new LoginPage(page);  

    const usernameWithSpace = ` ${getUsername()} `;
    const passwordWithSpace = ` ${getPassword()} `;

    await loginPage.login(usernameWithSpace, passwordWithSpace);
    await expect(page.getByText(ErrorMessages.INVALID_CREDENTIALS), "Verify that the error message will be displayed").toBeVisible();
  });

  test('TC_012: Verify if special characters are handled properly', async ({ page }) => {
    const loginPage = new LoginPage(page);  

    await loginPage.login(DataInput.SPECIAL_CHARACTERS, getPassword());
    await expect(page.getByText(ErrorMessages.INVALID_CREDENTIALS), "Verify that the error message will be displayed").toBeVisible();
  });

  test('TC_013: Verify if username/password fields allow pasting', async ({ page }) => {
    const loginPage = new LoginPage(page);  

    await loginPage.usernameInput.focus();
    await pasteDataFromClipboard(page, getUsername());

    await loginPage.passwordInput.focus();
    await pasteDataFromClipboard(page, getPassword());

    await loginPage.loginBtn.click();

    await expect(loginPage.upgradeBtn, "Verify that the login is successful with valid credentials").toBeVisible();
  });

  test('TC_015: Verify that the password field hides typed characters', async ({ page }) => {
    const loginPage = new LoginPage(page);  

    await loginPage.fillPasswordField(DataInput.SPECIAL_CHARACTERS);
    const passwordInputType = await loginPage.passwordInput.getAttribute('type');

    expect(passwordInputType, "Verify that the password field should mask the input as password").toBe('password');
  });

  test('TC_016: Verify that user can use Enter key to submit the login form', async ({ page }) => {
    const loginPage = new LoginPage(page);  

    await loginPage.fillUsernameField(getUsername());
    await loginPage.fillPasswordField(getPassword());
    await page.keyboard.press('Enter');

    await expect(loginPage.upgradeBtn, "Verify that the login is successful with valid credentials").toBeVisible();
  });
});