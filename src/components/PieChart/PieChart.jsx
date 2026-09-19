import {
  Cell,
  Legend,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

const COLORS = [
  '#2563eb',
  '#16a34a',
  '#dc2626',
  '#f59e0b',
  '#8b5cf6',
  '#06b6d4',
  '#ec4899',
  '#84cc16',
]

function PieChart({
  data = [],
  title = 'Расходы по категориям',
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

  return (
    <div>
      <h2>{title}</h2>

      <div style={{ width: '100%', height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={safeData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {safeData.map((item, index) => (
                <Cell
                  key={item?.id || item?.name || index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) =>
                `${Number(value ?? 0).toLocaleString('ru-RU')} сум`
              }
            />

            <Legend />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default PieChart
