import styles from './BalanceCard.module.css'

function BalanceCard({ title = 'Без названия', amount = 0, color = 'balance' }) {
  const safeAmount = Number(amount ?? 0)

  const colorClass = {
    income: styles.income,
    expense: styles.expense,
    balance: styles.balance,
  }

  const amountClassName =
    `${styles.amount} ${colorClass[color] || styles.balance}`

  return (
    <article className={styles.card}>
      <p className={styles.title}>{title}</p>
      <p className={amountClassName}>
        {safeAmount.toLocaleString('ru-RU')} сум
      </p>
    </article>
  )
}

export default BalanceCard
