const { Before, After } = require('@cucumber/cucumber');
const { POManager } = require('../../tests/PageObject/POManager');

Before(async function () {
    await this.init(); // initialize browser from world.js

    // Initialize Page Object Manager AFTER page is created
    this.poManager = new POManager(this.page);
});

After(async function () {
    await this.close(); // properly close browser
});