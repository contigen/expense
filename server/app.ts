import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { expenses } from './routes/expenses'
import { serveStatic } from 'hono/bun'
import { Auth } from './routes/auth'

const app = new Hono()

app.use(`*`, logger())

const apiRoute = app
  .basePath(`/api`)
  .route(`/expenses`, expenses)
  .route(`/`, Auth)
export type APIRoute = typeof apiRoute

// serve frontend static files from the backend
app.get(`*`, serveStatic({ root: `./frontend/dist` }))
app.get(`*`, serveStatic({ root: `./frontend/dist/index.html` }))

export default app
