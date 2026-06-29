export function debounce(fn, delay) {
  let timer = null
  function debounced(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
  debounced.cancel = () => clearTimeout(timer)
  return debounced
}

export function throttle(fn, limit) {
  let inCooldown = false
  let lastArgs = null
  return function throttled(...args) {
    if (inCooldown) {
      lastArgs = args // remember the last call for the trailing edge
      return
    }
    fn.apply(this, args) // leading edge: run immediately
    inCooldown = true
    setTimeout(() => {
      inCooldown = false
      if (lastArgs) {
        const a = lastArgs
        lastArgs = null
        throttled.apply(this, a) // trailing call with the most recent args
      }
    }, limit)
  }
}
