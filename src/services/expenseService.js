import {
  generateId,
  getStorageItem,
  setStorageItem,
} from './storage'

const STORAGE_KEY = 'expenses'

export function getExpenses() {
  const expenses = getStorageItem(STORAGE_KEY, [])
  return Array.isArray(expenses) ? expenses : []
}

export function getExpenseById(id) {
  if (!id) return null
  const expenses = getExpenses()
  return expenses.find((expense) => expense?.id === id) || null
}

export function addExpense(data = {}) {
  const expenses = getExpenses()

  const newExpense = {
    id: generateId(),
    type: 'expense',
    category: data?.category || 'other',
    amount: Number(data?.amount ?? 0),
    date: data?.date || new Date().toISOString().split('T')[0],
    comment: data?.comment || '',
    createdAt: new Date().toISOString(),
  }

  setStorageItem(STORAGE_KEY, [newExpense, ...expenses])
  return newExpense
}

export function updateExpense(id, data = {}) {
  if (!id) return null

  const expenses = getExpenses()
  const expenseExists = expenses.some((expense) => expense?.id === id)

  if (!expenseExists) return null

  const updatedExpenses = expenses.map((expense) => {
    if (expense?.id !== id) return expense

    return {
      ...expense,
      ...data,
      id,
      type: 'expense',
      amount: Number(data?.amount ?? expense?.amount ?? 0),
      updatedAt: new Date().toISOString(),
    }
  })

  setStorageItem(STORAGE_KEY, updatedExpenses)
  return updatedExpenses.find((expense) => expense?.id === id) || null
}

export function deleteExpense(id) {
  if (!id) return false

  const expenses = getExpenses()
  const updatedExpenses = expenses.filter((expense) => expense?.id !== id)

  if (updatedExpenses.length === expenses.length) return false

  setStorageItem(STORAGE_KEY, updatedExpenses)
  return true
}
