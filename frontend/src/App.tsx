import './App.css'
import { ExpenseCard } from './components/expense-card'

function App() {
  return (
    <>
      <h1 className='text-3xl trackng-tigt'>Expense tracker web app.</h1>
      <div className='mt-1 ml-4'>
        <h2>A React frontend & a Hono backend</h2>
        <p className='font-medium'>
          Vite as the bundler for the frontend, with Bun as the development
          servers for both the frontend and the backend.
        </p>
      </div>
      <ExpenseCard />
    </>
  )
}

export default App
