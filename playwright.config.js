const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({

  //baseUrl: "https://automationexercise.com",

  testDir: './tests',
  reporter: 'html',

  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    trace: 'on',
  },
});