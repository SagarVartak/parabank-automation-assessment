import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  private readonly loginForm: Locator;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.loginForm = page.locator('form[name="login"]');
    this.usernameInput = this.loginForm.locator('input[name="username"]');
    this.passwordInput = this.loginForm.locator('input[name="password"]');
    this.loginButton = this.loginForm.locator('input[value="Log In"]');
  }

  async openHome(): Promise<void> {
    await this.navigate('index.htm?ConnType=JDBC');
  }

  async isLoginFormVisible(): Promise<boolean> {
    return this.loginForm.isVisible();
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async submitEmptyLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<string> {
    return (await this.page.locator('#rightPanel .error').textContent()) ?? '';
  }

  async goToForgotLogin(): Promise<void> {
    await this.page.getByRole('link', { name: 'Forgot login info?' }).click();
  }
}
