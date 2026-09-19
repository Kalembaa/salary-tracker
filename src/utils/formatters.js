export function formatCurrency(value = 0) {
  const safeValue = Number(value ?? 0)

  if (Number.isNaN(safeValue)) {
    return '0 сум'
  }

  return `${safeValue.toLocaleString('ru-RU')} сум`
}

export function formatDate(value = '') {
  if (!value) {
    return '—'
  }

  const date = new Date(`${value}T00:00:00`)

  if (Number.isNaN(date.getTime())) {
    return '—'
  }

  return date.toLocaleDateString('ru-RU')
}
