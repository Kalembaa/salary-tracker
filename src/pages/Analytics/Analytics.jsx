import { useEffect, useState } from 'react'
import BarChart from '../../components/BarChart/BarChart'
import PieChart from '../../components/PieChart/PieChart'
import { EXPENSE_CATEGORIES } from '../../utils/constants'
import { getSummary } from '../../services/summaryService'
import styles from './Analytics.module.css'

function Analytics() {
  const [summary, setSummary] = useState({
    expenseByCategory: {},
    monthlyData: [],
  })

  useEffect(() => {
    const currentSummary = getSummary()

    setSummary(currentSummary || {
      expenseByCategory: {},
      monthlyData: [],
    })
  }, [])

  const expenseByCategory = summary?.expenseByCategory || {}

  const pieData = Object.entries(expenseByCategory)
    .map(([categoryId, value]) => {
      const category = EXPENSE_CATEGORIES.find(
        (item) => item.id === categoryId,
      )

      return {
        id: categoryId,
        name: category?.label || 'Прочее',
        value: Number(value ?? 0),
      }
    })
    .filter((item) => item.value > 0)

  const monthlyData = (summary?.monthlyData || []).map((item) => {
    const [year, month] = (item?.month || '').split('-')

    const monthLabel =
      year && month
        ? new Date(
            Number(year),
            Number(month) - 1,
            1,
          ).toLocaleDateString('ru-RU', {
            month: 'short',
            year: 'numeric',
          })
        : item?.month || '—'

    return {
      ...item,
      month: monthLabel,
      income: Number(item?.income ?? 0),
      expense: Number(item?.expense ?? 0),
    }
  })

  return (
    <section className={styles.analytics}>
      <div className={styles.header}>
        <h1 className={styles.title}>Аналитика</h1>
        <p className={styles.subtitle}>
          Наглядная статистика ваших доходов и расходов
        </p>
      </div>

      <div className={styles.charts}>
        <div className={styles.chart}>
          <PieChart
            data={pieData}
            title="Расходы по категориям"
          />
        </div>

        <div className={styles.chart}>
          <BarChart
            data={monthlyData}
            title="Доходы и расходы по месяцам"
          />
        </div>
      </div>
    </section>
  )
}

export default Analytics
