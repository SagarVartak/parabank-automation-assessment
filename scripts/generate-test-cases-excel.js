/**
 * Generates the ParaBank test cases Excel workbook for the assessment deliverable.
 * Run: node scripts/generate-test-cases-excel.js
 */
const ExcelJS = require('exceljs');
const path = require('path');

const testCases = [
  {
    id: 'TC-001',
    name: 'Register new account with valid details',
    feature: 'ParaBank Sign Up and Login',
    scenario: 'Register a new account successfully',
    priority: 'High',
    type: 'Functional',
    preconditions: 'User is on ParaBank home page (JDBC connection)',
    steps:
      '1. Click Register\n2. Fill all mandatory fields with valid data\n3. Click Register button',
    expectedResult: 'Account created; title "Customer Created"; welcome heading shown',
    bddGiven: 'I am on the ParaBank home page',
    bddWhen: 'I register with valid customer details',
    bddThen: 'I should see the account created confirmation',
    automated: 'Yes',
  },
  {
    id: 'TC-002',
    name: 'Sign in with newly created credentials',
    feature: 'ParaBank Sign Up and Login',
    scenario: 'Sign in with newly created credentials',
    priority: 'High',
    type: 'Functional',
    preconditions: 'User has registered account and is logged out',
    steps: '1. Open home page\n2. Enter username and password\n3. Click Log In',
    expectedResult: 'Redirected to Accounts Overview page',
    bddGiven: 'I have registered a new account; I am logged out',
    bddWhen: 'I sign in with my registered credentials',
    bddThen: 'I should be redirected to the accounts overview page',
    automated: 'Yes',
  },
  {
    id: 'TC-003',
    name: 'View and log total balance after sign in',
    feature: 'ParaBank Sign Up and Login',
    scenario: 'View and log total balance after sign in',
    priority: 'High',
    type: 'Functional',
    preconditions: 'User can sign in successfully',
    steps: '1. Register and sign in\n2. Verify balance table\n3. Log total to console',
    expectedResult: 'Balance shown in $X.XX format and logged (e.g. $515.50)',
    bddGiven: 'I have registered a new account; I am logged out',
    bddWhen: 'I sign in with my registered credentials',
    bddThen: 'Balance displayed and logged to console',
    automated: 'Yes',
  },
  {
    id: 'TC-004',
    name: 'Login fails with invalid credentials',
    feature: 'ParaBank Customer Login',
    scenario: 'Login fails with invalid credentials',
    priority: 'High',
    type: 'Negative',
    preconditions: 'User is on login page',
    steps: '1. Enter invalid username/password\n2. Click Log In',
    expectedResult: 'Error: "The username and password could not be verified"',
    bddGiven: 'I am on the ParaBank login page',
    bddWhen: 'I attempt to sign in with invalid credentials',
    bddThen: 'Login error shown; user remains on login page',
    automated: 'Yes',
  },
  {
    id: 'TC-005',
    name: 'Login fails with empty username',
    feature: 'ParaBank Customer Login',
    scenario: 'Login fails with empty username',
    priority: 'Medium',
    type: 'Negative',
    preconditions: 'User is on login page',
    steps: '1. Leave username empty\n2. Enter password\n3. Click Log In',
    expectedResult: 'Error: "Please enter a username and password."',
    bddGiven: 'I am on the ParaBank login page',
    bddWhen: 'I attempt to sign in with empty username',
    bddThen: 'Login error shown; user remains on login page',
    automated: 'Yes',
  },
  {
    id: 'TC-006',
    name: 'Login fails with empty password',
    feature: 'ParaBank Customer Login',
    scenario: 'Login fails with empty password',
    priority: 'Medium',
    type: 'Negative',
    preconditions: 'User is on login page',
    steps: '1. Enter username\n2. Leave password empty\n3. Click Log In',
    expectedResult: 'Error: "Please enter a username and password."',
    bddGiven: 'I am on the ParaBank login page',
    bddWhen: 'I attempt to sign in with empty password',
    bddThen: 'Login error shown; user remains on login page',
    automated: 'Yes',
  },
  {
    id: 'TC-007',
    name: 'Login form visible on home page',
    feature: 'ParaBank Customer Login',
    scenario: 'Login form is visible on the home page',
    priority: 'Medium',
    type: 'UI',
    preconditions: 'User opens ParaBank home page',
    steps: '1. Navigate to home page\n2. Observe login panel',
    expectedResult: 'Login form and Register link are visible',
    bddGiven: 'I am on the ParaBank login page',
    bddWhen: 'N/A',
    bddThen: 'Login form and register link should be displayed',
    automated: 'Yes',
  },
  {
    id: 'TC-008',
    name: 'Navigate to forgot login information',
    feature: 'ParaBank Customer Login',
    scenario: 'User can navigate to forgot login information',
    priority: 'Low',
    type: 'Functional',
    preconditions: 'User is on login page',
    steps: '1. Click "Forgot login info?" link',
    expectedResult: 'Customer Lookup page opens',
    bddGiven: 'I am on the ParaBank login page',
    bddWhen: 'I click the forgot login info link',
    bddThen: 'I should be on the customer lookup page',
    automated: 'Yes',
  },
  {
    id: 'TC-009',
    name: 'Logout returns user to login page',
    feature: 'ParaBank Customer Login',
    scenario: 'Logout returns user to the login page',
    priority: 'High',
    type: 'Functional',
    preconditions: 'User is signed in',
    steps: '1. Register and sign in\n2. Click Log Out',
    expectedResult: 'Login form is displayed again',
    bddGiven: 'Registered account; logged out; signed in again',
    bddWhen: 'I log out from my account',
    bddThen: 'Customer login form should be displayed',
    automated: 'Yes',
  },
  {
    id: 'TC-010',
    name: 'Registration fails when username is empty',
    feature: 'ParaBank Sign Up and Login',
    scenario: 'Manual negative test',
    priority: 'Medium',
    type: 'Negative',
    preconditions: 'User is on registration page',
    steps: '1. Fill all fields except username\n2. Click Register',
    expectedResult: 'Validation error "Username is required"',
    bddGiven: 'N/A',
    bddWhen: 'N/A',
    bddThen: 'N/A',
    automated: 'No',
  },
];

async function main() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'ParaBank Automation Assessment';
  workbook.created = new Date();

  const sheet = workbook.addWorksheet('Test Cases', {
    views: [{ state: 'frozen', ySplit: 1 }],
  });

  const headers = [
    'Test Case ID',
    'Test Case Name',
    'Feature',
    'Scenario',
    'Priority',
    'Test Type',
    'Preconditions',
    'Test Steps',
    'Expected Result',
    'BDD - Given',
    'BDD - When',
    'BDD - Then',
    'Automated',
  ];

  sheet.addRow(headers);
  const headerRow = sheet.getRow(1);
  headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF2F5496' },
  };
  headerRow.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
  headerRow.height = 28;

  testCases.forEach((tc) => {
    sheet.addRow([
      tc.id,
      tc.name,
      tc.feature,
      tc.scenario,
      tc.priority,
      tc.type,
      tc.preconditions,
      tc.steps,
      tc.expectedResult,
      tc.bddGiven,
      tc.bddWhen,
      tc.bddThen,
      tc.automated,
    ]);
  });

  sheet.columns = [
    { width: 12 },
    { width: 38 },
    { width: 28 },
    { width: 38 },
    { width: 10 },
    { width: 12 },
    { width: 36 },
    { width: 42 },
    { width: 42 },
    { width: 32 },
    { width: 32 },
    { width: 42 },
    { width: 12 },
  ];

  sheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      row.alignment = { vertical: 'top', wrapText: true };
    }
  });

  const summary = workbook.addWorksheet('Summary');
  summary.addRow(['ParaBank Automation Assessment - Test Cases']);
  summary.addRow(['Application URL', 'https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC']);
  summary.addRow(['Framework', 'Playwright + playwright-bdd (Gherkin)']);
  summary.addRow(['Design Pattern', 'Page Object Model (POM)']);
  summary.addRow(['Total Test Cases', testCases.length]);
  summary.addRow(['Automated', testCases.filter((t) => t.automated === 'Yes').length]);
  summary.addRow(['Manual', testCases.filter((t) => t.automated === 'No').length]);
  summary.getColumn(1).width = 22;
  summary.getColumn(2).width = 70;

  const outPath = path.join(__dirname, '..', 'docs', 'ParaBank_Test_Cases.xlsx');
  await workbook.xlsx.writeFile(outPath);
  console.log(`Test cases workbook written to: ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
