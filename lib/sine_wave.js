const sine_wave = (periodicity) => {
  const time = Math.floor(new Date().getTime() / 1000)

  const mod = time % periodicity
  const input = (mod / periodicity)
  const input_times_two_pi = input * (Math.PI * 2)

  const sine_of_time = Math.sin(input_times_two_pi)

  return sine_of_time
}

module.exports.sine_wave = sine_wave
