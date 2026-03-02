const { expect } = require('@playwright/test');
class LoginLogoutPage {

    constructor(page) {
        this.page = page;
        this.signupLoginBtn = page.locator('a:has-text("Signup / Login")');
        this.emailInput = page.locator('[data-qa="login-email"]');
        this.passwordInput = page.locator('[data-qa="login-password"]');
        this.loginBtn = page.locator('[data-qa="login-button"]');
        this.logoutBtn = page.locator('a:has-text("Logout")');

    }


    async clickSignupLogin() {
        await this.signupLoginBtn.click();
    }

    async enterLoginCredentials(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginBtn.click();
    }

    async clickLogoutButton() {
        await this.logoutBtn.click();
    }


}
module.exports = { LoginLogoutPage };