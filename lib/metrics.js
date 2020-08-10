const prom = require('prom-client')

module.exports.sine_wave_value = new prom.Gauge({
  'name': 'sine_wave_value',
  'help': 'current value of a sine wave based on time'
})

module.exports.time_spent_in_some_io_bound_function = new prom.Counter({
  'name': 'time_spent_in_some_io_bound_function_sum',
  'help': 'cumultive sum of the time spent in some_io_bound_function'
})

module.exports.calls_to_some_io_bound_function = new prom.Counter({
  'name': 'time_spent_in_some_io_bound_function_count',
  'help': 'number of calls to some_io_bound_function'
})

module.exports.some_io_bound_function_time_spent_histogram = new prom.Histogram({
  'name': 'some_io_bound_function_time_spent',
  'help': 'histogram for time spent in some_io_bound_function',
  'buckets': [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 0.75, 1, 1.5, 2, 3]
})
