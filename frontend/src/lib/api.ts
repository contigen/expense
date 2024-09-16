import { queryOptions } from '@tanstack/react-query'
import { APIRoute } from '../../../server/app'
import { hc } from 'hono/client'

const client = hc<APIRoute>(`/`)

export const api = client.api

async function getUserProfile() {
  const res = await api.user.$get()
  if (!res.ok) throw new Error(`Request failed`)
  const user = await res.json()
  return user
}

export const userQueryOpts = queryOptions({
  queryKey: [`profile`],
  queryFn: getUserProfile,
  staleTime: Infinity,
})
