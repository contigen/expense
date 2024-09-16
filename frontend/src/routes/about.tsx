import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: () => (
    <div>
      <h1 className='text-3xl font-bold tracking-tight'>Hello from about!</h1>
    </div>
  ),
})
