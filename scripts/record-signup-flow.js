const fs = require('fs');
const path = require('path');
const { chromium } = require('@playwright/test');

async function run() {
  const outputDir = path.join(__dirname, '..', 'proof-of-execution');
  fs.mkdirSync(outputDir, { recursive: true });

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    recordVideo: {
      dir: outputDir,
      size: { width: 1280, height: 720 },
    },
    viewport: { width: 1280, height: 720 },
  });

  const page = await context.newPage();
  const timestamp = Date.now();
  const username = `user_${timestamp}`;
  const password = 'Pass123!';
  const ssn = `${100 + (timestamp % 899)}-${10 + (timestamp % 89)}-${1000 + (timestamp % 8999)}`;

  await page.goto('https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC');
  await page.getByRole('link', { name: 'Register' }).click();

  await page.locator('input[name="customer.firstName"]').fill('John');
  await page.locator('input[name="customer.lastName"]').fill('Doe');
  await page.locator('input[name="customer.address.street"]').fill('123 Main St');
  await page.locator('input[name="customer.address.city"]').fill('Anytown');
  await page.locator('input[name="customer.address.state"]').fill('CA');
  await page.locator('input[name="customer.address.zipCode"]').fill('90210');
  await page.locator('input[name="customer.phoneNumber"]').fill('555-123-4567');
  await page.locator('input[name="customer.ssn"]').fill(ssn);
  await page.locator('input[name="customer.username"]').fill(username);
  await page.locator('input[name="customer.password"]').fill(password);
  await page.locator('input[name="repeatedPassword"]').fill(password);
  await page.locator('input[value="Register"]').click();

  await page.getByRole('link', { name: 'Log Out' }).click();
  await page.goto('https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC');
  await page.locator('form[name="login"] input[name="username"]').fill(username);
  await page.locator('form[name="login"] input[name="password"]').fill(password);
  await page.locator('form[name="login"] input[value="Log In"]').click();
  await page.waitForURL(/overview\.htm/);

  const totalBalance = (
    await page
      .locator('#accountTable tbody tr')
      .filter({ hasText: 'Total' })
      .locator('td')
      .nth(1)
      .textContent()
  )?.trim();

  console.log(`Post-login total balance: ${totalBalance}`);
  await page.screenshot({
    path: path.join(outputDir, 'post-login-balance.png'),
    fullPage: true,
  });

  const video = page.video();
  await context.close();
  await browser.close();

  if (video) {
    const recordedPath = await video.path();
    const finalPath = path.join(outputDir, 'signup-login-run.webm');
    fs.copyFileSync(recordedPath, finalPath);
    console.log(`Recording saved to: ${finalPath}`);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
