export function getView(rows, options = {}) {
  const { query = '', sortKey = null, sortDir = 'asc', page = 1, pageSize = 10 } = options

  // 1) filter
  let result = rows
  if (query) {
    const q = query.toLowerCase()
    result = result.filter((row) =>
      Object.values(row).some((v) => String(v).toLowerCase().includes(q)),
    )
  }

  // 2) sort (copy first — never mutate the input)
  if (sortKey) {
    result = [...result].sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      const cmp =
        typeof av === 'number' && typeof bv === 'number'
          ? av - bv
          : String(av).localeCompare(String(bv))
      return sortDir === 'desc' ? -cmp : cmp
    })
  }

  // 3) paginate (totals reflect the filtered set)
  const total = result.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const start = (safePage - 1) * pageSize
  const pageRows = result.slice(start, start + pageSize)

  return { rows: pageRows, total, totalPages, page: safePage }
}
