const { expect } = require('@playwright/test');
class AddProduct {
    constructor(page) {
        this.page = page;
        this.products = this.page.locator('.product-image-wrapper');
        this.continueShoppingBtn = this.page.locator('text=Continue Shopping');
        this.viewCartBtn = this.page.locator('a[href="/view_cart"]');
        this.cartProducts = this.page.locator('.cart_info .cart_description');
        this.cartPrices = this.page.locator('.cart_info .cart_total');
        this.cartQuantities = this.page.locator('.cart_quantity');
        this.cartTotals = this.page.locator('.cart_total_price');
    }

    async addProductByIndex(index) {
        const product = this.products.nth(index);
        await product.hover();
        const addToCartBtn = product.locator('.add-to-cart').first();
        await addToCartBtn.click();
    }

    async clickContinueShopping() {
        await this.continueShoppingBtn.click();
    }

    async clickViewCart() {
        const modal = this.page.locator('.modal-content');
        await modal.getByRole('link', { name: 'View Cart' }).click();
    }

    async verifyCartProducts(expectedCount) {
        await expect(this.cartProducts).toHaveCount(expectedCount);
    }

    async verifyPricesQuantitiesTotals() {

        const priceLocator = this.page.locator('.cart_price');
        const quantityLocator = this.page.locator('.cart_quantity button');
        const totalLocator = this.page.locator('.cart_total_price');

        const count = await priceLocator.count();

        for (let i = 0; i < count; i++) {

            const priceText = await priceLocator.nth(i).textContent();
            const quantityText = await quantityLocator.nth(i).textContent();
            const totalText = await totalLocator.nth(i).textContent();

            const price = parseFloat(priceText.replace('Rs.', '').replace(',', '').trim());
            const quantity = parseInt(quantityText.trim());
            const total = parseFloat(totalText.replace('Rs.', '').replace(',', '').trim());

            if (total !== price * quantity) {
                throw new Error(
                    `Mismatch detected. Price: ${price}, Quantity: ${quantity}, Expected Total: ${price * quantity}, Actual Total: ${total}`
                );
            }
        }
    }
}

module.exports = { AddProduct };