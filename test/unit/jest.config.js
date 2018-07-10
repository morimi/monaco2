const path = require('path')

module.exports = {
  verbose: true,
  'moduleFileExtensions': [
    'json',
    'js',
    'vue'
  ],
  'transform': {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  "moduleNameMapper": {
    "^@/(.*)$":  path.join(__dirname, '..', '..',  '/', '$1')
  },
  "testURL": "http://localhost:3000",
  "testEnvironment": "jest-environment-jsdom-global",
}
