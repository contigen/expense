import { APIRoute } from '../../../server/app'
import { hc } from 'hono/client'

const client = hc<APIRoute>(`/`)

export const api = client.api
