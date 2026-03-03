Feature: User Registration on Automation Exercise Website
  As a new user
  I want to register on the website
  So that I can create and manage my account

  Background:
    Given the browser is launched
    And the user navigates to "https://automationexercise.com/"
    And the home page is visible successfully
  @Registration
  Scenario: Successful User Registration and Account Deletion
    When the user clicks on Signup Login button
    When the user enters name "bilal12" and email "bilalteerhtsdfcft23584733@gmail.com"
    And the user clicks on Signup button
    When the user fills the account information with:
      | Title        | Mr          |
      | Password     | Test@123    |
      | Day          | 10          |
      | Month        | 5           |
      | Year         | 1995        |
      | Newsletter   | yes         |
      | Optin        | yes         |
      | FirstName    | Test        |
      | LastName     | User        |
      | Company      | ABC Company |
      | Address      | Street 1    |
      | Address2     | Area 51     |
      | Country      | India       |
      | State        | Maharashtra |
      | City         | Mumbai      |
      | Zipcode      | 400001      |
      | MobileNumber | 1234567890  |

    And the user clicks on Create Account button
    Then ACCOUNT CREATED! should be visible
    When the user clicks on Continue button
    Then Logged in as Test User should be visible
    When the user clicks on Delete Account button
    Then ACCOUNT DELETED! should be visible
    And the user clicks agin on next Continue button

  @LoginAndLogout
  Scenario: Login User with correct email and password and logout
    When the user clicks on Signup and Login button
    Then Login to your account should be visible

    When the user enters correct "engrsumra@gmail.com" and "Allison@12"
    And the user clicks on Login button
    Then Logged in as username should be visible
    When the user clicks on Logout button
    Then the user should be navigated to login page
  @ContactUs
  Scenario: Submit Contact Us form successfully

    When the user clicks on Contact Us button
    Then GET IN TOUCH should be visible
    When the user enters contact details:
      | name    | Muhammad Bilal 1         |
      | email   | bilal1@test.com          |
      | subject | Test Subject 1           |
      | message | This is a test message 1 |

    And the user uploads a file "testfile.txt"
    And the user clicks on Submit button
    And the user confirms the alert
    Then Success! Your details have been submitted successfully. should be visible
    When the user clicks on Home button

@AddProduct
  Scenario: Add two products to the cart and verify
    When the user clicks on Products button
    And the user adds the first product to cart and clicks Continue Shopping
    And the user adds the second product to cart
    And the user clicks on View Cart button
    Then both products should be visible in the cart
    And the user verifies the products prices, quantities, and total price
