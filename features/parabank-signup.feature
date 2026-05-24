@parabank @signup
Feature: ParaBank Sign Up and Login
  As a new ParaBank customer
  I want to register for online banking and sign in
  So that I can view my account balance

  Background:
    Given I am on the ParaBank home page

  @smoke @TC-001
  Scenario: Register a new account successfully
    When I register with valid customer details
    Then I should see the account created confirmation

  @smoke @TC-002
  Scenario: Sign in with newly created credentials
    Given I have registered a new account
    And I am logged out
    When I sign in with my registered credentials
    Then I should be redirected to the accounts overview page

  @smoke @TC-003
  Scenario: View and log total balance after sign in
    Given I have registered a new account
    And I am logged out
    When I sign in with my registered credentials
    Then I should see my total account balance displayed
    And the total balance should be logged to the console
