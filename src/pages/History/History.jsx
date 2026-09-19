import { useEffect, useState } from 'react'
import Modal from '../../components/Modal/Modal'
import TransactionForm from '../../components/TransactionForm/TransactionForm'
import TransactionList from '../../components/TransactionList/TransactionList'
import {
  addExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from '../../services/expenseService'
import {
  addIncome,
  deleteIncome,
  getIncomes,
  updateIncome,
} from '../../services/incomeService'
import styles from './History.module.css'

function History() {
  const [transactions, setTransactions] = useState([])
  const [typeFilter, setTypeFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editData, setEditData] = useState(null)

  const loadTransactions = () => {
    const incomes = getIncomes() || []
    const expenses = getExpenses() || []

    const allTransactions = [...incomes, ...expenses].sort((a, b) => {
      const dateA = new Date(a?.date || 0)
      const dateB = new Date(b?.date || 0)
      return dateB - dateA
    })

    setTransactions(allTransactions)
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  const handleAdd = () => {
    setEditData(null)
    setIsModalOpen(true)
  }

  const handleEdit = (transaction) => {
    setEditData(transaction || null)
    setIsModalOpen(true)
  }

  const handleDelete = (transaction) => {
    if (!transaction?.id) return

    const shouldDelete = window.confirm('Удалить эту операцию?')
    if (!shouldDelete) return

    if (transaction.type === 'income') {
      deleteIncome(transaction.id)
    } else {
      deleteExpense(transaction.id)
    }

    loadTransactions()
  }

  const handleSubmit = (formData) => {
    if (editData?.id) {
      if (editData.type === formData.type) {
        if (formData.type === 'income') {
          updateIncome(editData.id, formData)
        } else {
          updateExpense(editData.id, formData)
        }
      } else {
        if (editData.type === 'income') {
          deleteIncome(editData.id)
        } else {
          deleteExpense(editData.id)
        }

        if (formData.type === 'income') {
          addIncome(formData)
        } else {
          addExpense(formData)
        }
      }
    } else if (formData.type === 'income') {
      addIncome(formData)
    } else {
      addExpense(formData)
    }

    setIsModalOpen(false)
    setEditData(null)
    loadTransactions()
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setEditData(null)
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesType =
      typeFilter === 'all' || transaction?.type === typeFilter
    const matchesDate =
      !dateFilter || transaction?.date === dateFilter

    return matchesType && matchesDate
  })

  return (
    <section className={styles.history}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>История</h1>
          <p className={styles.subtitle}>Все ваши доходы и расходы</p>
        </div>

        <button type="button" onClick={handleAdd}>
          Добавить операцию
        </button>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label className={styles.label} htmlFor="typeFilter">
            Тип операции
          </label>

          <select
            id="typeFilter"
            className={styles.select}
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
          >
            <option value="all">Все операции</option>
            <option value="income">Доходы</option>
            <option value="expense">Расходы</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.label} htmlFor="dateFilter">
            Дата
          </label>

          <input
            id="dateFilter"
            className={styles.input}
            type="date"
            value={dateFilter}
            onChange={(event) => setDateFilter(event.target.value)}
          />
        </div>
      </div>

      <div className={styles.list}>
        <TransactionList
          transactions={filteredTransactions || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCancel}>
        <TransactionForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          editData={editData}
        />
      </Modal>
    </section>
  )
}

export default History
