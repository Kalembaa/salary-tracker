import { useEffect, useState } from 'react'
import BalanceCard from '../../components/BalanceCard/BalanceCard'
import TransactionList from '../../components/TransactionList/TransactionList'
import { getExpenses } from '../../services/expenseService'
import { getIncomes } from '../../services/incomeService'
import { getSummary } from '../../services/summaryService'
import styles from './Dashboard.module.css'

function Dashboard() {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  })

  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const incomes = getIncomes() || []
    const expenses = getExpenses() || []

    const allTransactions = [...incomes, ...expenses]
      .sort((a, b) => {
        const dateA = new Date(a?.date || 0)
        const dateB = new Date(b?.date || 0)

        return dateB - dateA
      })
      .slice(0, 5)

    setSummary(getSummary())
    setTransactions(allTransactions)
  }, [])

  return (
    <section className={styles.dashboard}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Главная</h1>
          <p className={styles.subtitle}>
            Ваши доходы, расходы и текущий баланс
          </p>
        </div>
      </div>

      <div className={styles.cards}>
        <BalanceCard
          title="Доходы"
          amount={summary?.totalIncome ?? 0}
          color="income"
        />

        <BalanceCard
          title="Расходы"
          amount={summary?.totalExpense ?? 0}
          color="expense"
        />

        <BalanceCard
          title="Баланс"
          amount={summary?.balance ?? 0}
          color="balance"
        />
      </div>

      <div className={styles.transactions}>
        <h2 className={styles.transactionsTitle}>Последние операции</h2>
        <TransactionList transactions={transactions || []} />
      </div>

      <button
        className={styles.addButton}
        type="button"
        aria-label="Добавить операцию"
      >
        +
      </button>
    </section>
  )
}

export default Dashboard
