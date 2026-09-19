import EmptyState from '../EmptyState/EmptyState'
import styles from './TransactionList.module.css'

function TransactionList({
  transactions = [],
  onEdit = null,
  onDelete = null,
}) {
  const safeTransactions = transactions || []

  if (safeTransactions.length === 0) {
    return (
      <EmptyState
        icon="📋"
        title="Нет операций"
        description="Добавьте первую операцию, и она появится здесь."
      />
    )
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Тип</th>
            <th className={styles.th}>Категория</th>
            <th className={styles.th}>Сумма</th>
            <th className={styles.th}>Дата</th>
            <th className={styles.th}>Комментарий</th>
            <th className={styles.th}>Действия</th>
          </tr>
        </thead>

        <tbody>
          {safeTransactions.map((transaction, index) => {
            const isIncome = transaction?.type === 'income'

            return (
              <tr
                className={styles.row}
                key={transaction?.id || `${transaction?.date || 'item'}-${index}`}
              >
                <td
                  className={`${styles.td} ${styles.type} ${
                    isIncome ? styles.income : styles.expense
                  }`}
                >
                  {isIncome ? 'Доход' : 'Расход'}
                </td>

                <td className={styles.td}>
                  {transaction?.category || 'Прочее'}
                </td>

                <td className={`${styles.td} ${styles.amount}`}>
                  {Number(transaction?.amount ?? 0).toLocaleString('ru-RU')} сум
                </td>

                <td className={styles.td}>
                  {transaction?.date || '—'}
                </td>

                <td className={`${styles.td} ${styles.comment}`}>
                  {transaction?.comment || '—'}
                </td>

                <td className={`${styles.td} ${styles.actions}`}>
                  {typeof onEdit === 'function' && (
                    <button
                      className={styles.actionButton}
                      type="button"
                      onClick={() => onEdit(transaction)}
                    >
                      Изменить
                    </button>
                  )}

                  {typeof onDelete === 'function' && (
                    <button
                      className={`${styles.actionButton} ${styles.deleteButton}`}
                      type="button"
                      onClick={() => onDelete(transaction)}
                    >
                      Удалить
                    </button>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionList
