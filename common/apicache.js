const express = require('express')
const apicache = require('apicache')

const app = express()

// https://github.com/kwhitley/apicache
app.use(apicache.middleware("15 minutes"))

apicache.options({ debug: true })

module.exports  = {
  path: "/wp-json/",
  handler: app
}
