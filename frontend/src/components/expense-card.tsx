import { Card, CardContent, CardDescription, CardHeader } from './ui/card'
import { api } from '../lib/api'
import { useQuery } from '@tanstack/react-query'
import { Spinner } from './ui/spinner'

async function getExpensesTotal() {
  const res = await api.expenses[`total`].$get()
  if (!res.ok) throw new Error(`Request failed`)
  const total = await res.json()
  return total
}

export function ExpenseCard() {
  const {
    isPending,
    error: err,
    data,
  } = useQuery({
    queryKey: [`total-expense`],
    queryFn: getExpensesTotal,
  })
  if (isPending)
    return (
      <div className='mx-auto my-4 w-max'>
        <Spinner />
      </div>
    )
  if (err) return err.message

  return (
    <Card className='px-4 mx-auto my-4 w-max'>
      <CardHeader>Total Spent</CardHeader>
      <CardDescription>The total amount you've spent</CardDescription>
      <CardContent>{data.totalExpense}</CardContent>
    </Card>
  )
}
