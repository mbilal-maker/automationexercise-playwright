const { expect } = require('@playwright/test');

class VerifyProductQuantity {

  constructor(page) {
    this.page = page;

    this.firstViewProductBtn = page.locator('a[href*="/product_details/"]').first();
    this.quantityInput = page.locator('#quantity');
    this.addToCartBtn = page.locator('button[type="button"]', { hasText: 'Add to cart' });
    this.viewCartBtn = page.locator('.modal-content a[href="/view_cart"]');
    this.cartQuantity = page.locator('.cart_quantity button');
  }

  async clickFirstViewProduct() {
    await this.firstViewProductBtn.click();
  }

  async verifyProductDetailPage() {
    await expect(this.page).toHaveURL(/product_details/);
  }

  async setProductQuantity(qty) {
    await this.quantityInput.fill('');
    await this.quantityInput.fill(qty);
  }

  async clickAddToCart() {
    await this.addToCartBtn.click();
  }

  async clickViewCart() {
    await this.viewCartBtn.click();
  }

  async verifyProductQuantityInCart(expectedQty) {
    await expect(this.cartQuantity).toHaveText(expectedQty);
  }
}

module.exports = { VerifyProductQuantity };