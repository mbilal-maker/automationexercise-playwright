const { expect } = require('@playwright/test');

class CategoryProductsPage {
  constructor(page) {
    this.page = page;

    // Left sidebar "Category" block
    this.categorySidebarTitle = page.locator('.left-sidebar h2:has-text("Category")');
    this.accordian = page.locator('#accordian');

    // Category toggles (from your provided source)
    this.womenToggle = page.locator('a[href="#Women"]:has-text("Women")');
    this.menToggle = page.locator('a[href="#Men"]:has-text("Men")');
    this.kidsToggle = page.locator('a[href="#Kids"]:has-text("Kids")');

    // Panels
    this.womenPanel = page.locator('#Women');
    this.menPanel = page.locator('#Men');
    this.kidsPanel = page.locator('#Kids');

    // Category page heading (typically shows: WOMEN - TOPS PRODUCTS)
    this.categoryHeading = page.locator('h2.title.text-center');
  }

  async goto(url) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async verifyCategoriesVisible() {
    await expect(this.categorySidebarTitle).toBeVisible();
    await expect(this.accordian).toBeVisible();
    await expect(this.page.locator('#accordian a:has-text("Women")')).toBeVisible();
    await expect(this.page.locator('#accordian a:has-text("Men")')).toBeVisible();
    await expect(this.page.locator('#accordian a:has-text("Kids")')).toBeVisible();
  }

  async expandCategory(categoryName) {
    const name = categoryName.trim().toLowerCase();

    if (name === 'women') {
      await this.womenToggle.click();
      // Wait panel to expand (Bootstrap collapse adds "in" or becomes visible)
      await this.womenPanel.waitFor({ state: 'visible' });
      return;
    }

    if (name === 'men') {
      await this.menToggle.click();
      await this.menPanel.waitFor({ state: 'visible' });
      return;
    }

    if (name === 'kids') {
      await this.kidsToggle.click();
      await this.kidsPanel.waitFor({ state: 'visible' });
      return;
    }

    throw new Error(`Unknown category: ${categoryName}`);
  }

  async clickSubCategory(parentCategoryName, subCategoryName) {
    const parent = parentCategoryName.trim().toLowerCase();
    const sub = subCategoryName.trim();

    let panel;
    if (parent === 'women') panel = this.womenPanel;
    else if (parent === 'men') panel = this.menPanel;
    else if (parent === 'kids') panel = this.kidsPanel;
    else throw new Error(`Unknown parent category: ${parentCategoryName}`);

    // Ensure panel is expanded/visible
    await panel.waitFor({ state: 'visible' });

    // Click the subcategory link inside the expanded panel
    const link = panel.locator(`a:has-text("${sub}")`).first();
    await expect(link).toBeVisible();

    await Promise.all([
      this.page.waitForLoadState('domcontentloaded'),
      link.click(),
    ]);
  }

  async verifyCategoryHeadingExact(expectedHeading) {
    await expect(this.categoryHeading).toBeVisible();
    await expect(this.categoryHeading).toHaveText(expectedHeading);
  }

  async verifyCategoryHeadingContains(text) {
    await expect(this.categoryHeading).toBeVisible();
    await expect(this.categoryHeading).toContainText(text);
  }
}

module.exports = { CategoryProductsPage };