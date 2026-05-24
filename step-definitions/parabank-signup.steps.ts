import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { RegisterPage } from '../pages/register.page';
import { AccountsOverviewPage } from '../pages/accounts-overview.page';
import { CustomerData, generateCustomerData } from '../utils/test-data';

const { Given, When, Then } = createBdd();

let customer: CustomerData;
let homePage: HomePage;
let registerPage: RegisterPage;
let accountsOverviewPage: AccountsOverviewPage;

function initPageObjects(page: import('@playwright/test').Page): void {
  homePage = new HomePage(page);
  registerPage = new RegisterPage(page);
  accountsOverviewPage = new AccountsOverviewPage(page);
}

Given('I am on the ParaBank home page', async ({ page }) => {
  initPageObjects(page);
  await homePage.open();
});

When('I register with valid customer details', async ({ page }) => {
  customer = generateCustomerData();
  await homePage.goToRegister();
  await registerPage.registerCustomer(customer);
});

Then('I should see the account created confirmation', async ({ page }) => {
  await expect(page).toHaveTitle(/Customer Created/);
  await expect(registerPage.getWelcomeHeading(customer.username)).toBeVisible();
});

Given('I have registered a new account', async ({ page }) => {
  if (!homePage) initPageObjects(page);
  customer = generateCustomerData();
  await homePage.goToRegister();
  await registerPage.registerCustomer(customer);
  await expect(page).toHaveTitle(/Customer Created/);
});

Given('I am logged out', async ({ page }) => {
  if (!homePage) initPageObjects(page);
  await homePage.logout();
  await homePage.open();
});

When('I sign in with my registered credentials', async ({ page }) => {
  if (!homePage) initPageObjects(page);
  await homePage.login(customer.username, customer.password);
  await page.waitForURL(/overview\.htm/);
});

Then('I should be redirected to the accounts overview page', async ({ page }) => {
  await expect(page).toHaveURL(/overview\.htm/);
  await expect(page).toHaveTitle(/Accounts Overview/);
});

Then('I should see my total account balance displayed', async () => {
  const balance = await accountsOverviewPage.getTotalBalance();
  expect(balance).toMatch(/^\$[\d,]+\.\d{2}$/);
});

Then('the total balance should be logged to the console', async ({ page }) => {
  const balance = await accountsOverviewPage.logTotalBalance();
  await page.screenshot({
    path: 'proof-of-execution/post-login-balance.png',
    fullPage: true,
  });
  expect(balance.length).toBeGreaterThan(0);
});
