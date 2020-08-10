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

module.exports = app
