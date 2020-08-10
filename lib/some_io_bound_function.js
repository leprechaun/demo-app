const sine_wave = require('./sine_wave').sine_wave

module.exports.some_io_bound_function = async (periodicity) => {
  const delay = sine_wave(periodicity)

  return await new Promise( (resolve) => {
    setTimeout(() => { resolve(42) }, ( delay + 1 ) * 1000)
  })
}
