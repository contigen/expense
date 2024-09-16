import { createFileRoute, Outlet } from '@tanstack/react-router'
import { userQueryOpts } from '../lib/api'

export const Route = createFileRoute('/__authenticated')({
  beforeLoad: async ({ context }) => {
    // getquerydata is a function that returns the data for a given query key
    const queryClient = context.queryClient
    // const { user } = queryClient.getQueryData('profile')
    try {
      const data = await queryClient.fetchQuery(userQueryOpts)
      return data
    } catch {
      return { user: null }
    }
  },
  component: Component,
})

function Component() {
  const { user } = Route.useRouteContext()
  if (!user) return <Login />
  return <Outlet />
}

function Login() {
  return (
    <div>
      <h2 className='mb-2'>Login to view Expenses.</h2>
      <a
        href='/api/login'
        className='bg-stone-100 text-blue-500 rounded-xl px-4 py-1'
      >
        Login
      </a>
    </div>
  )
}
