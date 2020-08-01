const express = require('express')
const app = express()

var logger = require('morgan')

app.use(logger('dev'))

app.get('/health', async (req, res, next) => {
  res.send('ok')
})

app.get('/', async (req, res, next) => {
  res.send('ok')
})

module.exports = app
