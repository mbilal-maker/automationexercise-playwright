const { SignUpPage } = require('./SignUpPage');
const { LoginLogoutPage } = require('./LoginLogoutPage');
const { ContactUs } = require('./ContactUs');
const { expect } = require('@playwright/test');
class POManager {

    constructor(page) {
        this.page = page;
        this.signUpPage = new SignUpPage(this.page);
        this.loginLogoutPage = new LoginLogoutPage(this.page);
        this.contactUs = new ContactUs(this.page);
    }


    getSignUpPage() {
        return this.signUpPage;
    }
    getLoginLogoutPage() {
        return this.loginLogoutPage;
    }
    getContactUs() {
        return this.contactUs;
    }

}
module.exports = { POManager };