import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader } from './ui/card'
import { api } from '../lib/api'

export function ExpenseCard() {
  const [totalSpent, setTotalSpent] = useState(0)

  useEffect(() => {
    async function getExpensesTotal() {
      const res = await api.expenses[`total`].$get()
      const total = await res.json()
      setTotalSpent(total.totalExpense)
    }
    getExpensesTotal()
  }, [])
  return (
    <Card className='mx-auto w-max px-4 my-4'>
      <CardHeader>Total Spent</CardHeader>
      <CardDescription>The total amount you've spent</CardDescription>
      <CardContent>{totalSpent}</CardContent>
    </Card>
  )
}
