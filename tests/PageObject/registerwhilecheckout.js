const { expect } = require('@playwright/test');

class RegisterWhileCheckout {
  constructor(page) {
    this.page = page;
    this.firstProductCard = this.page.locator('.features_items .col-sm-4').first();
    this.firstAddToCartBtn = this.firstProductCard.locator('a.add-to-cart').first();
    this.continueShoppingBtn = this.page.getByRole('button', { name: /Continue Shopping/i });
    this.cartBtn = this.page.locator('.shop-menu a[href="/view_cart"]');
    this.proceedToCheckoutBtn = this.page.locator('a.check_out:has-text("Proceed To Checkout")');
    this.registerLoginBtn = this.page.locator('#checkoutModal a[href="/login"]');

    // Signup
    this.signupNameInput = this.page.locator('[data-qa="signup-name"]');
    this.signupEmailInput = this.page.locator('[data-qa="signup-email"]');
    this.signupBtn = this.page.locator('[data-qa="signup-button"], button:has-text("Signup")');

    // Account information
    this.titleMrRadio = this.page.locator('#id_gender1');
    this.passwordInput = this.page.locator('#password');
    this.daysDropdown = this.page.locator('#days');
    this.monthsDropdown = this.page.locator('#months');
    this.yearsDropdown = this.page.locator('#years');

    this.firstNameInput = this.page.locator('#first_name');
    this.lastNameInput = this.page.locator('#last_name');
    this.addressInput = this.page.locator('#address1');
    this.countryDropdown = this.page.locator('#country');
    this.stateInput = this.page.locator('#state');
    this.cityInput = this.page.locator('#city');
    this.zipcodeInput = this.page.locator('#zipcode');
    this.mobileNumberInput = this.page.locator('#mobile_number');
    this.createAccountBtn = page.locator('[data-qa="create-account"], button:has-text("Create Account")');
    this.accountCreatedMsg = page.locator('[data-qa="account-created"], text=ACCOUNT CREATED!');
    this.continueBtn = page.locator('[data-qa="continue-button"], a:has-text("Continue")');
    this.addressDetailsText = page.locator('text=Address Details');
    this.reviewOrderText =page.locator('text=Review Your Order');
    this.commentTextArea = page.locator('textarea[name="message"]');
    this.placeOrderBtn = page.locator('a:has-text("Place Order")');
    this.nameOnCardInput = page.locator('[data-qa="name-on-card"]');
    this.cardNumberInput = page.locator('[data-qa="card-number"]');
    this.cvcInput = page.locator('[data-qa="cvc"]');
    this.expiryMonthInput = page.locator('[data-qa="expiry-month"]');
    this.expiryYearInput = page.locator('[data-qa="expiry-year"]');
    this.payConfirmBtn = page.locator('[data-qa="pay-button"], button:has-text("Pay and Confirm Order")');
    this.successOrderMsg = page.locator('h2[data-qa="order-placed"]:has-text("Order Placed!")');
    this.continueBtn = page.locator('[data-qa="continue-button"]');
    this.homeLink = page.locator('a[href="/"]:has-text("Home")');
  }

  async addFirstProductToCart() {
    await this.firstProductCard.scrollIntoViewIfNeeded();
    await this.firstProductCard.hover();
    await this.firstAddToCartBtn.click();
    await this.continueShoppingBtn.waitFor({ state: 'visible' });
    await this.continueShoppingBtn.click();
  }

  async clickCart() {
    await this.cartBtn.click();
  }

  async clickProceedToCheckout() {
    await this.proceedToCheckoutBtn.waitFor({ state: 'visible' });
    await this.proceedToCheckoutBtn.scrollIntoViewIfNeeded();
    await this.proceedToCheckoutBtn.click();
  }

  async clickRegisterLogin() {
    await this.registerLoginBtn.waitFor({ state: 'visible' });
    await Promise.all([
      this.page.waitForURL('**/login', { timeout: 15000 }),
      this.registerLoginBtn.click(),
    ]);
  }

  async enterSignupName(name) {
    await this.signupNameInput.fill(name);
  }

  async enterSignupEmail(email) {
    await this.signupEmailInput.fill(email);
  }

  async clickSignup() {
    await this.signupBtn.click();
  }

  async fillAccountInformation() {
    await this.titleMrRadio.check();
    await this.passwordInput.fill('Test@123');

    await this.daysDropdown.selectOption('10');
    await this.monthsDropdown.selectOption('5');
    await this.yearsDropdown.selectOption('1995');

    await this.firstNameInput.fill('Bilal');
    await this.lastNameInput.fill('Automation');
    await this.addressInput.fill('Street 1');
    await this.countryDropdown.selectOption('India');
    await this.stateInput.fill('Maharashtra');
    await this.cityInput.fill('Mumbai');
    await this.zipcodeInput.fill('400001');
    await this.mobileNumberInput.fill('1234567890');
  }

  async clickCreateAccount() {
    await this.createAccountBtn.click();
  }

  async verifyAccountCreated() {
    await expect(this.accountCreatedMsg).toBeVisible();
  }

  async clickContinue() {
    await this.continueBtn.waitFor({ state: 'visible' });
    await this.continueBtn.click();
  }

  async verifyAddressAndReview() {
    await expect(this.addressDetailsText).toBeVisible();
    await expect(this.reviewOrderText).toBeVisible();
  }

  async enterComment(comment) {
    await this.commentTextArea.fill(comment);
  }

  async clickPlaceOrder() {
    await this.placeOrderBtn.click();
  }

  async enterPaymentDetails() {
    await this.nameOnCardInput.fill('Bilal Test');
    await this.cardNumberInput.fill('4111111111111111');
    await this.cvcInput.fill('123');
    await this.expiryMonthInput.fill('12');
    await this.expiryYearInput.fill('2030');
  }

  async clickPayAndConfirm() {
    await this.payConfirmBtn.click();
  }

  async verifyOrderSuccess() {
    await expect(this.successOrderMsg).toBeVisible();
    await this.continueBtn.click();
    await expect(this.homeLink).toBeVisible();
  }


  async clickButton(name) {
    const text = String(name).trim();

    // ✅ Special: Cart
    if (/^Cart$/i.test(text)) {
      await this.clickCart();
      return;
    }

    // ✅ Special: Proceed To Checkout (not a link role, it's a.check_out without href)
    if (/^Proceed To Checkout$/i.test(text)) {
      await this.clickProceedToCheckout();
      return;
    }

    // ✅ Special: Register / Login (inside modal)
    if (/^Register\s*\/\s*Login$/i.test(text)) {
      await this.clickRegisterLogin();
      return;
    }

    // ✅ Special: Continue (can be <a> with data-qa)
    if (/^Continue$/i.test(text)) {
      await this.clickContinue();
      return;
    }

    // ✅ Special: Create Account (data-qa)
    if (/^Create Account$/i.test(text)) {
      await this.clickCreateAccount();
      return;
    }

    // ✅ Special: Signup (data-qa)
    if (/^Signup$/i.test(text)) {
      await this.clickSignup();
      return;
    }

    // Generic fallback: try button then link then input
    const generic = this.page
      .locator(`button:has-text("${text}"), a:has-text("${text}"), input[value="${text}"]`)
      .first();

    await generic.waitFor({ state: 'visible' });
    await generic.click();
  }
}

module.exports = { RegisterWhileCheckout };