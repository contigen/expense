import { Label } from '@radix-ui/react-label'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { useForm } from '@tanstack/react-form'
import type { FieldApi } from '@tanstack/react-form'
import { Spinner } from '../../components/ui/spinner'
import { api } from '../../lib/api'

export const Route = createFileRoute('/__authenticated/create-expense')({
  component: ExpenseForm,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(', ')}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  )
}

function ExpenseForm() {
  const navigate = useNavigate()
  const form = useForm({
    defaultValues: {
      title: ``,
      amount: 0,
    },
    onSubmit: async ({ value }) => {
      const res = await api.expenses.$post({ json: value })
      if (!res.ok) throw new Error(`Server Error`)
      navigate({ to: `/expenses` })
    },
  })
  return (
    <div className='p-2'>
      <h2>Create Expense</h2>
      <form
        className='p-4 max-w-xl mx-auto'
        onSubmit={evt => {
          evt.preventDefault()
          form.handleSubmit()
        }}
      >
        <form.Field
          name='title'
          children={field => (
            <>
              <Label htmlFor={field.name}>Title</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={evt => field.handleChange(evt.target.value)}
                placeholder='Title'
              />
              <FieldInfo field={field} />
            </>
          )}
        />
        <form.Field
          name='amount'
          children={field => (
            <>
              <Label htmlFor={field.name}>Amount</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={evt => field.handleChange(+evt.target.value)}
                placeholder='Amount'
                type='amount'
              />
              <FieldInfo field={field} />
            </>
          )}
        />
        <form.Subscribe
          selector={state => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type='submit' disabled={!canSubmit} className='mt-3'>
              {isSubmitting ? <Spinner color='white' /> : `Create Expense`}
            </Button>
          )}
        />
      </form>
    </div>
  )
}
