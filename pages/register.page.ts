import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { CustomerData } from '../utils/test-data';

export class RegisterPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.navigate('register.htm');
  }

  async registerCustomer(data: CustomerData): Promise<void> {
    await this.page.locator('input[name="customer.firstName"]').fill(data.firstName);
    await this.page.locator('input[name="customer.lastName"]').fill(data.lastName);
    await this.page.locator('input[name="customer.address.street"]').fill(data.street);
    await this.page.locator('input[name="customer.address.city"]').fill(data.city);
    await this.page.locator('input[name="customer.address.state"]').fill(data.state);
    await this.page.locator('input[name="customer.address.zipCode"]').fill(data.zipCode);
    await this.page.locator('input[name="customer.phoneNumber"]').fill(data.phone);
    await this.page.locator('input[name="customer.ssn"]').fill(data.ssn);
    await this.page.locator('input[name="customer.username"]').fill(data.username);
    await this.page.locator('input[name="customer.password"]').fill(data.password);
    await this.page.locator('input[name="repeatedPassword"]').fill(data.password);
    await this.page.locator('input[value="Register"]').click();
  }

  getWelcomeHeading(username: string) {
    return this.page.getByRole('heading', { name: `Welcome ${username}` });
  }
}
