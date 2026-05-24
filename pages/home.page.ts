import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { LoginPage } from './login.page';

export class HomePage extends BasePage {
  readonly loginPage: LoginPage;

  constructor(page: Page) {
    super(page);
    this.loginPage = new LoginPage(page);
  }

  async open(): Promise<void> {
    await this.loginPage.openHome();
  }

  async goToRegister(): Promise<void> {
    await this.page.getByRole('link', { name: 'Register' }).click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.loginPage.login(username, password);
  }

  async logout(): Promise<void> {
    await this.page.getByRole('link', { name: 'Log Out' }).click();
  }
}
