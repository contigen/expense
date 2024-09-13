import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { expenses } from './routes/expenses'
import { serveStatic } from 'hono/bun'

const app = new Hono()

app.use(`*`, logger())

const apiRoute = app.basePath(`/api`).route(`/expenses`, expenses)
export type APIRoute = typeof apiRoute

app.get(`*`, serveStatic({ root: `./frontend/dist` }))
app.get(`*`, serveStatic({ root: `./frontend/dist/index.html` }))

export default app
