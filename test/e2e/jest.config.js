const path = require('path')

module.exports = {
  verbose: true,
  'moduleFileExtensions': [
    'json',
    'js',
    'vue'
  ],
  'preset': 'jest-puppeteer',
  'transform': {
    '^.+\\.js$': path.join(__dirname, '..', '..',  '/node_modules/babel-jest'),
    '.*\\.(vue)$': path.join(__dirname, '..', '..',  '/node_modules/vue-jest')
  },
  "moduleNameMapper": {
  "^@/(.*)$":  path.join(__dirname, '..', '..',  '/')
  },
  'globalSetup': path.join(__dirname, 'setup.js'),
  'globalTeardown': path.join(__dirname, 'teardown.js'),
  'testEnvironment': path.join(__dirname, 'environment.js')
}
