import {
  generateId,
  getStorageItem,
  setStorageItem,
} from './storage'

const STORAGE_KEY = 'incomes'

export function getIncomes() {
  const incomes = getStorageItem(STORAGE_KEY, [])
  return Array.isArray(incomes) ? incomes : []
}

export function getIncomeById(id) {
  if (!id) return null
  const incomes = getIncomes()
  return incomes.find((income) => income?.id === id) || null
}

export function addIncome(data = {}) {
  const incomes = getIncomes()

  const newIncome = {
    id: generateId(),
    type: 'income',
    category: data?.category || 'other',
    amount: Number(data?.amount ?? 0),
    date: data?.date || new Date().toISOString().split('T')[0],
    comment: data?.comment || '',
    createdAt: new Date().toISOString(),
  }

  setStorageItem(STORAGE_KEY, [newIncome, ...incomes])
  return newIncome
}

export function updateIncome(id, data = {}) {
  if (!id) return null

  const incomes = getIncomes()
  const incomeExists = incomes.some((income) => income?.id === id)

  if (!incomeExists) return null

  const updatedIncomes = incomes.map((income) => {
    if (income?.id !== id) return income

    return {
      ...income,
      ...data,
      id,
      type: 'income',
      amount: Number(data?.amount ?? income?.amount ?? 0),
      updatedAt: new Date().toISOString(),
    }
  })

  setStorageItem(STORAGE_KEY, updatedIncomes)
  return updatedIncomes.find((income) => income?.id === id) || null
}

export function deleteIncome(id) {
  if (!id) return false

  const incomes = getIncomes()
  const updatedIncomes = incomes.filter((income) => income?.id !== id)

  if (updatedIncomes.length === incomes.length) return false

  setStorageItem(STORAGE_KEY, updatedIncomes)
  return true
}
