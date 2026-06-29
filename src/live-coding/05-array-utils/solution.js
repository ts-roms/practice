export function flatten(arr) {
  return arr.reduce(
    (out, item) => out.concat(Array.isArray(item) ? flatten(item) : item),
    [],
  )
}

// Iterative alternative (no recursion), for the follow-up:
// export function flatten(arr) {
//   const stack = [...arr]
//   const out = []
//   while (stack.length) {
//     const next = stack.pop()
//     if (Array.isArray(next)) stack.push(...next)
//     else out.unshift(next)
//   }
//   return out
// }

export function groupBy(arr, keyFn) {
  return arr.reduce((groups, item) => {
    const key = keyFn(item)
    ;(groups[key] ||= []).push(item)
    return groups
  }, {})
}
