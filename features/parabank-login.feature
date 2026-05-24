@parabank @login
Feature: ParaBank Customer Login
  As a ParaBank customer
  I want to sign in securely
  So that I can access my online banking account

  Background:
    Given I am on the ParaBank login page

  @smoke @TC-004
  Scenario: Login fails with invalid credentials
    When I attempt to sign in with username "invalid_user" and password "wrong_pass"
    Then I should see the login error "The username and password could not be verified"
    And I should remain on the login page

  @TC-005
  Scenario: Login fails with empty username
    When I attempt to sign in with username "" and password "somepassword"
    Then I should see the login error "Please enter a username and password."
    And I should remain on the login page

  @TC-006
  Scenario: Login fails with empty password
    When I attempt to sign in with username "someuser" and password ""
    Then I should see the login error "Please enter a username and password."
    And I should remain on the login page

  @TC-007
  Scenario: Login form is visible on the home page
    Then the customer login form should be displayed
    And the register link should be visible

  @TC-008
  Scenario: User can navigate to forgot login information
    When I click the forgot login info link
    Then I should be on the customer lookup page

  @TC-009
  Scenario: Logout returns user to the login page
    Given I have registered a new account
    And I am logged out
    When I sign in with my registered credentials
    And I log out from my account
    Then the customer login form should be displayed
