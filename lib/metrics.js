const prom = require('prom-client')

module.exports.up = new prom.Gauge({
  'name': 'up',
  'help': 'whether our software is up or not'
})

module.exports.up.set(1)

module.exports.sine_wave_value = new prom.Gauge({
  'name': 'sine_wave_value',
  'help': 'current value of a sine wave based on time'
})

module.exports.time_spent_in_some_io_bound_function = new prom.Counter({
  'name': 'time_spent_in_some_io_bound_function_sum',
  'help': 'cumultive sum of the time spent in some_io_bound_function'
})
