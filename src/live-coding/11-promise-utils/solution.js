export function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = []
    let remaining = promises.length
    if (remaining === 0) {
      resolve([])
      return
    }
    promises.forEach((p, i) => {
      Promise.resolve(p).then((value) => {
        results[i] = value // preserve input order by index
        remaining -= 1
        if (remaining === 0) resolve(results)
      }, reject) // first rejection rejects the whole thing
    })
  })
}

export function retry(fn, attempts) {
  return Promise.resolve()
    .then(fn)
    .catch((err) => {
      if (attempts <= 1) throw err
      return retry(fn, attempts - 1)
    })
}
