import { createFileRoute } from '@tanstack/react-router'
import { api } from '../../lib/api'
import { useQuery } from '@tanstack/react-query'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table'
import { Skeleton } from '../../components/ui/skeleton'

export const Route = createFileRoute('/__authenticated/expenses')({
  component: Expenses,
})

async function getExpenses() {
  const res = await api.expenses.$get()
  if (!res.ok) throw new Error(`Request failed`)
  const total = await res.json()
  return total
}

function Expenses() {
  return (
    <div>
      <h3>Expenses</h3>
      <ExpensesTable />
    </div>
  )
}

function ExpensesTable() {
  const {
    isPending,
    error: err,
    data,
  } = useQuery({
    queryKey: [`expenses`],
    queryFn: getExpenses,
  })
  if (err) return err.message
  return (
    <Table className='max-w-3xl mx-auto'>
      <TableCaption>A list of your expenses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isPending
          ? Array(3)
              .fill(0)
              .map((_, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <Skeleton className='h-4' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-4' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-4' />
                  </TableCell>
                </TableRow>
              ))
          : data.expenses.map(expense => (
              <TableRow key={expense.id}>
                <TableCell className='font-medium'>{expense.id}</TableCell>
                <TableCell>{expense.title}</TableCell>
                <TableCell>{expense.amount}</TableCell>
              </TableRow>
            ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell>$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
