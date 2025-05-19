import { Locator, Page } from '@playwright/test';

export class LoginPage {
  private page: Page;

  usernameInput: Locator;
  passwordInput: Locator;
  loginBtn: Locator;
  upgradeBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = this.page.getByPlaceholder("Username");
    this.passwordInput = this.page.getByPlaceholder("password");
    this.loginBtn = this.page.getByRole('button', {name: 'Login', exact: true});
    this.upgradeBtn = this.page.locator('role=button[name="Upgrade"]');
  }

  async fillUsernameField(data: string){
    return await this.usernameInput.fill(data);
  }

  async fillPasswordField(data: string){
    return await this.passwordInput.fill(data);
  }

  async login(username: string, password: string){
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginBtn.click()
  }
}
