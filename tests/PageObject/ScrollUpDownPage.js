const { expect } = require('@playwright/test');

class ScrollUpDownPage {
  constructor(page) {
    this.page = page;

    this.subscriptionHeading = page.locator('h2:has-text("Subscription")');
    this.scrollUpArrow = page.locator('#scrollUp, a[href="#top"]');
    this.heroText = page.locator(
      'h2:has-text("Full-Fledged practice website for Automation Engineers")'
    ).first();
  }

  async scrollToBottom() {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    await this.page.waitForTimeout(1000);
  }

  async verifySubscriptionVisible() {
    await expect(this.subscriptionHeading).toBeVisible();
  }

  async clickScrollUpArrow() {
    await expect(this.scrollUpArrow).toBeVisible();
    await this.scrollUpArrow.click();
    await this.page.waitForTimeout(1000);
  }

  async verifyScrolledUpAndHeroTextVisible(expectedText) {
    await expect(this.heroText).toContainText(expectedText);

    await expect
      .poll(async () => {
        return await this.page.evaluate(() => window.scrollY);
      })
      .toBeLessThan(250);
  }
}

module.exports = { ScrollUpDownPage };