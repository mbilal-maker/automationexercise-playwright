const { expect } = require('@playwright/test');
class ContactUs {

    constructor(page) {
        this.page = page;
        this.contactUsBtn = page.locator('a[href="/contact_us"]');
        this.getInTouchText = page.getByRole('heading', { name: 'Get In Touch' })
        this.nameInput = page.locator('input[name="name"]');
        this.emailInput = page.locator('input[name="email"]');
        this.subjectInput = page.locator('input[name="subject"]');
        this.messageInput = page.locator('#message');
        this.uploadFileInput = page.locator('input[name="upload_file"]');
        this.submitBtn = page.locator('.submit_form');
        this.successMessage = page.locator('#contact-page .alert-success');
        this.homeBtn = page.locator('.fa-angle-double-left');

    }


    async clickContactUs() {
        await this.contactUsBtn.click();
    }

    async verifyGetInTouchVisible() {
        await this.getInTouchText.waitFor({ state: 'visible' });
    }

    async fillContactForm(name, email, subject, message) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.subjectInput.fill(subject);
        await this.messageInput.fill(message);
    }

    async uploadFile(filePath) {
        await this.uploadFileInput.setInputFiles(filePath);
    }
    async clickSubmit() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('networkidle');
        await this.page.locator('#contact-us-form').waitFor({ state: 'attached' });
        await this.submitBtn.scrollIntoViewIfNeeded();
        await this.submitBtn.waitFor({ state: 'visible' });
        this.page.once('dialog', async (dialog) => {
            console.log("Dialog appeared with message:", dialog.message());
            await dialog.accept();
        });
        await this.submitBtn.click();
        await this.page.waitForFunction(() => {
            const el = document.querySelector('#contact-page .alert-success');
            return el && el.style.display === 'block';
        });
    }
    async acceptAlert() {
        this.page.once('dialog', async dialog => {
            await dialog.accept();
        });
    }

    async verifySuccessMessage() {
        await this.successMessage.waitFor({ state: 'visible' });
    }

    async clickHome() {
        await this.homeBtn.click();
    }

}
module.exports = { ContactUs };