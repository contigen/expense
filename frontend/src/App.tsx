import './App.css'
import { ExpenseCard } from './components/expense-card'

function App() {
  return (
    <div className='m-4'>
      <h1 className='text-3xl font-bold tracking-tight'>
        Expense tracker app with a React frontend & a Hono server.
      </h1>
      <p className='font-medium'>
        Vite as the bundler for the frontend, with Bun as the development
        servers for both the frontend and the backend.
      </p>
      <ExpenseCard />
    </div>
  )
}

export default App
