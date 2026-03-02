const { expect } = require('@playwright/test');
class SignUpPage {

    constructor(page) {
        this.page = page;
        this.HomePageVisible = page.locator('a:has-text("Home")');
        this.signUpbtnClick = page.locator('a[href="/login"]');
        this.userName = page.locator('[data-qa="signup-name"]');
        this.userEmail = page.locator('[data-qa="signup-email"]');
        this.signupButton = page.locator('[data-qa="signup-button"]');
        this.signupHeading = page.locator('.signup-form h2');

        this.titleRadio = (value) => page.locator(`input[name="title"][value="${value}"]`);
        this.passwordInput = page.locator('input#password');
        this.daySelect = page.locator('select#days');
        this.monthSelect = page.locator('select#months');
        this.yearSelect = page.locator('select#years');
        this.newsletterCheckbox = page.locator('input#newsletter');
        this.optinCheckbox = page.locator('input#optin');
        this.firstNameInput = page.locator('input#first_name');
        this.lastNameInput = page.locator('input#last_name');
        this.companyInput = page.locator('input#company');
        this.address1Input = page.locator('input#address1');
        this.address2Input = page.locator('input#address2');
        this.countrySelect = page.locator('select#country');
        this.stateInput = page.locator('input#state');
        this.cityInput = page.locator('input#city');
        this.zipcodeInput = page.locator('input#zipcode');
        this.mobileNumberInput = page.locator('input#mobile_number');
        this.createAccountBtn = page.locator('button[data-qa="create-account"]');

        this.createAccountBtn = page.locator('button[data-qa="create-account"]');
        this.accountCreatedMsg = page.locator('h2[data-qa="account-created"]');
        this.continueBtn = page.locator('a[data-qa="continue-button"]');
        this.userLocator = this.page.locator('a:has-text("Logged in as") b');
        this.deleteAccountbtn = page.locator('a[href="/delete_account"]');
        this.accountDeleteSuccess = page.locator('.text-center');
        this.continuebutton = page.locator('[data-qa="continue-button"]');
    }

    async goTo() {

    }
    async homePageLoad() {

        await expect(this.HomePageVisible).toBeVisible();
    }

    async goToSignup() {
        await expect(this.signUpbtnClick).toBeVisible();
        await this.signUpbtnClick.click();

    }
    async validLogin(username, useremail) {

        await this.userName.fill(username);
        await this.userEmail.fill(useremail);

    }
    async clickSignUpbtn() {
        await this.signupButton.click();
    }

    async fillAccountInformation(user) {
        await this.titleRadio(user.Title).check();
        await this.passwordInput.fill(user.Password);
        await this.daySelect.selectOption(user.Day);
        await this.monthSelect.selectOption(user.Month);
        await this.yearSelect.selectOption(user.Year);

        if (user.Newsletter?.toLowerCase() === 'yes' || user.Newsletter === 'true') {
            await this.newsletterCheckbox.check();
        }
        if (user.Optin?.toLowerCase() === 'yes' || user.Optin === 'true') {
            await this.optinCheckbox.check();
        }
        await this.firstNameInput.fill(user.FirstName);
        await this.lastNameInput.fill(user.LastName);
        await this.companyInput.fill(user.Company);
        await this.address1Input.fill(user.Address);
        await this.address2Input.fill(user.Address2);
        await this.countrySelect.selectOption(user.Country);
        await this.stateInput.fill(user.State);
        await this.cityInput.fill(user.City);
        await this.zipcodeInput.fill(user.Zipcode);
        await this.mobileNumberInput.fill(user.MobileNumber);
        await expect(this.createAccountBtn).toBeVisible();
    }
    async clickCreateAccountBtn() {
        await expect(this.createAccountBtn).toBeVisible();
        await this.createAccountBtn.click();
    }
    async accountCreatedSuccess() {
        await expect(this.accountCreatedMsg).toBeVisible();
        await expect(this.accountCreatedMsg).toHaveText('Account Created!');
    }
    async clickContBtn() {
        await expect(this.continueBtn).toBeVisible();
        await this.continueBtn.click();
    }

    async toHaveUsername() {

        await expect(userLocator).toHaveText(this.username);
    }
    async deleteUser() {
        await expect(this.deleteAccountbtn).toBeVisible();
        await this.deleteAccountbtn.click();
    }
    async accountDeleted() {
      //  await this.page.pause();
       await expect(this.accountDeleteSuccess).toBeVisible({ timeout: 10000 });
        await expect(this.accountDeleteSuccess).toHaveText('Account Deleted!');
    }
    async NextBtn() {
        await expect(this.continuebutton).toBeVisible();
        await this.continuebutton.click();
    }
}
module.exports = { SignUpPage };