import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

function BarChart({
  data = [],
  title = 'Доходы и расходы по месяцам',
}) {
  const safeData = data || []

  if (safeData.length === 0) {
    return (
      <div>
        <h2>{title}</h2>
        <p>Графики появятся после подключения данных</p>
      </div>
    )
  }

  const formatCurrency = (value) =>
    `${Number(value ?? 0).toLocaleString('ru-RU')} сум`

  return (
    <div>
      <h2>{title}</h2>

      <div style={{ width: '100%', height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={safeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis
              tickFormatter={(value) =>
                Number(value ?? 0).toLocaleString('ru-RU')
              }
            />
            <Tooltip formatter={formatCurrency} />
            <Legend />
            <Bar dataKey="income" name="Доходы" fill="#16a34a" />
            <Bar dataKey="expense" name="Расходы" fill="#dc2626" />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default BarChart
