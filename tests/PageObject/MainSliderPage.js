const { expect } = require('@playwright/test');

class MainSliderPage {
  constructor(page) {
    this.page = page;

    this.slider = page.locator('#slider-carousel');
    this.slides = page.locator('#slider-carousel .carousel-inner .item');
    this.indicators = page.locator('#slider-carousel .carousel-indicators li');

    this.nextButton = page.locator('#slider-carousel .right.control-carousel');
    this.previousButton = page.locator('#slider-carousel .left.control-carousel');
  }

  async verifyMainSliderVisible() {
    await expect(this.slider).toBeVisible();
  }

  async verifySlideCount(expectedCount) {
    await expect(this.slides).toHaveCount(expectedCount);
    await expect(this.indicators).toHaveCount(expectedCount);
  }

  async verifySliderContent() {
    for (let i = 0; i < 3; i++) {
      const slide = this.slides.nth(i);

      await expect(slide.locator('h1')).toContainText('Automation');
      await expect(slide.locator('h1')).toContainText('Exercise');

      await expect(slide.locator('h2')).toContainText(
        'Full-Fledged practice website for Automation Engineers'
      );

      await expect(slide.locator('p')).toContainText(
        'All QA engineers can use this website'
      );

      await expect(slide.locator('a.test_cases_list')).toBeAttached();
      await expect(slide.locator('a.apis_list')).toBeAttached();
      await expect(slide.locator('img.girl')).toBeAttached();
    }
  }

  async goToSlide(slideNumber) {
    const index = slideNumber - 1;

    await this.indicators.nth(index).click();

    await this.page.waitForFunction(
      (expectedIndex) => {
        const slides = Array.from(
          document.querySelectorAll('#slider-carousel .carousel-inner .item')
        );

        return slides.findIndex((slide) =>
          slide.classList.contains('active')
        ) === expectedIndex;
      },
      index,
      { timeout: 5000 }
    );
  }

  async clickNextArrow() {
    const currentIndex = await this.getActiveSlideIndex();

    await this.nextButton.click();

    await this.page.waitForFunction(
      (previousIndex) => {
        const slides = Array.from(
          document.querySelectorAll('#slider-carousel .carousel-inner .item')
        );

        return slides.findIndex((slide) =>
          slide.classList.contains('active')
        ) !== previousIndex;
      },
      currentIndex,
      { timeout: 5000 }
    );
  }

  async clickPreviousArrow() {
    const currentIndex = await this.getActiveSlideIndex();

    await this.previousButton.click();

    await this.page.waitForFunction(
      (previousIndex) => {
        const slides = Array.from(
          document.querySelectorAll('#slider-carousel .carousel-inner .item')
        );

        return slides.findIndex((slide) =>
          slide.classList.contains('active')
        ) !== previousIndex;
      },
      currentIndex,
      { timeout: 5000 }
    );
  }

  async verifyActiveSlide(slideNumber) {
    const expectedIndex = slideNumber - 1;

    await this.page.waitForFunction(
      (index) => {
        const slides = Array.from(
          document.querySelectorAll('#slider-carousel .carousel-inner .item')
        );

        return slides[index].classList.contains('active');
      },
      expectedIndex,
      { timeout: 5000 }
    );

    await expect(this.slides.nth(expectedIndex)).toHaveClass(/active/);
  }

  async getActiveSlideIndex() {
    return await this.page.evaluate(() => {
      const slides = Array.from(
        document.querySelectorAll('#slider-carousel .carousel-inner .item')
      );

      return slides.findIndex((slide) => slide.classList.contains('active'));
    });
  }
}

module.exports = { MainSliderPage };