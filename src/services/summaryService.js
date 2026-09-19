import { getExpenses } from './expenseService'
import { getIncomes } from './incomeService'

function calculateTotal(items = []) {
  return (items || []).reduce(
    (total, item) => total + Number(item?.amount ?? 0),
    0,
  )
}

function groupByCategory(items = []) {
  return (items || []).reduce((result, item) => {
    const category = item?.category || 'other'
    const amount = Number(item?.amount ?? 0)

    result[category] = (result[category] || 0) + amount
    return result
  }, {})
}

function groupByMonth(incomes = [], expenses = []) {
  const months = {}

  const addTransaction = (item, type) => {
    if (!item?.date) return

    const month = item.date.slice(0, 7)

    if (!months[month]) {
      months[month] = {
        month,
        income: 0,
        expense: 0,
      }
    }

    months[month][type] += Number(item?.amount ?? 0)
  }

  ;(incomes || []).forEach((income) => {
    addTransaction(income, 'income')
  })

  ;(expenses || []).forEach((expense) => {
    addTransaction(expense, 'expense')
  })

  return Object.values(months).sort((a, b) =>
    a.month.localeCompare(b.month),
  )
}

export function getSummary() {
  const incomes = getIncomes() || []
  const expenses = getExpenses() || []

  const totalIncome = calculateTotal(incomes)
  const totalExpense = calculateTotal(expenses)

  return {
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
    incomeByCategory: groupByCategory(incomes),
    expenseByCategory: groupByCategory(expenses),
    monthlyData: groupByMonth(incomes, expenses),
  }
}
