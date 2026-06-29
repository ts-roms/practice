export function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn.apply(this, args)
    return (...more) => curried.apply(this, [...args, ...more])
  }
}

export const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x)

export const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x)
