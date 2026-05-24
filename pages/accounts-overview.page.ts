import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class AccountsOverviewPage extends BasePage {
  private readonly totalBalanceCell = this.page
    .locator('#accountTable tbody tr')
    .filter({ hasText: 'Total' })
    .locator('td')
    .nth(1);

  constructor(page: Page) {
    super(page);
  }

  async getTotalBalance(): Promise<string> {
    return ((await this.totalBalanceCell.textContent()) ?? '').trim();
  }

  async logTotalBalance(): Promise<string> {
    const balance = await this.getTotalBalance();
    console.log(`Post-login total balance: ${balance}`);
    return balance;
  }
}
