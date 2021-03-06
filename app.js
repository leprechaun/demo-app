const express = require('express')
const app = express()

const logger = require('morgan')
const prom_bundle = require('express-prom-bundle')

const metrics = require('./lib/metrics')
const promMiddleware = prom_bundle({
  includePath: true,
  includeMethod: true,
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 0.75, 1, 1.5, 2, 3]
})

const sine_wave = require('./lib/sine_wave').sine_wave
const some_io_bound_function = require('./lib/some_io_bound_function').some_io_bound_function

app.use(promMiddleware)
app.use(logger('dev'))

app.get('/health', async (req, res, next) => {

  const current = sine_wave(1200)
  metrics.sine_wave_value.set(current)

  const start_time = new Date()
  const result_of_some_io_bound_function = await some_io_bound_function(1200)
  const end_time = new Date()
  metrics.time_spent_in_some_io_bound_function.inc((end_time - start_time) / 1000)
  metrics.calls_to_some_io_bound_function.inc(1)

  metrics.some_io_bound_function_time_spent_histogram.observe((end_time - start_time) / 1000)

  res.json({
    sine_value: current,
    result_of_some_io_bound_function
  })
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
