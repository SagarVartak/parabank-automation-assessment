import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
const { Given, When, Then } = createBdd();

let homePage: HomePage;
let loginPage: LoginPage;

Given('I am on the ParaBank login page', async ({ page }) => {
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
  await loginPage.openHome();
});

When(
  'I attempt to sign in with username {string} and password {string}',
  async ({ page }, username: string, password: string) => {
    await loginPage.login(username, password);
    await page.waitForLoadState('networkidle');
  },
);

Then('I should see the login error {string}', async ({ page }, expectedError: string) => {
  await expect(page.locator('#rightPanel .error')).toContainText(expectedError);
});

Then('I should remain on the login page', async ({ page }) => {
  await expect(page.locator('form[name="login"]')).toBeVisible();
  await expect(page).toHaveURL(/login\.htm|index\.htm/);
});

Then('the customer login form should be displayed', async () => {
  expect(await loginPage.isLoginFormVisible()).toBe(true);
});

Then('the register link should be visible', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'Register' })).toBeVisible();
});

When('I click the forgot login info link', async () => {
  await loginPage.goToForgotLogin();
});

Then('I should be on the customer lookup page', async ({ page }) => {
  await expect(page).toHaveURL(/lookup\.htm/);
  await expect(page).toHaveTitle(/Customer Lookup/);
});

When('I log out from my account', async () => {
  await homePage.logout();
});
