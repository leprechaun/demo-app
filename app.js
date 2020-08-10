const express = require('express')
const app = express()

const logger = require('morgan')
const prom = require('prom-client')

const metrics = require('./lib/metrics')

const register = prom.register

app.use(logger('dev'))

app.get('/health', async (req, res, next) => {
  res.send('ok')
})

app.get('/', async (req, res, next) => {
  res.send('ok')
})

app.get('/arbitrary', async (req, res, next) => {
  const cumulativeSum = (sum => value => sum += value)(0);
  const codes = Object.keys(req.query)
  const sum = Object.entries(req.query).map( ([status_code, count]) => {
    return parseInt(count)
  }).map(cumulativeSum)

  const max = Math.max(...sum)

  const thing = [0, ...sum]
  thing.pop()

  const random = Math.random() * max

  const proportions = thing.map((min, index) => {
    return [
      codes[index],
      min
    ]
  })

  const code = proportions.filter( ([code, min]) => {
    return random >= min
  }).map( ([code, min]) => code).pop()

  if(code !== undefined) {
    res.status(code).json({
      code
    })
  } else {
    res.status(200).json({
      code: "200"
    })
  }
})

app.get('/metrics', async (req, res, next) => {
  try {
    res.set('Content-Type', register.contentType)
    res.end(await register.metrics())
  } catch (ex) {
    res.status(500).end(ex)
  }
})

module.exports = app
