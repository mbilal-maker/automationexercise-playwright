const reporter = require('multiple-cucumber-html-reporter');

reporter.generate({
  jsonDir: 'reports',
  reportPath: 'reports/html-report',
  metadata: {
    browser: {
      name: 'chrome',
      version: 'latest'
    },
    device: 'Local test machine',
    platform: {
      name: 'windows',
      version: '10'
    }
  },
  customData: {
    title: 'Execution Info',
    data: [
      { label: 'Project', value: 'Automation Exercise' },
      { label: 'Release', value: '1.0' },
      { label: 'Cycle', value: 'Regression' }
    ]
  }
});