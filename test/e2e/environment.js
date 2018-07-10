// puppeteer_environment.js

const chalk = require('chalk')
const NodeEnvironment = require('jest-environment-node')
const puppeteer = require('puppeteer')
const fs = require('fs')
const os = require('os')
const path = require('path')
const { visitPage } = require('./helpers')
const { receiveData } = require('./utils')

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup')

class PuppeteerEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config)
  }

  async setup() {
    console.log(chalk.yellow('Setup Test Environment.'))

    await super.setup()

    const data = receiveData()

    this.global.BASE_URL = data.BASE_URL || process.env.BASE_URL

    this.global.browser = await puppeteer.connect({
      browserWSEndpoint: data.wsEndpoint,
    })

    this.global.browser.visitPage = async (route = '') => {
     return visitPage(this.global.browser, this.global.BASE_URL + route)
    }
  }

  async teardown() {
    console.log(chalk.yellow('Teardown Test Environment.'))
    await super.teardown()
  }

  runScript(script) {
    return super.runScript(script)
  }
}

module.exports = PuppeteerEnvironment
