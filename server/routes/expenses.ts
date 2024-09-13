import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3),
  amount: z.number().int().positive(),
})

type Expense = z.infer<typeof expenseSchema>

const mockExpenses: Expense[] = [
  {
    id: 1,
    title: `Groceries`,
    amount: 50,
  },
  {
    id: 2,
    title: `Utilities`,
    amount: 500,
  },
  {
    id: 3,
    title: `Rent`,
    amount: 5000,
  },
]

const postExpenseSchema = expenseSchema.omit({ id: true })

export const expenses = new Hono()
  .get(`/`, ctx => {
    return ctx.json({ expenses: mockExpenses })
  })
  .post(`/`, zValidator(`json`, postExpenseSchema), async ctx => {
    const expense = ctx.req.valid(`json`)
    mockExpenses.push({ ...expense, id: ++mockExpenses.length })
    return ctx.json(expense)
  })
  .get(`total`, ctx => {
    const totalExpense = mockExpenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    )
    return ctx.json({ totalExpense })
  })
  .get(`:id{[0-9]+}`, ctx => {
    const targetExpense = mockExpenses.find(
      expense => expense.id === +ctx.req.param(`id`)
    )
    if (!targetExpense) return ctx.notFound()
    return ctx.json({ targetExpense })
  })
  .delete(`:id{[0-9]+}`, ctx => {
    const id = +ctx.req.param(`id`)
    const targetIdx = mockExpenses.findIndex(expense => expense.id === id)
    if (targetIdx === -1) return ctx.notFound()
    const deletedExpense = mockExpenses.splice(targetIdx, 1)
    return ctx.json({ deletedExpense })
  })
