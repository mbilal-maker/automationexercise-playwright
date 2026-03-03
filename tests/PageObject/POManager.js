const { SignUpPage } = require('./SignUpPage');
const { LoginLogoutPage } = require('./LoginLogoutPage');
const { ContactUs } = require('./ContactUs');
const {AddProduct} =require ('./AddProduct')
const { expect } = require('@playwright/test');
class POManager {

    constructor(page) {
        this.page = page;
        this.signUpPage = new SignUpPage(this.page);
        this.loginLogoutPage = new LoginLogoutPage(this.page);
        this.contactUs = new ContactUs(this.page);
        this.addProduct= new AddProduct(this.page);
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
    getAddProduct(){
        return this.addProduct;
    }
}
module.exports = { POManager };