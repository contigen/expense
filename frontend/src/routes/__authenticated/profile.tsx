import { createFileRoute } from '@tanstack/react-router'
import { userQueryOpts } from '../../lib/api'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardDescription } from '../../components/ui/card'
import { Spinner } from '../../components/ui/spinner'

export const Route = createFileRoute('/__authenticated/profile')({
  component: Profile,
})

function Profile() {
  const { isPending, error: err, data } = useQuery(userQueryOpts)
  if (err) return <p>You are not logged in.</p>
  return (
    <div>
      <h2>User Profile</h2>
      {isPending ? (
        <Spinner />
      ) : (
        <Card className='my-2'>
          <CardContent>
            {JSON.stringify(data?.user, null, 2)}
            {/* @ts-expect-error name object might not exist in the future */}
            <CardDescription>{data.user?.name}</CardDescription>
          </CardContent>
        </Card>
      )}
      <a
        href='/api/logout'
        className='bg-stone-100 text-blue-500 rounded-xl px-4 py-1'
      >
        Logout
      </a>
    </div>
  )
}
