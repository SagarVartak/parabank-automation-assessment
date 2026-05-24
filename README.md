# ParaBank Automation Assessment

End-to-end automation for the **ParaBank sign-up and login flow**, built with **Playwright**, **BDD (Gherkin)**, and the **Page Object Model (POM)**.

## Assessment Objective

Automate creating an account on [ParaBank](https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC), sign in with that account, and log the balance displayed after login.

## Deliverables

| Deliverable | Location |
|-------------|----------|
| Test cases (Excel) | [`docs/ParaBank_Test_Cases.xlsx`](docs/ParaBank_Test_Cases.xlsx) |
| BDD feature files | [`features/parabank-signup.feature`](features/parabank-signup.feature) |
| Automation code (POM + steps) | [`pages/`](pages/), [`step-definitions/`](step-definitions/) |
| Proof of execution | [`proof-of-execution/`](proof-of-execution/) |

## Tech Stack

- **Framework:** [Playwright](https://playwright.dev/)
- **BDD:** [playwright-bdd](https://github.com/vitalets/playwright-bdd) (Gherkin/Cucumber syntax)
- **Design pattern:** Page Object Model
- **Language:** TypeScript

## Project Structure

```
├── docs/
│   └── ParaBank_Test_Cases.xlsx    # Test case documentation (Excel)
├── features/
│   ├── parabank-signup.feature     # Sign-up BDD scenarios
│   └── parabank-login.feature      # Login BDD scenarios
├── pages/                          # Page Object Model
│   ├── base.page.ts
│   ├── home.page.ts
│   ├── login.page.ts
│   ├── register.page.ts
│   └── accounts-overview.page.ts
├── step-definitions/
│   ├── parabank-signup.steps.ts
│   └── parabank-login.steps.ts
├── utils/
│   └── test-data.ts                # Test data generator
├── proof-of-execution/             # Screenshots from test runs
├── scripts/
│   └── generate-test-cases-excel.js
├── playwright.config.ts
└── package.json
```

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- npm

## Setup

```bash
# Install dependencies
npm install

# Install Playwright browsers (first time only)
npx playwright install chromium

# Generate BDD test files from feature files
npm run bddgen

# Generate Excel test cases workbook
npm run generate:test-cases
```

## Running Tests

```bash
# Run all automated BDD scenarios (Chromium)
npm test

# Run with visible browser
npm run test:headed

# Open HTML report after run
npm run report
```

## BDD Scenarios

Scenarios are defined in Gherkin format:

```gherkin
Scenario: View and log total balance after sign in
  Given I have registered a new account
  And I am logged out
  When I sign in with my registered credentials
  Then I should see my total account balance displayed
  And the total balance should be logged to the console
```

## Proof of Execution

After a successful test run, check:

- **Console output:** `Post-login total balance: $515.50`
- **Screenshot:** `proof-of-execution/post-login-balance.png`
- **HTML report:** `playwright-report/index.html`

## Author

ParaBank Automation Assessment
