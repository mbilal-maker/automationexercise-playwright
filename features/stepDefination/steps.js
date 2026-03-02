const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { setDefaultTimeout } = require('@cucumber/cucumber');
const { SignUpPage } = require('../../tests/PageObject/SignUpPage');
const { LoginLogoutPage } = require('../../tests/PageObject/LoginLogoutPage');
const { ContactUs } = require('../../tests/PageObject/ContactUs');
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