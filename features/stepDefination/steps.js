const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { setDefaultTimeout } = require('@cucumber/cucumber');
const { SignUpPage } = require('../../tests/PageObject/SignUpPage');
const { LoginLogoutPage } = require('../../tests/PageObject/LoginLogoutPage');
const { ContactUs } = require('../../tests/PageObject/ContactUs');
const { AddProduct } = require('../../tests/PageObject/AddProduct');
const {VerifyProductQuantity}= require('../../tests/PageObject/VerifyProductQuantity');
const {RegisterWhileCheckout}= require('../../tests/PageObject/registerwhilecheckout');
const path = require('path');
const { TIMEOUT } = require('dns');
setDefaultTimeout(100000);

Given('the browser is launched', async function () {
    // Browser already launched in Hook
});
Given('the user navigates to {string}', async function (url) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
});
Given('the home page is visible successfully', async function () {
    //await this.page.pause();
    await this.poManager.getSignUpPage().homePageLoad();
});
When('the user clicks on Signup Login button', async function () {
    await this.poManager.getSignUpPage().goToSignup();
});
When('the user enters name {string} and email {string}', async function (username, useremail) {
    this.username = username;
    await this.poManager
        .getSignUpPage()
        .validLogin(username, useremail);
});
When('the user clicks on Signup button', async function () {
    await this.poManager.getSignUpPage().clickSignUpbtn();
});
When('the user fills the account information with:', async function (dataTable) {
    const user = dataTable.rowsHash(); // converts table to object
    const signUpPage = new SignUpPage(this.page); // Playwright page from World context
    await signUpPage.fillAccountInformation(user);
});
When('the user clicks on Create Account button', async function () {
    // await this.page.pause();
    await this.poManager.getSignUpPage().clickCreateAccountBtn();
});
Then('ACCOUNT CREATED! should be visible', async function () {

    await this.poManager.getSignUpPage().accountCreatedSuccess();
});
When('the user clicks on Continue button', async function () {
    await this.poManager.getSignUpPage().clickContBtn();
});
Then('Logged in as Test User should be visible', async function () {
    const userLocator = this.page.locator('a:has-text("Logged in as") b');
    // await this.page.pause();
    await expect(userLocator).toHaveText(this.username);
});
When('the user clicks on Delete Account button', async function () {
    await this.poManager.getSignUpPage().deleteUser();
});
Then('ACCOUNT DELETED! should be visible', async function () {
    await this.poManager.getSignUpPage().accountDeleted();
});
Then('the user clicks agin on next Continue button', async function () {
    await this.poManager.getSignUpPage().NextBtn();
});


//---------************Login/Logout***********_________\\
When('the user clicks on Signup and Login button', async function () {
    await this.poManager.getLoginLogoutPage().clickSignupLogin();
});
Then('Login to your account should be visible', async function () {

    const loginText = this.page.locator('text=Login to your account');
    await expect(loginText).toBeVisible();

});
When('the user enters correct {string} and {string}', async function (email, password) {

    this.email = email;
    await this.poManager.getLoginLogoutPage().enterLoginCredentials(email, password);
});


When('the user clicks on Login button', async function () {
    await this.poManager.getLoginLogoutPage().clickLoginButton();
});
Then('Logged in as username should be visible', async function () {

    const loggedInUser = this.page.locator('a:has-text("Logged in as")');
    await expect(loggedInUser).toBeVisible();

});
When('the user clicks on Logout button', async function () {
    await this.poManager.getLoginLogoutPage().clickLogoutButton();
});
Then('the user should be navigated to login page', async function () {

    await expect(this.page).toHaveURL(/login/);
    await expect(
        this.page.locator('text=Login to your account')
    ).toBeVisible();

});


//---------************Contact US***********_________\\
When('the user clicks on Contact Us button', async function () {

    await this.poManager.getContactUs().clickContactUs();
});
Then('GET IN TOUCH should be visible', async function () {
    await this.poManager.getContactUs().verifyGetInTouchVisible();

});
When('the user enters contact details:', async function (dataTable) {

    const data = dataTable.rowsHash();

    await this.page.fill('[data-qa="name"]', data.name);
    await this.page.fill('[data-qa="email"]', data.email);
    await this.page.fill('[data-qa="subject"]', data.subject);
    await this.page.fill('[data-qa="message"]', data.message);
});
When('the user uploads a file {string}', async function (fileName) {

    const filePath = path.join(__dirname, '../../tests/testData/', fileName);

    await this.page.setInputFiles('input[type="file"]', filePath);
});
When('the user clicks on Submit button', async function () {

    //await this.page.pause();
    await this.poManager.getContactUs().clickSubmit();
});

When('the user confirms the alert', async function () {
    //await this.poManager.getContactUs().acceptAlert();

});

Then('Success! Your details have been submitted successfully. should be visible', async function () {

    await this.poManager.getContactUs().verifySuccessMessage();
});

When('the user clicks on Home button', async function () {

    await this.poManager.getContactUs().clickHome();

});


////////////////*****Add Product********////////////////
When('the user clicks on Products button', async function () {
    await this.page.locator('a[href="/products"]').click();
    await this.page.waitForLoadState('networkidle');
});

When('the user adds the first product to cart and clicks Continue Shopping', async function () {
  
    await this.poManager.getAddProduct().addProductByIndex(0);
    await this.poManager.getAddProduct().clickContinueShopping();
    
});

When('the user adds the second product to cart', async function () {
    await this.poManager.getAddProduct().addProductByIndex(1);
});

When('the user clicks on View Cart button', async function () {
    await this.poManager.getAddProduct().clickViewCart();
    
});

Then('both products should be visible in the cart', async function () {
    await this.poManager.getAddProduct().verifyCartProducts(2);
    
});

Then('the user verifies the products prices, quantities, and total price', async function () {
    await this.poManager.getAddProduct().verifyPricesQuantitiesTotals();
});


//////**********Verify Product Quantity *********///////////
Given('the home page should be visible successfully', async function () {
  await expect(this.page).toHaveURL(/automationexercise/);
});

When('the user clicks on "View Product" for first product', async function () {
  await this.poManager.getverifyProductQuantityPage().clickFirstViewProduct();
});

Then('the product detail page should be visible', async function () {
  await this.poManager.getverifyProductQuantityPage().verifyProductDetailPage();
});

When('the user increases product quantity to {string}', async function (qty) {
  await this.poManager.getverifyProductQuantityPage().setProductQuantity(qty);
});

When('the user clicks on "Add to cart" button', async function () {
  await this.poManager.getverifyProductQuantityPage().clickAddToCart();
});

When('the user clicks on "View Cart" button', async function () {
  await this.poManager.getverifyProductQuantityPage().clickViewCart();
});

Then('the product should be displayed in cart with quantity {string}', async function (expectedQty) {
  await this.poManager.getverifyProductQuantityPage().verifyProductQuantityInCart(expectedQty);
});


///////******** Registers During Checkout*/////////////////////

// features/stepDefination/steps.js

When('the user adds first product to cart', async function () {
  await this.poManager.getRegisterWhileCheckoutPage().addFirstProductToCart();
});

When('the user clicks on Cart button', async function () {
    await this.page.pause();
    await this.poManager.getRegisterWhileCheckoutPage().clickCart();
});

Then('the cart page should be displayed', async function () {
  await expect(this.page).toHaveURL(/view_cart/);
});

When('the user clicks on Proceed To Checkout button', async function () {
  await this.poManager.getRegisterWhileCheckoutPage().clickProceedToCheckout();
});

When('the user clicks on Register Login button', async function () {
  await this.poManager.getRegisterWhileCheckoutPage().clickRegisterLogin();
});

When('the user enters signup name {string}', async function (name) {
  await this.poManager.getRegisterWhileCheckoutPage().enterSignupName(name);
});

When('the user enters signup email {string}', async function (email) {
  await this.poManager.getRegisterWhileCheckoutPage().enterSignupEmail(email);
});

When('the user clicks on Signup button', async function () {
  await this.poManager.getRegisterWhileCheckoutPage().clickButton('Signup');
});

When('the user fills account information', async function () {
  await this.poManager.getRegisterWhileCheckoutPage().fillAccountInformation();
});

When('the user clicks on Create Account button', async function () {
  await this.poManager.getRegisterWhileCheckoutPage().clickButton('Create Account');
});

Then('ACCOUNT CREATED! should be visible', async function () {
  await expect(this.page.locator('text=ACCOUNT CREATED!')).toBeVisible();
});

When('the user clicks on Continue button', async function () {
  await this.poManager.getRegisterWhileCheckoutPage().clickButton('Continue');
});

Then('Logged in as BilalTest should be visible', async function () {
  await expect(this.page.locator('text=Logged in as BilalTest')).toBeVisible();
});

Then('the address details and review order should be visible', async function () {
  await this.poManager.getRegisterWhileCheckoutPage().verifyAddressAndReview();
});

When('the user enters comment Test order automation', async function () {
  await this.poManager.getRegisterWhileCheckoutPage().enterComment('Test order automation');
});

When('the user clicks on Place Order button', async function () {
  await this.poManager.getRegisterWhileCheckoutPage().clickButton('Place Order');
});

When('the user enters payment details', async function () {
  await this.poManager.getRegisterWhileCheckoutPage().enterPaymentDetails();
});

When('the user clicks on Pay and Confirm Order button', async function () {
  await this.poManager.getRegisterWhileCheckoutPage().clickButton('Pay and Confirm Order');
});

Then('Your order has been placed successfully! should be visible', async function () {
  await expect(this.page.locator('text=Your order has been placed successfully!')).toBeVisible();
});