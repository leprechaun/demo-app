const prom = require('prom-client')

module.exports.up = new prom.Gauge({
  'name': 'up',
  'help': 'whether our software is up or not'
})

module.exports.up.set(1)
