import withAuth from '@hooks/withAuth'
import dynamic from 'next/dynamic'

const Transaction = dynamic(() => import('@components/account/Transaction'))
const MonthlyChart = dynamic(() => import('@components/account/MonthlyChart'))

function AccountPage() {
  return (
    <div>
      <MonthlyChart chartData={generateMonthlyChartData()} />
      <Transaction />
    </div>
  )
}
export default withAuth(AccountPage)

function generatePieChartData() {
  return ['카페', '쇼핑', '여행', '커피'].map((label) => ({
    label,
    amount: Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000,
  }))
}

function generateMonthlyChartData() {
  return [
    '2024-01-31',
    '2024-02-28',
    '2024-03-31',
    '2024-04-30',
    '2024-05-31',
    '2024-06-30',
    '2024-07-31',
    '2024-08-31',
    '2024-09-30',
    '2024-10-31',
    '2024-11-30',
    '2024-12-31',
  ].map((date) => ({
    date,
    balance: Math.floor(Math.random() * (1000000 - 10000 + 1)) + 10000,
  }))
}
