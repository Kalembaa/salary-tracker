import { useEffect, useState } from 'react'
import styles from './TransactionForm.module.css'

const FALLBACK_INCOME_CATEGORIES = [
  { id: 'salary', label: 'Зарплата' },
  { id: 'freelance', label: 'Подработка' },
  { id: 'bonus', label: 'Премия' },
  { id: 'other', label: 'Прочее' },
]

const FALLBACK_EXPENSE_CATEGORIES = [
  { id: 'groceries', label: 'Продукты' },
  { id: 'utilities', label: 'Коммуналка' },
  { id: 'rent', label: 'Аренда' },
  { id: 'transport', label: 'Транспорт' },
  { id: 'health', label: 'Здоровье' },
  { id: 'other', label: 'Прочее' },
]

function TransactionForm({
  onSubmit = () => {},
  onCancel = () => {},
  editData = null,
}) {
  const [formData, setFormData] = useState({
    type: 'income',
    category: 'salary',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    comment: '',
  })

  useEffect(() => {
    if (!editData) return

    setFormData({
      type: editData?.type || 'income',
      category: editData?.category || '',
      amount: editData?.amount ?? '',
      date: editData?.date || new Date().toISOString().split('T')[0],
      comment: editData?.comment || '',
    })
  }, [editData])

  const categories =
    formData.type === 'income'
      ? FALLBACK_INCOME_CATEGORIES
      : FALLBACK_EXPENSE_CATEGORIES

  const handleChange = (event) => {
    const { name, value } = event.target

    if (name === 'type') {
      const nextCategories =
        value === 'income'
          ? FALLBACK_INCOME_CATEGORIES
          : FALLBACK_EXPENSE_CATEGORIES

      setFormData((current) => ({
        ...current,
        type: value,
        category: nextCategories[0]?.id || '',
      }))

      return
    }

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const transaction = {
      ...formData,
      amount: Number(formData.amount ?? 0),
    }

    onSubmit?.(transaction)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>
        {editData ? 'Редактировать операцию' : 'Новая операция'}
      </h2>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="type">
            Тип операции
          </label>

          <select
            id="type"
            name="type"
            className={styles.select}
            value={formData.type}
            onChange={handleChange}
          >
            <option value="income">Доход</option>
            <option value="expense">Расход</option>
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="category">
            Категория
          </label>

          <select
            id="category"
            name="category"
            className={styles.select}
            value={formData.category}
            onChange={handleChange}
          >
            {(categories || []).map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="amount">
            Сумма
          </label>

          <input
            id="amount"
            name="amount"
            className={styles.input}
            type="number"
            min="0"
            step="1"
            placeholder="Например, 1500000"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="date">
            Дата
          </label>

          <input
            id="date"
            name="date"
            className={styles.input}
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className={`${styles.field} ${styles.fullWidth}`}>
          <label className={styles.label} htmlFor="comment">
            Комментарий
          </label>

          <textarea
            id="comment"
            name="comment"
            className={styles.textarea}
            placeholder="Добавьте комментарий..."
            value={formData.comment}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={`${styles.button} ${styles.cancelButton}`}
          type="button"
          onClick={() => onCancel?.()}
        >
          Отмена
        </button>

        <button
          className={`${styles.button} ${styles.submitButton}`}
          type="submit"
        >
          {editData ? 'Сохранить изменения' : 'Добавить'}
        </button>
      </div>
    </form>
  )
}

export default TransactionForm
